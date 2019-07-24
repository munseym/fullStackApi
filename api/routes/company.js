const router = require('express').Router()
const Unit = require('../models/unit');
const { generate: generateId } = require('shortid')

router.get('/', async (req, res, next) => {
  const status = 200
  const { name, employees_lte, employees_gte } = req.query;
  const companies = await Unit.find().select('company')
  let response;
  if(name){
    response = await Unit.find({ "company.name": new RegExp(name)}).select('company')
  }else if(employees_lte){
    response = companies.map((unit) => unit.company)
    response = response.filter((c) => c.employees.length <= employees_lte)
  }else if(employees_gte){
    response = companies.map((unit) => unit.company)
    response = response.filter((c) => c.employees.length >= employees_gte)
  }else{
    response = await Unit.find().select('company')
  }
  res.json({ status, response })
})

module.exports = router