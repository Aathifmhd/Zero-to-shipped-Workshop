export default function Hero() {
  return (
    <section className="hero container">
      <span className="badge">Resume Parser · v1</span>
      <h1>
        Know your match score <br />
        <span className="gradient-text">before you hit apply.</span>
      </h1>
      <p className="hero-sub">
        Upload your resume PDF, paste the job description, and instantly see your score, the
        skills you already have, and the ones you're missing.
      </p>
      <a href="#analyze" className="btn">Get my score →</a>
    </section>
  );
}
