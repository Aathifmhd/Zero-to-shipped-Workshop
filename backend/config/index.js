export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zero-to-shipped',
  // Comma-separated list of allowed frontend origins.
  clientUrl: (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((s) => s.trim()),
  // Without a key the API falls back to keyword matching.
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  claudeModel: process.env.CLAUDE_MODEL || 'claude-opus-5-5',
  // Vercel rejects request bodies over 4.5 MB, so stay under that.
  maxFileSizeMb: 4,
};
