// Heuristic parser that turns pasted LinkedIn profile text (copy-paste from
// the profile page or the "Save to PDF" export) into the builder's resume
// data shape. Everything runs in the browser — nothing is uploaded.

const SECTION_ALIASES = {
  summary: ['about', 'summary'],
  experience: ['experience', 'work experience', 'professional experience'],
  education: ['education'],
  skills: ['skills', 'top skills', 'skills & endorsements'],
  certifications: ['licenses & certifications', 'licenses and certifications', 'certifications'],
  languages: ['languages'],
  projects: ['projects'],
};

const HEADER_LOOKUP = Object.entries(SECTION_ALIASES).reduce((acc, [key, aliases]) => {
  for (const alias of aliases) acc[alias] = key;
  return acc;
}, {});

const MONTH = '(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*';
const DATE_RANGE_RE = new RegExp(
  `^(${MONTH}\\.?\\s*\\d{4}|\\d{4})\\s*[-–—]\\s*(Present|${MONTH}\\.?\\s*\\d{4}|\\d{4})`,
  'i'
);
// "· Full-time", "· 3 yrs 2 mos" noise LinkedIn appends after company / dates
const NOISE_RE = /\s*·\s*(Full-time|Part-time|Internship|Contract|Freelance|Self-employed|\d+\s*yrs?.*|\d+\s*mos?.*)$/i;

export function splitSections(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n').map((l) => l.trim());
  const sections = { header: [] };
  let current = 'header';
  for (const line of lines) {
    const key = HEADER_LOOKUP[line.toLowerCase().replace(/:$/, '')];
    if (key) {
      current = key;
      if (!sections[current]) sections[current] = [];
      continue;
    }
    if (!sections[current]) sections[current] = [];
    sections[current].push(line);
  }
  return sections;
}

function blocks(lines) {
  const out = [];
  let buf = [];
  for (const line of lines) {
    if (!line) {
      if (buf.length) out.push(buf);
      buf = [];
    } else {
      buf.push(line);
    }
  }
  if (buf.length) out.push(buf);
  return out;
}

export function parseDateRange(line) {
  const m = line.match(DATE_RANGE_RE);
  if (!m) return null;
  const end = m[2];
  return {
    startDate: m[1].replace('.', ''),
    endDate: /present/i.test(end) ? '' : end.replace('.', ''),
    current: /present/i.test(end),
  };
}

function parseHeader(lines) {
  const personal = { name: '', email: '', phone: '', location: '', linkedin: '', website: '' };
  let headline = '';
  const rest = [];
  for (const line of lines) {
    if (!line) continue;
    const email = line.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
    const phone = line.match(/(?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}|\+?\d[\d\s-]{8,14}\d/);
    const linkedin = line.match(/(?:www\.)?linkedin\.com\/in\/[\w-]+/i);
    if (email) personal.email = email[0];
    if (linkedin) personal.linkedin = linkedin[0];
    else if (phone && !email) personal.phone = phone[0].trim();
    if (email || phone || linkedin || /^(contact|www\.)/i.test(line)) continue;
    rest.push(line);
  }
  if (rest.length) personal.name = rest[0];
  if (rest.length > 1) headline = rest[1];
  // "City, State, Country" style line
  const locLine = rest.slice(1).find((l) => /^[A-Za-z .]+,\s*[A-Za-z .]+/.test(l) && l.length < 60);
  if (locLine) personal.location = locLine;
  return { personal, headline };
}

function parseExperience(lines) {
  const entries = [];
  for (const block of blocks(lines)) {
    const entry = { company: '', title: '', location: '', startDate: '', endDate: '', current: false, bullets: [] };
    let i = 0;
    const body = [];
    for (const raw of block) {
      const line = raw.replace(NOISE_RE, '').trim();
      const range = parseDateRange(line);
      if (range) {
        Object.assign(entry, range);
        continue;
      }
      if (!entry.title) entry.title = line;
      else if (!entry.company) entry.company = line;
      else if (!entry.location && /^[A-Za-z .]+,\s*[A-Za-z .]+$/.test(line) && line.length < 60) entry.location = line;
      else body.push(raw.replace(/^[-•·*]\s*/, ''));
      i += 1;
    }
    if (body.length) entry.bullets = body;
    if (entry.title) entries.push(entry);
  }
  return entries;
}

