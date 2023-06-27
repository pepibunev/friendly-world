const router = require('express').Router();

const animalManager = require('../managers/animalManager');
const { getErrorMessage } = require('../utils/errorHelper');

router.get('/', async (req, res) => {
    try {
        const animals = await animalManager.getOnlyTree();

        res.render('home', { animals });
    } catch (err) {
        res.redirect('/404', { error: getErrorMessage(err) });
    }
});

router.get('/search', async (req, res) => {
    const search = req.query.search;

    const animals = await animalManager.search(search);

    res.render('search', { animals });

});

router.get('/404', (req, res) => {
    res.render('404');
})

module.exports = router;