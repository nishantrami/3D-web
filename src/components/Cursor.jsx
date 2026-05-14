import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = ({ isLoaded }) => {
    const cursorRef = useRef(null);
    const cursorBlurRef = useRef(null);

    useEffect(() => {
        if (!cursorRef.current || !cursorBlurRef.current) return;
        
        // Wait for full DOM load to ensure interactive querySelectors aren't empty
        if (!isLoaded) return;

        // Modern Light Mode theme matching color
        const activeIndigo = "#4f46e5";

        // High-performance buttery smooth tracking via GSAP quickTo
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
        
        const blurXTo = gsap.quickTo(cursorBlurRef.current, "x", { duration: 0.4, ease: "power2.out" });
        const blurYTo = gsap.quickTo(cursorBlurRef.current, "y", { duration: 0.4, ease: "power2.out" });

        // Centering transforms
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
        gsap.set(cursorBlurRef.current, { xPercent: -50, yPercent: -50 });

        // Setup initial cursor styling color matches light mode
        gsap.set(cursorRef.current, { backgroundColor: activeIndigo });

        const handleMouseMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
            blurXTo(e.clientX);
            blurYTo(e.clientY);
        };

        // Successfully query elements AFTER mount + load is complete!
        const interactives = document.querySelectorAll('a, button, .btn, .project-card, .service-card, .skill-category, input, textarea, .back-to-top');
        
        const handleMouseEnter = () => {
            gsap.to(cursorRef.current, {
                scale: 3.5,
                backgroundColor: "transparent",
                border: `1px solid ${activeIndigo}`,
                duration: 0.3
            });
            gsap.to(cursorBlurRef.current, {
                scale: 1.8,
                opacity: 0.6,
                duration: 0.3
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cursorRef.current, {
                scale: 1,
                backgroundColor: activeIndigo,
                border: "none",
                duration: 0.3
            });
            gsap.to(cursorBlurRef.current, {
                scale: 1,
                opacity: 0.3,
                duration: 0.3
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        interactives.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            interactives.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [isLoaded]); // Re-run when fully loaded to attach active listeners!

    return (
        <>
            <div id="cursor" ref={cursorRef} style={{ position: 'fixed', top: 0, left: 0 }}></div>
            <div id="cursor-blur" ref={cursorBlurRef} style={{ position: 'fixed', top: 0, left: 0 }}></div>
        </>
    );
};

export default Cursor;
