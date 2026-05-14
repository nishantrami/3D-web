const Projects = () => {
    return (
        <section className="projects" id="projects">
            <span className="section-tag reveal">Work Showcase</span>
            <h2 className="section-title reveal">Featured <span>Projects</span></h2>

            <div className="projects-grid">
                {/* Portfolio */}
                <div className="project-card reveal">
                    <div className="project-img">
                        <img src="/about-us.jpg.webp" alt="1" />
                    </div>
                    <div className="project-info">
                        <div className="project-tags">
                            <span>HTML</span>
                            <span>CSS</span>
                            <span>JS</span>
                        </div>
                        <h3>E-commerce WEB</h3>
                        <p>A modern e-commerce interface</p>
                        <div className="project-links">
                            <a href="https://e-commerce-web-sooty-alpha.vercel.app/" target="_blank" rel="noreferrer"><i
                                className="fas fa-external-link-alt"></i> Demo</a>
                            <a href="#"><i className="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>

                {/* SMS */}
                <div className="project-card reveal">
                    <div className="project-img">
                        <img src="/download (1).jfif" alt="1" style={{ width: '100%' }} />
                    </div>
                    <div className="project-info">
                        <div className="project-tags">
                            <span>HTML</span>
                            <span>CSS</span>
                            <span>JS</span>
                        </div>
                        <h3>FOOD E-commerce WEB</h3>
                        <p>facilitate online sales of grocerie and specialty foods</p>
                        <div className="project-links">
                            <a href="https://web3-one-tau.vercel.app" target="_blank" rel="noreferrer"><i
                                className="fas fa-external-link-alt"></i> Demo</a>
                            <a href="#"><i className="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '50px' }} className="reveal">
                <a href="#contact" className="btn btn-primary">Start a Project with Me</a>
            </div>
        </section>
    );
};

export default Projects;
