const router = require('express').Router();
const model = require('../models/vehicle');


router.get('/', (req, res) => {
    res.render('index');
    // res.json(res.results);
});

router.get('/show', model.searchByName, (req, res) => {
    res.render('show', {
      results: res.results,
    });
    // res.json(res.results);

});

// router.post('/show', model.searchByName, (req, res) => {
//     res.render('show', {
//       results: res.results,
//     });
//     res.json(res.results);

// });

module.exports = router;
