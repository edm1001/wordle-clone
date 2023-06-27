document.addEventListener("DOMContentLoaded", () => {   
    createBoxes();

    const guessedWords = [[]];
    let availableSpace = 1;

     let word;
     let guessedWordCount = 0;

    // responsive keyboard
    const keys = document.querySelectorAll('.keyboard-row button') //targetskeys

    function getNewWord() {
        fetch(
            `https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5`,
            {
                method:"GET",
                headers: {
                    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                    "x-rapidapi-key": "<Key Here>",
                }
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            word = res.word;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords -1]
    } 


    // keep the letters that are clicked
    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter)

            const availableSpaceEl = document.getElementById(String(availableSpace));

            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    } 

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter)
        if (!isCorrectLetter) {
            return "rgb(58,58,60)";
        }
        const letterInThatPosition = word.charAt(index)
        const isCorrectPosition = letter === letterInThatPosition

        if(isCorrectPosition) {
            return "rgb(83, 141, 78)";

        }
        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5 ) {
            window.alert("Must Be 5 letters")
        }
        const currentWord = currentWordArr.join('');



        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 250;
        currentWordArr.forEach((letter,index) => {
            setTimeout(()=>{
                const tileColor = getTileColor(letter, index);
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });
        guessedWordCount += 1;

        if (currentWord === word) {
            window.alert("Word Created")
            
        }
        if (guessedWords.length === 6) {
            window.alert(`The Word is ${word} , better luck next time!`);
        }

        guessedWords.push([]);
    }
    // delete letters function
    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length-1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace -1));

        lastLetterEl.textContent = "";
        availableSpace = availableSpace -1;
    }

    // create boxed for the letters
    function createBoxes() {
        const gameBoard = document.getElementById("board");
        
        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square")
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square)
        }
    }
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const letter = target.getAttribute("data-key")
            if(letter === 'enter') {
                handleSubmitWord()
                return;
            }
            if (letter === 'del') {
                handleDeleteLetter()
                return;
            }

            
            updateGuessedWords(letter)
            
        }
        
    }
    
    
})