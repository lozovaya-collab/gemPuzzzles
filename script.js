const field = document.createElement('div')
const btnReset = document.createElement('button')
var init = 1;
let count = 0
var startDate = new Date()
var clocktimer;
const formClock = document.createElement('form')
const counts = document.createElement('p')
const time = document.createElement('p')
counts.className = 'counts_steps'
counts.innerHTML = '0 steps'
formClock.setAttribute('name', 'clockform')

document.body.appendChild(counts)
const inputTime = document.createElement('input')
inputTime.setAttribute('disabled', true)
inputTime.setAttribute('name', 'clock')
inputTime.setAttribute('size', '12')
inputTime.setAttribute('maxlength', '12')
inputTime.setAttribute('value', '00:00.00')
formClock.appendChild(inputTime)
time.appendChild(formClock)
document.body.appendChild(time)
btnReset.className = 'btnReset'
btnReset.innerHTML = 'reset'
field.className = 'gem-puzzle'
document.body.appendChild(field)
document.body.appendChild(btnReset)
const sizeOfPuzzle = 100
field.ondragover = allowDrop
const arr = []



function allowDrop(e) {
    e.preventDefault();
}
const empty = {
    top: 0,
    left: 0
}
let memoryIndex
let puzzles = []
let elements = []
console.log(localStorage.getItem('puzzles'));
console.log(localStorage.getItem('elements'));
puzzles.push(empty)
elements.push('')
startTIME()
let numbersOfPuzzles

console.log(localStorage.getItem('numbers'));
if (localStorage.getItem('numbers') !== null) {
    console.log('here');
    numbersOfPuzzles = JSON.parse(localStorage.getItem('numbers'))
} else {
    numbersOfPuzzles = [...Array(15).keys()].sort(() => Math.random() - 0.5)
    localStorage.setItem('numbers', JSON.stringify(numbersOfPuzzles))
}


console.log(localStorage.getItem('numbers'));

for (let i = 1; i <= 15; i++) {


    const puzzle = document.createElement('div')
    puzzle.className = 'gem-puzzle__cell'
    puzzle.id = 'cell'
    arr.push(puzzle)
    puzzle.setAttribute('draggable', true)
    puzzle.innerHTML = numbersOfPuzzles[i - 1] + 1

    const left = i % 4
    const top = (i - left) / 4

    puzzles.push({
        left: left,
        top: top
    })
    elements.push(puzzle)

    if (localStorage.getItem('puzzles') !== null) {
        puzzles = []

        console.log(localStorage.getItem('puzzles'));
        puzzles = JSON.parse(localStorage.getItem('puzzles'))
        console.log(puzzles);

    }

    console.log(elements[i]);


    puzzle.style.left = `${puzzles[i].left * sizeOfPuzzle}px`
    puzzle.style.top = `${puzzles[i].top * sizeOfPuzzle}px`

    field.append(puzzle)

    //localStorage.setItem('puzzles', JSON.stringify(field))
    puzzle.addEventListener('click', () => {
        console.log(elements[i]);

        movePuzzle(i)

    })



}

btnReset.addEventListener('click', () => {

    numbersOfPuzzles = [...Array(15).keys()].sort(() => Math.random() - 0.5)
    count = 0
    counts.innerHTML = `${count} steps`
    clearFields()
    startDate = new Date()
    startTIME()
    for (let i = 1; i < 15; i++) {

        if (i === 1) {
            arr[0].innerHTML = numbersOfPuzzles[14] + 1
        }
        arr[i].innerHTML = numbersOfPuzzles[i - 1] + 1

    }

})


function movePuzzle(index) {

    const puzzle = puzzles[index]
    const element = elements[index]
    console.log(element);
    const leftDiff = Math.abs(puzzles[0].left - puzzle.left)
    const topDiff = Math.abs(puzzles[0].top - puzzle.top)

    if (leftDiff + topDiff > 1) {
        return
    }
    count += 1
    counts.innerHTML = `${count} steps`
    console.log(element);
    element.style.left = `${puzzles[0].left * sizeOfPuzzle}px`
    element.style.top = `${puzzles[0].top * sizeOfPuzzle}px`

    const emptyLeft = puzzles[0].left
    const emptyTop = puzzles[0].top
    puzzles[0].left = puzzle.left
    puzzles[0].top = puzzle.top
    puzzle.left = emptyLeft
    puzzle.top = emptyTop
    localStorage.setItem('puzzles', JSON.stringify(puzzles))
}

function startTIME() {
    init = 1
    let thisDate = new Date();
    let t = thisDate.getTime() - startDate.getTime();

    let ms = t % 1000;
    t -= ms;
    ms = Math.floor(ms / 10);
    t = Math.floor(t / 1000);
    var s = t % 60;
    t -= s;
    t = Math.floor(t / 60);
    var m = t % 60;
    t -= m;
    t = Math.floor(t / 60);


    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;

    if (init == 1) inputTime.value = m + ':' + s + '.' + ms;
    clocktimer = setTimeout("startTIME()", 10);
}

function clearFields() {
    init = 0;
    clearTimeout(clocktimer);
    inputTime.value = '00:00.00';
}