const Contact = () => {
    return (
        <section className="contact" id="contact">
            <div className="contact-container">
                <div className="contact-info">
                    <span className="section-tag reveal">Get in Touch</span>
                    <h2 className="reveal">Let's Work <span>Together</span></h2>
                    <p className="reveal">Available for freelance opportunities and full-time roles. Ready to transform your
                        ideas into high-end digital products.</p>

                    <div className="social-links reveal">
                        <a href="#" className="social-link"><i className="fab fa-github"></i></a>
                        <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="social-link"><i className="fas fa-envelope"></i></a>
                    </div>

                    <div style={{ marginTop: '50px' }} className="reveal">
                        <p style={{ color: 'var(--primary)', fontWeight: '700' }}>Based in India</p>
                        <p style={{ color: 'var(--text-gray)' }}>Looking for remote world-wide projects</p>
                    </div>
                </div>

                <div className="contact-form reveal">
                    <form id="portfolio-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" placeholder="Enter Your Name" required />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="Enter Your Email" required />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea rows="5" placeholder="Enter Your Message" required></textarea>
                        </div>
                        <button type="submit" className="btn-submit">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
