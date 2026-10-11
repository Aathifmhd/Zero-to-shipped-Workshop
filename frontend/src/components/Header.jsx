export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#" className="logo">
          <span className="logo-mark">0→🚀</span>
          <span>Zero to Shipped</span>
        </a>
        <nav className="nav">
          <a href="#how">How it works</a>
          <a href="#analyze" className="btn btn-small">Analyze resume</a>
        </nav>
      </div>
    </header>
  );
}
