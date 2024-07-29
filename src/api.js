// api.js
import axios from 'axios';
import config from './config/axios.js';

const apiClient = axios.create({
    baseURL: config.baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.token}`
    }
});

export default {
    getArticles(id) {
        if (id) {
            return apiClient.get(`/articles/${id}`);
        } else {
            return apiClient.get(`/articles`);
        }
    },
    getArticle(id){
        return apiClient.get(`/article/${id}`);
    },


    getUser(id) {
        return apiClient.get(`/users/${id}`);
    },
    createUser(data) {
        return apiClient.post('/users', data);
    },
    // Другие методы запросов
};