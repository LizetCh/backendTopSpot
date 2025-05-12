const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const Song = require('../models/songModel');
const Album = require('../models/albumModel');


// crear review
const createReview = asyncHandler(async (req, res) => {
  const { user, itemId, rating, comment, itemType } = req.body;

  if (!user || !itemId || !rating || !itemType) {
    res.status(400);
    throw new Error('Faltan campos obligatorios');
  }

  const review = await Review.create({
    user,
    itemId,
    itemType, 
    rating,
    comment,
  });

  res.status(201).json(review);
});

// obtener todas las reviews
async function getAllReviews(req, res) {
  try {
    const reviews = await Review.find().populate('user');

    const populatedReviews = await Promise.all(
      reviews.map(async (review) => {
        let item = null;

        if (review.itemType === 'song') {
          item = await Song.findById(review.itemId);
        } else if (review.itemType === 'album') {
          item = await Album.findById(review.itemId);
        }

        return {
          _id: review._id,
          comment: review.comment,
          rating: review.rating,
          date: review.date,
          user: {
            username: review.user.username,
            profilePic: review.user.profilePic || null,
          },
          item: item
            ? {
                title: item.title,
                artist: item.artist,
                cover: item.coverUrl || null,
              }
            : null,
        };
      })
    );

    res.json(populatedReviews);
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
}

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
