import { describe, it, expect } from 'vitest';
import {
  ModernTemplate,
  ClassicTemplate,
  MinimalistTemplate,
  CreativeTemplate,
  AtsTemplate,
  FresherTemplate,
  TechnicalTemplate,
  DesignTemplate,
  ExecutiveTemplate,
  TwoColumnTemplate,
  AcademicTemplate,
} from '../templates/index';

describe('Resume Templates', () => {
  it('exports 11 templates', () => {
    expect(ModernTemplate).toBeDefined();
    expect(ClassicTemplate).toBeDefined();
    expect(MinimalistTemplate).toBeDefined();
    expect(CreativeTemplate).toBeDefined();
    expect(AtsTemplate).toBeDefined();
    expect(FresherTemplate).toBeDefined();
    expect(TechnicalTemplate).toBeDefined();
    expect(DesignTemplate).toBeDefined();
    expect(ExecutiveTemplate).toBeDefined();
    expect(TwoColumnTemplate).toBeDefined();
    expect(AcademicTemplate).toBeDefined();
  });

  it('all templates are React components (functions)', () => {
    [ModernTemplate, ClassicTemplate, MinimalistTemplate, CreativeTemplate, AtsTemplate, FresherTemplate, TechnicalTemplate, DesignTemplate, ExecutiveTemplate, TwoColumnTemplate, AcademicTemplate].forEach(
      (Template) => {
        expect(typeof Template).toBe('function');
      }
    );
  });

  it('new templates accept data and templateColor props', () => {
    [FresherTemplate, TechnicalTemplate, DesignTemplate, ExecutiveTemplate, TwoColumnTemplate, AcademicTemplate].forEach((Template) => {
      expect(() => Template({ data: {}, templateColor: '#2563eb' })).not.toThrow();
    });
  });

  it('Executive template renders with sample data', () => {
    const result = ExecutiveTemplate({
      data: {
        personal: { name: 'Test User', email: 'test@test.com' },
        summary: 'Experienced professional',
        experience: [{ title: 'Engineer', company: 'Acme', bullets: ['Built systems'] }],
        skills: [{ category: 'Tech', items: ['Python', 'React'] }],
      },
      templateColor: '#059669',
    });
    expect(result).toBeTruthy();
  });

  it('TwoColumn template renders with sample data', () => {
    const result = TwoColumnTemplate({
      data: {
        personal: { name: 'Jane Doe', email: 'jane@test.com', location: 'Mumbai' },
        summary: 'Data scientist',
        experience: [{ title: 'DS Lead', company: 'TCS', bullets: ['Led ML projects'] }],
        skills: [{ category: 'ML', items: ['TensorFlow', 'PyTorch'] }],
        languages: [{ language: 'English', proficiency: 'Fluent' }],
      },
      templateColor: '#7c3aed',
    });
    expect(result).toBeTruthy();
  });
});

describe('Academic template', () => {
  it('renders with sample data', () => {
    const result = AcademicTemplate({
      data: {
        personal: { name: 'Dr. Asha Rao', email: 'asha@univ.ac.in' },
        summary: 'Researcher in computational linguistics',
        education: [{ institution: 'IIT Bombay', degree: 'PhD', field: 'Computer Science', startDate: '2018', endDate: '2023' }],
        experience: [{ title: 'Assistant Professor', company: 'IIT Delhi', bullets: ['Taught NLP'] }],
        projects: [{ name: 'Hindi NER corpus', description: 'Published at ACL 2025' }],
        certifications: [{ name: 'UGC NET', issuer: 'NTA', date: '2019' }],
      },
      templateColor: '#059669',
    });
    expect(result).toBeTruthy();
  });
});
