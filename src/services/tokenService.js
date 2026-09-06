const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.Jwt || process.env.JWT_SECRET || 'coursify_secret_key';

/**
 * Generate auth JWT token
 * @param {string} email
 * @param {string|object} id
 * @returns {string}
 */
const generateAuthToken = (email, id) => {
    return jwt.sign({ email, _id: id }, JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Generate temporary token for OTP flow
 * @param {object} payload
 * @param {string} expiresIn
 * @returns {string}
 */
const generateTemporaryToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verify JWT token
 * @param {string} token
 * @returns {object} Decoded payload
 */
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    generateAuthToken,
    generateTemporaryToken,
    verifyToken,
};
