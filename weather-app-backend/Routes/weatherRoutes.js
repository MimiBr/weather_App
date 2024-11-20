const express = require("express");

const router = express.Router();
const weatherController = require('../controllers/weatherController')
const {authenticateToken }=require("../middlewares/authMiddleware");
router.get('/getWeatherByCity/:city',weatherController.getWeatherByCity)
router.get('/getAllFavoriteCities',authenticateToken, weatherController.getAllFavoritesCity)
router.post('/add',authenticateToken,weatherController.addFavoriteCity)
module.exports=router

