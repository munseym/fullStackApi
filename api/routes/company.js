const router = require('express').Router()
const Unit = require('../models/unit');
const { generate: generateId } = require('shortid')

router.get('/', async (req, res, next) => {
  const status = 200
  const { name } = req.query;
  let response;
  if(name){
    response = await Unit.find({company: {$regex: `.*${req.query.name}.*` }}).select( 'company' );
  }else{
    response = await Unit.find().select( 'company' );
  }
  res.json({ status, response })
})

module.exports = router