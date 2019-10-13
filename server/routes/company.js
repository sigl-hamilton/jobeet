const express = require('express');
const CompanyCtrl = require('../controllers/company_controller');

const router = express.Router();

router.post('/', CompanyCtrl.createCompany);
router.get('/list', CompanyCtrl.getCompanies);
router.get('/:id', CompanyCtrl.getCompanyById);
router.put('/:id', CompanyCtrl.updateCompanyById);

module.exports = router;
