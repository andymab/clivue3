<template>
    <v-sheet class="mx-auto" max-width="300">
        <v-form validate-on="submit lazy" @submit.prevent="login">
            <v-text-field v-model="email" :rules="emailRules" type="email" label="Email" required></v-text-field>
            <v-text-field v-model="password" type="password" label="Пароль" required></v-text-field>
            <v-btn :loading="loading" class="mt-2" text="Отправить" type="submit" block></v-btn>
        </v-form>
    </v-sheet>
</template>

<script>
import api from "../api"

export default {
    data() {
        return {
            emailRules: [
                value => {
                    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                    if (!re.test(String(value).toLowerCase())) {
                        return 'Email не корректен'
                    }
                    return true
                },
            ],
            email:'',
            password: '',
            loading: false,
        };
    },
    methods: {
        async login() {
            const response = await api.getToken({ email: this.email, password: this.password });
            const data = response.data;
            console.log(data);
            if (data.status === 'success') {
                const token = data.token;
                this.$store.dispatch('login', token); // Сохранение токена в хранилище
                this.$router.push('/');
            }
        }
    }
};
</script>