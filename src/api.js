// api.js
import axios from 'axios';
import config from './config/axios.js';
import store from './store'; // хранилище


const apiClient = axios.create({
    baseURL: config.baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.token}`
    }
});

// Добавляем интерсептор для запросов
apiClient.interceptors.request.use(
    (config) => {
        const token = store.getters.getToken; // Получаем токен из хранилища
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовок
        }
        return config; // Возвращаем изменённый конфиг
    },
    (error) => {
        return Promise.reject(error); // Обработка ошибок
    }
);


export default {
    getToken(data) {
         return apiClient.post(`/gettoken`, data);
    },

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

    updateArticle(id, updatedData) {
        return apiClient.put(`/article/${id}`, updatedData);
    },

    removeArticle(id) {
        return apiClient.delete(`/article/${id}`);
    },


    getUser(id) {
        return apiClient.get(`/users/${id}`);
    },
    createUser(data) {
        return apiClient.post('/users', data);
    },
    // Другие методы запросов
};