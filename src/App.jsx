import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Initialize general reveal animations once everything is loaded
        if (loaded) {
            gsap.utils.toArray('.reveal').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });

            // Global Ambient Light Follower
            const handleGlobalMouseMove = (e) => {
                document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
                document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
            };
            document.addEventListener('mousemove', handleGlobalMouseMove);

            // 3D Tilt for all Cards
            const cards = document.querySelectorAll('.project-card, .service-card, .skill-category');
            
            const handleCardMouseMove = (e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20; // More pronounced tilt
                const rotateY = (centerX - x) / 20;
                
                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    translateY: -12,
                    scale: 1.02,
                    duration: 0.4,
                    ease: "power1.out"
                });

                // High-end modern dynamic light mode double glare
                card.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(79, 70, 229, 0.08), rgba(2, 132, 199, 0.04) 50%, transparent 80%)`;
                card.style.borderColor = 'rgba(79, 70, 229, 0.3)';
            };

            const handleCardMouseLeave = (e) => {
                const card = e.currentTarget;
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    translateY: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });
                card.style.backgroundImage = 'none';
                card.style.borderColor = 'rgba(15, 23, 42, 0.08)'; // Default light mode border
            };

            cards.forEach(card => {
                card.addEventListener('mousemove', handleCardMouseMove);
                card.addEventListener('mouseleave', handleCardMouseLeave);
            });

            return () => {
                document.removeEventListener('mousemove', handleGlobalMouseMove);
                cards.forEach(card => {
                    card.removeEventListener('mousemove', handleCardMouseMove);
                    card.removeEventListener('mouseleave', handleCardMouseLeave);
                });
            };
        }
    }, [loaded]);

    return (
        <>
            <Cursor isLoaded={loaded} />
            {/* <Background3D /> */}
            <Loader onLoaded={() => setLoaded(true)} />

            {loaded && (
                <>
                    <Navbar />
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Services />
                    <Contact />
                    <Footer />
                </>
            )}
        </>
    );
}

export default App;
