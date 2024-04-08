const express = require('express');
const router = express.Router({mergeParams:true});
const ExpressError = require('../utils/ExpressErrors.js');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const WrapAsync = require('../utils/WrapAsync.js');
const{validateReview, isLoggedin, isReviewAuthor}=require('../middleware.js');

const ReviewController=require('../controllers/reviews.js');
// Review Route
router.post("/", isLoggedin,validateReview, WrapAsync(ReviewController.createReview));
// Delete Route
router.delete("/:reviewId", isLoggedin,isReviewAuthor,WrapAsync(ReviewController.destroyReview));

module.exports = router;
