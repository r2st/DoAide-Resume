import React from 'react';

const CreativeTemplate = ({ data = {}, templateColor = '#2563eb' }) => {
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
      fontFamily: 'Arial, sans-serif',
      fontSize: '10pt',
      lineHeight: '1.4',
      color: '#333',
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
    headerBar: {
      background: templateColor,
      padding: '12mm 15mm',
      color: 'white',
    },
    name: {
      fontSize: '24pt',
      fontWeight: '700',
      marginBottom: '2mm',
    },
    contactRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '5mm',
      fontSize: '9pt',
      opacity: 0.9,
    },
    summaryBar: {
      background: '#f8f9fa',
      padding: '6mm 15mm',
      borderBottom: `2px solid ${templateColor}`,
    },
    summaryText: {
      fontSize: '9.5pt',
      color: '#444',
      lineHeight: '1.6',
      fontStyle: 'italic',
    },
    body: {
      display: 'flex',
      padding: '8mm 15mm 15mm 15mm',
      gap: '10mm',
    },
    leftCol: {
      width: '60%',
    },
    rightCol: {
      width: '40%',
    },
    sectionHeading: {
      fontSize: '11pt',
      fontWeight: '700',
      color: templateColor,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '3mm',
      paddingBottom: '2mm',
      borderBottom: `2px solid ${templateColor}`,
    },
    section: {
      marginBottom: '6mm',
    },
    jobTitle: {
      fontSize: '10.5pt',
      fontWeight: '700',
      color: '#222',
    },
    company: {
      fontSize: '9.5pt',
      color: templateColor,
      fontWeight: '600',
    },
    dates: {
      fontSize: '8.5pt',
      color: '#888',
      fontStyle: 'italic',
    },
    bullet: {
      fontSize: '9pt',
      marginBottom: '1mm',
      paddingLeft: '2mm',
    },
    badge: {
      display: 'inline-block',
      background: `${templateColor}15`,
      border: `1px solid ${templateColor}40`,
      borderRadius: '12px',
      padding: '1mm 3mm',
      fontSize: '8pt',
      color: templateColor,
      marginRight: '2mm',
      marginBottom: '2mm',
    },
    projectCard: {
      background: '#f8f9fa',
      borderRadius: '4px',
      padding: '3mm 4mm',
      marginBottom: '3mm',
      borderLeft: `3px solid ${templateColor}`,
    },
  };

  return (
    <div className="resume-preview" style={styles.wrapper}>
      {/* Header Bar */}
      <div style={styles.headerBar}>
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
      </div>

      {/* Summary */}
      {summary && (
        <div style={styles.summaryBar}>
          <div style={styles.summaryText}>{summary}</div>
        </div>
      )}

      {/* Two-Column Body */}
      <div style={styles.body}>
        {/* Left Column - Experience & Education */}
        <div style={styles.leftCol}>
          {experience.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionHeading}>Experience</div>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '5mm' }}>
                  <div style={styles.jobTitle}>{exp.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={styles.company}>
                      {exp.company}
                      {exp.location && (
                        <span style={{ fontWeight: '400', color: '#888' }}> | {exp.location}</span>
                      )}
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
            <div style={styles.section}>
              <div style={styles.sectionHeading}>Education</div>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '4mm' }}>
                  <div style={{ fontWeight: '700', fontSize: '10pt', color: '#222' }}>
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={styles.company}>{edu.institution}</span>
                    <span style={styles.dates}>
                      {edu.startDate}{edu.endDate && ` - ${edu.endDate}`}
                    </span>
                  </div>
                  {edu.gpa && (
                    <div style={{ fontSize: '8.5pt', color: '#888' }}>GPA: {edu.gpa}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionHeading}>Certifications</div>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: '2mm', fontSize: '9.5pt' }}>
                  <span style={{ fontWeight: '600' }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: '#666' }}> - {cert.issuer}</span>}
                  {cert.date && <span style={{ color: '#999' }}> ({cert.date})</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Skills & Projects */}
        <div style={styles.rightCol}>
          {skills.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionHeading}>Skills</div>
              {skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '3mm' }}>
                  {skill.category && (
                    <div style={{ fontSize: '9pt', fontWeight: '700', color: '#444', marginBottom: '1.5mm' }}>
                      {skill.category}
                    </div>
                  )}
                  {skill.items && skill.items.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {skill.items.map((item, j) => (
                        <span key={j} style={styles.badge}>{item}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionHeading}>Projects</div>
              {projects.map((proj, i) => (
                <div key={i} style={styles.projectCard}>
                  <div style={{ fontWeight: '700', fontSize: '9.5pt', color: '#222' }}>
                    {proj.name}
                  </div>
                  {proj.description && (
                    <div style={{ fontSize: '8.5pt', color: '#555', marginTop: '1mm' }}>
                      {proj.description}
                    </div>
                  )}
                  {proj.technologies && (
                    <div style={{ fontSize: '8pt', color: templateColor, marginTop: '1mm', fontStyle: 'italic' }}>
                      {proj.technologies}
                    </div>
                  )}
                  {proj.link && (
                    <div style={{ fontSize: '8pt', color: '#999', marginTop: '1mm' }}>{proj.link}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionHeading}>Languages</div>
              {languages.map((lang, i) => (
                <div key={i} style={{ fontSize: '9pt', marginBottom: '1.5mm' }}>
                  <span style={{ fontWeight: '600' }}>{lang.language}</span>
                  {lang.proficiency && (
                    <span style={{ color: '#888' }}> - {lang.proficiency}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {hobbies.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionHeading}>Interests</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {hobbies.map((hobby, i) => (
                  <span key={i} style={styles.badge}>{hobby}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
