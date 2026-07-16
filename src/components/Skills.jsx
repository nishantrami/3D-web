import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const skillsRef = useRef(null);

    useEffect(() => {
        if (!skillsRef.current) return;

        const skillsSection = skillsRef.current;

        gsap.from('.skill-progress', {
            width: 0,
            duration: 2,
            stagger: 0.2,
            ease: "expo.out",
            scrollTrigger: {
                trigger: skillsSection,
                start: "top 75%",
            }
        });

        const skillItems = skillsSection.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const bar = item.querySelector('.skill-progress');
            const percentText = item.querySelector('.skill-percent');
            const targetWidth = bar.getAttribute('data-width');
            const targetVal = parseInt(targetWidth);

            gsap.to(bar, {
                width: targetWidth,
                scrollTrigger: {
                    trigger: skillsSection,
                    start: "top 75%",
                },
                duration: 2.5,
                ease: "expo.out",
                delay: 0.5,
                onComplete: () => {
                    const featuredClasses = ['js-bar', 'sql-bar', 'git-bar', 'python-bar', 'cpp-bar', 'html-bar', 'react-bar'];
                    if (featuredClasses.some(cls => bar.classList.contains(cls))) {
                        bar.classList.add('pulse');
                    }
                }
            });

            let countObj = { val: 0 };
            gsap.to(countObj, {
                val: targetVal,
                scrollTrigger: {
                    trigger: skillsSection,
                    start: "top 75%",
                },
                duration: 2,
                ease: "expo.out",
                delay: 0.5,
                onUpdate: () => {
                    percentText.textContent = Math.ceil(countObj.val) + "%";
                }
            });
        });

    }, []);

    return (
        <section className="skills" id="skills" ref={skillsRef}>
            <span className="section-tag reveal">My Toolkit</span>
            <h2 className="section-title reveal">Technical <span>Excellence</span></h2>

            <div className="skills-grid">
                <div className="floating-icons">
                    <i className="fab fa-python" style={{ top: '10%', left: '5%' }}></i>
                    <i className="fab fa-js" style={{ top: '40%', left: '2%' }}></i>
                    <i className="fab fa-react" style={{ top: '70%', left: '8%' }}></i>
                    <i className="fas fa-database" style={{ top: '20%', right: '5%' }}></i>
                    <i className="fab fa-git-alt" style={{ top: '50%', right: '3%' }}></i>
                    <i className="fas fa-code" style={{ top: '80%', right: '7%' }}></i>
                </div>
                {/* Programming */}
                <div className="skill-category reveal">
                    <h3>Programming</h3>
                    <div className="skill-list">
                        <div className="skill-item">
                            <div className="skill-info">
                                <span className="skill-name"><i className="fab fa-python" style={{ color: '#3776ab' }}></i> Python</span>
                                <span className="skill-percent">0%</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-progress python-bar" data-width="30%" style={{ width: '0' }}></div>
                            </div>
                        </div>
                        <div className="skill-item">
                            <div className="skill-info">
                                <span className="skill-name"><i className="fas fa-code" style={{ color: '#00599c' }}></i> C / C++</span>
                                <span className="skill-percent">0%</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-progress cpp-bar" data-width="80%" style={{ width: '0' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Web Development */}
                <div className="skill-category reveal">
                    <h3>Web Frontend</h3>
                    <div className="skill-list">
                        <div className="skill-item">
                            <div className="skill-info">
                                <span className="skill-name"><i className="fab fa-html5" style={{ color: '#e34f26' }}></i> HTML / CSS</span>
                                <span className="skill-percent">0%</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-progress html-bar" data-width="95%" style={{ width: '0' }}></div>
                            </div>
                        </div>
                        <div className="skill-item">
                            <div className="skill-info">
                                <span className="skill-name"><i className="fab fa-js" style={{ color: '#f7df1e' }}></i> JavaScript</span>
                                <span className="skill-percent">0%</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-progress js-bar" data-width="85%" style={{ width: '0' }}></div>
                            </div>
                        </div>
                        <div className="skill-item">
                            <div className="skill-info">
                                <span className="skill-name"><i className="fab fa-react" style={{ color: '#61dafb' }}></i> ReactJS</span>
                                <span className="skill-percent">0%</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-progress react-bar" data-width="50%" style={{ width: '0' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tools & Others */}
                <div className="skill-category reveal">
                    <h3>Tools & Tech</h3>
                    <div className="skill-list">

                        <div className="skill-item">
                            <div className="skill-info">
                                <span className="skill-name"><i className="fab fa-git-alt" style={{ color: '#f05032' }}></i> GitHub</span>
                                <span className="skill-percent">0%</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-progress git-bar" data-width="50%" style={{ width: '0' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
