const fetch = require('node-fetch');
const CARS_URL = 'https://api.edmunds.com/api/vehicle/v2/'
const MEDIA_CAR = 'https://media.ed.edmunds-media.com'
const DB_CONNECTION = process.env.MONGODB_URI || 'mongodb://localhost:27017/car_models '
// const CAR_PHOTO = 'https://api.edmunds.com/api/media/v2/photoset?'

const API_KEY = process.env.API_KEY;

//grabbing objects from databass
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

const { getDB } = require('../lib/dbConnect');


function searchByName (req,res,next) {
  // console.log('body is' + req.query.carModel);
  fetch(`${CARS_URL}/${req.query.carModel}/${req.query.carMake}/2015?fmt=json&api_key=${API_KEY}`)
  .then(r => r.json())
  .then((results) => {
   console.log(results);
    res.results = results;
    next();
  })
 .catch((err) => {
    console.log(err);
    res.err = err;
    next();
})
}

//save function cars
function saveFavorite(req, res, next) {
  console.log('here');
  const insertObj = {};
  for(key in req.body) {
    insertObj[key] = req.body[key];
  }
  console.log('insertObj: ',insertObj);
insertObj.taco.userId = req.session.userId;
console.log('insertObj after session', insertObj);
    getDB().then((db) => {
      db.collection('favorites')
      .insert(insertObj.taco, (insertErr, result) => {
         if (insertErr) return next(insertErr);
         console.log('Insert Object: ', result);
      res.favorites = result;
      db.close();
      next();

    })
    return false;
  });
  return false;
}

//button to get cars
function getFavorites(req, res, next) {
  console.log('Get FAVOIRUTES!!!!');

  MongoClient.connect(DB_CONNECTION, (err, db) => {
    if (err) return next(err);
  db.collection('favorites')
      .find({userId: {$eq: req.session.userId}})
      .toArray((arrayError, data) => {
        if (arrayError) return next(arrayError);
        // return the data
        res.favorites = data;
        console.log('FAVORITES HERE: ', data);
        db.close();
        return next();
      });
    return false;
  });
  return false;
}



//deleting from favortite function
function deleteFavorite(req, res, next) {
  getDB().then((db) => {
    dbcollection('favorites')
    .findAndRemove({_id: ObjectID(req.params.id) },(removeErr,result)=>{
      if(removeErr) return next(removeErr);
      res.delete = result;
      db.close();
      next();
    });
    return false;
  });
   return false;
 }

module.exports = {
  searchByName,
  // filterByimage,
  getFavorites,
  saveFavorite,
  deleteFavorite,
};


