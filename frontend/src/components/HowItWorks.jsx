const STEPS = [
  { icon: '📄', title: 'Upload', text: 'Drop in your resume as a PDF — we read the text straight out of it.' },
  { icon: '📋', title: 'Paste the JD', text: 'Add the job description you are applying for.' },
  { icon: '📊', title: 'Get your score', text: 'See your match score plus the skills you have and the ones you are missing.' },
];

export default function HowItWorks() {
  return (
    <section id="how" className="container how">
      <h2 className="section-title">How it works</h2>
      <div className="steps">
        {STEPS.map((s, i) => (
          <div key={s.title} className="card step">
            <div className="step-icon">{s.icon}</div>
            <span className="step-num">Step {i + 1}</span>
            <h3>{s.title}</h3>
            <p className="muted">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
