export const config = {
    apiUrl: process.env.NODE_ENV === 'production'
        ? 'https://codeai-backend.onrender.com'  // Updated backend URL
        : 'http://localhost:5000'
}; 