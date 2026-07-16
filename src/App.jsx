import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loader';
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

            return () => {
                document.removeEventListener('mousemove', handleGlobalMouseMove);
            };
        }
    }, [loaded]);

    return (
        <>
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
