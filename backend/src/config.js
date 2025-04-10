export const config = {
    port: process.env.PORT || 5000,
    geminiApiKey: process.env.GEMINI_API_KEY,
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.NODE_ENV === 'production' 
        ? 'https://codeai-frontend.onrender.com'  // Updated frontend URL
        : 'http://localhost:3000'
}; 