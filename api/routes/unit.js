const router = require('express').Router()
const Unit = require('../models/unit');
const { generate: generateId } = require('shortid')

router.get('/', async (req, res, next) => {
  const status = 200
  let response;
  if ('occupied' in req.query) {
    let modQuery = req.query
    delete modQuery.occupied
    response = await Unit.find(modQuery).exists('company');
  } else {
    response = await Unit.find(req.query);
  }
  res.json({ status, response })
})

router.get('/:id/company/employees', async (req, res, next) => {
  const status = 200
  const response = await Unit.findById(req.params.id).select('_id company._id company.employees');
  if (response == null) {
    res.status(404).json({ status: 404, response: `Unit ${req.params.id} not found.` })
  } else if ((!'employees' in response) || response.company.employees.length == 0) {
    res.status(404).json({ status: 404, response: `No employees found for Company ${response.company._id}.` })
  } else {
    res.json({ status, response })
  }
})

router.get('/:id/company/employees/:employeeId', async (req, res, next) => {
  const status = 200
  let response = await Unit.findOne()
    .and([
      { _id: req.params.id },
      { 'company.employees._id': req.params.employeeId }
    ]);
  console.log(response)
  if (response == null) {
    // could avoid a second call to the database by doing all the filtering in the client, 
    // however return all employees could be an expensive operation
    response = await Unit.findById(req.params.id).select('_id company._id');
    if (response == null) {
      res.status(404).json({ status: 404, response: `Unit ${req.params.id} not found.` })
    } else {
      res.status(404).json({ status: 404, response: `No Employee ${req.params.employeeId} at Unit ${req.params.id} found.` })
    }
  } else {
    res.json({ status, response })
  }
})

router.post('/:id/company/employees', async (req, res, next) => {
  const status = 206
  let response;
  try {
    reponse = await Unit.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { "company.employees": req.body } },
      { new: true }
    );
    res.status(status).json({ status, response })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
})

router.patch('/:id', async (req, res, next) => {
  const status = 206
  let response;
  try {
    reponse = await Unit.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(status).json({ status, response })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
})

router.patch('/:id/company', async (req, res, next) => {
  const status = 206
  let response;
  const company = { company: req.body }
  try {
    reponse = await Unit.findOneAndUpdate(
      { _id: req.params.id },
      { $set: company },
      { new: true }
    );
    res.status(status).json({ status, response })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
})

router.patch('/:id/company/employees/:employeeId', async (req, res, next) => {
  const status = 206
  let response;
  try {
    reponse = await Unit.findOneAndUpdate(
      { _id: req.params.id, 'company.employees._id': req.params.employeeId },
      { $set: {'company.employees.$': req.body }},
      { new: true }
    )
    res.status(status).json({ status, response })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
})

router.delete('/:id/company', async (req, res, next) => {
  const status = 206
  let response;
  try {
    reponse = await Unit.findOneAndUpdate(
      { _id: req.params.id },
      { $unset: { company: {} } },
      { new: true }
    );
    res.json({ status, response })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
})

router.delete('/:id/company/employees/:employeeId', async (req, res, next) => {
  const status = 206
  let response;
  try {
    reponse = await Unit.findOneAndUpdate(
      {  _id: req.params.id },
      { $pull: { 'company.employees': { _id: req.params.employeeId} } },
      { new: true }
    );
    res.status(status).json({ status, response })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ status: 400, response: error.message })
    } else {
      res.status(500).json({ status: 500, response: error.message })
    }
  }
})

module.exports = router