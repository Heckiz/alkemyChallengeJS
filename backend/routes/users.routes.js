const {Router} = require('express');
const {signin, signup, logout} = require('../controllers/users.controller.js');

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);

module.exports = router;