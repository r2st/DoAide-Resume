import React from 'react';

const DesignTemplate = ({ data = {}, templateColor = '#2563eb' }) => {
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
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      fontSize: '10pt',
      lineHeight: '1.5',
      color: '#333',
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
    heroSection: {
      background: `linear-gradient(135deg, ${templateColor}, ${templateColor}dd)`,
      padding: '18mm 15mm 14mm',
      color: 'white',
      position: 'relative',
    },
    heroAccent: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '60mm',
      height: '60mm',
      background: 'rgba(255,255,255,0.08)',
      borderRadius: '0 0 0 100%',
    },
    name: {
      fontSize: '28pt',
      fontWeight: '300',
      letterSpacing: '1px',
      marginBottom: '2mm',
      position: 'relative',
      zIndex: 1,
    },
    titleLine: {
      fontSize: '11pt',
      fontWeight: '500',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      opacity: 0.85,
      position: 'relative',
      zIndex: 1,
    },
    contactBar: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6mm',
      padding: '4mm 15mm',
      background: '#f8f8f8',
      fontSize: '8.5pt',
      color: '#666',
      borderBottom: '1px solid #eee',
    },
    body: {
      padding: '8mm 15mm 15mm',
    },
    twoCol: {
      display: 'flex',
      gap: '10mm',
    },
    leftCol: {
      width: '62%',
    },
    rightCol: {
      width: '38%',
    },
    sectionHeading: {
      fontSize: '10pt',
      fontWeight: '700',
      color: templateColor,
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginTop: '6mm',
      marginBottom: '3mm',
    },
    sectionDot: {
      display: 'inline-block',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: templateColor,
      marginRight: '2mm',
      verticalAlign: 'middle',
    },
    section: {
      marginBottom: '2mm',
    },
    entryTitle: {
      fontSize: '10.5pt',
      fontWeight: '700',
      color: '#222',
    },
    entrySubtitle: {
      fontSize: '9.5pt',
      color: '#666',
    },
    entryDate: {
      fontSize: '8.5pt',
      color: '#999',
    },
    desc: {
      fontSize: '9.5pt',
      color: '#555',
      marginTop: '1mm',
    },
    bulletList: {
      paddingLeft: '4mm',
      margin: '1mm 0 0 0',
    },
    bulletItem: {
      fontSize: '9.5pt',
      color: '#555',
      marginBottom: '1mm',
    },
    skillPill: {
      display: 'inline-block',
      fontSize: '8pt',
      padding: '1.5mm 3.5mm',
      margin: '1mm',
      border: `1px solid ${templateColor}44`,
      borderRadius: '12px',
      color: templateColor,
      fontWeight: '500',
    },
    portfolioLink: {
      fontSize: '9pt',
      color: templateColor,
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.heroSection}>
        <div style={styles.heroAccent} />
        <div style={styles.name}>{personal.name || 'Your Name'}</div>
        {personal.title && <div style={styles.titleLine}>{personal.title}</div>}
      </div>

      <div style={styles.contactBar}>
        {personal.email && <span>{personal.email}</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {(personal.location || personal.city) && <span>{personal.location || personal.city}</span>}
        {personal.linkedin && <span>{personal.linkedin}</span>}
        {personal.website && <span style={styles.portfolioLink}>{personal.website}</span>}
        {personal.github && <span>{personal.github}</span>}
      </div>

      <div style={styles.body}>
        {summary && (
          <div style={styles.section}>
            <p style={{ fontSize: '10pt', color: '#444', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
              {summary}
            </p>
          </div>
        )}

        <div style={styles.twoCol}>
          <div style={styles.leftCol}>
            {experience.length > 0 && (
              <div style={styles.section}>
                <div style={styles.sectionHeading}>
                  <span style={styles.sectionDot} />
                  Experience
                </div>
                {experience.map((job, i) => (
                  <div key={i} style={{ marginBottom: '4mm' }}>
                    <div style={styles.entryTitle}>{job.title || job.position || job.role}</div>
                    <div style={styles.entrySubtitle}>{job.company || job.organization}</div>
                    <div style={styles.entryDate}>
                      {job.startDate || job.from} — {job.endDate || job.to || 'Present'}
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

            {projects.length > 0 && (
              <div style={styles.section}>
                <div style={styles.sectionHeading}>
                  <span style={styles.sectionDot} />
                  Projects / Portfolio
                </div>
                {projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '3mm' }}>
                    <div style={styles.entryTitle}>
                      {proj.title || proj.name}
                      {proj.tech && (
                        <span style={{ fontSize: '8.5pt', color: '#999', fontWeight: '400', marginLeft: '2mm' }}>
                          {proj.tech}
                        </span>
                      )}
                    </div>
                    {proj.description && <div style={styles.desc}>{proj.description}</div>}
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
          </div>

          <div style={styles.rightCol}>
            {skills.length > 0 && (
              <div style={styles.section}>
                <div style={styles.sectionHeading}>
                  <span style={styles.sectionDot} />
                  Skills
                </div>
                {skills.map((cat, i) => {
                  if (typeof cat === 'string') {
                    return <span key={i} style={styles.skillPill}>{cat}</span>;
                  }
                  const items = cat.items || cat.skills || [cat.name || ''];
                  return (
                    <div key={i} style={{ marginBottom: '2mm' }}>
                      {cat.category && (
                        <div style={{ fontSize: '8.5pt', fontWeight: '700', color: '#444', marginBottom: '1mm' }}>
                          {cat.category}
                        </div>
                      )}
                      <div>{items.map((s, j) => <span key={j} style={styles.skillPill}>{s}</span>)}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {education.length > 0 && (
              <div style={styles.section}>
                <div style={styles.sectionHeading}>
                  <span style={styles.sectionDot} />
                  Education
                </div>
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '3mm' }}>
                    <div style={{ fontSize: '9.5pt', fontWeight: '700', color: '#222' }}>
                      {edu.degree || edu.course}
                    </div>
                    <div style={{ fontSize: '9pt', color: '#666' }}>
                      {edu.institution || edu.school || edu.college}
                    </div>
                    {(edu.year || edu.graduationYear || edu.endDate) && (
                      <div style={{ fontSize: '8pt', color: '#999' }}>
                        {edu.year || edu.graduationYear || edu.endDate}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div style={styles.section}>
                <div style={styles.sectionHeading}>
                  <span style={styles.sectionDot} />
                  Certifications
                </div>
                {certifications.map((cert, i) => (
                  <div key={i} style={{ fontSize: '9pt', color: '#555', marginBottom: '1.5mm' }}>
                    {typeof cert === 'string' ? cert : `${cert.name}${cert.year ? ` (${cert.year})` : ''}`}
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div style={styles.section}>
                <div style={styles.sectionHeading}>
                  <span style={styles.sectionDot} />
                  Languages
                </div>
                {languages.map((lang, i) => (
                  <div key={i} style={{ fontSize: '9pt', color: '#555', marginBottom: '1mm' }}>
                    {typeof lang === 'string' ? lang : `${lang.name}${lang.level ? ` — ${lang.level}` : ''}`}
                  </div>
                ))}
              </div>
            )}

            {hobbies.length > 0 && (
              <div style={styles.section}>
                <div style={styles.sectionHeading}>
                  <span style={styles.sectionDot} />
                  Interests
                </div>
                <div style={{ fontSize: '9pt', color: '#555' }}>
                  {hobbies.map((h) => (typeof h === 'string' ? h : h.name)).join(' · ')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignTemplate;
