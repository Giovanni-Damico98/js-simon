console.log("JS OK");
const countdownElement = document.getElementById("countdown");
const numbersListElement = document.getElementById("numbers-list");
const form = document.getElementById("answer-form");
const messageElement = document.getElementById("message");
const inputGroup = document.getElementById("input-group");
const instructionsElement = document.getElementById("instructions");
const inputFields = document.querySelectorAll("input");
const replayButton = document.querySelector("#replayButton");

const min = 1;
const max = 50;
const totalNumbers = 5;
let time = 5;

// Inserisco il tempo
countdownElement.innerText = time;

// Elaborazione
// Genero 5 numeri random
const numbers = getDifferentRandomNumbers(min, max, totalNumbers);
console.log(numbers);

// Inserisco i numeri in pagina
let items = "";
for (let number of numbers) {
  items += `<li>${number}</li>`;
}
numbersListElement.innerHTML = items;

// Inizia il countdown
const interval = setInterval(() => {
  countdownElement.innerText = --time;
  if (time === 0) {
    clearInterval(interval);
    form.classList.remove("d-none");
    numbersListElement.classList.add("d-none");
  }
}, 1000);

// Form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Svuoto il messaggio
  messageElement.innerText = "";
  // Preparo la raccolta dei dati
  const userGuesses = [];
  // Raccolgo i dati
  for (let input of inputFields) {
    const value = parseInt(input.value);
    if (
      !isNaN(value) &&
      value >= min &&
      value <= max &&
      !userGuesses.includes(value)
    ) {
      userGuesses.push(value);
    }
  }

  if (userGuesses.length !== inputFields.length) {
    messageElement.innerText =
      "Sono stati inseriti valori non validi o duplicati";
    return;
  }

  // Controllo quanti e quali numeri giusti sono stati inseriti
  const correctNumbers = [];
  for (let guess of userGuesses) {
    if (numbers.includes(guess)) correctNumbers.push(guess);
  }

  // Output
  messageElement.classList.remove("text-danger");
  if (correctNumbers.length === numbers.length) {
    messageElement.classList.add("text-success");
  }

  messageElement.innerText = `Hai indovinato ${correctNumbers.length} numeri! (${correctNumbers})`;
});
// Bottone per rigiocare
replayButton.addEventListener("click", () => {
  location.reload();
});
