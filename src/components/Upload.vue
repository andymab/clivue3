<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-select v-model="selectedLesson" :items="lessons" label="Урок" item-title="name" item-value="id">
        <template #no-data>
          Нет данных
        </template>
      </v-select>
      <v-select v-model="selectedTicket" :items="tickets" label="Билет" item-title="name" item-value="id">
        <template #no-data>
          Нет данных
        </template>
      </v-select>
      <v-textarea v-model="question" label="Введите вопрос" required></v-textarea>

      <v-textarea v-model="answersText" label="Введите ответы (разделяйте запятыми)" required></v-textarea>

      <v-text-field v-model="correct_answer" label="Правильный ответ" required></v-text-field>

      <div @paste="handlePaste" class="img-box">
        <img v-if="imageUrl" :src="imageUrl" alt="Pasted Image" />
      </div>

      <v-btn type="submit" color="primary">Отправить</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import api from "../api.lesson"
//import lesson from "../config/lesson";
export default {

  name: 'Upload',
  data() {
    return {
      question: '',
      answersText: '',
      file: null,
      imageUrl: null,
      lessons: [],
      correct_answer: null,
      selectedLesson: null,
      selectedTicket: null,

    };
  },
  async created() {
    await api.getlessons().then(response => {
      this.lessons = response.data;
    });
  },
  computed: {
    tickets() {
      const lesson = this.selectedLesson ? this.lessons.find(lesson => lesson.id === this.selectedLesson) : null;
      return lesson ? lesson.tickets : [];
    }
  },
  methods: {
    handlePaste(event) {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") === 0) {
          const blob = items[i].getAsFile();
          this.file = blob; // Сохраняем файл для отправки на сервер

          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageUrl = e.target.result; // Устанавливаем URL для отображения
          };
          reader.readAsDataURL(blob); // Читаем файл как Data URL
        }
      }
    },
    submitForm() {
      const answersArray = this.answersText.split('\n').map(answer => answer.trim());
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('lesson_id', this.selectedLesson);
      formData.append('ticket_id', this.selectedTicket);
      formData.append('correct_answer', this.correct_answer);
      formData.append('question', this.question);
      formData.append('possible_answers', JSON.stringify(answersArray));

      // Выводим содержимое FormData в консоль
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      // Отправка данных на сервер
      api.updateQuestion(formData) // Используем функцию updateLesson
        .then(response => {
          console.log('Успех:', response.data);
          this.imageUrl=null;
          this.file=null;
          this.correct_answer=null;
          this.question=null;
          this.answersText=null
        })
        .catch(error => {
          console.error('Ошибка:', error);
        });
    },
    onSelectLesson() {
      console.log('Выбранный урок:', this.selectedLesson);
    },
    onSelectTicket() { },
  },
};
</script>

<style scoped>
.img-box {
  width: 100%;
  height: 100px;
  border: 1px dashed #000;
}

/* Добавьте стили, если необходимо */
</style>