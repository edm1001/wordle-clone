document.addEventListener("DOMContentLoaded", () => {   
    createBoxes()    

    const guessedWords = [[]];
    let availableSpace = 1;

     let word = "books"
    // responsive keyboard
    const keys = document.querySelectorAll('.keyboard-row button') //targetskeys
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

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5 ) {
            window.alert("Must Be 5 letters")
        }
    }
    // create boxed for the letters
    function createBoxes() {
        const gameBoard = document.getElementById("board");
        
        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square")
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square)
        }
    }
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const letter = target.getAttribute("data-key")
            if(letter === 'enter') {
                handleSubmitWord()
            }

            
            updateGuessedWords(letter)
            
        }
        
    }
    
    
})