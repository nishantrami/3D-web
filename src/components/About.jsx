import profileImg from '../assets/profile.png';

const About = () => {
    return (
        <section className="about" id="about">
            <span className="section-tag reveal">Introduction</span>
            <h2 className="section-title reveal">About <span>Me</span></h2>

            <div className="about-grid">
                <div className="about-text reveal">
                    <p>I am a passionate Full Stack Developer with a deep focus on creating high-performance, scalable web
                        applications. My journey in the IT world began with a solid foundation in software architecture and
                        modern development practices.</p>
                    <p>Leveraging my expertise in Python and JavaScript, I bridge the gap between complex backend logic and
                        intuitive frontend experiences. I don't just write code; I build digital solutions that solve
                        real-world problems.</p>

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
