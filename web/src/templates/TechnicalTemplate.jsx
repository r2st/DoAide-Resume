import React from 'react';

const TechnicalTemplate = ({ data = {}, templateColor = '#2563eb' }) => {
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
      background: 'white',
      fontFamily: "'Segoe UI', Arial, sans-serif",
      fontSize: '10pt',
      lineHeight: '1.4',
      color: '#333',
      display: 'flex',
      overflow: 'hidden',
      boxSizing: 'border-box',
    },
    sidebar: {
      width: '65mm',
      background: '#1a1a2e',
      color: 'white',
      padding: '12mm 8mm',
      boxSizing: 'border-box',
    },
    main: {
      flex: 1,
      padding: '12mm 14mm 12mm 10mm',
      boxSizing: 'border-box',
    },
    name: {
      fontSize: '14pt',
      fontWeight: '700',
      marginBottom: '1mm',
      lineHeight: '1.2',
    },
    title: {
      fontSize: '9pt',
      color: templateColor,
      marginBottom: '5mm',
      fontWeight: '500',
    },
    sidebarSection: {
      marginBottom: '5mm',
    },
    sidebarHeading: {
      fontSize: '8pt',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      color: templateColor,
      marginBottom: '2mm',
      paddingBottom: '1mm',
      borderBottom: `1px solid rgba(255,255,255,0.15)`,
    },
    contactItem: {
      fontSize: '8.5pt',
      marginBottom: '1.5mm',
      color: 'rgba(255,255,255,0.8)',
      wordBreak: 'break-word',
    },
    skillGroup: {
      marginBottom: '3mm',
    },
    skillGroupName: {
      fontSize: '8.5pt',
      fontWeight: '600',
      color: 'rgba(255,255,255,0.9)',
      marginBottom: '1mm',
    },
    skillBar: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5mm',
    },
    skillTag: {
      fontSize: '7.5pt',
      padding: '1mm 2.5mm',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '2px',
      color: 'rgba(255,255,255,0.8)',
    },
    mainHeading: {
      fontSize: '12pt',
      fontWeight: '700',
      color: '#1a1a2e',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginTop: '5mm',
      marginBottom: '3mm',
      paddingBottom: '1.5mm',
      borderBottom: `2px solid ${templateColor}`,
    },
    section: {
      marginBottom: '2mm',
    },
    jobHeader: {
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
    jobDate: {
      fontSize: '8.5pt',
      color: '#888',
    },
    company: {
      fontSize: '9.5pt',
      color: '#555',
      marginBottom: '1mm',
    },
    bulletList: {
      paddingLeft: '4mm',
      margin: '1mm 0 0 0',
    },
    bulletItem: {
      fontSize: '9.5pt',
      color: '#444',
      marginBottom: '1mm',
    },
    projectEntry: {
      marginBottom: '3mm',
    },
    projectTitle: {
      fontSize: '10pt',
      fontWeight: '700',
      color: '#222',
    },
    techTag: {
      fontSize: '8pt',
      color: templateColor,
      fontWeight: '500',
    },
    projectDesc: {
      fontSize: '9.5pt',
      color: '#555',
      marginTop: '0.5mm',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.sidebar}>
        <div style={styles.name}>{personal.name || 'Your Name'}</div>
        {personal.title && <div style={styles.title}>{personal.title}</div>}

        <div style={styles.sidebarSection}>
          <div style={styles.sidebarHeading}>Contact</div>
          {personal.email && <div style={styles.contactItem}>{personal.email}</div>}
          {personal.phone && <div style={styles.contactItem}>{personal.phone}</div>}
          {(personal.location || personal.city) && (
            <div style={styles.contactItem}>{personal.location || personal.city}</div>
          )}
          {personal.linkedin && <div style={styles.contactItem}>{personal.linkedin}</div>}
          {personal.github && <div style={styles.contactItem}>{personal.github}</div>}
          {personal.website && <div style={styles.contactItem}>{personal.website}</div>}
        </div>

        {skills.length > 0 && (
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarHeading}>Technical Skills</div>
            {skills.map((cat, i) => {
              if (typeof cat === 'string') {
                return <div key={i} style={styles.skillTag}>{cat}</div>;
              }
              const items = cat.items || cat.skills || [cat.name || ''];
              return (
                <div key={i} style={styles.skillGroup}>
                  {cat.category && <div style={styles.skillGroupName}>{cat.category}</div>}
                  <div style={styles.skillBar}>
                    {items.map((s, j) => (
                      <span key={j} style={styles.skillTag}>{s}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {certifications.length > 0 && (
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarHeading}>Certifications</div>
            {certifications.map((cert, i) => (
              <div key={i} style={{ ...styles.contactItem, marginBottom: '2mm' }}>
                {typeof cert === 'string' ? cert : `${cert.name}${cert.year ? ` (${cert.year})` : ''}`}
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarHeading}>Languages</div>
            {languages.map((lang, i) => (
              <div key={i} style={styles.contactItem}>
                {typeof lang === 'string' ? lang : `${lang.name}${lang.level ? ` — ${lang.level}` : ''}`}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarHeading}>Education</div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '3mm' }}>
                <div style={{ fontSize: '9pt', fontWeight: '700', color: 'rgba(255,255,255,0.9)' }}>
                  {edu.degree || edu.course}
                </div>
                <div style={{ fontSize: '8.5pt', color: 'rgba(255,255,255,0.6)' }}>
                  {edu.institution || edu.school || edu.college}
                </div>
                {(edu.year || edu.graduationYear || edu.endDate) && (
                  <div style={{ fontSize: '8pt', color: 'rgba(255,255,255,0.4)' }}>
                    {edu.year || edu.graduationYear || edu.endDate}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.main}>
        {summary && (
          <div style={styles.section}>
            <div style={styles.mainHeading}>Profile</div>
            <p style={{ fontSize: '9.5pt', color: '#555', lineHeight: '1.6', margin: 0 }}>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={styles.section}>
            <div style={styles.mainHeading}>Experience</div>
            {experience.map((job, i) => (
              <div key={i} style={{ marginBottom: '4mm' }}>
                <div style={styles.jobHeader}>
                  <span style={styles.jobTitle}>{job.title || job.position || job.role}</span>
                  <span style={styles.jobDate}>
                    {job.startDate || job.from} — {job.endDate || job.to || 'Present'}
                  </span>
                </div>
                <div style={styles.company}>{job.company || job.organization}</div>
                {(job.bullets || job.responsibilities || job.description) && (
                  <ul style={styles.bulletList}>
                    {(Array.isArray(job.bullets || job.responsibilities || job.description)
                      ? (job.bullets || job.responsibilities || job.description)
                      : []
                    ).map((b, j) => (
                      <li key={j} style={styles.bulletItem}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div style={styles.section}>
            <div style={styles.mainHeading}>Projects</div>
            {projects.map((proj, i) => (
              <div key={i} style={styles.projectEntry}>
                <div>
                  <span style={styles.projectTitle}>{proj.title || proj.name}</span>
                  {proj.tech && (
                    <span style={styles.techTag}> — {proj.tech}</span>
                  )}
                </div>
                {proj.description && <div style={styles.projectDesc}>{proj.description}</div>}
                {proj.bullets && (
                  <ul style={styles.bulletList}>
                    {proj.bullets.map((b, j) => (
                      <li key={j} style={styles.bulletItem}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {hobbies.length > 0 && (
          <div style={styles.section}>
            <div style={styles.mainHeading}>Interests</div>
            <div style={{ fontSize: '9.5pt', color: '#555' }}>
              {hobbies.map((h) => (typeof h === 'string' ? h : h.name)).join(' · ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalTemplate;
