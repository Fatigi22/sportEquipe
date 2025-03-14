const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { createSession, getSessions, updateSession, deleteSession } = require('../controllers/sessionController');

const router = express.Router();

router.post('/', authenticate, authorize(['trainer']), createSession);
router.get('/', authenticate, getSessions);
router.put('/:id', authenticate, authorize(['trainer']), updateSession);
router.delete('/:id', authenticate, authorize(['trainer']), deleteSession);

module.exports = router;