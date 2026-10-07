import React from 'react';

const MinimalistTemplate = ({ data = {}, templateColor = '#2563eb' }) => {
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
      fontSize: '28pt',
      fontWeight: '300',
      color: templateColor,
      letterSpacing: '1px',
      marginBottom: '3mm',
    },
    contactRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4mm',
      fontSize: '8.5pt',
      color: '#777',
      marginBottom: '6mm',
    },
    sectionDivider: {
      border: 'none',
      borderTop: `1px solid ${templateColor}`,
      margin: '5mm 0 4mm 0',
      opacity: 0.4,
    },
    sectionHeading: {
      fontSize: '10pt',
      fontWeight: '600',
      color: templateColor,
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginBottom: '3mm',
    },
    section: {
      marginBottom: '2mm',
    },
    entryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    jobTitle: {
      fontSize: '10.5pt',
      fontWeight: '600',
      color: '#222',
    },
    company: {
      fontSize: '9.5pt',
      color: '#555',
    },
    dates: {
      fontSize: '8.5pt',
      color: '#999',
    },
    bullet: {
      fontSize: '9pt',
      color: '#555',
      marginBottom: '1mm',
      paddingLeft: '2mm',
    },
    summaryText: {
      fontSize: '9.5pt',
      color: '#555',
      lineHeight: '1.6',
    },
  };

  return (
    <div className="resume-preview" style={styles.wrapper}>
      {/* Header */}
      {personal.name && <div style={styles.name}>{personal.name}</div>}

      {(personal.email || personal.phone || personal.location || personal.linkedin || personal.website) && (
        <div style={styles.contactRow}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div style={styles.section}>
          <hr style={styles.sectionDivider} />
          <div style={styles.sectionHeading}>About</div>
          <div style={styles.summaryText}>{summary}</div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={styles.section}>
          <hr style={styles.sectionDivider} />
          <div style={styles.sectionHeading}>Experience</div>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '5mm' }}>
              <div style={styles.entryRow}>
                <div>
                  <span style={styles.jobTitle}>{exp.title}</span>
                </div>
                <span style={styles.dates}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={styles.company}>
                {exp.company}
                {exp.location && `, ${exp.location}`}
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul style={{ margin: '2mm 0 0 0', paddingLeft: '5mm', listStyleType: 'none' }}>
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} style={styles.bullet}>- {bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={styles.section}>
          <hr style={styles.sectionDivider} />
          <div style={styles.sectionHeading}>Education</div>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '3mm' }}>
              <div style={styles.entryRow}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '10pt', color: '#222' }}>
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </span>
                </div>
                <span style={styles.dates}>
                  {edu.startDate}{edu.endDate && ` - ${edu.endDate}`}
                </span>
              </div>
              <div style={styles.company}>{edu.institution}</div>
              {edu.gpa && (
                <div style={{ fontSize: '8.5pt', color: '#999' }}>GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={styles.section}>
          <hr style={styles.sectionDivider} />
          <div style={styles.sectionHeading}>Skills</div>
          {skills.map((skill, i) => (
            <div key={i} style={{ marginBottom: '2mm', fontSize: '9.5pt' }}>
              {skill.category && (
                <span style={{ fontWeight: '600', color: '#444' }}>{skill.category}: </span>
              )}
              {skill.items && skill.items.length > 0 && (
                <span style={{ color: '#666' }}>{skill.items.join(', ')}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={styles.section}>
          <hr style={styles.sectionDivider} />
          <div style={styles.sectionHeading}>Projects</div>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '3mm' }}>
              <div style={{ fontWeight: '600', fontSize: '10pt', color: '#222' }}>
                {proj.name}
                {proj.link && (
                  <span style={{ fontWeight: '400', fontSize: '8.5pt', color: '#999' }}> - {proj.link}</span>
                )}
              </div>
              {proj.description && (
                <div style={{ fontSize: '9pt', color: '#666', marginTop: '1mm' }}>{proj.description}</div>
              )}
              {proj.technologies && (
                <div style={{ fontSize: '8.5pt', color: '#999' }}>{proj.technologies}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={styles.section}>
          <hr style={styles.sectionDivider} />
          <div style={styles.sectionHeading}>Certifications</div>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '2mm', fontSize: '9.5pt' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#666' }}> - {cert.issuer}</span>}
              {cert.date && <span style={{ color: '#999' }}> ({cert.date})</span>}
            </div>
          ))}
        </div>
      )}

      {/* Languages and Hobbies */}
      {(languages.length > 0 || hobbies.length > 0) && (
        <div style={styles.section}>
          <hr style={styles.sectionDivider} />
          <div style={{ display: 'flex', gap: '15mm' }}>
            {languages.length > 0 && (
              <div style={{ flex: 1 }}>
                <div style={styles.sectionHeading}>Languages</div>
                {languages.map((lang, i) => (
                  <div key={i} style={{ fontSize: '9pt', marginBottom: '1mm' }}>
                    <span style={{ fontWeight: '600' }}>{lang.language}</span>
                    {lang.proficiency && (
                      <span style={{ color: '#999' }}> - {lang.proficiency}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {hobbies.length > 0 && (
              <div style={{ flex: 1 }}>
                <div style={styles.sectionHeading}>Interests</div>
                <div style={{ fontSize: '9pt', color: '#666' }}>{hobbies.join(', ')}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalistTemplate;
