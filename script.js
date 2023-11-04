const questions = [
    {
        question: "Berdasarkan konsekuensinya, termasuk akad apakah akad pinjam meminjam ?",
        optionA: "Akad Jaiz",
        optionB: "Akad Ghairu Musamma",
        optionC: "Akad Maliyyun",
        optionD: "Akad Gairu Maliyyun",
        correctOption: "optionA"
    },

    {
        question: "Akad apakah jual beli anak binatang yang masih di kandungan ?",
        optionA: "Akad Musyaraah",
        optionB: "Akad Mamnuah",
        optionC: "Akad Tabarru",
        optionD: "Akad Muawadah",
        correctOption: "optionB"
    },

    {
        question: "Berdasarkan  ada atau tidaknya imbalan (tukar menukar hak), termasuk akad apakah akad ijarah ?",
        optionA: "Akad Mamnuah",
        optionB: "Akad Sahihah",
        optionC: "Akad Maliyyun",
        optionD: "Akad Muawadah",
        correctOption: "optionD"
    },

    {
        question: "Akad Hudnah termasuk ke akad ?",
        optionA: "Aqdun Gairu Maliyyun",
        optionB: "Akad Lazim",
        optionC: "Akad Jaiz",
        optionD: "Akad Fasidah",
        correctOption: "optionA"
    },

    {
        question: "Berdasarkan caranya, terbagi menjadi berapakah akad itu ?",
        optionA: "4",
        optionB: "3",
        optionC: "2",
        optionD: "1",
        correctOption: "optionA"
    },

    {
        question: "Apa itu Akad Musyaraah ?",
        optionA: "Akad yang mengikat semua pihak yang terlibat, sehingga masing-masing pihak tidak punya hak untuk membatalkan akad kecuali dengan kerelaan pihak yang lain",
        optionB: "Akad yang di dalamnya terdapat imbalan",
        optionC: "Akad yang terpenuhi rukun dan syaratnya",
        optionD: "Akad yang dibenarkan oleh syara",
        correctOption: "optionD"
    },

    {
        question: "Akad Sahih dibagi menjadi ?",
        optionA: "2",
        optionB: "4",
        optionC: "5",
        optionD: "1",
        correctOption: "optionA"
    },

    {
        question: "Apa itu Aqdun Gairu Maliyyin ?",
        optionA: "Akad yang terjadi pada objek berupa harta baik kepemilikannya timbal balik atau tanpa timbal balik",
        optionB: "Akad yang belum ditetapkan oleh syara' dan belum ditentukan hukum-hukumnya",
        optionC: "Akad yang objek akadnya tidak berupa harta",
        optionD: "Akad yang dilakukan melalui utusan atau wakil kepada orang lain agar bertindak atas nama pemberi mandat",
        correctOption: "optionC"
    },

    {
        question: "Berdasarkan penamaannya, akad istishna termasuk ke akad ?",
        optionA: "Musamma",
        optionB: "Ghairu Musamma",
        optionC: "Jaiz",
        optionD: "Lazim",
        correctOption: "optionB"
    },

    {
        question: "Akad Isyarat adalah ?",
        optionA: "Akad yang dilakukan dengan cara pengucapan lisan",
        optionB: "Akad yang dilakukan secara tertulis",
        optionC: "Akad yang dilakukan dengan isyarat atau kode tertentu",
        optionD: "Akad yang dilakukan melalui utusan atau wakil kepada orang lain agar bertindak atas nama pemberi mandat",
        correctOption: "optionC"
    }
]

let shuffledQuestions = []

function handleQuestions(){
    while(shuffledQuestions.length <= 9){
        const random = questions[Math.floor(Math.random() * questions.length)]
        if(!shuffledQuestions.includes(random)){
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

function NextQuestion(index){
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkForAnswer(){
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption
    const options = document.getElementsByName("option");
    let correctOption = null

    options.forEach((option) => {
        if(option.value === currentQuestionAnswer){
            correctOption = option.labels[0].id
        }
    })

    if(options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked === false){
        document.getElementById('option-modal').style.display = "flex"
    }

    options.forEach((option) => {
        if(option.checked === true && option.value === currentQuestionAnswer){
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if(option.checked && option.value !== currentQuestionAnswer){
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

function handleNextQuestion(){
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if(indexNumber <= 9){
            NextQuestion(indexNumber)
        }
        else{
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground(){
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons(){
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame(){
    let remark = null
    let remarkColor = null

    if(playerScore <= 3){
        remark = "Nilaimu Rendah, Belajar Lagi Ya Kids."
        remarkColor = "red"
    }
    else if(playerScore >=4 && playerScore < 7){
        remark = "Nilaimu Lumayan, Tetap Belajar Lagi Ya Kids."
        remarkColor = "orange"
    }
    else if(playerScore >= 7){
        remark = "Nilaimu Bagus, Sebagus Apapun Tetap Belajar Lagi Ya Kids."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
}

function closeScoreModal(){
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}