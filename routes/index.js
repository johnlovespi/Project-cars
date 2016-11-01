const router = require('express').Router();
const model = require('../models/vehicle');
const { getRandomImage } = require('../services/background');
const { saveFavorite, getFavorites, deleteFavorite } = require('../models/vehicle')



router.get('/', (req, res) => {
  console.log(res.saved);
    res.render('index')
    res.json(res.results);
});


router.get('/show', model.searchByName, getFavorites, (req, res) => {
  res.render('show', {
    results: res.results || [],
    favorites: res.favorites || [],
  });
});
router.post('/favorites', saveFavorite, (req, res) => {
  // res.render('show', {
  //   results: res.results || [],
  //   favorites: res.favorites || [],
  // });
   res.redirect('/show');
});

router.delete('/favorites/:id', deleteFavorite, (req, res) => {
  res.render('show', {
    results: res.results || [],
    favorites: res.favorites || [],
  });
  res.redirect('/show');
});



// This route serves your `/login` form
router.get('/login', (req, res) => {
  res.render('login');
});



// This route serves your `/signup` form
router.get('/signup', (req, res) => {
  res.render('signup');
});



// background image function
// router.get('/', getRandomImage, (req, res) => {
//  // res.json(res.results);
//     res.render('index', {
//       image: res.image,
//     });
// })


module.exports = router;
