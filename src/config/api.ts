// OpenAI API configuration
export const apiUrl = 'https://api.openai.com/v1/chat/completions';

// Get API key from environment variable
export const apiKey = process.env.OPENAI_API_KEY || '';

// For security, never include actual API keys in code that will be committed to a repository
// The actual key should be set in .env file which should be in .gitignore