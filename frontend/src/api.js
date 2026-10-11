// Locally Vite proxies /api to the backend; in production set VITE_API_URL to the backend's URL.
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export async function analyzeResume(file, jobDescription) {
  const body = new FormData();
  body.append('resume', file);
  body.append('jobDescription', jobDescription);

  let res;
  try {
    res = await fetch(`${API_URL}/api/resume/analyze`, { method: 'POST', body });
  } catch {
    throw new Error('Could not reach the server. Is the backend running?');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}
