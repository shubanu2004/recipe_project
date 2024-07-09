const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App Routes 
*/
router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.exploreRecipe );
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);

const users = [];

// Mock functions for handling login and registration
const handleLogin = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        req.session.username = user.username;
        res.redirect('/account');
    } else {
        res.render('login', { pageTitle: 'Login', isLogin: true, successMessage: '', errorMessage: 'Invalid email or password.' });
    }
};

const handleRegister = (req, res) => {
    const { username, email, password } = req.body;

    if (username && email && password) {
        users.push({ username, email, password });
        req.session.username = username;
        res.redirect('/account');
    } else {
        res.render('login', { pageTitle: 'Register', isLogin: false, successMessage: '', errorMessage: 'All fields are required.' });
    }
};

router.get('/login', (req, res) => {
    res.render('login', { pageTitle: 'Login', isLogin: true, successMessage: '', errorMessage: '' });
});

router.get('/register', (req, res) => {
    res.render('login', { pageTitle: 'Register', isLogin: false, successMessage: '', errorMessage: '' });
});

router.get('/account', (req, res) => {
    if (req.session.username) {
        res.render('account', { username: req.session.username });
    } else {
        res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/account');
        }
        res.redirect('/login');
    });
});

router.post('/login', handleLogin);
router.post('/register', handleRegister);

 
module.exports = router;