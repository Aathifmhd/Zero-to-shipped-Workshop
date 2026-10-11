import { useRef, useState } from 'react';

const MAX_MB = 4;

export default function UploadForm({ onAnalyze, loading, error }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState('');
  const inputRef = useRef(null);

  function pickFile(f) {
    if (!f) return;
    if (f.type !== 'application/pdf') return setLocalError('Please choose a PDF file.');
    if (f.size > MAX_MB * 1024 * 1024) return setLocalError(`File must be under ${MAX_MB} MB.`);
    setLocalError('');
    setFile(f);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) return setLocalError('Upload your resume first.');
    if (jobDescription.trim().length < 20) return setLocalError('Paste a job description (at least 20 characters).');
    setLocalError('');
    onAnalyze(file, jobDescription);
  }

  const shownError = localError || error;

  return (
    <form className="card upload-card" onSubmit={handleSubmit}>
      <div className="upload-grid">
        <div>
          <label className="field-label">1. Your resume</label>
          <div
            className={`dropzone ${dragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => pickFile(e.target.files[0])}
            />
            {file ? (
              <>
                <div className="drop-icon">📄</div>
                <strong className="file-name">{file.name}</strong>
                <span className="muted">{(file.size / 1024).toFixed(0)} KB · click to change</span>
              </>
            ) : (
              <>
                <div className="drop-icon">⬆️</div>
                <strong>Drop your PDF here</strong>
                <span className="muted">or click to browse · max {MAX_MB} MB</span>
              </>
            )}
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="jd">2. Job description</label>
          <textarea
            id="jd"
            className="textarea"
            placeholder="Paste the full job description here…"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      {shownError && <p className="error">⚠️ {shownError}</p>}

      <button type="submit" className="btn btn-block" disabled={loading}>
        {loading ? <><span className="spinner" /> Analyzing… this can take up to a minute</> : 'Analyze resume'}
      </button>
    </form>
  );
}
