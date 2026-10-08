import React from 'react';

const FresherTemplate = ({ data = {}, templateColor = '#2563eb' }) => {
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

  const lightenColor = (hex, amount = 0.92) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.round((num >> 16) + (255 - (num >> 16)) * amount));
    const g = Math.min(255, Math.round(((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * amount));
    const b = Math.min(255, Math.round((num & 0x0000ff) + (255 - (num & 0x0000ff)) * amount));
    return `rgb(${r}, ${g}, ${b})`;
  };

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
    nameBlock: {
      textAlign: 'center',
      marginBottom: '4mm',
    },
    name: {
      fontSize: '22pt',
      fontWeight: '700',
      color: templateColor,
      marginBottom: '2mm',
    },
    contactLine: {
      fontSize: '9pt',
      color: '#555',
      marginBottom: '1mm',
    },
    objectiveBand: {
      background: lightenColor(templateColor),
      padding: '5mm 6mm',
      borderRadius: '4px',
      marginBottom: '5mm',
      borderLeft: `3px solid ${templateColor}`,
    },
    objectiveText: {
      fontSize: '9.5pt',
      color: '#444',
      lineHeight: '1.6',
    },
    sectionHeading: {
      fontSize: '11pt',
      fontWeight: '700',
      color: templateColor,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginTop: '5mm',
      marginBottom: '3mm',
      paddingBottom: '1.5mm',
      borderBottom: `1.5px solid ${templateColor}`,
    },
    section: {
      marginBottom: '2mm',
    },
    eduEntry: {
      marginBottom: '3mm',
    },
    degree: {
      fontSize: '10.5pt',
      fontWeight: '700',
      color: '#222',
    },
    institution: {
      fontSize: '10pt',
      color: '#444',
    },
    dateRight: {
      fontSize: '9pt',
      color: '#888',
      float: 'right',
    },
    projectTitle: {
      fontSize: '10pt',
      fontWeight: '700',
      color: '#222',
    },
    projectDesc: {
      fontSize: '9.5pt',
      color: '#555',
      marginTop: '1mm',
    },
    skillCategory: {
      marginBottom: '2mm',
    },
    skillCategoryName: {
      fontSize: '9.5pt',
      fontWeight: '700',
      color: '#333',
    },
    skillPills: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2mm',
      marginTop: '1mm',
    },
    pill: {
      background: lightenColor(templateColor),
      color: templateColor,
      fontSize: '8.5pt',
      padding: '1mm 3mm',
      borderRadius: '3px',
      fontWeight: '500',
    },
    bulletList: {
      paddingLeft: '5mm',
      margin: '1mm 0 0 0',
    },
    bulletItem: {
      fontSize: '9.5pt',
      color: '#555',
      marginBottom: '1mm',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.nameBlock}>
        <div style={styles.name}>{personal.name || 'Your Name'}</div>
        <div style={styles.contactLine}>
          {[personal.email, personal.phone, personal.location || personal.city]
            .filter(Boolean)
            .join(' | ')}
        </div>
        {(personal.linkedin || personal.website || personal.github) && (
          <div style={styles.contactLine}>
            {[personal.linkedin, personal.github, personal.website].filter(Boolean).join(' | ')}
          </div>
        )}
      </div>

      {summary && (
        <div style={styles.objectiveBand}>
          <div style={styles.objectiveText}>{summary}</div>
        </div>
      )}

      {education.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Education</div>
          {education.map((edu, i) => (
            <div key={i} style={styles.eduEntry}>
              <div>
                <span style={styles.degree}>{edu.degree || edu.course}</span>
                {(edu.year || edu.graduationYear || edu.endDate) && (
                  <span style={styles.dateRight}>
                    {edu.year || edu.graduationYear || edu.endDate}
                  </span>
                )}
              </div>
              <div style={styles.institution}>
                {edu.institution || edu.school || edu.college}
                {edu.grade && ` — ${edu.grade}`}
                {edu.cgpa && ` — CGPA: ${edu.cgpa}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Skills</div>
          {skills.map((cat, i) => {
            if (typeof cat === 'string') {
              return (
                <span key={i} style={styles.pill}>
                  {cat}
                </span>
              );
            }
            const items = cat.items || cat.skills || [cat.name || ''];
            return (
              <div key={i} style={styles.skillCategory}>
                {cat.category && <div style={styles.skillCategoryName}>{cat.category}</div>}
                <div style={styles.skillPills}>
                  {items.map((s, j) => (
                    <span key={j} style={styles.pill}>{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {projects.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Projects</div>
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '3mm' }}>
              <div style={styles.projectTitle}>
                {proj.title || proj.name}
                {proj.tech && (
                  <span style={{ fontSize: '9pt', color: '#888', fontWeight: '400', marginLeft: '2mm' }}>
                    [{proj.tech}]
                  </span>
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

      {experience.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Internship / Experience</div>
          {experience.map((job, i) => (
            <div key={i} style={{ marginBottom: '3mm' }}>
              <div>
                <span style={{ fontSize: '10pt', fontWeight: '700', color: '#222' }}>
                  {job.title || job.position || job.role}
                </span>
                {(job.startDate || job.from) && (
                  <span style={styles.dateRight}>
                    {job.startDate || job.from} — {job.endDate || job.to || 'Present'}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '10pt', color: '#444', fontStyle: 'italic' }}>
                {job.company || job.organization}
              </div>
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

      {certifications.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Certifications</div>
          <ul style={styles.bulletList}>
            {certifications.map((cert, i) => (
              <li key={i} style={styles.bulletItem}>
                {typeof cert === 'string' ? cert : `${cert.name}${cert.issuer ? ` — ${cert.issuer}` : ''}${cert.year ? ` (${cert.year})` : ''}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {languages.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Languages</div>
          <div style={styles.skillPills}>
            {languages.map((lang, i) => (
              <span key={i} style={styles.pill}>
                {typeof lang === 'string' ? lang : `${lang.name}${lang.level ? ` (${lang.level})` : ''}`}
              </span>
            ))}
          </div>
        </div>
      )}

      {hobbies.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeading}>Interests</div>
          <div style={{ fontSize: '9.5pt', color: '#555' }}>
            {hobbies.map((h) => (typeof h === 'string' ? h : h.name)).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default FresherTemplate;
