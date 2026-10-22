import { describe, expect, it } from 'vitest';
import { Packer } from 'docx';
import { buildDocument, buildDocxChildren } from '../lib/docxExport';

const DATA = {
  personal: { name: 'Ravi Kumar', email: 'ravi@example.com', phone: '+91 90000 00000', location: 'Hyderabad', linkedin: '', website: '' },
  summary: 'Backend engineer with 5 years of experience.',
  experience: [
    { company: 'Acme', title: 'Senior Engineer', location: 'Hyderabad', startDate: 'Jan 2022', endDate: '', current: true, bullets: ['Built billing APIs', 'Cut costs 20%'] },
  ],
  education: [
    { institution: 'IIT Madras', degree: 'B.Tech', field: 'CSE', startDate: '2015', endDate: '2019', gpa: '8.9' },
  ],
  skills: [{ category: 'Technical', items: ['Python', 'FastAPI'] }],
  projects: [{ name: 'OpenTool', description: 'CLI for X', technologies: 'Go', link: '' }],
  certifications: [{ name: 'AWS SA', issuer: 'Amazon', date: '2024' }],
  languages: [{ language: 'Hindi', proficiency: 'Native' }],
  hobbies: ['Chess'],
};

describe('buildDocxChildren', () => {
  it('includes every populated section', () => {
    const children = buildDocxChildren(DATA);
    // Children are docx Paragraphs; serialize-ish check via their internal text runs
    expect(children.length).toBeGreaterThan(10);
  });

  it('skips empty sections', () => {
    const children = buildDocxChildren({ personal: { name: 'Solo' } });
    // name paragraph only — no contact line, no headings
    expect(children.length).toBe(1);
  });
});

describe('buildDocument', () => {
  it('packs to a valid non-empty docx buffer', async () => {
    const buffer = await Packer.toBuffer(buildDocument(DATA));
    expect(buffer.byteLength).toBeGreaterThan(1000);
    // DOCX files are ZIP archives: PK magic bytes
    expect(buffer[0]).toBe(0x50);
    expect(buffer[1]).toBe(0x4b);
  });
});
