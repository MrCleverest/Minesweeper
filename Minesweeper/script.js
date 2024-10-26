// Поле з мінами. 1 - міна; 0 - немає міни
let field = [ [0, 1, 1, 1, 0, 1, 0, 1, 0, 0],
              [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
              [0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
              [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
              [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
              [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
              [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
              [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
              [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
              [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
];
let chance = 8;
let countMines = 0;
for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field.length; j++) {
        field[i][j] = Math.floor(Math.random() * chance);
        if (field[i][j] == 1) {
            countMines++;
        }
    }
}
// Клітинка що обрав гравець
let click = {
    x: 0,
    y: 0
};
let id = "";
// Перший клік
let firstwasnt = true;

// ГОЛОВНА ФУНКЦІЯ
function main() {
    id = event.target.id;
    click.x = getX(id);
    click.y = getY(id);
    changingBackColor("white");
    firstClick();
    checking();
}

// Перший клік гравця
function firstClick() {
    if (firstwasnt) {
        if (field[click.y][click.x] == 1) {
            field[click.y][click.x] = 0;
            countMines--;
        }
        firstwasnt = false;
    }
}

// Перевірка чи є міна
function checking(){
    if(field[click.y][click.x] == 1) {
        addImage("mina.png", id);
        defeat();
    }
    else {
        let mines = calculation();
        changingText(mines);
        whichNumber(mines);
        ifWon();
    }
}

// Зміна кольору клітинки
function changingBackColor(color) {
    // Отримуємо елемент за його id
    const element = document.getElementById(id);
    // Змінюємо його background color
    element.style.backgroundColor = color;
}

// Зміна кольору тексту
function changingColor(color) {
    // Отримуємо елемент за його id
    const element = document.getElementById(id);
    // Змінюємо його background color
    element.style.color = color;
}

// Зміна тексту в клітинці
function changingText(text) {
    // Отримуємо елемент за його id
    const element = document.getElementById(id);
    // Змінюємо його background color
    element.innerHTML = `<strong>${text}</strong>`;
}
function getX(id) {
    const match = id.match(/x(\d+)/); 
    return match ? Number(match[1]) : -1; 
}

function getY(id) {
    const match = id.match(/y(\d+)/); 
    return match ? Number(match[1]) : -1; 
}

// Функція для додавання зображення
function addImage(imageURL, idElement) {
    document.getElementById(idElement).innerHTML=`<img src="${imageURL}">`;
}

// Функція підрахунку мін довкола
function calculation() {
    let result = 0;
    // Початкові координати довкола
    let startX = click.x-1;
    if (startX < 0){
        startX = 0;
    }
    let finishX = click.x+1;
    if (finishX > 9){
        finishX = 9;
    }
    let startY = click.y-1;
    if (startY < 0){
        startY = 0;
    }
    let finishY = click.y+1;
    if (finishY > 9){
        finishY = 9;
    }
    // Підрахунок бомб довкола
    for (let i = startY; i <= finishY; i++) {
        for (let j = startX; j <= finishX; j++) { 
            if (field[i][j] == 1){
                result++;
            }
        }
    }
    return result;
}

function whichNumber(mine_numbers) {
    if (mine_numbers == 2) {
        changingColor("green");
    }
    else if (mine_numbers == 3) {
        changingColor("red");
    }
    else if (mine_numbers == 4){
        changingColor("darkblue");
    }
    else if (mine_numbers >= 5){
        changingColor("darkred");
    }
}
// Функція для підрахунку сірих <div>
function countGrayCells() {
    let countGray = 0; // Лічильник сірих <div>
    const divs = document.querySelectorAll('.cell'); // Отримуємо всі <div> з класом 'cell'

    divs.forEach(div => {
        const bgColor = getComputedStyle(div).backgroundColor; // Отримуємо колір фону
        if (bgColor === 'rgb(211, 211, 211)') { // Перевіряємо на сірий
            countGray++; // Збільшуємо лічильник
        }
    });

    return countGray; // Повертаємо кількість сірих <div>
}

function ifWon() {
    let grayCells = countGrayCells();
    if (grayCells == countMines){
        won();
    }
}

function won() {
     // Створюємо div елемент
        const overlay = document.createElement('div');
        overlay.id = 'overlay';

        // Створюємо текстовий елемент
        const message = document.createElement('div');
        message.innerText = 'Congratulations! You won!';

        // Створюємо кнопку
        const restartButton = document.createElement('button');
        restartButton.id = 'restartButton';
        restartButton.innerText = 'Restart';
        restartButton.style.backgroundColor = 'lime';
        // Стиль при наведенні
        restartButton.onmouseover = function() {
            restartButton.style.backgroundColor = 'green'; // Сірий фон при наведенні
        };
        restartButton.onmouseout = function() {
            restartButton.style.backgroundColor = 'lime'; // Повертаємось до зеленого при виході
        };

        // Додаємо обробник події на кнопку
        restartButton.addEventListener('click', function() {
            location.reload(); // Оновлюємо сторінку
        });

        // Додаємо елементи до overlay
        overlay.appendChild(message);
        overlay.appendChild(restartButton);

        // Додаємо overlay на сторінку
        document.body.appendChild(overlay);
}

function defeat() {
    // Створюємо div елемент
        const overlay = document.createElement('div');
        overlay.id = 'overlay';

        // Створюємо текстовий елемент
        const message = document.createElement('div');
        message.innerText = 'Game Over!';

        // Створюємо кнопку
        const restartButton = document.createElement('button');
        restartButton.id = 'restartButton';
        restartButton.innerText = 'Restart';

        // Додаємо обробник події на кнопку
        restartButton.addEventListener('click', function() {
        location.reload(); // Оновлюємо сторінку
    });

    // Додаємо елементи до overlay
    overlay.appendChild(message);
    overlay.appendChild(restartButton);

    // Додаємо overlay на сторінку
    document.body.appendChild(overlay);
    openEveryCell();
}

// ПОСТАВИТИ ФЛАЖОК
// Отримуємо всі елементи з класом 'cell'
const divs = document.querySelectorAll('.cell');

// Додаємо обробник події правого кліку на кожен <div>
divs.forEach(div => {
    div.oncontextmenu = function(e) {
        e.preventDefault(); // Запобігаємо відкриттю контекстного меню
        const divId = div.id; // Отримуємо id натиснутого div
        toggleImage(divId, "flag.png"); // Передаємо id і URL зображення
    };
});

// Функція для додавання або видалення зображення за id
function toggleImage(id, imageURL) {
    const element = document.getElementById(id); // Знаходимо <div> по id
            
// Перевіряємо колір фону
const bgColor = getComputedStyle(element).backgroundColor;
if (bgColor === 'rgb(211, 211, 211)') { // 'lightgray' у форматі RGB
    const img = element.querySelector('img'); // Шукаємо, чи є зображення в елементі

    if (img) {
        // Якщо зображення вже є, видаляємо його
        element.removeChild(img);
    } 
    else {
        // Якщо зображення немає, вставляємо
            element.innerHTML = `<img src="${imageURL}" alt="flag" style="width: 100%; height: 100%;">`;
        }
    } 
}