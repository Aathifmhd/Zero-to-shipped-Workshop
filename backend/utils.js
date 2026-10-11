export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Wraps async route handlers so rejected promises reach the error middleware.
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Display name -> lowercase aliases to look for in text.
export const SKILLS = {
  JavaScript: ['javascript', 'js', 'es6'],
  TypeScript: ['typescript'],
  Python: ['python'],
  Java: ['java'],
  'C++': ['c++', 'cpp'],
  'C#': ['c#', 'csharp'],
  Go: ['golang'],
  Rust: ['rust'],
  SQL: ['sql'],
  React: ['react', 'react.js', 'reactjs'],
  'Next.js': ['next.js', 'nextjs'],
  Vue: ['vue', 'vue.js', 'vuejs'],
  Angular: ['angular'],
  'Node.js': ['node', 'node.js', 'nodejs'],
  Express: ['express', 'express.js', 'expressjs'],
  Django: ['django'],
  Flask: ['flask'],
  'Spring Boot': ['spring boot', 'spring'],
  HTML: ['html', 'html5'],
  CSS: ['css', 'css3'],
  Tailwind: ['tailwind', 'tailwindcss'],
  Redux: ['redux'],
  GraphQL: ['graphql'],
  'REST APIs': ['rest', 'restful', 'rest api', 'rest apis'],
  MongoDB: ['mongodb', 'mongo', 'mongoose'],
  PostgreSQL: ['postgresql', 'postgres'],
  MySQL: ['mysql'],
  Redis: ['redis'],
  Docker: ['docker'],
  Kubernetes: ['kubernetes', 'k8s'],
  AWS: ['aws', 'amazon web services'],
  Azure: ['azure'],
  GCP: ['gcp', 'google cloud'],
  'CI/CD': ['ci/cd', 'cicd', 'github actions', 'jenkins'],
  Git: ['git', 'github', 'gitlab'],
  Linux: ['linux'],
  Testing: ['jest', 'vitest', 'cypress', 'playwright', 'unit testing'],
  'Machine Learning': ['machine learning'],
  'Data Analysis': ['data analysis', 'pandas', 'numpy'],
  Figma: ['figma'],
  Agile: ['agile', 'scrum'],
  Communication: ['communication'],
  Leadership: ['leadership'],
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Custom boundaries so tokens like "c++", "c#" and "ci/cd" match, but "java" doesn't match
// inside "javascript" and "js" doesn't match the tail of "node.js".
const skillPatterns = Object.entries(SKILLS).map(([name, aliases]) => ({
  name,
  regex: new RegExp(`(^|[^a-z0-9+#.])(${aliases.map(escapeRegex).join('|')})(?=$|[^a-z0-9+#])`, 'i'),
}));

export function extractSkills(text = '') {
  const normalized = text.toLowerCase().replace(/\s+/g, ' ');
  return skillPatterns.filter((p) => p.regex.test(normalized)).map((p) => p.name);
}
