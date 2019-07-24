const router = require('express').Router()
const Unit = require('../models/unit');
const { generate: generateId } = require('shortid')

router.get('/', async (req, res, next) => {
    const status = 200
    const { name, birthday } = req.query;
    let response;
    if (!name && !birthday) {
        res.status(404).json({ status: 404, response: `A query is required for this operation.` })
    } else {
        if (name) {
            const employeesByCompany = await Unit.find({
                $or: [
                    { "company.employees.first_name": new RegExp(name) },
                    { "company.employees.last_name": new RegExp(name) }
                ]
            })
            // Put all the employees into a single array
            const flatEmployees = employeesByCompany.reduce(function (emp, unit) {
                emp.push(unit.company.employees);
                return emp;
            }, [])[0]
            // Now we have all employees of companies that have at least one that fits the pattern.  Remove those that don't fit.
            if(flatEmployees){
                response = flatEmployees.filter(function(employee, index, arr){
                    return employee.first_name.includes(name) || employee.last_name.includes(name);
                })
            }else{
                response = []
            }
        } else {
            console.log(new Date(birthday).toISOString())
            const employeesByCompany = await Unit.find({ "company.employees.birthday": new Date(birthday).toISOString() })
            console.log(employeesByCompany)
            // Put all the employees into a single array
            const flatEmployees = employeesByCompany.reduce(function (emp, unit) {
                emp.push(unit.company.employees);
                return emp;
            }, [])[0]
            // Now we have all employees of companies that have at least one that fits the pattern.  Remove those that don't fit.
            if(flatEmployees){
                response = flatEmployees.filter(function(employee, index, arr){
                    return new Date(employee.birthday).getTime() === new Date(birthday).getTime()
                })
            }else{
                response = []
            }
        }
    }

    res.json({ status, response })
})

module.exports = router