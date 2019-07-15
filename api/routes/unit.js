const router = require('express').Router()
const Series = require('../models/unit');
const { generate: generateId } = require('shortid')

router.get('/', async (req, res, next) => {
  const status = 200
  const response = await Series.find(req.query);
  res.json({ status, response })
})

module.exports = router