import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertJob = payload => api.post(`/job`, payload)
export const getAllJobs = () => api.get(`/jobs`)
export const updateJobById = (id, payload) => api.put(`/job/${id}`, payload)
export const deleteJobById = id => api.delete(`/job/${id}`)
export const getJobById = id => api.get(`/job/${id}`)

const apis = {
    insertJob,
    getAllJobs,
    updateJobById,
    deleteJobById,
    getJobById,
}

export default apis
