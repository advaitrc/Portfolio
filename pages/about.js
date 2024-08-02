import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-bold text-gray-800">Loading...</p>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
          {/* Navigation */}
          <nav className="bg-indigo-600 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-xl font-bold">MyPortfolio</div>
              <div className="space-x-4">
                <a href="#about" className="hover:underline">About</a>
                <a href="#education" className="hover:underline">Education</a>
                <a href="#work" className="hover:underline">Work</a>
                <a href="#skills" className="hover:underline">Skills</a>
                <a href="#projects" className="hover:underline">Projects</a>
                <a href="#contact" className="hover:underline">Contact</a>
                <a href="#portfolio" className="hover:underline">Portfolio</a>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="container mx-auto py-12">
            <div className="max-w-4xl mx-auto px-8">
              {/* About Section */}
              <section id="about" className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold mb-4 text-black">About Me</h2>
                <p className="text-lg text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id hendrerit ante. Vivamus porttitor laoreet elit, sit amet mattis dolor commodo quis.</p>
              </section>

              {/* Education Section */}
              <section id="education" className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold mb-4 text-black">Education</h2>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-black">Shiv Nadar University</h3>
                  <p className="text-lg text-black">Bachelor of Science in Computer Science</p>
                  <p className="text-lg text-black">September 2015 - June 2019</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Lorem Ipsum High School</h3>
                  <p className="text-lg">High School Diploma</p>
                  <p className="text-lg">September 2011 - June 2015</p>
                </div>
              </section>

              {/* Work Experience Section */}
              <section id="work" className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold mb-4 text-black">Work Experience</h2>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-black">Jio</h3>
                  <p className="text-lg text-black">Software Engineer</p>
                  <p className="text-lg text-black">January 2020 - Present</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-black">Startup</h3>
                  <p className="text-lg text-black">Junior Developer</p>
                  <p className="text-lg text-black">July 2019 - December 2019</p>
                </div>
              </section>

              {/* Skills Section */}
              <section id="skills" className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold mb-4 text-black">Skills</h2>
                <ul className="list-disc list-inside text-lg text-black">
                  <li>JavaScript (ES6+)</li>
                  <li>React.js</li>
                  <li>Node.js</li>
                  <li>HTML5 / CSS3</li>
                  <li>UI/UX Design</li>
                </ul>
              </section>

              {/* Projects Section */}
              <section id="projects" className="bg-white rounded-lg shadow-lg p-8 mb-8 text-black">
                <h2 className="text-3xl font-bold mb-4">Projects</h2>
                <p className="text-lg">Here are some of the projects I've worked on:</p>
                <ul className="list-disc list-inside text-lg">
                  <li>E-commerce Website</li>
                  <li>Social Media Analytics Dashboard</li>
                  <li>Online Learning Platform</li>
                </ul>
              </section>

              {/* Contact Section */}
              <section id="contact" className="bg-white rounded-lg shadow-lg p-8 mb-8 text-black">
                <h2 className="text-3xl font-bold mb-4">Contact</h2>
                <ul className="list-disc list-inside text-lg">
                  <li>Email: example@example.com</li>
                  <li>Phone: +1234567890</li>
                  <li>LinkedIn: linkedin.com/in/example</li>
                  <li>GitHub: github.com/example</li>
                  <li>Website: example.com</li>
                </ul>
              </section>

              {/* Portfolio Section */}
              <section id="portfolio" className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold mb-4">Portfolio</h2>
                <div className="grid grid-cols-3 gap-4">
                  <img src="https://via.placeholder.com/300" alt="Portfolio Image" className="w-full h-64 object-cover rounded-lg" />
                  <img src="https://via.placeholder.com/300" alt="Portfolio Image" className="w-full h-64 object-cover rounded-lg" />
                  <img src="https://via.placeholder.com/300" alt="Portfolio Image" className="w-full h-64 object-cover rounded-lg" />
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default About;
