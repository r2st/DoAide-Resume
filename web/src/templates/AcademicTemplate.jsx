import React from 'react';

// Academic CV layout: serif type, centered header, education first, and
// research-oriented section labels — for lecturers, PhD applicants, and
// research roles.
const AcademicTemplate = ({ data = {}, templateColor = '#2563eb' }) => {
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
      padding: '18mm 20mm',
      background: 'white',
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: '10pt',
      lineHeight: '1.5',
      color: '#2a2a2a',
      boxSizing: 'border-box',
    },
    name: {
      fontSize: '22pt',
      fontWeight: '700',
      textAlign: 'center',
      color: '#1a1a1a',
      letterSpacing: '0.5px',
      marginBottom: '2mm',
    },
    contactRow: {
      textAlign: 'center',
      fontSize: '9pt',
      color: '#555',
      marginBottom: '2mm',
    },
    headerRule: {
      border: 'none',
      borderTop: `2px solid ${templateColor}`,
      margin: '4mm 0 6mm 0',
    },
    sectionHeading: {
      fontSize: '11pt',
      fontWeight: '700',
      color: templateColor,
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      borderBottom: '1px solid #ddd',
      paddingBottom: '1mm',
      marginBottom: '3mm',
    },
    section: {
      marginBottom: '6mm',
    },
    entryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    entryTitle: {
      fontSize: '10.5pt',
      fontWeight: '700',
      color: '#1a1a1a',
    },
    entrySub: {
      fontSize: '9.5pt',
      fontStyle: 'italic',
      color: '#555',
    },
    dates: {
      fontSize: '9pt',
      color: '#777',
      whiteSpace: 'nowrap',
      marginLeft: '4mm',
    },
    bullet: {
      fontSize: '9.5pt',
      color: '#444',
      marginBottom: '1mm',
    },
  };

  const sep = ' • ';
  const contactParts = [personal.email, personal.phone, personal.location].filter(Boolean);
  const linkParts = [personal.linkedin, personal.website].filter(Boolean);

  return (
    <div className="resume-preview" style={styles.wrapper}>
      {/* Header */}
      {personal.name && <div style={styles.name}>{personal.name}</div>}
      {contactParts.length > 0 && <div style={styles.contactRow}>{contactParts.join(sep)}</div>}
      {linkParts.length > 0 && <div style={styles.contactRow}>{linkParts.join(sep)}</div>}
      <hr style={styles.headerRule} />

      {/* Research interests / profile */}
      {summary && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Research Interests &amp; Profile</div>
          <div style={{ fontSize: '9.5pt', color: '#444', textAlign: 'justify' }}>{summary}</div>
        </div>
      )}

      {/* Education first — the academic convention */}
      {education.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Education</div>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '3mm' }}>
              <div style={styles.entryRow}>
                <span style={styles.entryTitle}>
                  {edu.degree}
                  {edu.field && ` in ${edu.field}`}
                </span>
                <span style={styles.dates}>
                  {edu.startDate}
                  {edu.endDate && ` – ${edu.endDate}`}
                </span>
              </div>
              <div style={styles.entrySub}>{edu.institution}</div>
              {edu.gpa && <div style={{ fontSize: '9pt', color: '#777' }}>CGPA / Marks: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Academic / professional experience */}
      {experience.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Academic &amp; Professional Experience</div>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '4mm' }}>
              <div style={styles.entryRow}>
                <span style={styles.entryTitle}>{exp.title}</span>
                <span style={styles.dates}>
                  {exp.startDate} {'–'} {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={styles.entrySub}>
                {exp.company}
                {exp.location && `, ${exp.location}`}
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul style={{ margin: '1.5mm 0 0 0', paddingLeft: '5mm' }}>
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} style={styles.bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Research projects / publications */}
      {projects.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Research Projects &amp; Publications</div>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '3mm' }}>
              <div style={styles.entryTitle}>{proj.name}</div>
              {proj.description && (
                <div style={{ fontSize: '9.5pt', color: '#444', marginTop: '0.5mm' }}>{proj.description}</div>
              )}
              {(proj.technologies || proj.link) && (
                <div style={{ fontSize: '8.5pt', color: '#777', marginTop: '0.5mm' }}>
                  {[proj.technologies, proj.link].filter(Boolean).join(sep)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Skills &amp; Competencies</div>
          {skills.map((skill, i) => (
            <div key={i} style={{ marginBottom: '1.5mm', fontSize: '9.5pt' }}>
              {skill.category && <span style={{ fontWeight: '700' }}>{skill.category}: </span>}
              {skill.items && skill.items.length > 0 && <span style={{ color: '#555' }}>{skill.items.join(', ')}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications / awards */}
      {certifications.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Awards, Grants &amp; Certifications</div>
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '1.5mm', fontSize: '9.5pt' }}>
              <span style={{ fontWeight: '700' }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: '#555' }}> {'—'} {cert.issuer}</span>}
              {cert.date && <span style={{ color: '#777' }}> ({cert.date})</span>}
            </div>
          ))}
        </div>
      )}

      {/* Languages and interests */}
      {(languages.length > 0 || hobbies.length > 0) && (
        <div style={styles.section}>
          <div style={{ display: 'flex', gap: '15mm' }}>
            {languages.length > 0 && (
              <div style={{ flex: 1 }}>
                <div style={styles.sectionHeading}>Languages</div>
                {languages.map((lang, i) => (
                  <div key={i} style={{ fontSize: '9.5pt', marginBottom: '1mm' }}>
                    <span style={{ fontWeight: '700' }}>{lang.language}</span>
                    {lang.proficiency && <span style={{ color: '#777' }}> {'—'} {lang.proficiency}</span>}
                  </div>
                ))}
              </div>
            )}
            {hobbies.length > 0 && (
              <div style={{ flex: 1 }}>
                <div style={styles.sectionHeading}>Interests</div>
                <div style={{ fontSize: '9.5pt', color: '#555' }}>{hobbies.join(', ')}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicTemplate;
