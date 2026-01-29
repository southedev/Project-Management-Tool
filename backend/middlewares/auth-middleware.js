const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized: No valid token provided" });
        }
        
        const token = authHeader.split(" ")[1]; // Bearer token

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Invalid token format" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ error: "Unauthorized" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = authMiddleware;
