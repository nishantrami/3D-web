import { useEffect, useState } from 'react';
import CodeGame from './CodeGame';

const Hero = () => {
    const [typedText, setTypedText] = useState('');
    
    useEffect(() => {
        const phrases = ['Full Stack Developer', 'Problem Solver', 'IT Enthusiast'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimeout;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                setTypedText(currentPhrase.substring(0, charIndex - 1));
                charIndex--;
            } else {
                setTypedText(currentPhrase.substring(0, charIndex + 1));
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            
            typingTimeout = setTimeout(type, typeSpeed);
        };
        
        type();
        
        return () => clearTimeout(typingTimeout);
    }, []);

    return (
        <section className="hero" id="home">
            <div className="hero-grid">
                <div className="hero-content">
                    <h2 className="reveal">Welcome to my universe</h2>
                    <h1 className="reveal" id="hero-name">Nishant Rami</h1>
                    <div className="typing-container reveal">
                        <span className="typed-text">{typedText}</span><span className="cursor">&nbsp;</span>
                    </div>
                    <div className="hero-btns reveal" style={{ flexWrap: 'wrap' }}>
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                        <a href="#contact" className="btn btn-secondary">Hire Me</a>
                    </div>
                </div>

                <div className="hero-visual reveal">
                    <CodeGame />
                </div>
            </div>
        </section>
    );
};

export default Hero;
