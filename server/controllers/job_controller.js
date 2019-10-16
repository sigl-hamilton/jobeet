const Job = require('../models/job_model');
const UserSchema = require('../models/user_model');

createJob = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({ success: false, error: 'You must provide a Job'})
    }

    const job = new Job(body);
    if (!job) { return res.status(400).json({ success: false, error: res.err })}
    job.save()
        .then(() => {
            UserSchema.findById(body.author._id, (err, recruiter) => {
                    recruiter.jobs.push({ _id: job._id });
                    recruiter.save()
                }
            );
            return res.status(201).json({ success: true, id: job._id, message: 'Job created!'});
        })
        .catch(error => {
            return res.status(400).json({ error, message: 'Job not created!' });
        })
};

updateJob = async (req, res) => {
    const body = req.body;
    if (!body) { return res.status(400).json({ success: false, error: 'You must provide a Job' }); }

    Job.findOne({ _id: req.params.id }, (err, job) => {
        if (err) {
            return res.status(404).json({ err, message: 'Job not found!' })
        }

        job.name = body.name;
        job.description = body.description;
        job.labels = body.labels;
        job.save()
            .then(() => {
                return res.status(200).json({ success: true, id: job._id, message: 'Job updated!'});
            })
            .catch(error => {
                return res.status(404).json({ error, message: 'Job not updated!'})
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

getJobById = (req, res) => {
    Job.findOne({ _id: req.params.id }).populate('author').populate('labels')
        .exec((err, job) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        }

        if (!job) {
            return res
                .status(404)
                .json({ success: false, error: `Job not found` })
        }
        return res.status(200).json({ success: true, data: job })
    })
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

getPossibleJobs = (req, res) => {
    const candidateLabels = req.body.labels.map(label => { return label._id });
    Job.find().populate('labels').populate('author').exec((err, jobs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        let potentialJobs = jobs.map(job => {
            const matchLabels = candidateLabels.filter(candidateLabel =>
                job.labels.map(label => { return label._id }).includes(candidateLabel) );

            const jobMatchPercent = (matchLabels.length / candidateLabels.length) * 100;

            if (jobMatchPercent > 70) {
                job = {job: job, matchPercent: Math.round(jobMatchPercent)};
                return job;
            } else {
                return null;
            }
        });
        if (!potentialJobs.length) {
            return res
                .status(404)
                .json({ success: false, error: `Job not found` })
        }

        return res.status(200).json({
            success: true,
            data: potentialJobs.filter(job => job != null)
        });
    });
};

module.exports = {
    createJob,
    updateJob,
    deleteJob,
    getJobs,
    getJobById,
    getPossibleJobs
}
