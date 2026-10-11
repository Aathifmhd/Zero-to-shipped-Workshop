import ScoreRing from './ScoreRing.jsx';

function verdict(score) {
  if (score >= 80) return { label: 'Strong match', tone: 'good' };
  if (score >= 50) return { label: 'Decent match', tone: 'ok' };
  return { label: 'Needs work', tone: 'bad' };
}

function SkillList({ title, skills, tone, empty }) {
  return (
    <div className="card skill-card">
      <h3>
        {title} <span className="count">{skills.length}</span>
      </h3>
      {skills.length ? (
        <ul className="chips">
          {skills.map((s) => (
            <li key={s} className={`chip chip-${tone}`}>{s}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">{empty}</p>
      )}
    </div>
  );
}

export default function Results({ result }) {
  const { score, matchedSkills, missingSkills, fileName } = result;
  const v = verdict(score);

  return (
    <div className="results">
      <div className="card score-card">
        <ScoreRing score={score} tone={v.tone} />
        <div>
          <span className={`pill pill-${v.tone}`}>{v.label}</span>
          <h2>Your resume matches {score}% of this job</h2>
          <p className="muted">
            {fileName} · {matchedSkills.length} of {matchedSkills.length + missingSkills.length} required skills found
          </p>
        </div>
      </div>

      <div className="skills-grid">
        <SkillList
          title="✅ Skills present"
          skills={matchedSkills}
          tone="good"
          empty="None of the job's skills were found in your resume."
        />
        <SkillList
          title="❌ Skills missing"
          skills={missingSkills}
          tone="bad"
          empty="Nothing missing — you cover every skill in this job description!"
        />
      </div>
    </div>
  );
}
