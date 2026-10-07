import React from 'react';

const AtsTemplate = ({ data = {}, templateColor = '#2563eb' }) => {
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

  const styles = {
    wrapper: {
      width: '210mm',
      minHeight: '297mm',
      padding: '15mm',
      background: 'white',
      fontFamily: 'Arial, sans-serif',
      fontSize: '10pt',
      lineHeight: '1.4',
      color: '#333',
      boxSizing: 'border-box',
    },
    name: {
      fontSize: '18pt',
      fontWeight: '700',
      color: '#000',
      marginBottom: '2mm',
    },
    contactLine: {
      fontSize: '10pt',
      color: '#333',
      marginBottom: '1mm',
    },
    sectionHeading: {
      fontSize: '11pt',
      fontWeight: '700',
      color: '#000',
      textTransform: 'uppercase',
      marginTop: '5mm',
      marginBottom: '3mm',
      borderBottom: '1px solid #000',
      paddingBottom: '1mm',
    },
    section: {
      marginBottom: '2mm',
    },
    entryHeader: {
      marginBottom: '1mm',
    },
    jobTitle: {
      fontSize: '10pt',
      fontWeight: '700',
      color: '#000',
    },
    company: {
      fontSize: '10pt',
      color: '#333',
    },
    dates: {
      fontSize: '10pt',
      color: '#333',
    },
    bullet: {
      fontSize: '10pt',
      marginBottom: '1mm',
      paddingLeft: '2mm',
    },
    text: {
      fontSize: '10pt',
      color: '#333',
    },
  };

  return (
    <div className="resume-preview" style={styles.wrapper}>
      {/* Header - Plain text, no graphics */}
      {personal.name && <div style={styles.name}>{personal.name}</div>}

      {personal.email && <div style={styles.contactLine}>{personal.email}</div>}
      {personal.phone && <div style={styles.contactLine}>{personal.phone}</div>}
      {personal.location && <div style={styles.contactLine}>{personal.location}</div>}
      {personal.linkedin && <div style={styles.contactLine}>{personal.linkedin}</div>}
      {personal.website && <div style={styles.contactLine}>{personal.website}</div>}

      {/* PROFESSIONAL SUMMARY */}
      {summary && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>PROFESSIONAL SUMMARY</div>
          <div style={styles.text}>{summary}</div>
        </div>
      )}

      {/* WORK EXPERIENCE */}
      {experience.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>WORK EXPERIENCE</div>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '5mm' }}>
              <div style={styles.entryHeader}>
                <div style={styles.jobTitle}>{exp.title}</div>
                <div style={styles.company}>
                  {exp.company}
                  {exp.location && `, ${exp.location}`}
                </div>
                <div style={styles.dates}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul style={{ margin: '1mm 0 0 0', paddingLeft: '6mm', listStyleType: 'disc' }}>
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} style={styles.bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>EDUCATION</div>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '3mm' }}>
              <div style={styles.jobTitle}>
                {edu.degree}{edu.field && ` in ${edu.field}`}
              </div>
              <div style={styles.company}>{edu.institution}</div>
              <div style={styles.dates}>
                {edu.startDate}{edu.endDate && ` - ${edu.endDate}`}
              </div>
              {edu.gpa && <div style={styles.text}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>SKILLS</div>
          {skills.map((skill, i) => (
            <div key={i} style={{ marginBottom: '2mm', fontSize: '10pt' }}>
              {skill.category && (
                <span style={{ fontWeight: '700' }}>{skill.category}: </span>
              )}
              {skill.items && skill.items.length > 0 && (
                <span>{skill.items.join(', ')}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>PROJECTS</div>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '3mm' }}>
              <div style={styles.jobTitle}>{proj.name}</div>
              {proj.description && <div style={styles.text}>{proj.description}</div>}
              {proj.technologies && (
                <div style={styles.text}>Technologies: {proj.technologies}</div>
              )}
              {proj.link && <div style={styles.text}>{proj.link}</div>}
            </div>
          ))}
        </div>
      )}

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>CERTIFICATIONS</div>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '2mm', fontSize: '10pt' }}>
              <span style={{ fontWeight: '700' }}>{cert.name}</span>
              {cert.issuer && <span> - {cert.issuer}</span>}
              {cert.date && <span> ({cert.date})</span>}
            </div>
          ))}
        </div>
      )}

      {/* LANGUAGES */}
      {languages.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>LANGUAGES</div>
          {languages.map((lang, i) => (
            <div key={i} style={{ marginBottom: '1mm', fontSize: '10pt' }}>
              {lang.language}{lang.proficiency && ` - ${lang.proficiency}`}
            </div>
          ))}
        </div>
      )}

      {/* ADDITIONAL INFORMATION */}
      {hobbies.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>ADDITIONAL INFORMATION</div>
          <div style={styles.text}>Interests: {hobbies.join(', ')}</div>
        </div>
      )}
    </div>
  );
};

export default AtsTemplate;
