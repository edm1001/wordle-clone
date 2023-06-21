document.addEventListener("DOMContentLoaded", () => {   
    createBoxes()    

    const guessedWords = [[]];
    const availableSpace = 1;

    // responsive keyboard
    const keys = document.querySelectorAll('.keyboard-row button') //targetskeys
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const key = target.getAttribute("data-key")
            updateGuessedWords(letter)
            console.log(key)
        }
        
    }
    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length
        return guessedWords[numberOfGuessedWords -1]
    } 


    // keep the letters that are clicked
    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr()

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter)

            const availableSpaceEl = document.getElementById()
        }
    } 


    // create boxed for the letters
    function createBoxes() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square")
            square.setAttribute("id", index -1);
            gameBoard.appendChild(square)
        }
    }


})