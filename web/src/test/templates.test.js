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
} from '../templates/index';

describe('Resume Templates', () => {
  it('exports 8 templates', () => {
    expect(ModernTemplate).toBeDefined();
    expect(ClassicTemplate).toBeDefined();
    expect(MinimalistTemplate).toBeDefined();
    expect(CreativeTemplate).toBeDefined();
    expect(AtsTemplate).toBeDefined();
    expect(FresherTemplate).toBeDefined();
    expect(TechnicalTemplate).toBeDefined();
    expect(DesignTemplate).toBeDefined();
  });

  it('all templates are React components (functions)', () => {
    [ModernTemplate, ClassicTemplate, MinimalistTemplate, CreativeTemplate, AtsTemplate, FresherTemplate, TechnicalTemplate, DesignTemplate].forEach(
      (Template) => {
        expect(typeof Template).toBe('function');
      }
    );
  });

  it('new templates accept data and templateColor props', () => {
    [FresherTemplate, TechnicalTemplate, DesignTemplate].forEach((Template) => {
      expect(() => Template({ data: {}, templateColor: '#2563eb' })).not.toThrow();
    });
  });
});
