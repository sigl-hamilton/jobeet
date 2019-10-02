const express = require('express')

const CompanyCtrl = require('../controllers/company_controller')

const router = express.Router()
const app = express();

/*
app.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('Authorization failed! Please login');
  }
});
*/

router.post('/create', CompanyCtrl.createCompany)
/*router.get('/list', JobCtrl.getJobs) // Lui il faut le mettre au dessus sinon ça proc ce d'en dessous en premier
router.put('/:id', JobCtrl.updateJob)
router.delete('/:id', JobCtrl.deleteJob)
router.get('/:id', JobCtrl.getJobById)
*/

module.exports = router
