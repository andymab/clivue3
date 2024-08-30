<template>
    <v-container>
      <v-form @submit.prevent="submitForm">
        <v-textarea
          v-model="question"
          label="Введите вопрос"
          required
        ></v-textarea>
  
        <v-textarea
          v-model="answersText"
          label="Введите ответы (разделяйте запятыми)"
          required
        ></v-textarea>
  
        <v-btn @click="handlePaste">Вставить файл из буфера обмена</v-btn>
  
        <v-btn type="submit" color="primary">Отправить</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        question: '',
        answersText: '',
        file: null,
      };
    },
    methods: {
      handlePaste(event) {
        const clipboardItems = event.clipboardData.items;
        for (let i = 0; i < clipboardItems.length; i++) {
          const item = clipboardItems[i];
          if (item.kind === 'file') {
            this.file = item.getAsFile();
            // Дополнительно можно обработать файл, например, вывести его имя
            console.log('Файл загружен:', this.file.name);
          }
        }
      },
      submitForm() {
        const answersArray = this.answersText.split(',').map(answer => answer.trim());
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('question', this.question);
        formData.append('answers', JSON.stringify(answersArray));
  
        // Отправка данных на сервер
        fetch('your_script.php', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          console.log('Успех:', data);
        })
        .catch(error => {
          console.error('Ошибка:', error);
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Добавьте стили, если необходимо */
  </style>