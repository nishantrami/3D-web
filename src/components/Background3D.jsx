import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Background3D = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Basic setup
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 20);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Theme Colors mapping
        const colorPrimary = new THREE.Color("#ffd700"); // Gold
        const colorSecondary = new THREE.Color("#00f2fe"); // Sky Blue

        // Group to hold elements and apply mouse parallax
        const mainGroup = new THREE.Group();
        scene.add(mainGroup);

        // 1. CYBER WAVY GRID (GPU Shader Material for maximum performance)
        const gridWidth = 150;
        const gridHeight = 150;
        const gridSegments = 60;
        const gridGeometry = new THREE.PlaneGeometry(gridWidth, gridHeight, gridSegments, gridSegments);
        
        const gridMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: colorSecondary },
                uPrimaryColor: { value: colorPrimary },
                uScroll: { value: 0 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vElevation;
                uniform float uTime;
                uniform float uScroll;
                
                void main() {
                    vUv = uv;
                    vec3 pos = position;
                    
                    // Combine sine waves for organic flowing terrain
                    float elevation = sin(pos.x * 0.1 + uTime * 0.8) * cos(pos.y * 0.1 + uTime * 0.5) * 1.8;
                    elevation += sin(pos.x * 0.25 - uTime) * 0.4;
                    elevation += sin(pos.y * 0.15 + uTime * 1.2 + uScroll * 3.0) * 0.8;
                    
                    pos.z += elevation;
                    vElevation = elevation;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                varying float vElevation;
                uniform vec3 uColor;
                uniform vec3 uPrimaryColor;
                
                void main() {
                    // Darken as it approaches edges (depth fading)
                    float depthFade = smoothstep(0.0, 1.0, 1.0 - vUv.y);
                    float edgeFadeX = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
                    
                    // Color interpolation based on elevation
                    vec3 finalColor = mix(uColor, uPrimaryColor, smoothstep(-1.0, 2.5, vElevation));
                    
                    float opacity = (0.15 + smoothstep(-0.5, 2.0, vElevation) * 0.25) * depthFade * edgeFadeX;
                    
                    gl_FragColor = vec4(finalColor, opacity);
                }
            `,
            wireframe: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const cyberGrid = new THREE.Mesh(gridGeometry, gridMaterial);
        cyberGrid.rotation.x = -Math.PI / 2;
        cyberGrid.position.y = -12;
        mainGroup.add(cyberGrid);

        // 2. FLOATING 3D TECH COMPONENTS (Procedural Solids)
        const solidsGroup = new THREE.Group();
        mainGroup.add(solidsGroup);

        const solidsArray = [];
        const geometries = [
            new THREE.IcosahedronGeometry(1.5, 1),
            new THREE.TorusGeometry(1.2, 0.4, 8, 24),
            new THREE.OctahedronGeometry(1.8, 0),
            new THREE.TorusKnotGeometry(1, 0.3, 64, 8, 2, 3)
        ];

        const count = 15;
        for (let i = 0; i < count; i++) {
            const geom = geometries[Math.floor(Math.random() * geometries.length)];
            const meshMat = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.5 ? colorSecondary : colorPrimary,
                wireframe: true,
                transparent: true,
                opacity: 0.25,
                blending: THREE.AdditiveBlending
            });
            
            const solidMesh = new THREE.Mesh(geom, meshMat);
            
            // Random positions scattered throughout vertical space
            solidMesh.position.set(
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.8) * 40 - 10
            );
            
            // Assign random rotations for animation
            solidMesh.userData = {
                rotSpeedX: (Math.random() - 0.5) * 0.01,
                rotSpeedY: (Math.random() - 0.5) * 0.01,
                floatSpeed: Math.random() * 0.002 + 0.001,
                floatPhase: Math.random() * Math.PI * 2,
                baseY: solidMesh.position.y
            };
            
            solidsGroup.add(solidMesh);
            solidsArray.push(solidMesh);
        }

        // 3. CYBER DYNAMIC PLEXUS (Particles connected by lines)
        const particleCount = 150;
        const maxDistance = 8;
        
        const positions = new Float32Array(particleCount * 3);
        const particleData = [];
        
        const particleGroup = new THREE.Group();
        mainGroup.add(particleGroup);

        // Bounding area for plexus
        const pBoundX = 50;
        const pBoundY = 40;
        const pBoundZ = 40;

        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * pBoundX - pBoundX / 2;
            const y = Math.random() * pBoundY - pBoundY / 2;
            const z = Math.random() * pBoundZ - pBoundZ / 2;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            particleData.push({
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.04,
                    (Math.random() - 0.5) * 0.04,
                    (Math.random() - 0.5) * 0.04
                ),
                numConnections: 0
            });
        }

        const particlesGeom = new THREE.BufferGeometry();
        particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: colorSecondary,
            size: 0.25,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const plexusParticles = new THREE.Points(particlesGeom, particleMaterial);
        particleGroup.add(plexusParticles);

        // Dynamic line geometry for linking nodes
        const linePositions = new Float32Array(particleCount * particleCount * 6);
        const lineColors = new Float32Array(particleCount * particleCount * 6);

        const linesGeom = new THREE.BufferGeometry();
        linesGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
        linesGeom.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

        const linesMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.4
        });

        const plexusLines = new THREE.LineSegments(linesGeom, linesMaterial);
        particleGroup.add(plexusLines);

        // 4. SCROLL ANIMATION SYSTEM (GSAP ScrollTrigger)
        // Create smooth continuous scroll logic
        const scrollProxy = { value: 0 };
        
        gsap.to(scrollProxy, {
            value: 1,
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            }
        });

        // Camera Timeline to navigate through digital sections
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 2
            }
        });

        // Define flight path
        tl.to(camera.position, { z: 12, y: 3, x: -5, ease: "power1.inOut" }) // Fly closer/lower in Hero -> About
          .to(camera.rotation, { y: 0.2, z: 0.05, ease: "power1.inOut" }, 0)
          .to(camera.position, { z: 5, y: -2, x: 8, ease: "power1.inOut" }) // Dip through particles in About -> Skills
          .to(camera.rotation, { x: 0.3, y: -0.4, ease: "power1.inOut" }, ">-1")
          .to(camera.position, { z: 18, y: 12, x: 0, ease: "power1.inOut" }) // Elevate high looking down in Skills -> Projects
          .to(camera.rotation, { x: -0.6, y: 0, ease: "power1.inOut" }, ">-1")
          .to(camera.position, { z: 25, y: 1, x: -10, ease: "power1.inOut" }); // Deep back out panoramic in Projects -> Footer

        // Mouse Interaction
        const targetMouse = new THREE.Vector2();
        const currentMouse = new THREE.Vector2();

        const handleMouseMove = (e) => {
            targetMouse.x = (e.clientX / window.innerWidth) - 0.5;
            targetMouse.y = (e.clientY / window.innerHeight) - 0.5;
        };
        document.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        let animationFrameId;
        const clock = new THREE.Clock();

        const animate = () => {
            const time = clock.getElapsedTime();
            
            // 1. Update grid shader
            if (cyberGrid) {
                cyberGrid.material.uniforms.uTime.value = time;
                cyberGrid.material.uniforms.uScroll.value = scrollProxy.value;
            }

            // 2. Update floating components
            solidsArray.forEach(solid => {
                solid.rotation.x += solid.userData.rotSpeedX;
                solid.rotation.y += solid.userData.rotSpeedY;
                solid.position.y = solid.userData.baseY + Math.sin(time * 1.5 + solid.userData.floatPhase) * 2.5;
            });

            // 3. Update Mouse Parallax (Smooth Damping)
            currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
            currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;
            
            mainGroup.rotation.y = currentMouse.x * 0.25;
            mainGroup.rotation.x = -currentMouse.y * 0.15;

            // 4. Update Plexus Mechanics
            let vertexIndex = 0;
            let colorIndex = 0;
            let numConnected = 0;

            const posAttribute = plexusParticles.geometry.attributes.position;

            for (let i = 0; i < particleCount; i++) {
                particleData[i].numConnections = 0;

                // Update particle position
                let px = posAttribute.getX(i) + particleData[i].velocity.x;
                let py = posAttribute.getY(i) + particleData[i].velocity.y;
                let pz = posAttribute.getZ(i) + particleData[i].velocity.z;

                // Bounce bounds
                if (px < -pBoundX / 2 || px > pBoundX / 2) particleData[i].velocity.x = -particleData[i].velocity.x;
                if (py < -pBoundY / 2 || py > pBoundY / 2) particleData[i].velocity.y = -particleData[i].velocity.y;
                if (pz < -pBoundZ / 2 || pz > pBoundZ / 2) particleData[i].velocity.z = -particleData[i].velocity.z;

                posAttribute.setXYZ(i, px, py, pz);
            }
            
            posAttribute.needsUpdate = true;

            // Drawing lines between close nodes
            const linePosAttr = plexusLines.geometry.attributes.position;
            const lineColAttr = plexusLines.geometry.attributes.color;

            for (let i = 0; i < particleCount; i++) {
                const x1 = posAttribute.getX(i);
                const y1 = posAttribute.getY(i);
                const z1 = posAttribute.getZ(i);

                for (let j = i + 1; j < particleCount; j++) {
                    const x2 = posAttribute.getX(j);
                    const y2 = posAttribute.getY(j);
                    const z2 = posAttribute.getZ(j);

                    const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);

                    if (dist < maxDistance) {
                        // Determine line opacity and color blending based on distance
                        const alpha = 1.0 - dist / maxDistance;
                        
                        // Add lines to buffer
                        linePosAttr.setXYZ(vertexIndex++, x1, y1, z1);
                        linePosAttr.setXYZ(vertexIndex++, x2, y2, z2);

                        // Color transition logic: Mix primary and secondary
                        const mixRatio = (x1 + pBoundX/2) / pBoundX;
                        const cNode = colorSecondary.clone().lerp(colorPrimary, mixRatio);
                        
                        lineColAttr.setXYZ(colorIndex++, cNode.r * alpha, cNode.g * alpha, cNode.b * alpha);
                        lineColAttr.setXYZ(colorIndex++, cNode.r * alpha, cNode.g * alpha, cNode.b * alpha);

                        numConnected++;
                    }
                }
            }

            linesGeom.setDrawRange(0, numConnected * 2);
            linePosAttr.needsUpdate = true;
            lineColAttr.needsUpdate = true;

            // Subtle background particle drift inside group
            particleGroup.rotation.y += 0.001;
            
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Handle resizing
        const handleResize = () => {
            if (!camera || !renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener('resize', handleResize);

        // Clean-up
        return () => {
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (tl) tl.kill();
            
            renderer.dispose();
            gridGeometry.dispose();
            gridMaterial.dispose();
            geometries.forEach(g => g.dispose());
            solidsArray.forEach(s => s.material.dispose());
            particlesGeom.dispose();
            particleMaterial.dispose();
            linesGeom.dispose();
            linesMaterial.dispose();
        };
    }, []);

    return <canvas id="bg-canvas" ref={canvasRef}></canvas>;
};

export default Background3D;
