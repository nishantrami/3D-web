import { useState, useEffect, useRef } from 'react';

const CodeGame = () => {
    const [activeTab, setActiveTab] = useState('game');
    const [isPlaying, setIsPlaying] = useState(false); 
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    
    const canvasRef = useRef(null);
    const gameRef = useRef({
        snake: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }],
        direction: { x: 0, y: -1 },
        lastDirection: { x: 0, y: -1 }, // Prevent self-collision on fast keypresses
        food: { x: 5, y: 5 },
        score: 0,
        isPlaying: false,
        gameOver: false
    });

    const gridCount = 20;

    useEffect(() => {
        gameRef.current.isPlaying = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        if (activeTab !== 'game') return;
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const state = gameRef.current;

        let animationFrameId;
        let lastTickTime = null;
        let particles = [];

        // Ensure perfect pixel-alignment to eliminate blurry grid rendering
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            const parentWidth = parent.clientWidth;
            // Ensure canvas fits and grid coordinates are perfect integers
            const size = Math.floor(parentWidth / gridCount) * gridCount;
            if (size > 0) {
                canvas.width = size;
                canvas.height = size;
            }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const createParticles = (x, y, color) => {
            const count = 25;
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 4 + 1.5;
                particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1.0,
                    decay: Math.random() * 0.03 + 0.015,
                    color,
                    size: Math.random() * 3.5 + 1
                });
            }
        };

        const generateFood = () => {
            let newFood;
            let attempts = 0;
            while (attempts < 100) {
                newFood = {
                    x: Math.floor(Math.random() * gridCount),
                    y: Math.floor(Math.random() * gridCount)
                };
                // Prevent spawning on snake body
                if (!state.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
                    break;
                }
                attempts++;
            }
            state.food = newFood || { x: 5, y: 5 }; // Fallback safety
        };

        const handleKeyDown = (e) => {
            if (!state.isPlaying || state.gameOver) return;
            
            const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'];
            if (keys.includes(e.key.toLowerCase())) {
                e.preventDefault(); // Block scrolling completely when actively playing
            }

            const key = e.key.toLowerCase();
            // Use state.lastDirection (the one processed on last tick) to block 180-degree reversals
            const dir = state.lastDirection;

            if ((key === 'arrowup' || key === 'w') && dir.y !== 1) {
                state.direction = { x: 0, y: -1 };
            } else if ((key === 'arrowdown' || key === 's') && dir.y !== -1) {
                state.direction = { x: 0, y: 1 };
            } else if ((key === 'arrowleft' || key === 'a') && dir.x !== 1) {
                state.direction = { x: -1, y: 0 };
            } else if ((key === 'arrowright' || key === 'd') && dir.x !== -1) {
                state.direction = { x: 1, y: 0 };
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        const resetGame = () => {
            state.snake = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
            state.direction = { x: 0, y: -1 };
            state.lastDirection = { x: 0, y: -1 };
            state.score = 0;
            state.gameOver = false;
            setScore(0);
            setGameOver(false);
            generateFood();
        };

        // Unified Tick (Logical update)
        const tick = () => {
            if (state.gameOver) return;

            // Lock and save direction for this tick to prevent turn exploits
            state.lastDirection = { ...state.direction };

            const head = { ...state.snake[0] };

            // AI Play Mode
            if (!state.isPlaying) {
                const dx = state.food.x - head.x;
                const dy = state.food.y - head.y;
                
                const idealMoves = [];
                if (dx > 0 && state.direction.x !== -1) idealMoves.push({ x: 1, y: 0 });
                if (dx < 0 && state.direction.x !== 1) idealMoves.push({ x: -1, y: 0 });
                if (dy > 0 && state.direction.y !== -1) idealMoves.push({ x: 0, y: 1 });
                if (dy < 0 && state.direction.y !== 1) idealMoves.push({ x: 0, y: -1 });
                
                const allPossible = [
                    { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }
                ].filter(d => !(d.x === -state.direction.x && d.y === -state.direction.y));

                const safeMoves = [...idealMoves, ...allPossible].filter(d => {
                    const nx = head.x + d.x;
                    const ny = head.y + d.y;
                    if (nx < 0 || nx >= gridCount || ny < 0 || ny >= gridCount) return false;
                    // Don't hit tail, but allow if moving out on same turn
                    const isTail = state.snake.length > 1 && nx === state.snake[state.snake.length - 1].x && ny === state.snake[state.snake.length - 1].y;
                    if (state.snake.some(seg => seg.x === nx && seg.y === ny) && !isTail) return false;
                    return true;
                });

                if (safeMoves.length > 0) {
                    state.direction = safeMoves[0];
                }
            }

            head.x += state.direction.x;
            head.y += state.direction.y;

            // Perfect collision rules
            const hitWall = head.x < 0 || head.x >= gridCount || head.y < 0 || head.y >= gridCount;
            // Can occupy tail space ONLY if not eating food on same turn (because tail shrinks)
            const isEating = head.x === state.food.x && head.y === state.food.y;
            const selfCollision = state.snake.some((seg, index) => {
                if (index === state.snake.length - 1 && !isEating) return false; // Tail moves out of the way
                return seg.x === head.x && seg.y === head.y;
            });

            if (hitWall || selfCollision) {
                if (state.isPlaying) {
                    state.gameOver = true;
                    setGameOver(true);
                    setHighScore(prev => Math.max(prev, state.score));
                    
                    // Giant Game-Over Explosion!
                    const size = canvas.width / gridCount;
                    createParticles(head.x * size + size/2, head.y * size + size/2, '#ef4444');
                } else {
                    resetGame();
                }
                return;
            }

            state.snake.unshift(head);

            if (isEating) {
                state.score += 10;
                setScore(state.score);
                
                // Create particles on eating
                const size = canvas.width / gridCount;
                createParticles(state.food.x * size + size / 2, state.food.y * size + size / 2, '#06b6d4');
                
                generateFood();
            } else {
                state.snake.pop();
            }
        };

        // 60FPS Render Loop
        const render = (timestamp) => {
            if (!lastTickTime) lastTickTime = timestamp; // Set baseline timestamp on first frame

            // Slower tick speed for user to ensure perfect reactability, fast for AI
            const speedThreshold = state.isPlaying ? 135 : 95; 
            if (timestamp - lastTickTime > speedThreshold) {
                tick();
                lastTickTime = timestamp;
            }

            const size = canvas.width / gridCount;

            // 1. Background
            ctx.fillStyle = '#0a0e17'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 2. Subtle Futuristic Grid
            ctx.strokeStyle = 'rgba(79, 70, 229, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < gridCount; i++) {
                ctx.beginPath();
                ctx.moveTo(i * size, 0);
                ctx.lineTo(i * size, canvas.height);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, i * size);
                ctx.lineTo(canvas.width, i * size);
                ctx.stroke();
            }

            // 3. Pulsating Glowing Food
            const time = timestamp / 250;
            const pulseFactor = Math.sin(time) * 2;
            const fx = state.food.x * size + size / 2;
            const fy = state.food.y * size + size / 2;

            // Outer ripple ring
            ctx.save();
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#f43f5e';
            ctx.beginPath();
            ctx.arc(fx, fy, (size / 3) + 2 + pulseFactor * 0.8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // Solid core
            ctx.save();
            ctx.fillStyle = '#f43f5e';
            ctx.shadowBlur = 18;
            ctx.shadowColor = '#f43f5e';
            ctx.beginPath();
            ctx.arc(fx, fy, size / 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // 4. Ultimate Glowing Snake
            state.snake.forEach((segment, index) => {
                const isHead = index === 0;
                const px = segment.x * size + 1.5;
                const py = segment.y * size + 1.5;
                const w = size - 3;
                const h = size - 3;
                const radius = Math.max(3, size / 3);

                // Dynamic opacity for tail taper
                const baseAlpha = isHead ? 1 : Math.max(0.2, 1 - (index / state.snake.length));

                ctx.save();
                
                // Extreme Neon Layered Shadow
                ctx.shadowColor = isHead ? '#4f46e5' : '#06b6d4';
                ctx.shadowBlur = isHead ? 25 : 12;
                
                // Setup fill gradients
                const gradient = ctx.createLinearGradient(px, py, px + w, py + h);
                if (isHead) {
                    gradient.addColorStop(0, '#6366f1');
                    gradient.addColorStop(1, '#4f46e5');
                } else {
                    gradient.addColorStop(0, `rgba(6, 182, 212, ${baseAlpha})`);
                    gradient.addColorStop(1, `rgba(2, 132, 199, ${baseAlpha})`);
                }
                ctx.fillStyle = gradient;

                // Rounded Rect implementation
                ctx.beginPath();
                ctx.moveTo(px + radius, py);
                ctx.lineTo(px + w - radius, py);
                ctx.quadraticCurveTo(px + w, py, px + w, py + radius);
                ctx.lineTo(px + w, py + h - radius);
                ctx.quadraticCurveTo(px + w, py + h, px + w - radius, py + h);
                ctx.lineTo(px + radius, py + h);
                ctx.quadraticCurveTo(px, py + h, px, py + h - radius);
                ctx.lineTo(px, py + radius);
                ctx.quadraticCurveTo(px, py, px + radius, py);
                ctx.closePath();
                ctx.fill();

                // Add Inner Highlighting to make it look 3D/Tubular
                ctx.shadowBlur = 0;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();
            });

            // 5. Update and Render Particles (High refresh speed)
            particles = particles.filter(p => p.life > 0);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.98; // velocity decay
                p.vy *= 0.98;
                p.life -= p.decay;

                ctx.save();
                ctx.globalAlpha = p.life;
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeTab, isPlaying]);

    const handleStartPlay = () => {
        setIsPlaying(true);
        gameRef.current.isPlaying = true;
        gameRef.current.gameOver = false;
        gameRef.current.snake = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
        gameRef.current.direction = { x: 0, y: -1 };
        gameRef.current.lastDirection = { x: 0, y: -1 };
        gameRef.current.score = 0;
        setScore(0);
        setGameOver(false);
        
        // Safe food regeneration on startup
        let newFood;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * gridCount),
                y: Math.floor(Math.random() * gridCount)
            };
            if (!gameRef.current.snake.some(s => s.x === newFood.x && s.y === newFood.y)) break;
        }
        gameRef.current.food = newFood;
    };

    const handleStopPlay = () => {
        setIsPlaying(false);
        gameRef.current.isPlaying = false;
    };

    return (
        <div className="editor-window">
            <div className="editor-header">
                <div className="dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                </div>
                <div className="tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'game' ? 'active' : ''}`}
                        onClick={() => setActiveTab('game')}
                    >
                        <i className="fas fa-bolt text-green-500"></i> Live Engine
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
                        onClick={() => setActiveTab('code')}
                    >
                        <i className="fas fa-code text-blue-500"></i> engine.js
                    </button>
                </div>
            </div>

            <div className="editor-body">
                {activeTab === 'code' ? (
                    <div className="code-content">
                        <pre>
                            <code className="language-javascript">
                                <span className="keyword">class</span> <span className="class-name">GameEngine</span> {'{'}
                                {'\n'}  <span className="function">constructor</span>() {'{'}
                                {'\n'}    <span className="variable">this</span>.fps = <span className="number">60</span>;
                                {'\n'}    <span className="variable">this</span>.particles = [];
                                {'\n'}    <span className="variable">this</span>.glowEffect = <span className="keyword">true</span>;
                                {'\n'}  {'}'}
                                {'\n\n'}  <span className="comment">// High-Performance Loop</span>
                                {'\n'}  <span className="function">render</span>() {'{'}
                                {'\n'}    <span className="variable">this</span>.<span className="function">drawGrid</span>();
                                {'\n'}    <span className="variable">this</span>.<span className="function">drawSnake</span>();
                                {'\n'}    <span className="variable">this</span>.<span className="function">updateVFX</span>();
                                {'\n\n'}    <span className="function">requestAnimationFrame</span>(
                                {'\n'}      () <span className="keyword">=&gt;</span> <span className="variable">this</span>.<span className="function">render</span>()
                                {'\n'}    );
                                {'\n'}  {'}'}
                                {'\n\n'}  <span className="function">triggerExplosion</span>(pos) {'{'}
                                {'\n'}    <span className="keyword">for</span>(<span className="keyword">let</span> i=<span className="number">0</span>; i&lt;<span className="number">25</span>; i++) {'{'}
                                {'\n'}      <span className="variable">this</span>.particles.<span className="function">push</span>(
                                {'\n'}        <span className="keyword">new</span> <span className="class-name">Particle</span>(pos)
                                {'\n'}      );
                                {'\n'}    {'}'}
                                {'\n'}  {'}'}
                                {'\n'}{'}'}
                            </code>
                        </pre>
                    </div>
                ) : (
                    <div className="game-wrapper">
                        <div className="game-stats">
                            <div className="stat-box">
                                <span className="stat-label">SCORE</span>
                                <span className="stat-val">{score}</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label">MAX SCORE</span>
                                <span className="stat-val">{highScore}</span>
                            </div>
                            <div className="mode-badge">
                                {isPlaying ? (
                                    <span className="badge playing glow-playing"><i className="fas fa-gamepad"></i> USER</span>
                                ) : (
                                    <span className="badge autoplay glow-auto"><i className="fas fa-robot"></i> AI RUNNING</span>
                                )}
                            </div>
                        </div>
                        
                        <div className="canvas-container">
                            {/* CRT Overlay Element */}
                            <div className="scanlines"></div>
                            <canvas ref={canvasRef}></canvas>
                            
                            {gameOver && (
                                <div className="game-overlay glitch-overlay">
                                    <h3>CRITICAL FAILURE</h3>
                                    <p>System Reboot Initiated</p>
                                    <button className="play-btn" onClick={handleStartPlay}>
                                        FORCE RESTART
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="game-controls">
                            {!isPlaying ? (
                                <button className="action-btn pulse-btn" onClick={handleStartPlay}>
                                    <i className="fas fa-terminal"></i> ENTER MANUAL MODE
                                </button>
                            ) : (
                                <button className="action-btn cancel" onClick={handleStopPlay}>
                                    <i className="fas fa-power-off"></i> STOP & AUTO-PILOT
                                </button>
                            )}
                            {isPlaying && (
                                <p className="controls-tip">DIRECT CONSOLE OVERRIDE ACTIVATED: USE ARROWS</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeGame;
