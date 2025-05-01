const express = require('express');
const router = express.Router();
const { createReview, getAllReviews, getReviewById, updateReview, deleteReview} = require('../controllers/reviewController');

//crear review
router.post('/', createReview);

// obtener todas las reviews
router.get('/', getAllReviews);

//obtener review por id
router.get('/:id', getReviewById);

//actualizar review
router.put('/:id', updateReview);

//eliminar review
router.delete('/:id', deleteReview);

module.exports = router;
