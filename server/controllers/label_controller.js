const LabelSchema = require('../models/label_model');

createLabel = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Label',
        })
    }
    const label = new LabelSchema(body);
    if (!label) { return res.status(400).json({ success: false, error: err }); }

    label.save()
        .then(() => {
            return res.status(201).json({ success: true, id: label._id, message: 'Job created!'});
        }).catch(error => {
            return res.status(400).json({error, message: 'Label not created!'});
        });
};

getLabelById =  (req, res) => {
    LabelSchema.findOne({ _id: req.params.id}, (err, label) => {
        if (err) { return res.status(400).json({ success: false, error: err }); }
        if (!label) {
            return res
                .status(404)
                .json({ success: false, error: `Label not found` });
        }
        return res.status(200).json({ success: true, data: label });
    }).catch(err => console.log(err));
};

getLabels = function (req, res) {
    LabelSchema.find({}, (err, labels) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!labels.length) {
            return res
                .status(404)
                .json({ success: false, error: `Labels not found` })
        }
        return res.status(200).json({ success: true, data: labels })
    }).catch(err => console.log(err))
};

updateLabelById =  (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }
    LabelSchema.findOne({ _id: req.params.id }, (err, label) => {
        if (err) {
            return res.status(404).json({ err, message: 'Label not found!',})
        }
        label.name = body.name;
        label.save()
            .then(() => {
                return res.status(200).json({success: true, id: label._id, message: 'Label updated!'})
            })
            .catch(error => {
                return res.status(404).json({ error, message: 'Label not updated!' })
            });
    });
};

module.exports = {
    createLabel,
    getLabelById,
    getLabels,
    updateLabelById,
};
