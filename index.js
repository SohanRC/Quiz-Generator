let question = document.querySelector('.question');
let option1 = document.getElementById('option1');
let option2 = document.getElementById('option2');
let option3 = document.getElementById('option3');
let option4 = document.getElementById('option4');
let correctAns;
let score = document.querySelector('.scoreBoard');


let answer = document.querySelectorAll('.answer'); // array containing all input tags radio button
answer = Array.from(answer);
const generateQuiz = () => {
    const setHeaders = {
        headers : {
            Accept : 'application/json'
        }
    }

    fetch('https://opentdb.com/api.php?amount=1' , setHeaders)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // console.log(data.results);
        question.innerHTML = ` Q : ${data.results[0].question}`;

        let answersData = [data.results[0].correct_answer , ...data.results[0].incorrect_answers];
        answersData.sort(); // to get correct answer in random order

        // array destructuring
        [option1.innerHTML , option2.innerHTML , option3.innerHTML , option4.innerHTML] = answersData;

        correctAns = data.results[0].correct_answer;
        console.log(correctAns);
    })
}

generateQuiz(); // so that on refresh a qustion appears

const getAnswerByUser = ()=> {
    // console.log(answer);
    // this will return the id of the seleceted element
    let v;
    answer.forEach((currEle)=> {
        if(currEle.checked){
          v = currEle.id;  
        }
    })

    return v;
}

const deselectAll = ()=> {
    answer.forEach((cur)=>{
        if(cur.checked){
            cur.checked = false;
        }
    })
}

let submit = document.getElementById('submit');

submit.addEventListener('click' , ()=> {
    let userAnswer = getAnswerByUser(); // to get the answer user clicked
    user = document.querySelector(`.${userAnswer}`).innerHTML;
    
    let res;
    if(correctAns == user)
    res = "You Are Correct ! ";
    else
    res = "Wrong Answer !";

    console.log(res);
    deselectAll();
    score.classList.remove('hidden');
    score.innerHTML = `
    <h3 style = "color : green">${res}</h3>
    <h3 style = "color : green">Correct Answer is : ${correctAns}</h3>
    <div class="btn">Play Again</div>
    `
    score.querySelector('.btn').addEventListener('click' , ()=> {
        score.classList.add('hidden');
        generateQuiz();
    })
})