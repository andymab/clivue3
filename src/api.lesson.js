import axios from 'axios';
import config from './config/lesson.js';
import store from './store.js'; // хранилище


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

    getlessons(id) {
        if (id) {
            return apiClient.get(`/lessons/${id}`);
        } else {
            return apiClient.get(`/lessons`);
        }
    },
    getlesson(id){
        return apiClient.get(`/lesson/${id}`);
    },

    updateQuestion(updatedData) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${config.token}` // Если вам нужно оставить авторизацию
            }
        };

        return apiClient.post(`/question`, updatedData, config);
    },

    removeLesson(id) {
        return apiClient.delete(`/lesson/${id}`);
    },

    getUser(id) {
        return apiClient.get(`/users/${id}`);
    },
    createUser(data) {
        return apiClient.post('/users', data);
    },
    // Другие методы запросов
};