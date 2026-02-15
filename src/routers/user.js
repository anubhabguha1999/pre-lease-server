const express = require("express");
const rateLimit = require("express-rate-limit");
const userrouter = express.Router();
const {
  signup,
  login,
  logout,
  refreshAccessToken,
} = require("../controllers/user");

// ============================================
// RATE LIMITERS FOR AUTH ROUTES
// ============================================
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again after 15 minutes",
  },
});

const refreshRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 requests per window per IP (higher since it's automated)
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many refresh requests, please try again later",
  },
});

// ============================================
// PUBLIC ROUTES (No Authentication Required)
// ============================================

/**
 * @route   POST /api/v1/auth/signup
 * @desc    Register new user with OTP verification
 * @access  Public
 */
userrouter.post("/signup", authRateLimiter, signup);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user with mobile number and OTP
 * @access  Public
 */
userrouter.post("/login", authRateLimiter, login);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user by revoking refresh token
 * @access  Public (requires valid refresh token in header)
 * @header  Authorization: Bearer <refreshToken>
 */
userrouter.post("/logout", logout);

/**
 * @route   GET /api/v1/auth/refresh-token
 * @desc    Refresh access token using valid refresh token
 * @access  Public (requires valid refresh token in header)
 * @header  Authorization: Bearer <refreshToken>
 */
userrouter.get("/refresh-token", refreshRateLimiter, refreshAccessToken);

module.exports = userrouter;
