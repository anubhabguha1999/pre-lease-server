const express = require("express");
const userrouter = express.Router();
const { signup, login, refreshAccessToken } = require("../controllers/user");

// ============================================
// PUBLIC ROUTES (No Authentication Required)
// ============================================

/**
 * @route   POST /api/v1/auth/signup
 * @desc    Register new user with OTP verification
 * @access  Public
 */
userrouter.post("/signup", (req, res, next) => signup(req, res, next));

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user with mobile number and OTP
 * @access  Public
 */
userrouter.post("/login", (req, res, next) => login(req, res, next));

/**
 * @route   GET /api/v1/auth/refresh-token
 * @desc    Refresh access token using valid refresh token
 * @access  Public (requires valid refresh token in header)
 * @header  Authorization: Bearer <refreshToken>
 */
userrouter.get("/refresh-token", (req, res, next) =>
  refreshAccessToken(req, res, next)
);

module.exports = userrouter;
