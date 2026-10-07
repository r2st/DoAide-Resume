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

          {/* Breakdown */}
          {breakdown.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Score Breakdown</h3>
              <div className="space-y-2">
                {breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${item.score}%`,
                            backgroundColor:
                              item.score >= 80 ? '#059669' : item.score >= 60 ? '#d97706' : '#dc2626',
                          }}
                        />
                      </div>
                      <span className="w-8 text-right font-medium text-gray-700">{item.score}</span>
                    </div>
                  </div>
                ))}
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

        <div className="px-6 pb-5">
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
