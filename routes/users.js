/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const express      = require('express');
const { createUser }    = require('../models/loginUsers.js');
const { authenticate }   = require('../lib/auth');

// const usersRouter  = express.Router();
const router = require('express').Router();
/**
 * Creates a new user by handling the POST request from a form with action `/users`
 * It uses the createUser middleware from the user model
 */
router.post('/', createUser, (req, res) => {
  res.redirect('/');
});

/**
 * Takes the user to its profile by handling any GET request to `/users/profile`
 * It redirects to /login when attempted to be reached by a non logged in user
 * It is "protected" by the authenticate middleware from the auth library
 */
router.get('/profile', authenticate, (req, res) => {
  res.render('users/profile', { user: res.user });
});

module.exports = router;
