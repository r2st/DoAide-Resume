const STOP_WORDS = new Set([
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
  'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'some', 'them',
  'than', 'its', 'over', 'such', 'that', 'this', 'with', 'will', 'each',
  'make', 'like', 'from', 'into', 'through', 'after', 'before', 'between',
  'about', 'their', 'there', 'these', 'those', 'other', 'which', 'would',
  'could', 'should', 'where', 'when', 'what', 'your', 'also', 'more',
  'very', 'just', 'must', 'much', 'most', 'well', 'back', 'being', 'going',
  'able', 'upon', 'doing', 'during', 'while', 'both', 'under',
]);

const ACTION_VERBS = [
  'led', 'managed', 'developed', 'created', 'implemented', 'improved',
  'increased', 'decreased', 'reduced', 'designed', 'built', 'launched',
  'delivered', 'achieved', 'optimized', 'analyzed', 'coordinated',
  'established', 'streamlined', 'executed',
];

export function extractKeywords(text) {
  if (!text) return [];
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 3 && !STOP_WORDS.has(word));
  return [...new Set(words)];
}

function checkContactInfo(resumeData) {
  const tips = [];
  let score = 0;
  const maxScore = 15;

  const { personalInfo } = resumeData || {};
  if (!personalInfo) {
    tips.push('Add your contact information');
    return { category: 'Contact Information', score, maxScore, tips };
  }

  if (personalInfo.name) {
    score += 4;
  } else {
    tips.push('Add your full name');
  }

  if (personalInfo.email) {
    score += 4;
  } else {
    tips.push('Add your email address');
  }

  if (personalInfo.phone) {
    score += 4;
  } else {
    tips.push('Add your phone number');
  }

  if (personalInfo.location || personalInfo.city) {
    score += 3;
  } else {
    tips.push('Add your location or city');
  }

  return { category: 'Contact Information', score, maxScore, tips };
}

function checkSummary(resumeData) {
  const tips = [];
  let score = 0;
  const maxScore = 10;

  const summary = resumeData?.summary || resumeData?.objective || '';

  if (summary.length > 0) {
    score += 5;
    if (summary.length >= 50) {
      score += 3;
    } else {
      tips.push('Expand your summary to at least 2-3 sentences');
    }
    if (summary.length >= 100) {
      score += 2;
    }
  } else {
    tips.push('Add a professional summary highlighting your key strengths');
  }

  return { category: 'Professional Summary', score, maxScore, tips };
}

function checkExperience(resumeData) {
  const tips = [];
  let score = 0;
  const maxScore = 20;

  const experience = resumeData?.experience || resumeData?.workExperience || [];

  if (experience.length === 0) {
    tips.push('Add your work experience');
    return { category: 'Work Experience', score, maxScore, tips };
  }

  score += 8;

  const totalBullets = experience.reduce((count, job) => {
    const bullets = job.bullets || job.responsibilities || job.description || [];
    return count + (Array.isArray(bullets) ? bullets.length : 0);
  }, 0);

  if (totalBullets >= 3) {
    score += 6;
  } else if (totalBullets > 0) {
    score += 3;
    tips.push('Add more bullet points to describe your responsibilities and achievements');
  } else {
    tips.push('Add bullet points describing what you accomplished in each role');
  }

  const hasCompanyAndTitle = experience.every(
    (job) => (job.company || job.organization) && (job.title || job.position || job.role)
  );

  if (hasCompanyAndTitle) {
    score += 3;
  } else {
    tips.push('Include company name and job title for each position');
  }

  const hasDates = experience.every((job) => job.startDate || job.from || job.date);
  if (hasDates) {
    score += 3;
  } else {
    tips.push('Add dates for each work experience entry');
  }

  return { category: 'Work Experience', score, maxScore, tips };
}

function checkEducation(resumeData) {
  const tips = [];
  let score = 0;
  const maxScore = 10;

  const education = resumeData?.education || [];

  if (education.length === 0) {
    tips.push('Add your education details');
    return { category: 'Education', score, maxScore, tips };
  }

  score += 5;

  const hasDetails = education.every(
    (edu) => (edu.degree || edu.course) && (edu.institution || edu.school || edu.college)
  );

  if (hasDetails) {
    score += 3;
  } else {
    tips.push('Include degree and institution for each education entry');
  }

  const hasYear = education.some((edu) => edu.year || edu.graduationYear || edu.endDate);
  if (hasYear) {
    score += 2;
  } else {
    tips.push('Add graduation year to your education');
  }

  return { category: 'Education', score, maxScore, tips };
}

function checkSkills(resumeData) {
  const tips = [];
  let score = 0;
  const maxScore = 15;

  const skills = resumeData?.skills || [];
  const flatSkills = Array.isArray(skills)
    ? skills.flatMap((s) => (typeof s === 'string' ? [s] : s.items || s.skills || [s.name || '']))
    : [];

  if (flatSkills.length === 0) {
    tips.push('Add a skills section with your key competencies');
    return { category: 'Skills', score, maxScore, tips };
  }

  score += 5;

  if (flatSkills.length >= 5) {
    score += 5;
  } else {
    tips.push('Add at least 5 relevant skills');
  }

  if (flatSkills.length >= 8) {
    score += 5;
  } else if (flatSkills.length >= 5) {
    score += 3;
    tips.push('Consider adding a few more skills (8-12 is ideal)');
  }

  return { category: 'Skills', score, maxScore, tips };
}