function parseEducation(lines) {
  const entries = [];
  for (const block of blocks(lines)) {
    const entry = { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' };
    for (const raw of block) {
      const line = raw.trim();
      const years = line.match(/^\(?(\d{4})\s*[-–—]\s*(\d{4}|Present)\)?$/i) || line.match(/(\d{4})\s*[-–—]\s*(\d{4})/);
      if (years) {
        entry.startDate = years[1];
        entry.endDate = /present/i.test(years[2]) ? '' : years[2];
        continue;
      }
      const grade = line.match(/(?:Grade|CGPA|GPA)[:\s]+([\d.]+[^,]*)/i);
      if (grade) {
        entry.gpa = grade[1].trim();
        continue;
      }
      if (!entry.institution) entry.institution = line;
      else if (!entry.degree) {
        // "Bachelor of Technology, Computer Science" → degree + field
        const [degree, ...field] = line.split(/,|\s+[-–]\s+/);
        entry.degree = degree.trim();
        if (field.length) entry.field = field.join(',').trim();
      }
    }
    if (entry.institution) entries.push(entry);
  }
  return entries;
}

function parseList(lines) {
  return lines
    .filter(Boolean)
    .flatMap((l) => l.split(/·|,|•/))
    .map((s) => s.replace(/^[-*]\s*/, '').trim())
    .filter((s) => s && s.length < 60);
}

function parseLanguages(lines) {
  return lines
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^(.+?)\s*[(–-]\s*(.+?)\)?$/);
      if (m && /native|professional|fluent|elementary|limited|bilingual/i.test(m[2])) {
        return { language: m[1].trim(), proficiency: m[2].trim() };
      }
      return { language: line.replace(/^[-*•]\s*/, '').trim(), proficiency: '' };
    })
    .filter((l) => l.language && l.language.length < 40);
}

function parseCertifications(lines) {
  return blocks(lines).map((block) => ({
    name: block[0] || '',
    issuer: block[1] || '',
    date: (block.find((l) => /\b(19|20)\d{2}\b/.test(l)) || '').match(/\b(?:Issued\s*)?([A-Za-z]*\.?\s*(?:19|20)\d{2})\b/)?.[1] || '',
  })).filter((c) => c.name);
}

export function parseLinkedinProfile(text) {
  const sections = splitSections(text || '');
  const { personal, headline } = parseHeader(sections.header || []);

  const summaryLines = (sections.summary || []).filter(Boolean);
  const summary = summaryLines.join(' ').trim() || headline;

  const skillItems = parseList(sections.skills || []);

  return {
    personal,
    summary,
    experience: parseExperience(sections.experience || []),
    education: parseEducation(sections.education || []),
    skills: skillItems.length ? [{ category: 'Technical', items: skillItems }] : [],
    projects: blocks(sections.projects || []).map((b) => ({
      name: b[0] || '',
      description: b.slice(1).join(' '),
      technologies: '',
      link: '',
    })).filter((p) => p.name),
    certifications: parseCertifications(sections.certifications || []),
    languages: parseLanguages(sections.languages || []),
    hobbies: [],
  };
}

// Count of meaningfully parsed fields — used by the import page to tell the
// user how much was recognised before sending them to the builder.
export function importStats(data) {
  return {
    hasName: Boolean(data.personal.name),
    experience: data.experience.length,
    education: data.education.length,
    skills: data.skills.reduce((n, s) => n + (s.items ? s.items.length : 0), 0),
    certifications: data.certifications.length,
    languages: data.languages.length,
    hasSummary: Boolean(data.summary),
  };
}

export const IMPORT_STORAGE_KEY = 'doaide_resume_import';
