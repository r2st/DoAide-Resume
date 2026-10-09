import React from 'react';

const TwoColumnTemplate = ({ data = {}, templateColor = '#2563eb' }) => {
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

  const darken = (hex, amount = 0.7) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.round((num >> 16) * amount);
    const g = Math.round(((num >> 8) & 0xff) * amount);
    const b = Math.round((num & 0xff) * amount);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const sidebarBg = darken(templateColor, 0.35);

  const s = {
    wrapper: {
      width: '210mm',
      minHeight: '297mm',
      display: 'flex',
      background: 'white',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      fontSize: '9.5pt',
      lineHeight: '1.45',
      color: '#333',
      boxSizing: 'border-box',
    },
    sidebar: {
      width: '35%',
      background: sidebarBg,
      color: '#eee',
      padding: '10mm 7mm',
      boxSizing: 'border-box',
    },
    content: {
      width: '65%',
      padding: '10mm 10mm 10mm 8mm',
      boxSizing: 'border-box',
    },
    avatar: {
      width: '28mm',
      height: '28mm',
      borderRadius: '50%',
      background: templateColor,
      margin: '0 auto 4mm',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20pt',
      fontWeight: '700',
      color: 'white',
    },
    sidebarName: {
      fontSize: '14pt',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '1mm',
      color: 'white',
    },
    sidebarLabel: {
      fontSize: '8.5pt',
      textAlign: 'center',
      color: 'rgba(255,255,255,0.7)',
      marginBottom: '5mm',
    },
    sideHeading: {
      fontSize: '9pt',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      color: templateColor,
      borderBottom: `1px solid ${templateColor}`,
      paddingBottom: '1.5mm',
      marginBottom: '3mm',
      marginTop: '5mm',
    },
    contactItem: {
      fontSize: '8.5pt',
      color: 'rgba(255,255,255,0.85)',
      marginBottom: '2mm',
      wordBreak: 'break-all',
    },
    pill: {
      display: 'inline-block',
      padding: '1.5mm 3mm',
      margin: '1mm',
      borderRadius: '3mm',
      background: 'rgba(255,255,255,0.15)',
      fontSize: '8pt',
      color: 'rgba(255,255,255,0.9)',
    },
    heading: {
      fontSize: '12pt',
      fontWeight: '700',
      color: templateColor,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      borderBottom: `2px solid ${templateColor}`,
      paddingBottom: '1.5mm',
      marginBottom: '3mm',
      marginTop: '5mm',
    },
    jobTitle: { fontSize: '10pt', fontWeight: '700', color: '#1a1a1a' },
    jobMeta: { fontSize: '8.5pt', color: '#888', marginBottom: '1.5mm' },
    bullet: { paddingLeft: '3mm', marginBottom: '1mm', fontSize: '9pt', color: '#444' },
  };

  const initials = (personal.name || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={s.wrapper}>
      <div style={s.sidebar}>
        <div style={s.avatar}>{initials || '?'}</div>
        {personal.name && <div style={s.sidebarName}>{personal.name}</div>}
        {personal.location && <div style={s.sidebarLabel}>{personal.location}</div>}

        <div style={s.sideHeading}>Contact</div>
        {personal.email && <div style={s.contactItem}>{personal.email}</div>}
        {personal.phone && <div style={s.contactItem}>{personal.phone}</div>}
        {personal.linkedin && <div style={s.contactItem}>{personal.linkedin}</div>}
        {personal.website && <div style={s.contactItem}>{personal.website}</div>}

        {skills.length > 0 && (
          <>
            <div style={s.sideHeading}>Skills</div>
            {skills.map((group, i) => (
              <div key={i} style={{ marginBottom: '2mm' }}>
                {group.category && (
                  <div style={{ fontSize: '8pt', fontWeight: '600', color: 'rgba(255,255,255,0.6)', marginBottom: '1mm' }}>{group.category}</div>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {(group.items || []).map((skill, j) => (
                    <span key={j} style={s.pill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {languages.length > 0 && (
          <>
            <div style={s.sideHeading}>Languages</div>
            {languages.map((lang, i) => (
              <div key={i} style={{ fontSize: '8.5pt', color: 'rgba(255,255,255,0.85)', marginBottom: '1.5mm' }}>
                {lang.language}{lang.proficiency ? ` — ${lang.proficiency}` : ''}
              </div>
            ))}
          </>
        )}

        {hobbies.length > 0 && (
          <>
            <div style={s.sideHeading}>Interests</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {hobbies.filter(Boolean).map((h, i) => (
                <span key={i} style={s.pill}>{h}</span>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={s.content}>
        {summary && (
          <>
            <div style={s.heading}>Profile</div>
            <p style={{ fontSize: '9.5pt', color: '#555', marginBottom: '2mm' }}>{summary}</p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <div style={s.heading}>Experience</div>
            {experience.map((job, i) => (
              <div key={i} style={{ marginBottom: '4mm' }}>
                <div style={s.jobTitle}>{job.title}</div>
                <div style={s.jobMeta}>
                  {[job.company, job.location, [job.startDate, job.current ? 'Present' : job.endDate].filter(Boolean).join(' – ')].filter(Boolean).join(' | ')}
                </div>
                {(job.bullets || []).filter(Boolean).map((b, j) => (
                  <div key={j} style={s.bullet}>• {b}</div>
                ))}
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <div style={s.heading}>Education</div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '3mm' }}>
                <div style={{ fontWeight: '700', fontSize: '10pt', color: '#1a1a1a' }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </div>
                <div style={{ fontSize: '8.5pt', color: '#888' }}>
                  {[edu.institution, edu.endDate || edu.year, edu.gpa ? `GPA: ${edu.gpa}` : ''].filter(Boolean).join(' | ')}
                </div>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <div style={s.heading}>Projects</div>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '3mm' }}>
                <div style={{ fontWeight: '700', fontSize: '9.5pt', color: '#1a1a1a' }}>{proj.name}</div>
                {proj.description && <div style={{ fontSize: '9pt', color: '#555' }}>{proj.description}</div>}
                {proj.technologies && <div style={{ fontSize: '8pt', color: '#888' }}>Tech: {proj.technologies}</div>}
              </div>
            ))}
          </>
        )}

        {certifications.length > 0 && (
          <>
            <div style={s.heading}>Certifications</div>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '2mm' }}>
                <span style={{ fontWeight: '600', fontSize: '9.5pt' }}>{cert.name}</span>
                {(cert.issuer || cert.date) && (
                  <span style={{ fontSize: '8.5pt', color: '#888' }}> — {[cert.issuer, cert.date].filter(Boolean).join(', ')}</span>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TwoColumnTemplate;
