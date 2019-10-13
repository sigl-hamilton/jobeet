const CompanySchema = require('../models/company_model');
const UserSchema = require('../models/user_model');
const UserCtrl = require('../controllers/user_controller');

createCompany = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Company',
        })
    }
    const company = new CompanySchema(body);
    const recruiterId = body.recruiters[0]._id;

    if (!company) { return res.status(400).json({ success: false, error: res.err }); }
    company.save().then(() => {
        UserSchema.findById(recruiterId, (err, recruiter) => {
                recruiter.company = company;
                recruiter.save()
            }
        );
        return res.status(201).json({ success: true, id: company._id, message: 'Company created!'});
    }).catch(error => {
       return res.status(400).json({error, message: 'Company not created!'});
    });
};

getCompanyById =  (req, res) => {
    CompanySchema.findOne({ _id: req.params.id}).populate('recruiters').exec((err, company) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, error: err });
        }
        console.log(company);
        if (!company) {
            return res
                .status(404)
                .json({ success: false, error: `Company not found` });
        }
        return res.status(200).json({ success: true, data: company });
    });
};

getCompanies = function (req, res) {
    CompanySchema.find({}, (err, companies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!companies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Companies not found` })
        }
        return res.status(200).json({ success: true, data: companies })
    }).catch(err => console.log(err))
};

updateCompanyById =  (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }
    CompanySchema.findOne({ _id: req.params.id }, (err, company) => {
        if (err) {
            return res.status(404).json({ err, message: 'Company not found!',})
        }
        company.name = body.name;
        company.save()
            .then(() => {
                return res.status(200).json({success: true, id: company._id, message: 'Company updated!'})
            })
            .catch(error => {
                return res.status(404).json({ error, message: 'Company not updated!' })
            });
    });
};

module.exports = {
    createCompany,
    getCompanyById,
    getCompanies,
    updateCompanyById,
};
