<template>
    <!-- <v-sheet class="mx-auto"   persistent  full-width  width="auto"> -->
    
    <v-dialog v-model="loginDialog" persistent  full-width  width="auto">
              <v-card  max-width="400">
                <v-card-title>Пройдите авторизацию</v-card-title>
                <v-card-text>            
                    <v-form validate-on="submit lazy" @submit.prevent="login">
                    <v-text-field color="primary" variant="underlined" v-model="email" :rules="emailRules" type="email" label="Email" required></v-text-field>
                    <v-text-field color="primary" variant="underlined" v-model="password" type="password" label="Пароль" required></v-text-field>
                    <v-btn :loading="loading" class="mt-2" text="Отправить" type="submit" block></v-btn>
                </v-form>
                </v-card-text>
                </v-card>
    </v-dialog>
    <!-- </v-sheet> -->
</template>

<script>
import api from "../api"

export default {
    name:'Login',
    data() {
        return {
            loginDialog:true,
            emailRules: [
                value => {
                    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                    if (!re.test(String(value).toLowerCase())) {
                        return 'Email не корректен'
                    }
                    return true
                },
            ],
            email: '',
            password: '',
            loading: false,
        };
    },
    methods: {
        async login() {
            const response = await api.getToken({ email: this.email, password: this.password });
            const data = response.data;
            if (data.status === 'success') {
                const token = data.token;
                this.$store.dispatch('login', token); // Сохранение токена в хранилище
                this.$router.push('/');
            }
        }
    }
};
</script>