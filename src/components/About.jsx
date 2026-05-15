import profileImg from '../assets/profile.png';

const About = () => {
    return (
        <section className="about" id="about">
            <span className="section-tag reveal">Introduction</span>
            <h2 className="section-title reveal">About <span>Me</span></h2>

            <div className="about-grid">
                <div className="about-text reveal">
                    <p>I am a passionate Full Stack Developer dedicated to creating modern, responsive, and high-performance web applications. My journey in the IT field started with a strong interest in technology, creativity, and problem-solving.</p>
                    <p>With expertise in technologies like JavaScript, Python, React, HTML, and CSS, I focus on building seamless and user-friendly digital experiences. I enjoy transforming ideas into visually engaging and functional web solutions.</p>

                    <div className="about-info">
                        <div className="info-item">
                            <h4>Education</h4>
                            <p>Diploma in IT, GP Himmatnagar</p>
                        </div>
                        <div className="info-item">
                            <h4>Role</h4>
                            <p>Full Stack Developer</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <a href="/NishantRami_CV.pdf" className="btn btn-secondary" download><i
                            className="fas fa-download"></i> Download CV</a>
                        <a href="/NishantRami_CV.pdf" target="_blank" rel="noreferrer" className="btn btn-primary"><i
                            className="fas fa-eye"></i> Show CV</a>
                    </div>
                </div>

                <div className="reveal about-img-container">
                    <div className="profile-frame">
                        <img src={profileImg} alt="Nishant Rami Profile"
                            className="profile-img" />
                        <div className="frame-glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
