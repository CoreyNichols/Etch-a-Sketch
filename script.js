//Define constants
const sketchPad = document.querySelector('#sketchPad');
const controls = document.querySelector('#controls');
const buttons = document.querySelectorAll('#button');
const boxes = document.getElementsByClassName('box');
const grid = document.documentElement;
let color = 'black';
//Random color generator
function getColor() {
    return '#' + (Math.random().toString(16) + "000000").substring(2,8);
}
//Create sketchPad
function createSketchPad(length) { 
    document.getElementById('sketchPad').innerHTML = "";
    if (length ==  null) {
        length = 32;
    } 
    document.getElementById('sketchPad').style.gridTemplateColumns = 'repeat(length, 1fr)';
    document.getElementById('sketchPad').style.gridTemplateRows = 'repeat(length, 1fr)';
    //Create boxes in sketchpad
    for (let i= 0; i<length * length; i++) {
        const newBox = document.createElement('div');
        newBox.classList.add('box');
        sketchPad.appendChild(newBox);
    }
}
//Color grid (depends on current background color and color selected)
function fill() {
    for(let i=0; i <boxes.length;i++) {
        boxes[i].addEventListener('mouseover', (e) => {
            if (getComputedStyle(e.target).getPropertyValue('background-color') == 'rgb(255, 255, 255)') {
                if (color == 'black') {
                    e.target.style.backgroundColor = 'black';
                } else if (color == 'rainbow') {
                    e.target.style.backgroundColor = getColor();
                }
            } else if (getComputedStyle(e.target).getPropertyValue('background-color') != 'rgb(255, 255, 255)' && color == 'white') {
                e.target.style.backgroundColor = 'white';
            }
        })
    }

}

// Interaction control
colorbtn.addEventListener('click', () => {
    if (color == 'white') {
        return;
    }
    if(color == 'rainbow') {
        color = 'black';
        colorbtn.style.backgroundColor = 'white';
    } else {
        color = 'rainbow';
        colorbtn.style.backgroundColor = 'green';
    }
});

resizebtn.addEventListener('click', () => {
    length = prompt("set a new grid size");
    while (length < 1 || length > 200) {
        length = prompt("set gride size from value 1 to 200 ");
    }
    createSketchPad(length);
    grid.style.setProperty("--length", length);
    reset();
    color = 'black';
    fill();
});
erasebtn.addEventListener('click', () =>{
    if (color == 'rainbow') {
        return;
    }
    if(color == 'white') {
        color = 'black';
        erasebtn.style.backgroundColor = 'white';
    } else {
        color = 'white';
        erasebtn.style.backgroundColor = 'green';
    }
});

//Reset colors for new grid
function reset() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", () => {
            boxes[i].removeAttribute("style")
        })
    }
    colorbtn.style.backgroundColor = 'white';
    erasebtn.style.backgroundColor = 'white';
}

createSketchPad();
fill();
reset();



