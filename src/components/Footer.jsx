const Footer = () => {
    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 70, behavior: 'smooth' });
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="beast-footer">
            <div className="footer-top-divider"></div>
            
            <div className="footer-grid">
                {/* Column 1: Logo & Branding */}
                <div className="footer-col brand-col">
                    <div className="footer-logo" onClick={handleScrollToTop}>
                        <div className="logo-symbol-wrapper">
                            <span className="logo-symbol-text">NR</span>
                        </div>
                        <div className="logo-text">
                            <span className="logo-text-top">Nishant</span>
                            <span className="logo-text-bottom">RAMI</span>
                        </div>
                    </div>
                    <p className="footer-brand-text">
                        Crafting pixel-perfect interfaces and high-performance scalable full-stack architectures. Focused on precision, aesthetics, and engineering excellence.
                    </p>
                    <div className="footer-socials">
                        <a href="#" aria-label="GitHub" className="f-social-btn"><i className="fab fa-github"></i></a>
                        <a href="#" aria-label="LinkedIn" className="f-social-btn"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" aria-label="Twitter" className="f-social-btn"><i className="fab fa-twitter"></i></a>
                        <a href="#" aria-label="Instagram" className="f-social-btn"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>

                {/* Column 2: Sitemap Links */}
                <div className="footer-col link-col">
                    <h3>Navigation</h3>
                    <ul>
                        <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
                        <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
                        <li><a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
                        <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
                        <li><a href="/NishantRami_CV.pdf" target="_blank" rel="noreferrer">Show CV</a></li>
                        <li><a href="/NishantRami_CV.pdf" download>Download CV</a></li>
                        <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
                    </ul>
                </div>

                {/* Column 3: Tech/Service Stack */}
                <div className="footer-col link-col">
                    <h3>Expertise</h3>
                    <ul>
                        <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Frontend Engineering</a></li>
                        <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>UI/UX Prototyping</a></li>
                        <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Consultancy</a></li>
                    </ul>
                </div>

                {/* Column 4: Direct Contact */}
                <div className="footer-col contact-col">
                    <h3>Get in Touch</h3>
                    <p className="footer-status"><span className="pulse-dot"></span> Available for Work</p>
                    <div className="contact-links">
                        <a href="mailto:nishantrami28@gmail.com" className="footer-email">
                            <i className="far fa-envelope"></i> nishantrami28@gmail.com
                        </a>
                        <p className="footer-loc"><i className="fas fa-map-marker-alt"></i> India (GMT+5:30)</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="copyright-container">
                    <p className="copyright">© 2026 <span>Nishant Rami</span>. Built with precision.</p>
                </div>
                <button onClick={handleScrollToTop} className="back-to-top" aria-label="Back to top">
                    Back to Top <i className="fas fa-arrow-up"></i>
                </button>
            </div>
        </footer>
    );
};

export default Footer;
