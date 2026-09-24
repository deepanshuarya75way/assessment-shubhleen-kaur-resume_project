import React, { useContext } from 'react';
import user_context from '../../UseContext';

export default function Classic() {
  const { formdata } = useContext(user_context);
  const { 
    personalInfo, 
    education, 
    experiences, 
    projects, 
    certificates, 
    skills, 
    visibleSections, 
    fontSize, 
    lineHeight 
  } = formdata || {};

  const base = fontSize || 16;
  const lh = lineHeight || 1.5;
  const purpleTheme = "#7c4dff";

  // --- DYNAMIC LINK LOGIC ---
  const activeLinks = Object.keys(formdata?.links || {})
    .filter(key => formdata?.links?.[key]?.active && formdata?.links?.[key]?.url)
    .map((key) => {
      const url = formdata?.links?.[key]?.url;
      const displayNames = {
        github: "GitHub",
        linkedin: "LinkedIn",
        website: "Website",
        instagram: "Instagram",
        email: "Email",
        mobile: "Mobile",
        address: "Address"
      };

      if (key === 'email') return <a key={key} href={`mailto:${url}`} style={{color: 'inherit', textDecoration: 'none', wordBreak: "break-all"}}>{url}</a>;
      if (key === 'mobile' || key === 'address') return <span key={key} style={{wordBreak: "break-all"}}>{url}</span>;

      return (
        <a 
          key={key} 
          href={url.startsWith('http') ? url : `https://${url}`} 
          target="_blank" 
          rel="noreferrer" 
          style={{ color: 'inherit', textDecoration: 'none', wordBreak: "break-all" }}
        >
          {displayNames[key] || key.charAt(0).toUpperCase() + key.slice(1)}
        </a>
      );
    });

  const sheetContainer = {
    width: "210mm",
    height: "287mm",
    backgroundColor: "white",
    padding: "10mm 10mm ",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  };

  const styles = {
    nameHeader: {
      fontSize: `${base * 2.2}px`,
      fontWeight: "700",
      color: purpleTheme,
      lineHeight: "1.1",
      textAlign: "center",
      marginBottom: "2px",
      wordBreak: "break-all", 
      overflowWrap: "break-word",
      whiteSpace: "normal" 
    },
    jobTitleHeader: {
      fontSize: `${base * 1.1}px`,
      fontWeight: "600",
      color: "#555",
      textAlign: "center",
      marginBottom: "5px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      wordBreak: "break-word",
      whiteSpace: "normal"
    },
    contactText: {
      fontSize: `${base * 0.8}px`,
      textAlign: 'center',
      color: '#555',
      lineHeight: lh,
      marginBottom: "10px",
      marginLeft: "20px",
      marginRight: "20px",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "4px"
    },
    sectionHeader: {
      fontSize: `${base * 1.05}px`,
      color: purpleTheme,
      fontWeight: "bold",
      borderBottom: "1px solid #e0e0e0",
      paddingBottom: "2px",
      marginBottom: `${lh * 5}px`,
      marginTop: `${lh * 8}px`,
      textTransform: "uppercase"
    },
    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "2px",
      gap: "15px"
    },
    titleWrapper: {
      flex: 1,
      wordBreak: "break-word",
      overflowWrap: "break-word",
      whiteSpace: "normal"
    },
    dateWrapper: {
      flexShrink: 0,
      textAlign: "right",
      minWidth: "100px"
    },
    companySubHeader: {
      fontSize: `${base * 0.85}px`,
      fontStyle: "italic",
      lineHeight: lh,
      margin: "0",
      color: "#444",
      wordBreak: "break-word",
      display: "block",
      width: "100%"
    },
    descriptionText: {
      fontSize: `${base * 0.85}px`,
      lineHeight: lh,
      color: "#333",
      marginTop: "4px",
      display: "block",
      width: "100%",
      wordBreak: "break-word"
    },
    boldLabel: {
      fontSize: `${base * 0.85}px`,
      fontWeight: "bold",
      lineHeight: lh,
      wordBreak: "break-word"
    },
    itemWrapper: {
      marginBottom: `${lh * 6}px`,
    },
    projectLink: {
      fontSize: `${base * 0.75}px`,
      color: "black",
      textDecoration: "none",
      marginLeft: "5px"
    }
  };

  return (
    <div style={sheetContainer}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={styles.nameHeader}>{personalInfo?.fullName || "Your Name"}</h1>
        <p style={styles.jobTitleHeader}>{personalInfo?.title || "Professional Title"}</p>
        <div style={styles.contactText}>
          {activeLinks.length > 0 ? activeLinks.reduce((prev, curr) => [prev, " • ", curr]) : null}
        </div>
      </header>

      <div style={{ borderTop: `1.5px solid ${purpleTheme}`, margin: "5px 0" }}></div>

      <div style={{ flex: 1, width: "100%", display: "block" }}>
        
        {/* SUMMARY */}
        {visibleSections?.summary && personalInfo?.summary && (
          <section style={{ marginBottom: `${lh * 8}px` }}>
            <h2 style={styles.sectionHeader}>Professional Summary</h2>
            <p style={styles.descriptionText}>{personalInfo.summary}</p>
          </section>
        )}

        {/* WORK EXPERIENCE */}
        {visibleSections?.experience && experiences?.length > 0 && (
          <section>
            <h2 style={styles.sectionHeader}>Work Experience</h2>
            {experiences.map((exp, index) => (
              <div key={index} style={styles.itemWrapper}>
                <div style={styles.itemHeader}>
                  <div style={styles.titleWrapper}>
                    <span style={styles.boldLabel}>{exp.role || "Job Role"}</span>
                  </div>
                  <div style={styles.dateWrapper}>
                    <span style={styles.boldLabel}>{exp.startDate} - {exp.endDate || "Present"}</span>
                  </div>
                </div>
                <p style={styles.companySubHeader}>{exp.company || "Company Name"}</p>
                {exp.desc && <p style={styles.descriptionText}>{exp.desc}</p>}
              </div>
            ))}
          </section>
        )}

        {/* EDUCATION */}
        {visibleSections?.education && education?.length > 0 && (
          <section>
            <h2 style={styles.sectionHeader}>Education</h2>
            {education.map((edu, index) => (
              <div key={index} style={styles.itemWrapper}>
                <div style={styles.itemHeader}>
                  <div style={styles.titleWrapper}>
                    <span style={styles.boldLabel}>{edu.degree || "Degree / Major"}</span>
                  </div>
                  <div style={styles.dateWrapper}>
                    <span style={styles.boldLabel}>{edu.startDate} - {edu.endDate}</span>
                  </div>
                </div>
                <p style={{ ...styles.companySubHeader, fontStyle: "normal", fontWeight: 500 }}>{edu.school || "School / University"}</p>
                {edu.description && <p style={styles.descriptionText}>{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* PROJECTS SECTION - FIXED OVERFLOW AND DATE STABILITY */}
        {visibleSections?.projects && projects?.length > 0 && projects[0].title && (
          <section>
            <h2 style={styles.sectionHeader}>Projects</h2>
            {projects.map((proj, index) => (
              <div key={index} style={styles.itemWrapper}>
                <div style={styles.itemHeader}>
                  <div style={styles.titleWrapper}>
                    <span style={{ ...styles.boldLabel, margin: "0" }}>
                      {proj.title}
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" style={styles.projectLink}>
                          (Link)
                        </a>
                      )}
                    </span>
                  </div>
                  {/* Date wrapper for projects if you add dates later */}
                  <div style={styles.dateWrapper}>
                    {proj.startDate && <span style={styles.boldLabel}>{proj.startDate} - {proj.endDate || "Present"}</span>}
                  </div>
                </div>
                <p style={styles.descriptionText}>{proj.desc}</p>
              </div>
            ))}
          </section>
        )}

        {/* CERTIFICATES */}
        {visibleSections?.certificates && certificates?.length > 0 && (
          <section>
            <h2 style={styles.sectionHeader}>Certificates</h2>
            <p style={styles.descriptionText}>{certificates}</p>
          </section>
        )}

        {/* SKILLS */}
        {visibleSections?.skills && skills?.length > 0 && (
          <section>
            <h2 style={styles.sectionHeader}>Skills</h2>
            {skills.map((skillGroup, index) => (
              <p key={index} style={{ ...styles.descriptionText, marginBottom: '2px', marginTop: '0' }}>
                <span style={styles.boldLabel}>{skillGroup.category || "Skills"}: </span>
                {skillGroup.list}
              </p>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}