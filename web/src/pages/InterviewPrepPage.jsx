import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShareButtons from '../components/ShareButtons';

const QUESTION_BANK = {
  behavioral: [
    "Tell me about yourself.",
    "What is your greatest strength?",
    "What is your biggest weakness?",
    "Why do you want to work here?",
    "Where do you see yourself in 5 years?",
    "Describe a time you handled a difficult situation.",
    "Tell me about a time you showed leadership.",
    "How do you handle stress and pressure?",
    "Describe a time you had a conflict with a colleague.",
    "Why should we hire you?",
    "What motivates you?",
    "Tell me about a time you failed and what you learned.",
  ],
  technical: {
    'Software Engineer': [
      "Explain the difference between a stack and a queue.",
      "What is the time complexity of binary search?",
      "Explain REST API design principles.",
      "What are SOLID principles in object-oriented design?",
      "Describe the difference between SQL and NoSQL databases.",
      "How would you design a URL shortener like bit.ly?",
      "Explain the concept of microservices architecture.",
      "What is the difference between TCP and UDP?",
    ],
    'Data Scientist': [
      "Explain the bias-variance tradeoff.",
      "What is the difference between supervised and unsupervised learning?",
      "Explain how a random forest works.",
      "What metrics would you use to evaluate a classification model?",
      "Describe a time you used data to drive a business decision.",
      "Explain cross-validation and why it matters.",
      "What is regularisation and when would you use it?",
      "How do you handle missing data in a dataset?",
    ],
    'Product Manager': [
      "How do you prioritise features?",
      "Describe your approach to writing a PRD.",
      "How do you measure product success?",
      "Tell me about a product you admire and why.",
      "How do you handle disagreements with engineering?",
      "What is your approach to user research?",
      "How would you improve a product you use daily?",
      "Describe a metric you would track for a social media feed.",
    ],
    'Marketing Manager': [
      "How do you measure ROI on marketing campaigns?",
      "Describe a successful campaign you have managed.",
      "What is your approach to content marketing strategy?",
      "How do you handle a campaign that is underperforming?",
      "What tools do you use for analytics and reporting?",
      "How do you approach SEO for a new website?",
    ],
    'Business Analyst': [
      "How do you gather requirements from stakeholders?",
      "Describe your approach to writing user stories.",
      "What is the difference between functional and non-functional requirements?",
      "How do you validate that a solution meets business needs?",
      "Explain use case diagrams and when you would use them.",
      "How do you handle scope creep?",
    ],
    'General': [
      "What do you know about our company?",
      "What are your salary expectations?",
      "When can you start?",
      "Do you have any questions for us?",
      "What is your ideal work environment?",
      "How do you stay current in your field?",
    ],
  },
  situational: [
    "Your manager asks you to complete a task you think is wrong. What do you do?",
    "A client is unhappy with the deliverable. How do you handle it?",
    "You realise you cannot meet a deadline. What steps do you take?",
    "A teammate is not pulling their weight. How do you address it?",
    "You are given two urgent tasks but can only complete one. How do you decide?",
    "You discover a bug in production right before a demo. What do you do?",
  ],
};

const TIPS = {
  behavioral: "Use the STAR method (Situation, Task, Action, Result) to structure your answers. Be specific with examples from your past experience.",
  technical: "Think out loud and explain your reasoning process. It's okay to ask clarifying questions before answering. Interviewers value your approach as much as the answer.",
  situational: "Focus on demonstrating problem-solving skills and professionalism. Show that you can think critically under pressure and communicate effectively.",
};

const ROLES = Object.keys(QUESTION_BANK.technical);

