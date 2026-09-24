import React, { useContext, useEffect, useState, useRef } from 'react'
import "./Resumeedit.css"
import { useSearchParams } from 'react-router-dom'
import { Template_components } from './Templateregistry'
import user_context from '../../../UseContext'
import jsPDF from "jspdf";

const Resumeedit = () => {
  const { formdata, setformdata } = useContext(user_context)
  const [param] = useSearchParams()
  const template = param.get('template')
  const Selectedtemplate = Template_components[template]

  // --- NEW STATE: Font Size Control ---
  const [fontSize, setFontSize] = useState(16);

  // --- NEW STATE: Section Visibility Control ---
  const [visibleSections, setVisibleSections] = useState({
    summary: true,
    education: true,
    experience: true,
    projects: true,
    certificates: true,
    skills: true
  });

  const toggleSectionVisibility = (section) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


  // --- NEW STATE: Line Height Control ---
const [lineHeight, setLineHeight] = useState(1.5); // Default is 1.5

// Handlers
const increaseLineHeight = () => setLineHeight(prev => Math.min(2.5, prev + 0.1));
const decreaseLineHeight = () => setLineHeight(prev => Math.max(1.0, prev - 0.1));


 // --- PRE-FILLED STATE: Dummy Data ---
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Johnathan Doe',
    title: 'Senior Full Stack Developer',
    summary: 'Innovative and detail-oriented developer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud architecture, with a proven track record of improving site performance by 40%.'
  });

  const [links, setLinks] = useState({
    email: { active: true, url: 'john.doe@example.com' },
    mobile: { active: true, url: '+1 (555) 000-1234' },
    address: { active: true, url: 'San Francisco, CA' },
    github: { active: true, url: 'github.com/johndoe' },
    linkedin: { active: true, url: 'linkedin.com/in/johndoe' },
    website: { active: true, url: 'johndoe.dev' },
    instagram: { active: false, url: '' },
  });

  const [education, setEducation] = useState([
    { 
      school: 'Stanford University', 
      degree: 'B.S. in Computer Science', 
      startDate: '2014', 
      endDate: '2018', 
      description: 'Graduated with Honors. Specialized in AI and Distributed Systems.' 
    }
  ]);

  const [experiences, setExperiences] = useState([
    { 
      company: 'Tech Solutions Inc.', 
      role: 'Senior Developer', 
      startDate: 'Jan 2021', 
      endDate: 'Present', 
      desc: 'Led a team of 5 developers to rebuild the core e-commerce platform using React and GraphQL.' 
    },
    { 
      company: 'StartUp Hub', 
      role: 'Junior Web Developer', 
      startDate: 'June 2018', 
      endDate: 'Dec 2020', 
      desc: 'Implemented responsive UI components and integrated RESTful APIs.' 
    }
  ]);

  const [projects, setProjects] = useState([
    { 
      title: 'AI Portfolio Builder', 
      link: 'https://github.com/johndoe/ai-builder', 
      desc: 'An automated tool that uses LLMs to generate professional portfolios from LinkedIn profiles.' 
    }
  ]);

const [certificates, setCertificates] = useState('AWS Certified Solutions Architect, Google Professional Cloud Developer');

