const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScoreRing({ score, tone }) {
  const offset = CIRCUMFERENCE * (1 - score / 100);
  return (
    <div className={`score-ring ring-${tone}`}>
      <svg viewBox="0 0 120 120" width="140" height="140">
        <circle cx="60" cy="60" r={RADIUS} className="ring-track" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          className="ring-value"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="ring-label">
        <strong>{score}</strong>
        <span>/ 100</span>
      </div>
    </div>
  );
}
