import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

export const insertJob = payload => api.post(`/job`, payload);
export const getAllJobs = () => api.get(`/job/list`);
export const updateJobById = (id, payload) => api.put(`/job/${id}`, payload);
export const deleteJobById = id => api.delete(`/job/${id}`);
export const getJobById = id => api.get(`/job/${id}`);

export const getProfilById = id => api.get(`/account/profil/${id}`);
export const getCandidates = () => api.get(`/candidate/list`);
//export const getCandidateById = id => api.get(`/candidate/${id}`);
export const getUsers = () => api.get(`/user/list`);
export const getUserById = id => api.get(`/user/${id}`);
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload);
export const register = newUser => api.post(`/register`, newUser);
export const login = newUser => api.post(`/login`, newUser).then(response => {
    console.log(response.data);
});

export const insertLabel = payload => api.post(`/label`, payload);
export const getLabels = () => api.get(`/label/list`);
export const updateLabelById = (id, payload) => api.put(`/label/${id}`, payload);
export const getLabelById = id => api.get(`/label/${id}`);

const apis = {
    insertJob,
    getAllJobs,
    updateJobById,
    deleteJobById,
    getJobById,
    getUserById,
    updateUserById,
    getCandidates,
    register,
    login,
    getUsers,
    insertLabel,
    getLabels,
    updateLabelById,
    getLabelById,

//    getCandidateById
};

export default apis
