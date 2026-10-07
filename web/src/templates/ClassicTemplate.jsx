import React from 'react';

const ClassicTemplate = ({ data = {}, templateColor = '#2563eb' }) => {
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
    header: {
      textAlign: 'center',
      marginBottom: '4mm',
    },
    name: {
      fontSize: '22pt',
      fontWeight: '700',
      color: '#222',
      marginBottom: '2mm',
    },
    contactLine: {
      fontSize: '9pt',
      color: '#555',
      marginBottom: '1mm',
    },
    divider: {
      border: 'none',
      borderTop: `2px solid ${templateColor}`,
      margin: '4mm 0',
    },
    sectionDivider: {
      border: 'none',
      borderTop: '1px solid #ccc',
      margin: '3mm 0',
    },
    sectionHeading: {
      fontSize: '12pt',
      fontWeight: '700',
      color: '#222',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '3mm',
      marginTop: '2mm',
    },
    section: {
      marginBottom: '2mm',
    },
    entryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '1mm',
    },
    jobTitle: {
      fontSize: '10.5pt',
      fontWeight: '700',
      color: '#222',
    },
    company: {
      fontSize: '10pt',
      fontStyle: 'italic',
      color: '#444',
    },
    dates: {
      fontSize: '9pt',
      color: '#666',
      whiteSpace: 'nowrap',
    },
    bullet: {
      fontSize: '9.5pt',
      marginBottom: '1mm',
      paddingLeft: '2mm',
    },
    summaryText: {
      fontSize: '9.5pt',
      color: '#444',
      textAlign: 'justify',
    },
  };

  const contactParts = [];
  if (personal.email) contactParts.push(personal.email);
  if (personal.phone) contactParts.push(personal.phone);
  if (personal.location) contactParts.push(personal.location);

  const linkParts = [];
  if (personal.linkedin) linkParts.push(personal.linkedin);
  if (personal.website) linkParts.push(personal.website);

  return (
    <div className="resume-preview" style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        {personal.name && <div style={styles.name}>{personal.name}</div>}
        {contactParts.length > 0 && (
          <div style={styles.contactLine}>{contactParts.join('  |  ')}</div>
        )}
        {linkParts.length > 0 && (
          <div style={styles.contactLine}>{linkParts.join('  |  ')}</div>
        )}
      </div>

      <hr style={styles.divider} />

      {/* Summary */}
      {summary && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Professional Summary</div>
          <div style={styles.summaryText}>{summary}</div>
          <hr style={styles.sectionDivider} />
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Professional Experience</div>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '5mm' }}>
              <div style={styles.entryHeader}>
                <div>
                  <span style={styles.jobTitle}>{exp.title}</span>
                  {exp.company && <span style={styles.company}>, {exp.company}</span>}
                  {exp.location && (
                    <span style={{ fontSize: '9pt', color: '#666' }}> - {exp.location}</span>
                  )}
                </div>
                <span style={styles.dates}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
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
          <hr style={styles.sectionDivider} />
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Education</div>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '3mm' }}>
              <div style={styles.entryHeader}>
                <div>
                  <span style={{ fontWeight: '700', fontSize: '10pt' }}>
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </span>
                  {edu.institution && (
                    <span style={{ fontSize: '10pt', fontStyle: 'italic', color: '#444' }}>
                      , {edu.institution}
                    </span>
                  )}
                </div>
                <span style={styles.dates}>
                  {edu.startDate}{edu.endDate && ` - ${edu.endDate}`}
                </span>
              </div>
              {edu.gpa && (
                <div style={{ fontSize: '9pt', color: '#555', marginLeft: '2mm' }}>GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
          <hr style={styles.sectionDivider} />
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Skills</div>
          {skills.map((skill, i) => (
            <div key={i} style={{ marginBottom: '2mm', fontSize: '9.5pt' }}>
              {skill.category && (
                <span style={{ fontWeight: '700' }}>{skill.category}: </span>
              )}
              {skill.items && skill.items.length > 0 && (
                <span>{skill.items.join(', ')}</span>
              )}
            </div>
          ))}
          <hr style={styles.sectionDivider} />
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Projects</div>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '3mm' }}>
              <span style={{ fontWeight: '700', fontSize: '10pt' }}>{proj.name}</span>
              {proj.link && (
                <span style={{ fontSize: '8.5pt', color: '#666' }}> ({proj.link})</span>
              )}
              {proj.description && (
                <div style={{ fontSize: '9.5pt', color: '#444', marginTop: '1mm' }}>{proj.description}</div>
              )}
              {proj.technologies && (
                <div style={{ fontSize: '9pt', color: '#666', fontStyle: 'italic' }}>
                  Technologies: {proj.technologies}
                </div>
              )}
            </div>
          ))}
          <hr style={styles.sectionDivider} />
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Certifications</div>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '2mm', fontSize: '9.5pt' }}>
              <span style={{ fontWeight: '700' }}>{cert.name}</span>
              {cert.issuer && <span> - {cert.issuer}</span>}
              {cert.date && <span style={{ color: '#666' }}> ({cert.date})</span>}
            </div>
          ))}
          <hr style={styles.sectionDivider} />
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Languages</div>
          <div style={{ fontSize: '9.5pt' }}>
            {languages.map((lang, i) => (
              <span key={i}>
                {i > 0 && '  |  '}
                <span style={{ fontWeight: '600' }}>{lang.language}</span>
                {lang.proficiency && ` (${lang.proficiency})`}
              </span>
            ))}
          </div>
          <hr style={styles.sectionDivider} />
        </div>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Interests</div>
          <div style={{ fontSize: '9.5pt' }}>{hobbies.join(', ')}</div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
