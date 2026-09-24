import React, { useContext } from 'react';
import user_context from '../../UseContext';

export default function Simple() {
  const { formdata } = useContext(user_context);

  const {
    personalInfo,
    education,
    experiences,
    skills,
    visibleSections,
    fontSize,
    lineHeight,
    links
  } = formdata || {};

  const base = fontSize || 14;
  const lh = lineHeight || 1.4;
  const donnaBlue = "#4a90e2";

  // ✅ SAME LOGIC AS CLASSIC (DYNAMIC LINKS)
  const activeLinks = Object.keys(links || {})
    .filter(key => links?.[key]?.active && links?.[key]?.url)
    .map((key) => {
      const url = links[key].url;

      if (key === 'email') return url;
      if (key === 'mobile' || key === 'address') return url;

      return url;
    });

  const sheetContainer = {
    width: "210mm",
    height: "297mm",
    backgroundColor: "white",
    padding: "15mm",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    color: "#333"
  };

  const styles = {
    nameHeader: {
      fontSize: `${base * 2.8}px`,
      fontWeight: "400",
      color: donnaBlue,
      textTransform: "uppercase",
      letterSpacing: "2px",
      marginBottom: "4px",
      wordBreak: "break-word"
    },
    jobTitle: {
      fontSize: `${base * 1.2}px`,
      color: "#555",
      textTransform: "uppercase",
      letterSpacing: "3px",
      marginBottom: "15px",
      wordBreak: "break-word"
    },
    headerContact: {
      fontSize: `${base * 0.8}px`,
      borderTop: "1px solid #ccc",
      borderBottom: "1px solid #ccc",
      padding: "8px 0",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap", // ✅ prevents overflow
      gap: "10px",
      color: "#666",
      marginBottom: "25px"
    },
    sectionTitle: {
      fontSize: `${base * 1.1}px`,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#222",
      marginBottom: "15px",
      letterSpacing: "1px"
    },
    sidebarItem: {
      marginBottom: "20px"
    },
    sidebarLabel: {
      fontSize: `${base * 0.9}px`,
      fontWeight: "700",
      color: "#444",
      wordBreak: "break-word"
    },
    sidebarSub: {
      fontSize: `${base * 0.8}px`,
      color: "#666",
      marginBottom: "10px",
      wordBreak: "break-word"
    },
    mainContentItem: {
      marginBottom: "25px"
    },
    expDate: {
      fontSize: `${base * 0.9}px`,
      color: "#888",
      marginBottom: "2px"
    },
    expTitle: {
      fontSize: `${base * 1}px`,
      fontWeight: "700",
      color: "#333",
      wordBreak: "break-word"
    },
    bulletList: {
      paddingLeft: "18px",
      marginTop: "5px",
      fontSize: `${base * 0.85}px`,
      color: "#444",
      lineHeight: lh
    }
  };

  return (
    <div style={sheetContainer}>
      
      {/* HEADER */}
      <header>
        <h1 style={styles.nameHeader}>
          {personalInfo?.fullName || "DONNA STROUPE"}
        </h1>

        <p style={styles.jobTitle}>
          {personalInfo?.title || "SALES REPRESENTATIVE"}
        </p>

        <div style={styles.headerContact}>
          {/* ✅ Dynamic Links instead of static */}
          {activeLinks.length > 0
            ? activeLinks.map((link, i) => (
                <span key={i}>{link}</span>
              ))
            : (
              <>
                <span>123 Anywhere St., Any City</span>
                <span>hello@reallygreatsite.com</span>
                <span>www.reallygreatsite.com</span>
              </>
            )
          }
        </div>
      </header>

      {/* SUMMARY */}
      {visibleSections?.summary && (
        <section style={styles.mainContentItem}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={{ fontSize: `${base * 0.9}px`, lineHeight: lh }}>
            {personalInfo?.summary || "Add your summary here..."}
          </p>
        </section>
      )}

      {/* BODY */}
      <div style={{ display: "flex", gap: "40px", flex: 1 }}>
        
        {/* LEFT */}
        <div style={{ width: "35%" }}>
          
          {/* EDUCATION */}
          {visibleSections?.education && education?.length > 0 && (
            <section>
              <h2 style={styles.sectionTitle}>Education</h2>
              {education.map((edu, i) => (
                <div key={i} style={styles.sidebarItem}>
                  <div style={styles.sidebarLabel}>
                    {edu.school || "University Name"}
                  </div>
                  <div style={styles.sidebarSub}>
                    {edu.degree || "Degree"}
                  </div>
                  <div style={styles.sidebarSub}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* SKILLS */}
          {visibleSections?.skills && skills?.length > 0 && (
            <section>
              <h2 style={styles.sectionTitle}>Skills</h2>
              <ul style={{ ...styles.bulletList, listStyleType: "square" }}>
                {skills.map((s, i) => (
                  <li key={i} style={{ marginBottom: "5px" }}>
                    {s.category}: {s.list}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ width: "65%" }}>
          
          {/* EXPERIENCE */}
          {visibleSections?.experience && experiences?.length > 0 && (
            <section>
              <h2 style={styles.sectionTitle}>Work Experience</h2>
              {experiences.map((exp, i) => (
                <div key={i} style={styles.mainContentItem}>
                  <div style={styles.expDate}>
                    ({exp.startDate} - {exp.endDate || "Present"})
                  </div>
                  <div style={styles.expTitle}>
                    {exp.role} | {exp.company}
                  </div>
                  {exp.desc && (
                    <p style={{ fontSize: `${base * 0.85}px`, marginTop: "5px", lineHeight: lh }}>
                      {exp.desc}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* REFERENCES */}
          <section style={{ marginTop: "30px" }}>
            <h2 style={styles.sectionTitle}>References</h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: `${base * 0.9}px` }}>Bailey Dupont</div>
                <div style={{ fontSize: `${base * 0.8}px` }}>Wardiere Inc. / CEO</div>
                <div style={{ fontSize: `${base * 0.8}px` }}>123-456-7890</div>
              </div>
              <div>
                <div style={{ fontWeight: "bold", fontSize: `${base * 0.9}px` }}>Harumi Kobayashi</div>
                <div style={{ fontSize: `${base * 0.8}px` }}>Wardiere Inc. / CEO</div>
                <div style={{ fontSize: `${base * 0.8}px` }}>123-456-7890</div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}