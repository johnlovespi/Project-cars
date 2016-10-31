const router = require('express').Router();
const model = require('../models/vehicle');
const { getRandomImage } = require('../services/background');
const { saveFavorite, getFavorites, } = require('../models/vehicle')


router.get('/', (req, res) => {
  console.log(res.saved);
    res.render('index')
    res.json(res.results);
});

router.get('/show', model.searchByName, (req, res) => {
    // res.json(res.results);
    res.render('show', {
      results: res.results || [],
      favorites: res.favorites || [],
    });
});
router.post('/show', saveFavorite, getFavorites, (req, res) => {
   res.json(res.saved)
   // console.log(res.)
  res.render('show', {
    favorites: res.favorites || [],
  });
});

// router.post('/favorites', (req, res) => {
//   res.render('/');
// });

router.get('/', (req, res) => {
  res.render('index');
});

// This route serves your `/login` form
router.get('/login', (req, res) => {
  res.render('login');
});

// This route serves your `/signup` form
router.get('/signup', (req, res) => {
  res.render('signup');
});

//background image function
// router.get('/', getRandomImage, (req, res) => {
//  // res.json(res.results);
//     res.render('index', {
//       image: res.image,
//     });
// });


// router.get('/', getRandomImage, (req, res) => {
//   res.render('index', {
//     image: res.image,
//   });
//   console.log(res.image);
// });









module.exports = router;
