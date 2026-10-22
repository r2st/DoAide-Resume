// Deterministic resume-vs-job-description keyword analysis. No AI, no network:
// tokenize both texts, drop stopwords, rank job-description terms by frequency
// and report which of them the resume already covers.

const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'all', 'also', 'an', 'and', 'any', 'are', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can',
  'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'etc', 'few', 'for', 'from', 'further',
  'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'him', 'his', 'how', 'i', 'if',
  'in', 'into', 'is', 'it', 'its', 'job', 'just', 'me', 'more', 'most', 'my', 'no', 'nor', 'not',
  'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'out', 'over', 'own', 'per', 'role',
  'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'them', 'then',
  'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up',
  'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why',
  'will', 'with', 'you', 'your', 'yours',
  // JD boilerplate that is never a resume keyword
  'ability', 'candidate', 'candidates', 'company', 'description', 'experience', 'excellent',
  'good', 'ideal', 'including', 'knowledge', 'looking', 'must', 'opportunity', 'plus',
  'position', 'preferred', 'require', 'required', 'requirements', 'requires', 'responsibilities', 'skills', 'strong',
  'team', 'understanding', 'work', 'working', 'years',
]);

export function tokenize(text) {
  return (text || '')
    .toLowerCase()
    // keep letters, digits and the symbols that appear inside tech terms (c++, node.js, ci/cd)
    .split(/[^a-z0-9+#./-]+/)
    .map((t) => t.replace(/^[./-]+|[./-]+$/g, ''))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t) && !/^\d+$/.test(t));
}

// Two-word phrases ("machine learning", "power bi") rank higher than single words
// when they repeat in the JD.
function phrases(tokens) {
  const out = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    out.push(`${tokens[i]} ${tokens[i + 1]}`);
  }
  return out;
}

function countBy(items) {
  const counts = new Map();
  for (const item of items) counts.set(item, (counts.get(item) || 0) + 1);
  return counts;
}

/**
 * Compare a resume against a job description.
 * Returns { matched, missing, coverage } where matched/missing are
 * [{ keyword, count }] sorted by JD frequency, and coverage is 0-100.
 */
export function analyzeKeywords(resumeText, jobDescription, { limit = 30 } = {}) {
  const resumeTokens = tokenize(resumeText);
  const jdTokens = tokenize(jobDescription);
  if (jdTokens.length === 0) return { matched: [], missing: [], coverage: 0 };

  const resumeSet = new Set(resumeTokens);
  const resumePhrases = new Set(phrases(resumeTokens));

  const wordCounts = countBy(jdTokens);
  const phraseCounts = countBy(phrases(jdTokens));

  // A phrase that repeats in the JD is a keyword in its own right; its component
  // words then don't need to be reported separately.
  const keywords = [];
  const absorbed = new Set();
  for (const [phrase, count] of phraseCounts) {
    if (count >= 2) {
      keywords.push({ keyword: phrase, count, isPhrase: true });
      for (const w of phrase.split(' ')) absorbed.add(w);
    }
  }
  for (const [word, count] of wordCounts) {
    if (!absorbed.has(word)) keywords.push({ keyword: word, count, isPhrase: false });
  }

  keywords.sort((a, b) => b.count - a.count || a.keyword.localeCompare(b.keyword));
  const top = keywords.slice(0, limit);

  const matched = [];
  const missing = [];
  for (const k of top) {
    const hit = k.isPhrase ? resumePhrases.has(k.keyword) : resumeSet.has(k.keyword);
    (hit ? matched : missing).push({ keyword: k.keyword, count: k.count });
  }

  const coverage = top.length ? Math.round((matched.length / top.length) * 100) : 0;
  return { matched, missing, coverage };
}

export function suggestionFor(keyword) {
  return `Add "${keyword}" where it is true of your experience — in a skills list or, better, inside an achievement bullet.`;
}
