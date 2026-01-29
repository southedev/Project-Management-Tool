const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
// const cloudinary = require('cloudinary').v2;

const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Always allow the GitHub Pages origin for the frontend
        if (origin === 'https://southedev.github.io') {
            return callback(null, true);
        }
        
        // Split allowed origins and trim whitespace
        const allowedOrigins = process.env.ALLOWED_ORIGINS 
            ? process.env.ALLOWED_ORIGINS.split(',').map(url => url.trim()) 
            : [];
        
        // Check if origin matches any allowed origin (including wildcard patterns)
        const isAllowed = allowedOrigins.some(allowedOrigin => {
            // Handle wildcard pattern (e.g., https://example.com/* should match https://example.com)
            if (allowedOrigin.endsWith('/*')) {
                const baseUrl = allowedOrigin.slice(0, -2); // Remove '/*' from the end
                return origin === baseUrl || origin.startsWith(baseUrl + '/');
            }
            // Direct match
            return origin === allowedOrigin;
        });
        
        if (isAllowed) {
            return callback(null, true);
        }
        
        // Check if we're in production
        const isProduction = process.env.NODE_ENV === 'production';
        
        // For production, also allow vercel.app domains or localhost
        if (isProduction) {
            // Allow any vercel.app subdomain for Vercel deployments
            if (origin.endsWith('.vercel.app')) {
                return callback(null, true);
            }
            // Also allow localhost for development testing
            if (origin && (origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:'))) {
                return callback(null, true);
            }
        } else {
            // Development: allow localhost ports
            const devOrigins = [
                "http://localhost:5173",
                "http://localhost:3000",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:3000"
            ];
            
            if (devOrigins.includes(origin)) {
                return callback(null, true);
            }
        }
        
        callback(new Error('Not allowed by CORS'));
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
};
app.use(cors(corsOptions));

// db connection
connectDB();

// app.use(morgan('dev'));

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        message : "Welcome to ProjectFlow API"
    })
});

// API routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/workspaces', require('./routes/workspace.routes'));

// 404 middleware (must be after all routes)
app.use((req, res) => {
    res.status(404).json({ message : "Not found" })
});

// Error middleware (must be last)
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ message : "Internal Server Error" })
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})