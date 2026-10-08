function ScoreCircle({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color;
  if (score >= 80) color = '#059669';
  else if (score >= 60) color = '#d97706';
  else color = '#dc2626';

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        <text
          x="70"
          y="65"
          textAnchor="middle"
          className="text-3xl font-bold"
          fill={color}
          fontSize="32"
          fontWeight="bold"
        >
          {score}
        </text>
        <text
          x="70"
          y="88"
          textAnchor="middle"
          fill="#6b7280"
          fontSize="13"
        >
          / 100
        </text>
      </svg>
      <p className="mt-2 text-sm font-medium text-gray-600">ATS Score</p>
    </div>
  );
}

export default function AtsScoreCard({ score, onClose }) {
  if (!score) return null;

  const overallScore = score.overall || 0;
  const breakdown = score.breakdown || [];
  const keywordsFound = score.keywordsFound || [];
  const keywordsMissing = score.keywordsMissing || [];
  const tips = score.tips || [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">ATS Analysis Report</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Score Circle */}
          <div className="flex justify-center">
            <ScoreCircle score={overallScore} />
          </div>

          {/* Breakdown with Pass/Fail */}
          {breakdown.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Section-wise Breakdown</h3>
              <div className="space-y-3">
                {breakdown.map((item, idx) => {
                  const status = item.score >= 80 ? 'pass' : item.score >= 50 ? 'warn' : 'fail';
                  const statusConfig = {
                    pass: { label: 'PASS', bg: 'bg-green-100', text: 'text-green-700', bar: '#059669' },
                    warn: { label: 'NEEDS WORK', bg: 'bg-yellow-100', text: 'text-yellow-700', bar: '#d97706' },
                    fail: { label: 'FAIL', bg: 'bg-red-100', text: 'text-red-700', bar: '#dc2626' },
                  }[status];
                  return (
                    <div key={idx} className="border border-gray-100 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-gray-700">{item.category}</span>
                        <div className="flex items-center gap-2">
                          {item.rawScore !== undefined && (
                            <span className="text-xs text-gray-400">{item.rawScore}/{item.maxScore}</span>
                          )}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{ width: `${item.score}%`, backgroundColor: statusConfig.bar }}
                        />
                      </div>
                      {item.tips && item.tips.length > 0 && (
                        <ul className="mt-1.5 space-y-0.5">
                          {item.tips.map((tip, tIdx) => (
                            <li key={tIdx} className="text-xs text-gray-500 flex items-start gap-1">
                              <span className="text-gray-400 mt-px">&#8226;</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Keywords Found */}
          {keywordsFound.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Keywords Found</h3>
              <div className="flex flex-wrap gap-1.5">
                {keywordsFound.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Keywords Missing */}
          {keywordsMissing.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Missing Keywords</h3>
              <div className="flex flex-wrap gap-1.5">
                {keywordsMissing.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {tips.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Improvement Tips</h3>
              <ul className="space-y-1.5">
                {tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-yellow-500 mt-0.5">&#9679;</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="px-6 pb-5 space-y-3">
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Share your ATS score</p>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`I just scored ${overallScore}/100 on the ATS Resume Checker! Check your resume's ATS score for free: https://resume.doaide.com/ats-checker`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#25D366] text-white hover:bg-[#1da851] transition-colors no-underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Share Score on WhatsApp
            </a>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
