const Services = () => {
    return (
        <section className="services" id="services">
            <span className="section-tag reveal">What I Do</span>


            <div className="services-grid">
                <div className="service-card reveal">
                    <div className="service-icon"><i className="fas fa-desktop"></i></div>
                    <h3>Frontend Design</h3>
                    <p>Creating visually stunning, responsive interfaces with a focus on modern UX/UI trends and high-end
                        animations.</p>
                </div>
                <div className="service-card reveal">
                    <div className="service-icon"><i className="fas fa-bug"></i></div>
                    <h3>Optimization</h3>
                    <p>Enhancing existing codebases for speed, fixing complex bugs, and optimizing database performance.</p>
                </div>
                <div className="service-card reveal">
                    <div className="service-icon"><i className="fas fa-code"></i></div>
                    <h3>Full Stack Dev</h3>
                    <p>Providing end-to-end development solutions from initial wireframing to production deployment.</p>
                </div>
            </div>
        </section>
    );
};

export default Services;