function checkKeywordMatch(resumeData, jobDescription) {
  const tips = [];
  let score = 0;
  const maxScore = 20;

  if (!jobDescription) {
    return {
      category: 'Keyword Match',
      score: maxScore,
      maxScore,
      tips: ['Paste a job description to check keyword matching'],
      skipped: true,
    };
  }

  const resumeText = JSON.stringify(resumeData).toLowerCase();
  const jobKeywords = extractKeywords(jobDescription);

  if (jobKeywords.length === 0) {
    return { category: 'Keyword Match', score: maxScore, maxScore, tips, skipped: true };
  }

  const found = [];
  const missing = [];

  for (const keyword of jobKeywords) {
    if (resumeText.includes(keyword)) {
      found.push(keyword);
    } else {
      missing.push(keyword);
    }
  }

  const matchRatio = found.length / jobKeywords.length;
  score = Math.round(matchRatio * maxScore);

  if (matchRatio < 0.5) {
    tips.push('Your resume matches less than 50% of the job description keywords');
  }
  if (missing.length > 0 && missing.length <= 10) {
    tips.push(`Consider adding these keywords: ${missing.slice(0, 5).join(', ')}`);
  }

  return { category: 'Keyword Match', score, maxScore, tips, keywords: { found, missing } };
}

function checkResumeLength(resumeData) {
  const tips = [];
  let score = 0;
  const maxScore = 5;

  const resumeText = JSON.stringify(resumeData);
  const wordCount = resumeText.split(/\s+/).length;

  if (wordCount < 100) {
    score = 1;
    tips.push('Your resume seems too short. Add more details about your experience and skills');
  } else if (wordCount > 1500) {
    score = 3;
    tips.push('Your resume may be too long. Try to keep it concise (1-2 pages)');
  } else {
    score = 5;
  }

  return { category: 'Resume Length', score, maxScore, tips };
}

function checkActionVerbs(resumeData) {
  const tips = [];
  let score = 0;
  const maxScore = 5;

  const experience = resumeData?.experience || resumeData?.workExperience || [];
  const allBullets = experience.flatMap((job) => {
    const bullets = job.bullets || job.responsibilities || job.description || [];
    return Array.isArray(bullets) ? bullets : [];
  });

  if (allBullets.length === 0) {
    tips.push('Add bullet points starting with strong action verbs');
    return { category: 'Action Verbs', score, maxScore, tips };
  }

  const bulletsText = allBullets.join(' ').toLowerCase();
  const foundVerbs = ACTION_VERBS.filter((verb) => bulletsText.includes(verb));

  if (foundVerbs.length >= 5) {
    score = 5;
  } else if (foundVerbs.length >= 3) {
    score = 3;
    tips.push('Use more action verbs like: ' + ACTION_VERBS.filter((v) => !foundVerbs.includes(v)).slice(0, 5).join(', '));
  } else if (foundVerbs.length >= 1) {
    score = 2;
    tips.push('Start your bullet points with strong action verbs like: ' + ACTION_VERBS.slice(0, 5).join(', '));
  } else {
    tips.push('Use action verbs to start your bullet points: ' + ACTION_VERBS.slice(0, 5).join(', '));
  }

  return { category: 'Action Verbs', score, maxScore, tips };
}

export function checkAtsScore(resumeData, jobDescription = '') {
  if (!resumeData) {
    return {
      score: 0,
      breakdown: [],
      keywords: { found: [], missing: [] },
      overallTips: ['Start building your resume to get an ATS score'],
    };
  }

  const contactResult = checkContactInfo(resumeData);
  const summaryResult = checkSummary(resumeData);
  const experienceResult = checkExperience(resumeData);
  const educationResult = checkEducation(resumeData);
  const skillsResult = checkSkills(resumeData);
  const keywordResult = checkKeywordMatch(resumeData, jobDescription);
  const lengthResult = checkResumeLength(resumeData);
  const actionVerbResult = checkActionVerbs(resumeData);

  const breakdown = [
    contactResult,
    summaryResult,
    experienceResult,
    educationResult,
    skillsResult,
    keywordResult,
    lengthResult,
    actionVerbResult,
  ];

  const totalScore = breakdown.reduce((sum, item) => sum + item.score, 0);
  const totalMaxScore = breakdown.reduce((sum, item) => sum + item.maxScore, 0);
  const score = Math.round((totalScore / totalMaxScore) * 100);

  const overallTips = [];
  if (score < 40) {
    overallTips.push('Your resume needs significant improvement. Focus on adding all essential sections.');
  } else if (score < 60) {
    overallTips.push('Your resume is a good start but needs more work to pass ATS filters.');
  } else if (score < 80) {
    overallTips.push('Your resume is looking good! A few improvements will make it even stronger.');
  } else {
    overallTips.push('Great job! Your resume is well-optimized for ATS systems.');
  }

  const keywords = keywordResult.keywords || { found: [], missing: [] };

  return { score, breakdown, keywords, overallTips };
}