const [skills, setSkills] = useState([
  { category: 'Technical Skills', list: 'React, JavaScript, TypeScript, Node.js' }
]);
  // Font Handlers
  const increaseFontSize = () => setFontSize(prev => prev + 1);
  const decreaseFontSize = () => setFontSize(prev => Math.max(8, prev - 1));

  const addEducation = () => setEducation([...education, { school: '', degree: '', startDate: '', endDate: '', description: '' }]);
  const addExperience = () => setExperiences([...experiences, { company: '', role: '', startDate: '', endDate: '', desc: '' }]);
  const addProject = () => setProjects([...projects, { title: '', link: '', desc: '' }]);
  const addSkillGroup = () => setSkills([...skills, { category: '', list: '' }]);

  const removeEducation = (index) => setEducation(education.filter((_, i) => i !== index));
  const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));
  const removeProject = (index) => setProjects(projects.filter((_, i) => i !== index));
  const removeSkillGroup = (index) => setSkills(skills.filter((_, i) => i !== index));

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const toggleLink = (platform) => {
    setLinks(prev => ({
      ...prev,
      [platform]: { ...prev[platform], active: !prev[platform].active }
    }));
  };

  const handleLinkChange = (platform, value) => {
    setLinks(prev => ({
      ...prev,
      [platform]: { ...prev[platform], url: value }
    }));
  };

  const handleSkillChange = (index, field, value) => {
  const newSkills = skills.map((item, i) => 
    i === index ? { ...item, [field]: value } : item
  );
  setSkills(newSkills);
};

  useEffect(() => {
    setformdata({
      personalInfo,
      links,
      education,
      experiences,
      projects,
      certificates,
      skills,
      template,
      fontSize,
      visibleSections,
      lineHeight
    });
  }, [personalInfo, links, education, experiences, projects, certificates, skills, template, fontSize, visibleSections,lineHeight]);

  const contentRef = useRef();

 const downloadPDF = async () => {
  const element = contentRef.current;
  if (!element) return;

  element.classList.add('pdf-export-mode');

  const pdf = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4"
  });

  try {
    await pdf.html(element, {
      x: 0,
      y: 0,
      width: 210,
      windowWidth: 794,
      
      // FIX: Hard stop after the first page (297mm)
      autoPaging: false, 
      
      margin: [0, 0, 0, 0], // CSS padding handles the 10mm margin
      callback: function (doc) {
        doc.save("Resume.pdf");
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
  } finally {
    element.classList.remove('pdf-export-mode');
  }
};

  return (
    <div className='edit-container'>
      <div className='edit-left'>
        <div className="scroll-wrapper">
          
          {/* FONT CONTROL SECTION */}
          <div className='form-section'>
            <h2>Adjust Font Size</h2>
            <div className='font-controls-wrapper'>
              <button className='font-adjust-btn' onClick={decreaseFontSize}>A-</button>
              <span className='font-size-label'>{fontSize}px</span>
              <button className='font-adjust-btn' onClick={increaseFontSize}>A+</button>
            </div>
          </div>
          <div className='form-section'>
  <h2>Adjust Line Spacing</h2>
  <div className='font-controls-wrapper'>
    <button className='font-adjust-btn' onClick={decreaseLineHeight}>↕-</button>
    <span className='font-size-label'>{lineHeight.toFixed(1)}</span>
    <button className='font-adjust-btn' onClick={increaseLineHeight}>↕+</button>
  </div>
</div>

          <div className='form-section'>
            <h2>Personal details</h2>
            <div className='info-inputs'>
              <label>Full name</label>
              <input type="text" name="fullName" placeholder='e.g. John Doe'  onChange={handlePersonalChange} />
              <label>Title</label>
              <input type="text" name="title" placeholder='e.g. Full Stack Developer' onChange={handlePersonalChange} />
              <label style={{marginTop: '15px'}}>Contact & Social Links</label>
              <div className='link-buttons-container'>
                {Object.keys(links).map(platform => (
                  <button key={platform} type="button" className={`link-toggle-btn ${links[platform].active ? 'active' : ''}`} onClick={() => toggleLink(platform)}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </button>
                ))}
              </div>
              <div className='active-link-inputs'>
                {Object.keys(links).map(platform => (
                  links[platform].active && (
                    <div key={platform} className="fade-in">
                      <label className='active-link-label'>{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
                      <input type="text" placeholder={platform === 'email' ? 'e.g. hello@site.com' : platform === 'mobile' ? 'e.g. +91 98765 43210' : platform === 'address' ? 'e.g. Jalandhar, Punjab' : `Paste ${platform} link here...`}  onChange={(e) => handleLinkChange(platform, e.target.value)} />
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          <div className='form-section'>
            <div className="section-header-toggle">
              <h2>Professional Summary</h2>
              <button 
                className={`visibility-toggle ${visibleSections.summary ? 'active' : 'hidden'}`} 
                onClick={() => toggleSectionVisibility('summary')}
              >
                {visibleSections.summary ? "Exclude Section" : "Include Section"}
              </button>
            </div>
            {visibleSections.summary && (
              <div className='info-inputs'>
                <textarea name="summary" placeholder='Write a short professional bio...' rows={4}  onChange={handlePersonalChange}></textarea>
              </div>
            )}
          </div>

          <div className='form-section'>
            <div className="section-header-toggle">
              <h2>Education</h2>
              <button 
                className={`visibility-toggle ${visibleSections.education ? 'active' : 'hidden'}`} 
                onClick={() => toggleSectionVisibility('education')}
              >
                {visibleSections.education ? "Exclude Section" : "Include Section"}
              </button>
            </div>
            {visibleSections.education && (
              <>
                {education.map((edu, index) => (
                  <div key={index} className='info-inputs dynamic-item'>
                    <div className='section-item-header'>
                      <label>Education #{index + 1}</label>
                      {education.length > 1 && (
                        <button type="button" className='remove-btn' onClick={() => removeEducation(index)}>Remove</button>
                      )}
                    </div>
                    <input type="text" placeholder='School / University'  onChange={(e) => setEducation(education.map((item, i) => i === index ? {...item, school: e.target.value} : item))} />
                    <input type="text" placeholder='Degree / Major'  onChange={(e) => setEducation(education.map((item, i) => i === index ? {...item, degree: e.target.value} : item))} />
                    <div className='row-inputs'>
                      <input type="text" placeholder='Start Date'  onChange={(e) => setEducation(education.map((item, i) => i === index ? {...item, startDate: e.target.value} : item))} />
                      <input type="text" placeholder='End Date'  onChange={(e) => setEducation(education.map((item, i) => i === index ? {...item, endDate: e.target.value} : item))} />
                    </div>
                    <textarea placeholder='Description (GPA, honors, etc.)' rows={2}  onChange={(e) => setEducation(education.map((item, i) => i === index ? {...item, description: e.target.value} : item))}></textarea>
                    {index !== education.length - 1 && <hr className='divider' />}
                  </div>
                ))}
                <button className='add-btn' onClick={addEducation}>+ Add Education</button>
              </>
            )}
          </div>



          <div className='form-section'>
            <div className="section-header-toggle">
              <h2>Work Experience</h2>
              <button 
                className={`visibility-toggle ${visibleSections.experience ? 'active' : 'hidden'}`} 
                onClick={() => toggleSectionVisibility('experience')}
              >
                {visibleSections.experience ? "Exclude Section" : "Include Section"}
              </button>
            </div>
            {visibleSections.experience && (
              <>
                {experiences.map((exp, index) => (
                  <div key={index} className='info-inputs dynamic-item'>
                    <div className='section-item-header'>
                      <label>Experience #{index + 1}</label>
                      {experiences.length > 1 && (
                        <button type="button" className='remove-btn' onClick={() => removeExperience(index)}>Remove</button>
                      )}
                    </div>
                    <input type="text" placeholder='Company Name'  onChange={(e) => setExperiences(experiences.map((item, i) => i === index ? {...item, company: e.target.value} : item))} />
                    <input type="text" placeholder='Role'  onChange={(e) => setExperiences(experiences.map((item, i) => i === index ? {...item, role: e.target.value} : item))} />
                    <div className='row-inputs'>
                      <input type="text" placeholder='Start Date'  onChange={(e) => setExperiences(experiences.map((item, i) => i === index ? {...item, startDate: e.target.value} : item))} />
                      <input type="text" placeholder='End Date' onChange={(e) => setExperiences(experiences.map((item, i) => i === index ? {...item, endDate: e.target.value} : item))} />
                    </div>
                    <textarea placeholder='Work description...' rows={2}  onChange={(e) => setExperiences(experiences.map((item, i) => i === index ? {...item, desc: e.target.value} : item))}></textarea>
                    {index !== experiences.length - 1 && <hr className='divider' />}
                  </div>
                ))}
                <button className='add-btn' onClick={addExperience}>+ Add Experience</button>
              </>
            )}
          </div>

          <div className='form-section'>
            <div className="section-header-toggle">
              <h2>Projects</h2>
              <button 
                className={`visibility-toggle ${visibleSections.projects ? 'active' : 'hidden'}`} 
                onClick={() => toggleSectionVisibility('projects')}
              >
                {visibleSections.projects ? "Exclude Section" : "Include Section"}
              </button>
            </div>
            {visibleSections.projects && (
              <>
                {projects.map((proj, index) => (
                  <div key={index} className='info-inputs dynamic-item'>
                    <div className='section-item-header'>
                      <label>Project #{index + 1}</label>
                      {projects.length > 1 && (
                        <button type="button" className='remove-btn' onClick={() => removeProject(index)}>Remove</button>
                      )}
                    </div>
                    <input type="text" placeholder='Project Title'  onChange={(e) => setProjects(projects.map((item, i) => i === index ? {...item, title: e.target.value} : item))} />
                    <input type="text" placeholder='Link (Optional)'  onChange={(e) => setProjects(projects.map((item, i) => i === index ? {...item, link: e.target.value} : item))} />
                    <textarea placeholder='Project details...' rows={2}  onChange={(e) => setProjects(projects.map((item, i) => i === index ? {...item, desc: e.target.value} : item))}></textarea>
                    {index !== projects.length - 1 && <hr className='divider' />}
                  </div>
                ))}
                <button className='add-btn' onClick={addProject}>+ Add Project</button>
              </>
            )}
          </div>

          {/* SIMPLIFIED CERTIFICATES SECTION */}
          <div className='form-section'>
            <div className="section-header-toggle">
              <h2>Certificates</h2>
              <button className={`visibility-toggle ${visibleSections.certificates ? 'active' : 'hidden'}`} onClick={() => toggleSectionVisibility('certificates')}>
                {visibleSections.certificates ? "Exclude Section" : "Include Secction"}
              </button>
            </div>
            {visibleSections.certificates && (
              <div className='info-inputs'>
                <input type="text" placeholder='e.g. AWS Certified, PMP, Meta Front-End' onChange={(e) => setCertificates(e.target.value)} />
                <p className='hint'>Separate with commas</p>
              </div>
            )}
          </div>

          <div className='form-section'>
  <div className="section-header-toggle">
    <h2>Skills Groups</h2>
    <button 
      className={`visibility-toggle ${visibleSections.skills ? 'active' : 'hidden'}`} 
      onClick={() => toggleSectionVisibility('skills')}
    >
      {visibleSections.skills ? "Exclude Section" : "Include Section"}
    </button>
  </div>
  
  {visibleSections.skills && (
    <>
      {skills.map((skillGroup, index) => (
        <div key={index} className='info-inputs dynamic-item'>
          <div className='section-item-header'>
            <label>Group #{index + 1}</label>
            {skills.length > 1 && (
              <button type="button" className='remove-btn' onClick={() => removeSkillGroup(index)}>Remove Group</button>
            )}
          </div>
          <input 
            type="text" 
            placeholder='Heading (e.g. Frontend)' 
             
            onChange={(e) => handleSkillChange(index, 'category', e.target.value)} 
          />
          <input 
            type="text" 
            placeholder='Skills (comma separated)' 
            onChange={(e) => handleSkillChange(index, 'list', e.target.value)} 
          />
          {index !== skills.length - 1 && <hr className='divider' />}
        </div>
      ))}
      <button className='add-btn' onClick={addSkillGroup}>+ Add Skill Group</button>
    </>
  )}
</div>

          <div className="resume-container">
            <div className="top-bar">
              <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
            </div>
          </div>    
        </div>
      </div>


      

      <div className='edit-right'>
        {/* Dynamic font size applied here via inline style */}
        <div 
          ref={contentRef} 
          className='template-show' 
          style={{ fontSize: `${fontSize}px` }}
        >
          {Selectedtemplate ? (<Selectedtemplate />) : (<div>Template not found</div>)}
        </div>
      </div>
    </div>
  )
}

export default Resumeedit;