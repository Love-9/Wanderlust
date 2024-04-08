const express = require('express');
const router = express.Router();
const WrapAsync = require('../utils/WrapAsync.js');
const {isLoggedin, isOwner,validateListing}=require('../middleware.js');
const multer  = require('multer')
const{storage}=require('../cloudconfig.js');
const upload = multer({storage})


const listingController=require('../controllers/listing.js');

router
.route("/")
.get( WrapAsync(listingController.index))
.post(isLoggedin,upload.single('listing[image]'),WrapAsync(listingController.createListing));



// router.post("/",isLoggedin,validateListing,upload.single('listing[image]'), WrapAsync(listingController.createListing));



router.get("/new",isLoggedin,listingController.renderNewForm);

router.route("/:id")
.get( WrapAsync(listingController.showListing))
.put( isLoggedin,isOwner,validateListing,upload.single('listing[image]'),WrapAsync(listingController.updateListing))
.delete(isLoggedin,isOwner, WrapAsync(listingController.destroyListing));



router.get("/:id/edit",isLoggedin,isOwner ,WrapAsync(listingController.renderEditForm));

module.exports = router;
