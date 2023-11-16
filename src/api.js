const apiUrl = 'https://jservice.io/api/random?count=1';

export class DataFromAPI {

    constructor() {
        this.apiForm = document.querySelector('.api__form');
        this.questionButton = document.querySelector('.api__question');
        this.answerButton = document.querySelector('.api__answer');
        this.checkButton = document.querySelector('.api__check');
        this.questionArea = document.getElementById('question_area');
        this.yourAnswer = document.getElementById('your_answer');
        this.rightAnswerArea = document.getElementById('right_answer');
        this.checkResult = document.getElementById('check_result');
        this.rightAnswerText = '';
    }

    getDataFromAPI = () => {
        this.rightAnswerArea.innerHTML = '';
        this.checkResult.innerHTML = '';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                this.displayQuestion(data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }

    displayQuestion = (data) => {
        this.questionArea.innerHTML = '';
        const questionHTML = `
            <p>${data[0].question}</p>
        `;
        this.rightAnswerText = data[0].answer;
        this.questionArea.innerHTML = questionHTML;
    }

    checkAnswer = () => {
        this.checkResult.innerHTML = '';
        let res = '';
        const yourAnswer = this.yourAnswer.value;
        if (yourAnswer.toUpperCase() === this.rightAnswerText.toUpperCase()) {
            res = `Yes. You are right! It's "${yourAnswer}"`;
        }
        else if (yourAnswer.length === 0) {
            res = 'Sorry, your answer is empty!';
        }
        else {
            res = `No. "${yourAnswer}" is wrong answer!`
        }
        const checkHTML = `
            <p>${res}</p>
        `;
        this.checkResult.innerHTML = checkHTML;
        this.yourAnswer.value = '';
    }

    displayAnswer = () => {
        this.rightAnswerArea.innerHTML = '';
        const answerHTML = `
            <p>${this.rightAnswerText}</p>
        `;
        this.rightAnswerArea.innerHTML = answerHTML;
    }

    init = () => {
        this.apiForm.addEventListener("submit", (event) => { event.preventDefault(); });
        this.questionButton.addEventListener("click", () => { this.getDataFromAPI(); });
        this.answerButton.addEventListener("click", () => { this.displayAnswer(); });
        this.checkButton.addEventListener("click", () => { this.checkAnswer(); });
    }
}       