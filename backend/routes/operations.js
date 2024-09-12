const express = require('express');
const { addOperation, getOperations, deleteOperation } = require('../controllers/operationsController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addOperation);
router.get('/', protect, getOperations);
router.delete('/:id', protect, deleteOperation);

module.exports = router;
