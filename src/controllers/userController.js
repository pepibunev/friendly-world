const router = require('express').Router();

const { TOKEN_KEY } = require('../config/secretAndTokenConfig');
const userManager = require('../managers/userManager');
const { getErrorMessage } = require('../utils/errorHelper');


router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    try {
        const token = await userManager.register({ email, password, repeatPassword });
        
        res.cookie(TOKEN_KEY, token);
        res.redirect('/');
    } catch (err) {
        res.render('users/register', { error: getErrorMessage(err), email, password });
    }

});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userManager.login(email, password);
        
        res.cookie(TOKEN_KEY, token);
        res.redirect('/');
    } catch (err) {
        res.render('users/login', { error: getErrorMessage(err), email, password })
        
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN_KEY);

    res.redirect('/');
});

module.exports = router;