export async function analyzeResume(file, jobDescription) {
  const body = new FormData();
  body.append('resume', file);
  body.append('jobDescription', jobDescription);

  let res;
  try {
    res = await fetch('/api/resume/analyze', { method: 'POST', body });
  } catch {
    throw new Error('Could not reach the server. Is the backend running?');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}
