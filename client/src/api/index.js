import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertJob = payload => api.post(`/job`, payload);
export const getAllJobs = () => api.get(`/job/list`);
export const updateJobById = (id, payload) => api.put(`/job/${id}`, payload);
export const deleteJobById = id => api.delete(`/job/${id}`);
export const getJobById = id => api.get(`/job/${id}`);
export const getProfilById = id => api.get(`/account/profil/${id}`);
export const getCandidates = () => api.get(`/candidate/list`);
//export const getCandidateById = id => api.get(`/candidate/${id}`);
export const getUserById = id => api.get(`/user/${id}`);

export const createCompany = payload => api.post(`/company/create`, payload);
export const getAllCompanies = () => api.get(`/company/list`);
export const getCompanyById = id => api.get(`/company/${id}`);

const apis = {
    insertJob,
    getAllJobs,
    updateJobById,
    deleteJobById,
    getJobById,
    getUserById,
    getCandidates,
    createCompany,
    getAllCompanies,
    getCompanyById
//    getCandidateById
};

export default apis
