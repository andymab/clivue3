<template>
    <v-card width="400" >
    <v-form @submit="login">
        <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit">Submit</v-btn>
    </v-form>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
       async login() {
            const response = await api.getToken({ email: this.email, password: this.password });
            const data = response.data;
            if (data.status === 'success') {
                const token = data.token;
                this.$store.dispatch('login', token); // Сохранение токена в хранилище
            }
        }
    }
};
</script>