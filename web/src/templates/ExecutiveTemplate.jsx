import React from 'react';

const ExecutiveTemplate = ({ data = {}, templateColor = '#2563eb' }) => {
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

  const s = {
    wrapper: {
      width: '210mm',
      minHeight: '297mm',
      background: 'white',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      fontSize: '10pt',
      lineHeight: '1.5',
      color: '#2d2d2d',
      boxSizing: 'border-box',
      borderTop: `4px solid ${templateColor}`,
    },
    inner: { padding: '12mm 15mm' },
    name: {
      fontSize: '26pt',
      fontWeight: '400',
      color: '#1a1a1a',
      textAlign: 'center',
      letterSpacing: '2px',
      marginBottom: '2mm',
    },
    contactRow: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '8px',
      fontSize: '8.5pt',
      color: '#666',
      marginBottom: '4mm',
    },
    sep: { color: '#ccc' },
    divider: {
      border: 'none',
      borderTop: `1px solid ${templateColor}`,
      margin: '4mm 0',
      opacity: 0.4,
    },
    body: { display: 'flex', gap: '8mm' },
    main: { flex: '65%' },
    side: { flex: '35%' },
    heading: {
      fontSize: '11pt',
      fontWeight: '700',
      color: templateColor,
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      marginBottom: '3mm',
      marginTop: '5mm',
      borderBottom: `1px solid ${templateColor}`,
      paddingBottom: '1.5mm',
    },
    jobTitle: { fontSize: '10pt', fontWeight: '700', color: '#1a1a1a' },
    jobMeta: { fontSize: '8.5pt', color: '#777', marginBottom: '1.5mm' },
    bullet: { paddingLeft: '4mm', marginBottom: '1mm', fontSize: '9.5pt' },
    skillCat: { fontSize: '9pt', fontWeight: '700', color: '#444', marginBottom: '1mm', marginTop: '2mm' },
    skillItems: { fontSize: '9pt', color: '#555', marginBottom: '2mm' },
    certItem: { fontSize: '9pt', color: '#444', marginBottom: '2mm' },
  };

  const contactParts = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.website,
  ].filter(Boolean);

  return (
    <div style={s.wrapper}>
      <div style={s.inner}>
        {personal.name && <div style={s.name}>{personal.name}</div>}
        {contactParts.length > 0 && (
          <div style={s.contactRow}>
            {contactParts.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={s.sep}>|</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        <hr style={s.divider} />

        {summary && (
          <>
            <div style={s.heading}>Executive Summary</div>
            <p style={{ fontSize: '9.5pt', color: '#444', marginBottom: '2mm' }}>{summary}</p>
          </>
        )}

        <div style={s.body}>
          <div style={s.main}>
            {experience.length > 0 && (
              <>
                <div style={s.heading}>Professional Experience</div>
                {experience.map((job, i) => (
                  <div key={i} style={{ marginBottom: '4mm' }}>
                    <div style={s.jobTitle}>{job.title}{job.company ? ` — ${job.company}` : ''}</div>
                    <div style={s.jobMeta}>
                      {[job.location, [job.startDate, job.current ? 'Present' : job.endDate].filter(Boolean).join(' – ')].filter(Boolean).join(' | ')}
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
                    <div style={{ fontSize: '9pt', color: '#666' }}>
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
                    <div style={{ fontWeight: '700', fontSize: '9.5pt' }}>{proj.name}</div>
                    {proj.description && <div style={{ fontSize: '9pt', color: '#555' }}>{proj.description}</div>}
                    {proj.technologies && <div style={{ fontSize: '8.5pt', color: '#777' }}>Tech: {proj.technologies}</div>}
                  </div>
                ))}
              </>
            )}
          </div>

          <div style={s.side}>
            {skills.length > 0 && (
              <>
                <div style={s.heading}>Skills</div>
                {skills.map((group, i) => (
                  <div key={i}>
                    {group.category && <div style={s.skillCat}>{group.category}</div>}
                    <div style={s.skillItems}>{(group.items || []).join(', ')}</div>
                  </div>
                ))}
              </>
            )}
            {certifications.length > 0 && (
              <>
                <div style={s.heading}>Certifications</div>
                {certifications.map((cert, i) => (
                  <div key={i} style={s.certItem}>
                    <div style={{ fontWeight: '600' }}>{cert.name}</div>
                    {(cert.issuer || cert.date) && (
                      <div style={{ fontSize: '8.5pt', color: '#777' }}>{[cert.issuer, cert.date].filter(Boolean).join(' — ')}</div>
                    )}
                  </div>
                ))}
              </>
            )}
            {languages.length > 0 && (
              <>
                <div style={s.heading}>Languages</div>
                {languages.map((lang, i) => (
                  <div key={i} style={{ fontSize: '9pt', color: '#444', marginBottom: '1mm' }}>
                    {lang.language}{lang.proficiency ? ` — ${lang.proficiency}` : ''}
                  </div>
                ))}
              </>
            )}
            {hobbies.length > 0 && (
              <>
                <div style={s.heading}>Interests</div>
                <div style={{ fontSize: '9pt', color: '#555' }}>{hobbies.filter(Boolean).join(', ')}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
