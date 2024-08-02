'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';


export default function Page() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    bio: '',
    designMode: 'fun',
    education: [],
    workExperience: [
      {
        companyName: '',
        designation: '',
        startDate: new Date(),
        endDate: new Date(),
      },
    ],
    skills: '',
    projects: '',
    contact: {
      email: '',
      phone: '',
      linkedIn: '',
      github: '',
      website: '',
    },
    hobbies: '',
    portfolio: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEducationData = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/educations');
      const educationData = response.data.data.map((edu) => ({
        institutionName: edu.attributes.institutionName,
        degree: edu.attributes.degree,
        startDate: new Date(edu.attributes.startDate),
        endDate: new Date(edu.attributes.endDate),
      }));
      setUserDetails((prevState) => ({
        ...prevState,
        education: educationData,
      }));
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };

  useEffect(() => {
    fetchEducationData();
  }, []);

  const handleChange = (e, index, section) => {
    const { name, value } = e.target;
    if (section) {
      const updatedSection = [...userDetails[section]];
      updatedSection[index][name] = value;
      setUserDetails({ ...userDetails, [section]: updatedSection });
    } else if (e.target.dataset.section) {
      const section = e.target.dataset.section;
      setUserDetails({
        ...userDetails,
        [section]: { ...userDetails[section], [name]: value },
      });
    } else {
      setUserDetails({ ...userDetails, [name]: value });
    }
  };

  const handleDateChange = (date, index, section, field) => {
    const updatedSection = [...userDetails[section]];
    updatedSection[index][field] = date;
    setUserDetails({ ...userDetails, [section]: updatedSection });
  };

  const handleAdd = (section) => {
    const newEntry =
      section === 'education'
        ? { institutionName: '', degree: '', startDate: new Date(), endDate: new Date() }
        : { companyName: '', designation: '', startDate: new Date(), endDate: new Date() };
    setUserDetails({ ...userDetails, [section]: [...userDetails[section], newEntry] });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const updatedPortfolio = [...userDetails.portfolio, ...files.map((file) => URL.createObjectURL(file))];
    setUserDetails({ ...userDetails, portfolio: updatedPortfolio });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 2000); 
  };

  const designClasses = {
    fun: 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 text-pink-800',
    professional: 'bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-gray-900',
    tech: 'bg-gradient-to-r from-blue-900 via-blue-600 to-blue-300 text-blue-100',
  };

  const sectionClasses = `shadow-lg rounded-lg p-6 mb-6 ${designClasses[userDetails.designMode]} text-white`;

  useEffect(() => {
    if (submitted) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000); 
    }
  }, [submitted]);

  return (
    <div className={`min-h-screen ${designClasses[userDetails.designMode]} transition-colors duration-500`}>
      {submitted && (
        <nav className="bg-indigo-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">MyPortfolio</div>
            <div className="space-x-4">
              <Link legacyBehavior href="/about">
              <a  className="hover:underline">About</a>
              </Link>
              <Link legacyBehavior href="/portfolio">
              <a  className="hover:underline">Portfolio</a>
              </Link>
              
              <a href="#education" className="hover:underline">Education</a>
              <a href="#work" className="hover:underline">Work</a>
              <a href="#skills" className="hover:underline">Skills</a>
              <a href="#projects" className="hover:underline">Projects</a>
              <a href="#contact" className="hover:underline">Contact</a>
              <a href="#portfolio" className="hover:underline">Portfolio</a>
            </div>
          </div>
        </nav>
      )}
      <div className="p-8">
        {!submitted ? (
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Create Your Portfolio</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={(e) => handleChange(e)}
                  className="w-full px-3 py-2 mb-4 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                <textarea
                  name="bio"
                  value={userDetails.bio}
                  onChange={(e) => handleChange(e)}
                  className="w-full px-3 py-2 mb-4 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Design Mode</label>
                <select
                  name="designMode"
                  value={userDetails.designMode}
                  onChange={(e) => handleChange(e)}
                  className="w-full px-3 py-2 mb-4 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="fun">Fun</option>
                  <option value="professional">Professional</option>
                  <option value="tech">Tech</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Education</label>
                {userDetails.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      name="institutionName"
                      placeholder="Institution Name"
                      value={edu.institutionName}
                      onChange={(e) => handleChange(e, index, 'education')}
                      className="w-full px-3 py-2 mb-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      name="degree"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleChange(e, index, 'education')}
                      className="w-full px-3 py-2 mb-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <div className="flex space-x-4 mb-2">
                      <DatePicker
                        selected={edu.startDate}
                        onChange={(date) => handleDateChange(date, index, 'education', 'startDate')}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <DatePicker
                        selected={edu.endDate}
                        onChange={(date) => handleDateChange(date, index, 'education', 'endDate')}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAdd('education')}
                      className="bg-blue-500 text-white px-3 py-2 rounded-md shadow-sm focus:ring-2                       focus:ring-indigo-500"
                      >
                        Add Education
                      </button>
                    </div>
                  ))}
                </div>
  
                {/* Work Experience Section */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Work Experience</label>
                  {userDetails.workExperience.map((work, index) => (
                    <div key={index} className="mb-4">
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={work.companyName}
                        onChange={(e) => handleChange(e, index, 'workExperience')}
                        className="w-full px-3 py-2 mb-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        value={work.designation}
                        onChange={(e) => handleChange(e, index, 'workExperience')}
                        className="w-full px-3 py-2 mb-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <div className="flex space-x-4 mb-2">
                        <DatePicker
                          selected={work.startDate}
                          onChange={(date) => handleDateChange(date, index, 'workExperience', 'startDate')}
                          className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <DatePicker
                          selected={work.endDate}
                          onChange={(date) => handleDateChange(date, index, 'workExperience', 'endDate')}
                          className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAdd('workExperience')}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                      >
                        Add Work Experience
                      </button>
                    </div>
                  ))}
                </div>
  
                {/* Skills Section */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Skills</label>
                  <textarea
                    name="skills"
                    value={userDetails.skills}
                    onChange={(e) => handleChange(e)}
                    className="w-full px-3 py-2 mb-4 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
  
                {/* Projects Section */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Projects</label>
                  <textarea
                    name="projects"
                    value={userDetails.projects}
                    onChange={(e) => handleChange(e)}
                    className="w-full px-3 py-2 mb-4 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
  
                {/* Contact Section */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Contact</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userDetails.contact.email}
                    onChange={(e) => handleChange(e)}
                    data-section="contact"
                    className="w-full px-3 py-2 mb-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={userDetails.contact.phone}
                    onChange={(e) => handleChange(e)}
                    data-section="contact"
                    className="w-full px-3 py-2 mb-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    name="linkedIn"
                    placeholder="LinkedIn"
                    value={userDetails.contact.linkedIn}
                    onChange={(e) => handleChange(e)}
                    data-section="contact"
                    className="w-full px-3 py-2 mb-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    name="github"
                    placeholder="GitHub"
                    value={userDetails.contact.github}
                    onChange={(e) => handleChange(e)}
                    data-section="contact"
                    className="w-full px-3 py-2 mb-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    name="website"
                    placeholder="Website"
                    value={userDetails.contact.website}
                    onChange={(e) => handleChange(e)}
                    data-section="contact"
                    className="w-full px-3 py-2 mb-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
  
                {/* Hobbies Section */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Hobbies</label>
                  <textarea
                    name="hobbies"
                    value={userDetails.hobbies}
                    onChange={(e) => handleChange(e)}
                    className="w-full px-3 py-2 mb-4 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
  
                {/* Portfolio Section */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Portfolio</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="w-full px-3 py-2 mb-4 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    {userDetails.portfolio.map((image, index) => (
                      <img key={index} src={image} alt="Portfolio" className="w-full h-32 object-cover rounded-md" />
                    ))}
                  </div>
                </div>
  
                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    {loading ? <ClipLoader size={24} color="#fff" /> : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              {loading ? (
                <div className="flex justify-center items-center h-96">
                  <ClipLoader size={48} color="#4A90E2" />
                </div>
              ) : (
                <>
                  {/* About Section */}
                  <section id="about" className={sectionClasses}>
                    <h2 className="text-2xl font-bold mb-4">About Me</h2>
                    <p>{userDetails.bio}</p>
                  </section>
  
                  {/* Education Section */}
                  <section id="education" className={sectionClasses}>
                    <h2 className="text-2xl font-bold mb-4">Education</h2>
                    {userDetails.education.map((edu, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="text-xl font-semibold">{edu.institutionName}</h3>
                        <p>{edu.degree}</p>
                        <p>
                          {edu.startDate.toDateString()} - {edu.endDate.toDateString()}
                        </p>
                      </div>
                    ))}
                  </section>
  
                  {/* Work Section */}
                  <section id="work" className={sectionClasses}>
                    <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
                    {userDetails.workExperience.map((work, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="text-xl font-semibold">{work.companyName}</h3>
                        <p>{work.designation}</p>
                        <p>
                          {work.startDate.toDateString()} - {work.endDate.toDateString()}
                        </p>
                      </div>
                    ))}
                  </section>
  
                  {/* Skills Section */}
                  <section id="skills" className={sectionClasses}>
                    <h2 className="text-2xl font-bold mb-4">Skills</h2>
                    <p>{userDetails.skills}</p>
                  </section>
  
                  {/* Projects Section */}
                  <section id="projects" className={sectionClasses}>
                    <h2 className="text-2xl font-bold mb-4">Projects</h2>
                    <p>{userDetails.projects}</p>
                  </section>
  
                  {/* Contact Section */}
                  <section id="contact" className={sectionClasses}>
                    <h2 className="text                   2xl font-bold mb-4">Contact</h2>
                  <ul>
                    <li>Email: {userDetails.contact.email}</li>
                    <li>Phone: {userDetails.contact.phone}</li>
                    <li>LinkedIn: {userDetails.contact.linkedIn}</li>
                    <li>GitHub: {userDetails.contact.github}</li>
                    <li>Website: {userDetails.contact.website}</li>
                  </ul>
                </section>

                {/* Hobbies Section */}
                <section id="hobbies" className={sectionClasses}>
                  <h2 className="text-2xl font-bold mb-4">Hobbies</h2>
                  <p>{userDetails.hobbies}</p>
                </section>

                {/* Portfolio Section */}
                <section id="portfolio" className={sectionClasses}>
                  <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {userDetails.portfolio.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Portfolio ${index}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </section>

                {/* Submit Success Message */}
                <div className="text-center mt-8">
                  <p className="text-lg font-semibold">Thank you for submitting!</p>
                  <p className="text-sm">Your portfolio has been successfully submitted.</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

  
