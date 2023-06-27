const router = require('express').Router();

const animalManager = require('../managers/animalManager');
const { getErrorMessage } = require('../utils/errorHelper');
const { auth, isAuth } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    try {
        const animals = await animalManager.getAll().lean();
        res.render('animals/index', { animals });
    } catch (err) {
        res.redirect('/404', { error: getErrorMessage(err) });
    }
});

router.get('/create', isAuth, (req, res) => {
    res.render('animals/create');
});

router.post('/create', isAuth, async (req, res) => {
    const animalData = {
        ...req.body,
        owner: req.user._id
    };

    try {
        await animalManager.create(animalData);
        res.redirect('/animals');
    } catch (err) {
        res.render('animals/create', { error: getErrorMessage(err) });
    }
});

router.get('/:animalId/details', auth, async (req, res) => {
    const animalId = req.params.animalId;
    const animal = await animalManager.getOne(animalId).lean();

    const isOwner = req.user?._id === animal?.owner?._id.toString();

    if (!animal) {
        return res.redirect('/404');
    }

    const isDonated = animal.donation.some(donation => donation._id.toString() === req.user?._id);

    res.locals.isDonated = isDonated;

    res.render('animals/details', { animal, isOwner });
});

router.get('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animal = await animalManager.getOne(animalId).lean();

    res.render('animals/edit', { animal });
});

router.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animalData = req.body;

    try {
        await animalManager.edit(animalId, animalData);

        res.redirect(`/animals/${animalId}/details`);
    } catch (error) {
        res.render(`animals/edit`, { error: 'Unable to update animal', ...animalData });
    }
});

router.get('/:animalId/delete', isAuth, async (req, res) => {
    const animalId = req.params.animalId;

    try {
        await animalManager.delete(animalId);

        res.redirect('/animals')
    } catch (err) {
        res.render('animals/edit', { error: 'Unable to delete animal' })
    }
});

router.post('/:animalId/donation', async (req, res) => {
    const animalId = req.params.animalId;
    const userId = req.user._id;

    await animalManager.addDonation(animalId, userId);

    res.redirect(`/animals/${animalId}/details`);
});

module.exports = router;