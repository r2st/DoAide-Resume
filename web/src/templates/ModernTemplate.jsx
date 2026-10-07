import React from 'react';

const ModernTemplate = ({ data = {}, templateColor = '#2563eb' }) => {
  const {
    personal = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    hobbies = [],
  } = data;

  const lightenColor = (hex, amount = 0.9) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.round((num >> 16) + (255 - (num >> 16)) * amount));
    const g = Math.min(255, Math.round(((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * amount));
    const b = Math.min(255, Math.round((num & 0x0000ff) + (255 - (num & 0x0000ff)) * amount));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const sidebarBg = lightenColor(templateColor, 0.85);

  const styles = {
    wrapper: {
      width: '210mm',
      minHeight: '297mm',
      background: 'white',
      fontFamily: 'Arial, sans-serif',
      fontSize: '10pt',
      lineHeight: '1.4',
      color: '#333',
      display: 'flex',
      overflow: 'hidden',
    },
    sidebar: {
      width: '30%',
      background: sidebarBg,
      padding: '15mm 8mm 15mm 10mm',
      boxSizing: 'border-box',
    },
    main: {
      width: '70%',
      padding: '15mm 15mm 15mm 10mm',
      boxSizing: 'border-box',
    },
    name: {
      fontSize: '18pt',
      fontWeight: '700',
      color: templateColor,
      marginBottom: '4mm',
      lineHeight: '1.2',
    },
    contactItem: {
      fontSize: '8.5pt',
      marginBottom: '2mm',
      color: '#444',
      wordBreak: 'break-word',
    },
    sidebarSection: {
      marginTop: '8mm',
    },
    sidebarHeading: {
      fontSize: '11pt',
      fontWeight: '700',
      color: templateColor,
      marginBottom: '3mm',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: `1.5px solid ${templateColor}`,
      paddingBottom: '2mm',
    },
    mainHeading: {
      fontSize: '12pt',
      fontWeight: '700',
      color: templateColor,
      marginBottom: '3mm',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: `2px solid ${templateColor}`,
      paddingBottom: '2mm',
    },
    mainSection: {
      marginBottom: '6mm',
    },
    jobTitle: {
      fontSize: '10.5pt',
      fontWeight: '700',
      color: '#222',
    },
    company: {
      fontSize: '10pt',
      color: templateColor,
      fontWeight: '600',
    },
    dates: {
      fontSize: '8.5pt',
      color: '#666',
      fontStyle: 'italic',
    },
    bullet: {
      marginLeft: '4mm',
      marginBottom: '1mm',
      fontSize: '9.5pt',
      paddingLeft: '2mm',
    },
    skillCategory: {
      fontSize: '9pt',
      fontWeight: '600',
      color: '#333',
      marginBottom: '1mm',
    },
    skillItems: {
      fontSize: '8.5pt',
      color: '#555',
      marginBottom: '3mm',
    },
    languageItem: {
      fontSize: '9pt',
      marginBottom: '1.5mm',
    },
    hobbyItem: {
      fontSize: '9pt',
      color: '#555',
    },
    projectName: {
      fontSize: '10pt',
      fontWeight: '600',
      color: '#222',
    },
    projectDesc: {
      fontSize: '9pt',
      color: '#555',
      marginBottom: '1mm',
    },
    certName: {
      fontSize: '9.5pt',
      fontWeight: '600',
      color: '#222',
    },
    certIssuer: {
      fontSize: '9pt',
      color: '#555',
    },
  };

  return (
    <div className="resume-preview" style={styles.wrapper}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {personal.name && <div style={styles.name}>{personal.name}</div>}

        {(personal.email || personal.phone || personal.location || personal.linkedin || personal.website) && (
          <div style={{ marginTop: '4mm' }}>
            {personal.email && <div style={styles.contactItem}>{personal.email}</div>}
            {personal.phone && <div style={styles.contactItem}>{personal.phone}</div>}
            {personal.location && <div style={styles.contactItem}>{personal.location}</div>}
            {personal.linkedin && <div style={styles.contactItem}>{personal.linkedin}</div>}
            {personal.website && <div style={styles.contactItem}>{personal.website}</div>}
          </div>
        )}

        {skills.length > 0 && (
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarHeading}>Skills</div>
            {skills.map((skill, i) => (
              <div key={i} style={{ marginBottom: '3mm' }}>
                {skill.category && <div style={styles.skillCategory}>{skill.category}</div>}
                {skill.items && skill.items.length > 0 && (
                  <div style={styles.skillItems}>{skill.items.join(', ')}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarHeading}>Languages</div>
            {languages.map((lang, i) => (
              <div key={i} style={styles.languageItem}>
                <span style={{ fontWeight: '600' }}>{lang.language}</span>
                {lang.proficiency && (
                  <span style={{ color: '#666', fontSize: '8.5pt' }}> - {lang.proficiency}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {hobbies.length > 0 && (
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarHeading}>Hobbies</div>
            <div style={styles.hobbyItem}>{hobbies.join(', ')}</div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {summary && (
          <div style={styles.mainSection}>
            <div style={styles.mainHeading}>Professional Summary</div>
            <div style={{ fontSize: '9.5pt', color: '#444' }}>{summary}</div>
          </div>
        )}

        {experience.length > 0 && (
          <div style={styles.mainSection}>
            <div style={styles.mainHeading}>Experience</div>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '5mm' }}>
                <div style={styles.jobTitle}>{exp.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={styles.company}>
                    {exp.company}
                    {exp.location && <span style={{ color: '#666', fontWeight: '400' }}> | {exp.location}</span>}
                  </span>
                  <span style={styles.dates}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul style={{ margin: '2mm 0 0 0', paddingLeft: '5mm', listStyleType: 'disc' }}>
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} style={styles.bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div style={styles.mainSection}>
            <div style={styles.mainHeading}>Education</div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '4mm' }}>
                <div style={{ fontWeight: '700', fontSize: '10pt', color: '#222' }}>
                  {edu.degree}{edu.field && ` in ${edu.field}`}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: templateColor, fontWeight: '600', fontSize: '9.5pt' }}>{edu.institution}</span>
                  <span style={styles.dates}>
                    {edu.startDate}{edu.endDate && ` - ${edu.endDate}`}
                  </span>
                </div>
                {edu.gpa && <div style={{ fontSize: '9pt', color: '#666' }}>GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div style={styles.mainSection}>
            <div style={styles.mainHeading}>Projects</div>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '4mm' }}>
                <div style={styles.projectName}>
                  {proj.name}
                  {proj.link && (
                    <span style={{ fontSize: '8.5pt', fontWeight: '400', color: templateColor }}> ({proj.link})</span>
                  )}
                </div>
                {proj.description && <div style={styles.projectDesc}>{proj.description}</div>}
                {proj.technologies && (
                  <div style={{ fontSize: '8.5pt', color: '#666', fontStyle: 'italic' }}>
                    Technologies: {proj.technologies}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div style={styles.mainSection}>
            <div style={styles.mainHeading}>Certifications</div>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '2mm' }}>
                <span style={styles.certName}>{cert.name}</span>
                {cert.issuer && <span style={styles.certIssuer}> - {cert.issuer}</span>}
                {cert.date && <span style={{ ...styles.dates, marginLeft: '3mm' }}>{cert.date}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
