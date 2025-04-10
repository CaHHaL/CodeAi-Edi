import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, '../../data/users.json');

// Ensure the data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

export const registerUser = async (username, password) => {
    try {
        const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
        
        // Check if user already exists
        if (users.some(user => user.username === username)) {
            throw new Error('Username already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Add new user
        const newUser = {
            id: Date.now().toString(),
            username,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

        return { id: newUser.id, username: newUser.username };
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
        const user = users.find(u => u.username === username);

        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        return { id: user.id, username: user.username };
    } catch (error) {
        throw error;
    }
}; 