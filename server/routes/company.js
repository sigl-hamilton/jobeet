const express = require('express')

const CompanyCtrl = require('../controllers/company_controller')

const router = express.Router()

router.get('/list', CompanyCtrl.getCompanies); // Lui il faut le mettre au dessus sinon ça proc ce d'en dessous en premier
router.post('/create', CompanyCtrl.createCompany);
router.post('/:id', CompanyCtrl.getCompanyById);


module.exports = router
