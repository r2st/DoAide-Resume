import { describe, it, expect } from 'vitest';
import {
  ModernTemplate,
  ClassicTemplate,
  MinimalistTemplate,
  CreativeTemplate,
  AtsTemplate,
} from '../templates/index';

describe('Resume Templates', () => {
  it('exports 5 templates', () => {
    expect(ModernTemplate).toBeDefined();
    expect(ClassicTemplate).toBeDefined();
    expect(MinimalistTemplate).toBeDefined();
    expect(CreativeTemplate).toBeDefined();
    expect(AtsTemplate).toBeDefined();
  });

  it('all templates are React components (functions)', () => {
    [ModernTemplate, ClassicTemplate, MinimalistTemplate, CreativeTemplate, AtsTemplate].forEach(
      (Template) => {
        expect(typeof Template).toBe('function');
      }
    );
  });
});
