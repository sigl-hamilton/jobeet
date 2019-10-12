const Job = require('../models/job_model');

createJob = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({ success: false, error: 'You must provide a Job'})
    }

    const job = new Job(body);
    if (!job) { return res.status(400).json({ success: false, error: err })}

    job.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: job._id,
                message: 'Job created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Job not created!',
            })
        })
};

updateJob = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Job.findOne({ _id: req.params.id }, (err, job) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Job not found!',
            })
        }
        job.name = body.name
        job.time = body.time
        job.rating = body.rating
        job
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: job._id,
                    message: 'Job updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Job not updated!',
                })
            })
    })
};

deleteJob = async (req, res) => {
    await Job.findOneAndDelete({ id: req.params.id }, (err, job) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!job) {
            return res
                .status(404)
                .json({ success: false, error: `Job not found` })
        }

        return res.status(200).json({ success: true, data: job })
    }).catch(err => console.log(err))
};

getJobById = async (req, res) => {
    await Job.findOne({ _id: req.params.id }, (err, job) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!job) {
            return res
                .status(404)
                .json({ success: false, error: `Job not found` })
        }
        return res.status(200).json({ success: true, data: job })
    }).catch(err => console.log(err))
};

getJobs = (req, res) => {
    Job.find({}).populate('labels').exec( (err, jobs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        }
        if (!jobs.length) {
            return res
                .status(404)
                .json({ success: false, error: `Job not found` })
        }
        return res.status(200).json({ success: true, data: jobs })
    });
};

module.exports = {
    createJob,
    updateJob,
    deleteJob,
    getJobs,
    getJobById,
}
