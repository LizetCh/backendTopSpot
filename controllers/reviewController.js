const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');

// crear review
const createReview = asyncHandler(async (req, res) => {
  const { user, itemId, rating, comment } = req.body;

  if (!user || !itemId || !rating) {
    res.status(400);
    throw new Error('Faltan campos obligatorios');
  }

  const review = await Review.create({
    user,
    itemId,
    rating,
    comment,
  });

  res.status(201).json(review);
});

// obtener todas las reviews
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
});

// obtener una review por id
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review no encontrada');
  }

  res.status(200).json(review);
});

// actualizar un review
const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review no encontrada');
  }

  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true // para checar que se cumplan todos los campos
  });

  res.status(200).json(updatedReview);
});

// eliminar un review
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review no encontrada');
  }

  await review.deleteOne();
  res.status(200).json({"mensaje": `Reseña con id ${req.params.id} eliminada`});
});

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
