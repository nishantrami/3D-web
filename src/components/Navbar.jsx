import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 70, behavior: 'smooth' });
        }
    };

    return (
        <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
            <div className="logo" onClick={(e) => handleNavClick(e, '#home')}>
                <div className="logo-symbol-wrapper">
                    <span className="logo-symbol-text">NR</span>
                </div>
                <div className="logo-text">
                    <span className="logo-text-top">Nishant</span>
                    <span className="logo-text-bottom">RAMI</span>
                </div>
            </div>
            <ul className="nav-links">
                <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
                <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
                <li><a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
                <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
                <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a></li>
                <li className="nav-dropdown">
                    <span className="dropdown-trigger">CV <i className="fas fa-chevron-down"></i></span>
                    <div className="dropdown-menu">
                        <a href="/NishantRami_CV.pdf" target="_blank" rel="noreferrer">
                            <i className="fas fa-eye"></i> Show CV
                        </a>
                        <a href="/NishantRami_CV.pdf" download>
                            <i className="fas fa-download"></i> Download CV
                        </a>
                    </div>
                </li>
                <li><a href="#contact" className="cta-nav" onClick={(e) => handleNavClick(e, '#contact')}>Hire Me</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