function extractKeywords(jd) {
  if (!jd || !jd.trim()) return [];
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'can', 'could', 'of', 'in', 'to', 'for', 'with', 'on', 'at', 'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'and', 'but', 'or', 'not', 'no', 'nor', 'so', 'yet', 'both', 'either', 'neither', 'each', 'every', 'all', 'any', 'few', 'more', 'most', 'other', 'some', 'such', 'than', 'too', 'very', 'also', 'just', 'about', 'up', 'out', 'if', 'then', 'this', 'that', 'these', 'those', 'it', 'its', 'we', 'our', 'you', 'your', 'they', 'their', 'who', 'which', 'what', 'when', 'where', 'how', 'why', 'ability', 'experience', 'work', 'working', 'strong', 'excellent', 'good', 'well', 'years', 'minimum', 'required', 'preferred', 'looking', 'role', 'position', 'team', 'company']);
  const words = jd.toLowerCase().replace(/[^a-z0-9\s+#.-]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
  const freq = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([w]) => w);
}

function generateQuestionsFromJD(jd, role) {
  const keywords = extractKeywords(jd);
  const jdQuestions = [];

  if (keywords.length > 0) {
    jdQuestions.push(`What experience do you have with ${keywords.slice(0, 3).join(', ')}?`);
    if (keywords.length > 3) {
      jdQuestions.push(`How would you apply your knowledge of ${keywords.slice(3, 6).join(' and ')} in this role?`);
    }
    jdQuestions.push(`Describe a project where you used ${keywords[0]} to deliver results.`);
  }

  return jdQuestions;
}

export default function InterviewPrepPage() {
  const [role, setRole] = useState('General');
  const [jobDescription, setJobDescription] = useState('');
  const [generated, setGenerated] = useState(null);

  useEffect(() => {
    document.title = 'Free Interview Preparation Tool | DoAide Resume';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.content = 'Prepare for your job interview with role-specific questions. Paste a job description to get tailored behavioral, technical, and situational questions with expert tips.';
    }
  }, []);

  const handleGenerate = () => {
    const behavioral = [...QUESTION_BANK.behavioral].sort(() => Math.random() - 0.5).slice(0, 5);
    const techPool = QUESTION_BANK.technical[role] || QUESTION_BANK.technical['General'];
    const technical = [...techPool].sort(() => Math.random() - 0.5).slice(0, 5);
    const situational = [...QUESTION_BANK.situational].sort(() => Math.random() - 0.5).slice(0, 3);
    const jdQuestions = generateQuestionsFromJD(jobDescription, role);
    const keywords = extractKeywords(jobDescription);

    setGenerated({ behavioral, technical, situational, jdQuestions, keywords });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Free Interview Preparation Tool
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            Get role-specific interview questions tailored to your job description. Practice behavioral,
            technical, and situational questions with expert tips on how to answer.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Generate Interview Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Your Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Paste Job Description <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here for tailored questions..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleGenerate}
              className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold text-lg rounded-xl hover:bg-indigo-700 transition shadow-lg"
            >
              Generate Questions
            </button>
          </div>
        </div>
      </section>

      {generated && (
        <section className="max-w-4xl mx-auto px-4 pb-12">
          {generated.keywords.length > 0 && (
            <div className="mb-8 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
              <h3 className="text-sm font-bold text-indigo-800 mb-2">Keywords Detected in Job Description</h3>
              <div className="flex flex-wrap gap-2">
                {generated.keywords.map((kw) => (
                  <span key={kw} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {generated.jdQuestions.length > 0 && (
            <QuestionSection
              title="Job-Specific Questions"
              tip="These questions are generated based on the keywords in the job description. Prepare concrete examples for each."
              questions={generated.jdQuestions}
              color="purple"
            />
          )}

          <QuestionSection
            title="Behavioral Questions"
            tip={TIPS.behavioral}
            questions={generated.behavioral}
            color="blue"
          />

          <QuestionSection
            title={`Technical Questions (${role})`}
            tip={TIPS.technical}
            questions={generated.technical}
            color="green"
          />

          <QuestionSection
            title="Situational Questions"
            tip={TIPS.situational}
            questions={generated.situational}
            color="amber"
          />

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
            <p className="text-sm text-blue-700">
              Make sure your resume is interview-ready too.{' '}
              <Link to="/ats-checker" className="font-semibold underline hover:text-blue-900">
                Check your ATS score
              </Link>{' '}
              or{' '}
              <Link to="/" className="font-semibold underline hover:text-blue-900">
                build a new resume
              </Link>.
            </p>
          </div>
        </section>
      )}

      <div className="max-w-4xl mx-auto px-4 py-6">
        <ShareButtons text="Practice interview questions for free — no login needed!" toolName="Interview Prep Tool" />
      </div>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Interview Preparation Tips</h2>
          <p className="text-gray-500 text-center mb-10">Follow these tips to ace your next interview.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Research the Company", desc: "Study the company's products, culture, recent news, and competitors. Mention specifics during the interview to show genuine interest." },
              { title: "Use the STAR Method", desc: "Structure behavioral answers as Situation, Task, Action, Result. This keeps your answers focused and impactful." },
              { title: "Prepare Your Own Questions", desc: "Always have 3-5 thoughtful questions ready for the interviewer. It shows engagement and helps you evaluate the opportunity." },
              { title: "Practice Out Loud", desc: "Rehearse your answers by speaking them out, not just reading them mentally. Record yourself to catch filler words and improve delivery." },
              { title: "Dress Appropriately", desc: "Research the company's dress code. When in doubt, business formal is always a safe choice for Indian companies." },
              { title: "Follow Up After", desc: "Send a thank-you email within 24 hours of the interview. Reference something specific from the conversation." },
            ].map((tip, idx) => (
              <div key={idx} className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function QuestionSection({ title, tip, questions, color }) {
  const colorMap = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-700' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-100 text-green-700' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', badge: 'bg-purple-100 text-purple-700' },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={`mb-8 p-6 ${c.bg} border ${c.border} rounded-2xl`}>
      <h3 className={`text-lg font-bold ${c.text} mb-2`}>{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{tip}</p>
      <ol className="space-y-3">
        {questions.map((q, idx) => (
          <li key={idx} className="flex gap-3 items-start">
            <span className={`flex-shrink-0 w-6 h-6 ${c.badge} rounded-full flex items-center justify-center text-xs font-bold`}>
              {idx + 1}
            </span>
            <span className="text-gray-800 text-sm leading-relaxed">{q}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
