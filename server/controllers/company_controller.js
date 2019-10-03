const CompanyModel = require('../models/company_model')

createCompany = (req, res) => {

    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Company',
        })
    }
    const company = new CompanyModel(body)
    if (!company) {
        return res.status(400).json({ success: false, error: err })
    }
    company
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: company._id,
                message: 'Company created!',
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json({
                error,
                message: 'Company not created!',
            })
        });
}

updateCompany = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Company.findOne({ _id: req.params.id }, (err, company) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Company not found!',
            })
        }
        company.name = body.name
        company.time = body.time
        company.rating = body.rating
        company
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: company._id,
                    message: 'Company updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Company not updated!',
                })
            })
    })
}

deleteCompany = async (req, res) => {
    await Company.findOneAndDelete({ _id: req.params.id }, (err, company) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!company) {
            return res
                .status(404)
                .json({ success: false, error: `Company not found` })
        }

        return res.status(200).json({ success: true, data: company })
    }).catch(err => console.log(err))
}

getCompanyById = async (req, res) => {
    await Company.findOne({ _id: req.params.id }, (err, company) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!company) {
            return res
                .status(404)
                .json({ success: false, error: `Company not found` })
        }
        return res.status(200).json({ success: true, data: company })
    }).catch(err => console.log(err))
}

getCompanies = async (req, res) => {
    await CompanyModel.find({}, (err, companies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!CompanyModel.length) {
            return res
                .status(404)
                .json({ success: false, error: `No companies` })
        }
        return res.status(200).json({ success: true, data: companies })
    }).catch(err => console.log(err))
}

module.exports = {
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanies,
    getCompanyById,
}
