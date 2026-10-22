// ATS-friendly DOCX export of the builder's resumeData. Unlike the PDF export
// (a rendered screenshot of the preview), this emits real text in a single
// column — headings, paragraphs and bullet lists — which is what ATS parsers
// and recruiters editing the file actually want.
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } from 'docx';

const dateRange = (start, end, current) => {
  const from = (start || '').trim();
  const to = current ? 'Present' : (end || '').trim();
  if (!from && !to) return '';
  return [from, to].filter(Boolean).join(' – ');
};

function heading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text, bold: true, color: '0D9488' })],
  });
}

function bullet(text) {
  return new Paragraph({ text, bullet: { level: 0 }, spacing: { after: 40 } });
}

// Exported for tests: builds the document body from resumeData.
export function buildDocxChildren(data) {
  const children = [];
  const personal = data.personal || {};

  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: personal.name || 'Your Name', bold: true, size: 48 })],
  }));

  const contact = [personal.email, personal.phone, personal.location, personal.linkedin, personal.website]
    .map((v) => (v || '').trim())
    .filter(Boolean)
    .join('  |  ');
  if (contact) {
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [new TextRun({ text: contact, size: 20 })],
    }));
  }

  if ((data.summary || '').trim()) {
    children.push(heading('Professional Summary'));
    children.push(new Paragraph({ text: data.summary.trim(), spacing: { after: 80 } }));
  }

  const experience = (data.experience || []).filter((e) => e.company || e.title);
  if (experience.length) {
    children.push(heading('Work Experience'));
    for (const exp of experience) {
      const range = dateRange(exp.startDate, exp.endDate, exp.current);
      children.push(new Paragraph({
        spacing: { before: 120, after: 20 },
        children: [
          new TextRun({ text: exp.title || 'Role', bold: true }),
          new TextRun({ text: exp.company ? ` — ${exp.company}` : '' }),
          new TextRun({ text: exp.location ? `, ${exp.location}` : '', italics: true }),
          new TextRun({ text: range ? `  (${range})` : '', italics: true }),
        ],
      }));
      for (const b of (exp.bullets || []).map((x) => (x || '').trim()).filter(Boolean)) {
        children.push(bullet(b));
      }
    }
  }

  const education = (data.education || []).filter((e) => e.institution || e.degree);
  if (education.length) {
    children.push(heading('Education'));
    for (const edu of education) {
      const degree = [edu.degree, edu.field].filter(Boolean).join(' in ');
      const range = dateRange(edu.startDate, edu.endDate, false);
      children.push(new Paragraph({
        spacing: { before: 80, after: 20 },
        children: [
          new TextRun({ text: degree || 'Degree', bold: true }),
          new TextRun({ text: edu.institution ? ` — ${edu.institution}` : '' }),
          new TextRun({ text: range ? `  (${range})` : '', italics: true }),
          new TextRun({ text: edu.gpa ? `  CGPA: ${edu.gpa}` : '' }),
        ],
      }));
    }
  }

  const skillGroups = (data.skills || []).filter((g) => (g.items || []).length);
  if (skillGroups.length) {
    children.push(heading('Skills'));
    for (const group of skillGroups) {
      children.push(new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: group.category ? `${group.category}: ` : '', bold: true }),
          new TextRun({ text: (group.items || []).join(', ') }),
        ],
      }));
    }
  }

  const projects = (data.projects || []).filter((p) => p.name || p.description);
  if (projects.length) {
    children.push(heading('Projects'));
    for (const proj of projects) {
      children.push(new Paragraph({
        spacing: { before: 80, after: 20 },
        children: [
          new TextRun({ text: proj.name || 'Project', bold: true }),
          new TextRun({ text: proj.technologies ? `  (${proj.technologies})` : '', italics: true }),
          new TextRun({ text: proj.link ? `  ${proj.link}` : '' }),
        ],
      }));
      if ((proj.description || '').trim()) children.push(bullet(proj.description.trim()));
    }
  }

  const certifications = (data.certifications || []).filter((c) => c.name);
  if (certifications.length) {
    children.push(heading('Certifications'));
    for (const cert of certifications) {
      children.push(bullet([cert.name, cert.issuer, cert.date].filter(Boolean).join(' — ')));
    }
  }

  const languages = (data.languages || []).filter((l) => l.language);
  if (languages.length) {
    children.push(heading('Languages'));
    children.push(new Paragraph({
      text: languages.map((l) => (l.proficiency ? `${l.language} (${l.proficiency})` : l.language)).join(', '),
    }));
  }

  const hobbies = (data.hobbies || []).map((h) => (typeof h === 'string' ? h : h?.name)).filter(Boolean);
  if (hobbies.length) {
    children.push(heading('Hobbies & Interests'));
    children.push(new Paragraph({ text: hobbies.join(', ') }));
  }

  return children;
}

export function buildDocument(data) {
  return new Document({
    styles: {
      default: {
        document: { run: { font: 'Calibri', size: 22 } },
      },
    },
    sections: [{
      properties: {
        page: { margin: { top: 720, bottom: 720, left: 900, right: 900 } },
      },
      children: buildDocxChildren(data),
    }],
  });
}

export async function exportToDocx(data, fileName = 'resume.docx') {
  const blob = await Packer.toBlob(buildDocument(data));
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
