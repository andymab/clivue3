<template>

    <v-card width="600" class="card-block">
        <v-toolbar color="transparent" density="compact">
            <v-btn :class="{ 'active': leningMode }" @click="leningMode = true">
                Режим обучения
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn :class="{ 'active': !leningMode }" @click="leningMode = false">
                Экзамен
            </v-btn>
        </v-toolbar>
        <v-card-text class="pt-0">
            <h6 class="question-title mb-2">{{ currentQuestion.ticket_id + '. ' + currentQuestion.question
                }}</h6>
            <v-img v-if="currentQuestion.media_content" :src="getMediaUrl(currentQuestion.media_content)"
                contain></v-img>
            <v-radio-group v-model="selectedAnswer" @change="submitAnswer" row>
                <v-radio v-for="(answer, index) in currentQuestion.possible_answers" :key="index" :label="answer"
                    :value="answer" :class="getRadioClass(answer)"></v-radio>
            </v-radio-group>
        </v-card-text>
    </v-card>


</template>

<script>

import api from "../api.lesson"
export default {
    name: 'Lesson',
    data() {
        return {
            questions: [],
            currentQuestion: {},
            selectedAnswer: null,
            lesson: [],
            answered: false,
            leningMode: true,
            ticketIds: [],
        };
    },
    async created() {
        await api.getlesson(1).then(response => {
            this.lesson = response.data;
        });
        this.ticketIds = this.lesson.tickets.map(ticket => ticket.id);
        const lesson_id = this.lesson.id;
        this.questions = this.lesson.tickets.flatMap(ticket =>
            ticket.questions.map(question => ({
                lesson_id: lesson_id,
                ticket_id: ticket.id,
                question_id: question.id,
                question: question.question,
                correct_answer: question.correct_answer,
                media_content: question.media_content,
                possible_answers: question.possible_answers,
                correctCount: 0,
                incorrectCount: 0
            }))
        );
        this.currentQuestion = this.getRandomQuestion();
    },
    computed: {
        questions() {
            const lesson_id = this.lesson.id;
            if (this.lesson && this.leningMode) {
                console.log('1');
                this.questions = this.lesson.tickets.flatMap(ticket =>
                    ticket.questions.map(question => ({
                        lesson_id: lesson_id,
                        ticket_id: ticket.id,
                        question_id: question.id,
                        question: question.question,
                        correct_answer: question.correct_answer,
                        media_content: question.media_content,
                        possible_answers: question.possible_answers,
                        correctCount: 0,
                        incorrectCount: 0
                    }))
                );
            } else if (this.lesson) {
                console.log('2');
                const randomTicketId = this.getRandomTicketId();
                this.questions = this.lesson.tickets.flatMap(ticket => {
                    if (ticket.id === randomTicketId) {
                        ticket.questions.map(question => ({
                            lesson_id: lesson_id,
                            ticket_id: ticket.id,
                            question_id: question.id,
                            question: question.question,
                            correct_answer: question.correct_answer,
                            media_content: question.media_content,
                            possible_answers: question.possible_answers,
                            correctCount: 0,
                            incorrectCount: 0
                        }))
                    }
                },
                );

            } else {
                return [];
            }
        },



    },

    methods: {
        getMediaUrl(mediaPath) {
            // Предполагаем, что базовый URL для медиафайлов
            const baseUrl = "http://lesson355042/storage/"; // Замените на ваш базовый URL
            if (mediaPath) {
                return baseUrl + mediaPath;

            }
        },
        getRadioClass(answer) {
            // Возвращаем классы в зависимости от состояния
            if (!this.answered) {
                return ''; // Если ответ еще не дан, не добавляем классы
            }
            return answer === this.currentQuestion.correct_answer ? 'correct-answer' : 'incorrect-answer';


        },
        getRandomTicketId() {
            if (this.ticketIds.length === 0) {
                return null; // Если массив пустой, возвращаем null
            }
            const randomIndex = Math.floor(Math.random() * this.ticketIds.length);
            const randomValue = this.ticketIds[randomIndex];
            return randomValue; // Возвращаем случайное значение
        },
        getRandomQuestion() {
            const totalWeight = this.questions.reduce((sum, q) => {
                return sum + (q.incorrectCount + 1) / (q.correctCount + 1);
            }, 0);

            let randomValue = Math.random() * totalWeight;

            for (const question of this.questions) {
                const weight = (question.incorrectCount + 1) / (question.correctCount + 1);
                if (randomValue < weight) {
                    return question;
                }
                randomValue -= weight;
            }

            return this.questions[Math.floor(Math.random() * this.questions.length)];
        },
        submitAnswer() {
            if (this.selectedAnswer === this.currentQuestion.correct_answer) {
                // Правильный ответ
                this.currentQuestion.correctCount++;
                this.showCorrectAnswer();
            } else {
                // Неправильный ответ
                this.currentQuestion.incorrectCount++;
                this.showIncorrectAnswer();
            }

            // this.selectedAnswer = "";
            // this.currentQuestion = this.getRandomQuestion();
        },
        showCorrectAnswer() {
            // Показываем зеленый фон и бордюр для правильного ответа
            //this.selectedAnswer = null;
            setTimeout(() => {
                this.selectedAnswer = this.currentQuestion.correct_answer;
                this.answered = true;
                // Переходим к следующему вопросу через 5 секунд
                setTimeout(() => {
                    this.selectedAnswer = null;
                    this.answered = false;
                    this.currentQuestion = this.getRandomQuestion();
                    // Логика для перехода к следующему вопросу
                }, 3000);
            }, 500);
        },
        showIncorrectAnswer() {
            // Показываем красный фон и бордюр для неправильного ответа
            setTimeout(() => {
                this.selectedAnswer = this.currentQuestion.correct_answer;
                this.answered = true;
                setTimeout(() => {
                    this.selectedAnswer = null;
                    this.answered = false;
                    this.currentQuestion = this.getRandomQuestion();
                    // Логика для перехода к следующему вопросу
                }, 3000);
            }, 500);
        },


    },
};
</script>

<style scoped>
.v-btn {
    color: #bdbdbd;
}

.v-btn.active {
    color: #1867c0;
    background-color: aliceblue;
}

.card-block {

    margin: 0 auto;
}

.question-title {
    white-space: normal;
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-size: 1.1rem !important;
}

.v-radio {
    transition: background-color 0.3s ease, border-color 0.3s ease;
    margin-top: 4px;
}

.correct-answer {
    background-color: #C8E6C9;
    border-color: green;
    border-radius: 15px;
}

.incorrect-answer {
    background-color: #FFCDD2;
    border-color: red;
    border-radius: 15px;
}

.v-radio.correct-answer .v-label,
.v-radio.incorrect-answer .v-label {
    color: white;
}

@media (max-width: 500px) {
    .v-main {
        padding: 0 !important;
        /* Устанавливаем padding в 0 для разрешения 500px и ниже */
    }
}
</style>