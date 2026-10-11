import { useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import UploadForm from './components/UploadForm.jsx';
import Results from './components/Results.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Footer from './components/Footer.jsx';
import { analyzeResume } from './api.js';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultsRef = useRef(null);

  async function handleAnalyze(file, jobDescription) {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await analyzeResume(file, jobDescription);
      setResult(data);
      requestAnimationFrame(() =>
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section id="analyze" className="container analyze">
          <UploadForm onAnalyze={handleAnalyze} loading={loading} error={error} />
          <div ref={resultsRef}>{result && <Results result={result} />}</div>
        </section>
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
