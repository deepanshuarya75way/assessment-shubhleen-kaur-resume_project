import React, { useContext } from 'react';
import user_context from '../../UseContext';

export default function Minimal() {
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
  const themeGrey = "#e0e0e0";

  // --- LINK LOGIC ---
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

  const styles = {
    sheetContainer: {
      width: "210mm",
      height: "297mm",
      // padding: "0mm 0mm  10mm 0mm",
      // paddingBottom: "10mm",
      backgroundColor: "white",
      boxSizing: "border-box",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      fontFamily: "'Inter', sans-serif"
    },
    headerBanner: {
      backgroundColor: themeGrey,
      padding: `${base * 2}px 20px`,
      textAlign: "center",
      borderBottom: "1px solid #ccc"
    },
    nameHeader: {
      fontSize: `${base * 2.2}px`,
      fontWeight: "900",
      letterSpacing: "2px",
      margin: 0,
      color: "#333",
      textTransform: "uppercase",
      wordBreak: "break-all", 
      overflowWrap: "break-word",
      whiteSpace: "normal" 
    },
    jobTitleHeader: {
      fontSize: `${base * 1.1}px`,
      margin: "10px 0 0 0",
      color: "#666",
      textTransform: "uppercase",
      letterSpacing: "1px",
      wordBreak: "break-word",
      whiteSpace: "normal"
    },
    contactBar: {
      display: "flex",
      justifyContent: "center",
      // FIX: Added flexWrap to allow wrapping and wordBreak for long strings
      flexWrap: "wrap", 
      wordBreak: "break-all",
      gap: "10px",
      padding: "15px 20px",
      borderBottom: "1px solid #eee",
      fontSize: `${base * 0.7}px`,
      color: "#444",
      // Ensure the container doesn't overflow its parent
      maxWidth: "100%",
      boxSizing: "border-box"
    },
    contentPadding: {
      padding: "10px 40px",
      flex: 1
    },
    sectionTitleBar: {
      backgroundColor: themeGrey,
      padding: "8px 15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: `${lh * 5}px`,
      marginTop: `${lh * 8}px`,
      borderRadius: "2px"
    },
    sectionTitle: {
      fontSize: `${base * 0.85}px`,
      fontWeight: "bold",
      margin: 0,
      color: "#333",
      letterSpacing: "1px",
      textTransform: "uppercase"
    },
    bodyText: {
      fontSize: `${base * 0.8}px`,
      lineHeight: lh,
      color: "#444",
      wordBreak: "break-word",
      whiteSpace: "pre-wrap"
    },
    boldLabel: {
    fontSize: `${base * 0.85}px`,
    fontWeight: "bold",
    color: "#222",
    wordBreak: "break-word"
  },
    itemWrapper: {
      marginBottom: `${lh * 10}px`
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
    // FIX: Force long project titles to wrap
    wordBreak: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "normal"
  },
  dateWrapper: {
    flexShrink: 0, // FIX: Keeps dates from disappearing
    textAlign: "right",
    minWidth: "100px",
    fontSize: `${base * 0.8}px`,
    color: "#444"
  },
    subHeader: {
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
    fontSize: `${base * 0.8}px`,
    lineHeight: lh,
    color: "#444",
    marginTop: "4px",
    // FIX: Spans full width under the date
    display: "block",
    width: "100%",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap"
  },
    projectLink: {
      fontSize: `${base * 0.7}px`,
      color: "#333",
      textDecoration: "underline",
      marginLeft: "5px"
    },
    bottomBanner: {
      width: "100%",
      height: "15px",
      backgroundColor: themeGrey
    }
  };

  return (
    <div style={styles.sheetContainer}>
      <header style={styles.headerBanner}>
        <h1 style={styles.nameHeader}>{personalInfo?.fullName || "YOUR NAME"}</h1>
        <p style={styles.jobTitleHeader}>{personalInfo?.title || "PROFESSIONAL TITLE"}</p>
      </header>

      <div style={styles.contactBar}>
        {activeLinks.length > 0 ? activeLinks.reduce((prev, curr) => [prev, " | ", curr]) : "Contact Information"}
      </div>

      <div style={styles.contentPadding}>
        {visibleSections?.summary && personalInfo?.summary && (
          <section>
            <div style={styles.sectionTitleBar}>
              <h2 style={styles.sectionTitle}>Profile Summary</h2>
            </div>
            <p style={styles.descriptionText}>{personalInfo.summary}</p>
          </section>
        )}

        {visibleSections?.experience && experiences?.length > 0 && (
          <section>
            <div style={styles.sectionTitleBar}>
              <h2 style={styles.sectionTitle}>Work Experience</h2>
            </div>
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
                <p style={styles.subHeader}>{exp.company || "Company Name"}</p>
                {exp.desc && <p style={styles.descriptionText}>{exp.desc}</p>}
              </div>
            ))}
          </section>
        )}

        {visibleSections?.education && education?.length > 0 && (
          <section>
            <div style={styles.sectionTitleBar}>
              <h2 style={styles.sectionTitle}>Education</h2>
            </div>
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
                <p style={{ ...styles.subHeader, fontStyle: "normal", fontWeight: 500 }}>{edu.school || "School / University"}</p>
                {edu.description && <p style={styles.descriptionText}>{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {visibleSections?.projects && projects?.length > 0 && projects[0].title && (
  <section>
    <div style={styles.sectionTitleBar}>
      <h2 style={styles.sectionTitle}>Projects</h2>
    </div>
    {projects.map((proj, index) => (
      <div key={index} style={styles.itemWrapper}>
        {/* NEW HEADER WRAPPER FOR TITLE AND DATE */}
        <div style={styles.itemHeader}>
          <div style={styles.titleWrapper}>
            <p style={{ ...styles.boldLabel, margin: "0" }}>
              {proj.title}
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer" style={styles.projectLink}>
                  (Link)
                </a>
              )}
            </p>
          </div>
          
        </div>
        
        {/* Description stays outside to use full page width */}
        <p style={styles.descriptionText}>{proj.desc}</p>
      </div>
    ))}
  </section>
)}

        {visibleSections?.certificates && certificates?.length > 0 && (
          <section>
            <div style={styles.sectionTitleBar}>
              <h2 style={styles.sectionTitle}>Certificates</h2>
            </div>
            <p style={styles.descriptionText}>{certificates}</p>
          </section>
        )}

        {visibleSections?.skills && skills?.length > 0 && (
          <section>
            <div style={styles.sectionTitleBar}>
              <h2 style={styles.sectionTitle}>Skills</h2>
            </div>
            {skills.map((skillGroup, index) => (
              <p key={index} style={{ ...styles.descriptionText, marginBottom: '2px', marginTop: '0' }}>
                <span style={styles.boldLabel}>{skillGroup.category || "Skills"}: </span>
                {skillGroup.list}
              </p>
            ))}
          </section>
        )}
      </div>

      <div style={styles.bottomBanner}></div>
    </div>
  );
}