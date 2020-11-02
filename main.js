let editBox = document.querySelector('.editBox');
let styleBox = document.querySelector('.styleBox');
let textBox = document.querySelector('.textBox');
let fontFamily = document.querySelector('.fontFamilySelect');
let textArea = document.querySelector('textarea');

// This function temporary hides elements
function hideElem(selector) {
    if (selector.classList.contains('add')) {
        selector.classList.remove('add');
        selector.classList.add('remove');
    }
}

// This function temporary shows elements
function showElem(selector) {
    if (selector.classList.contains('remove')) {
        selector.classList.remove('remove');
        selector.classList.add('add');
    }
}

document.querySelector('.edit').addEventListener('click', function () {
    showElem(editBox);
    hideElem(styleBox);
    textArea.value = textBox.innerHTML;
})

document.querySelector('.save').addEventListener('click', function () {
    hideElem(editBox);
    textBox.innerHTML = textArea.value;
})

document.querySelector('.style').addEventListener('click', function () {
    showElem(styleBox);
    hideElem(editBox);
})

document.forms.radio.addEventListener('click', function () {
    if (event.target.checked) {
        textBox.style.fontSize = event.target.value;
    }
})

document.forms.weight.addEventListener('click', function () {
    if (event.target.checked && event.target.value == 'bold') {
        textBox.style.fontWeight = event.target.value;
    }
    else if (event.target.checked && event.target.value == 'italic') {
        textBox.style.fontStyle = event.target.value;
    }
    else if (!event.target.checked && event.target.value == 'bold') {
        textBox.style.fontWeight = 'normal';
    }
    else if (!event.target.checked && event.target.value == 'italic') {
        textBox.style.fontStyle = 'normal';
    }
})

fontFamily.addEventListener('click', function () {
    for (let i = 0; i < fontFamily.options.length; i++) {
        if (fontFamily.options[i].selected) {
            textBox.style.fontFamily = fontFamily.options[i].value;
        }
    }
})

let colors = ['rgb(232, 71, 67)', ' rgb(0, 95, 203)', 'rgb(31, 150, 66)', 'rgb(50, 59, 63)', 'rgb(255, 199, 0)', 'rgb(244, 84, 139)', 'white', 'rgb(96, 68, 168)', 'rgb(9, 130, 161)']
let textColor = document.forms.editColors.textColor;
let backgroundColor = document.forms.editColors.backgroundColor;

// This function creates box with text color or background color
function createDivBoxes(cls1, cls2) {
    let divBox = document.createElement('div');
    document.querySelector('.styleToolsBox2').append(divBox);
    divBox.setAttribute('class', `${cls1} remove`);
    for (let i = 1; i <= 9; i++) {
        let smallBoxes = document.createElement('div');
        document.querySelector(`.${cls1}`).appendChild(smallBoxes);
        smallBoxes.setAttribute('class', cls2);
    }
    let boxes = document.querySelectorAll(`.${cls2}`);
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < colors.length; j++) {
            boxes[i].style.backgroundColor = colors[i];
        }
    }
    boxes.forEach(element => {
        element.addEventListener('click', function () {
            if (`${cls1}` === 'textColorBoxes') {
                textBox.style.color = element.style.backgroundColor;
                hideElem(document.querySelector('.textColorBoxes'));
            }
            else if (`${cls1}` === 'backgroundColorBoxes') {
                textBox.style.backgroundColor = element.style.backgroundColor;
                hideElem(document.querySelector('.backgroundColorBoxes'));
            }
        })
    })
}

createDivBoxes('textColorBoxes', 'textColorBox');
createDivBoxes('backgroundColorBoxes', 'backgroundColorBox');

textColor.addEventListener('click', function () {
    showElem(document.querySelector('.textColorBoxes'));
    hideElem(document.querySelector('.backgroundColorBoxes'));
})

backgroundColor.addEventListener('click', function () {
    showElem(document.querySelector('.backgroundColorBoxes'));
    hideElem(document.querySelector('.textColorBoxes'));

})

document.querySelector('.addButton').addEventListener('click', function () {
    hideElem(document.querySelector('.mainBox'));
    showElem(document.querySelector('.addElemBox'));
})

document.forms.addElem.addEventListener('click', function () {
    if (event.target.value == 'table') {
        showElem(document.querySelector('.createTable'));
        hideElem(document.querySelector('.createList'))
    }
    else if (event.target.value == 'list') {
        showElem(document.querySelector('.createList'));
        hideElem(document.querySelector('.createTable'))
    }
})

// This function writes down HTML code of created table into textarea 
function tableCreate(row, col) {
    textArea.value += `<table style=\"border-collapse: collapse;\">`;
    textArea.value += `<tbody>`;
    let borderStyle;
    let color;
    let borderColor = document.querySelector('.borderColor');
    let borderType = document.querySelector('.borderType');
    for (let a = 0; a < borderType.options.length; a++) {
        if (borderType.options[a].selected) {
            borderStyle = borderType.options[a].value;
        }
    }
    for (let b = 0; b < borderColor.options.length; b++) {
        if (borderColor.options[b].selected) {
            color = borderColor.options[b].value;
        }
    }
    for (let j = 1; j <= row; j++) {
        textArea.value += '<tr>';
        for (let i = 1; i <=col; i++) {
            textArea.value += `<td style=\"width:${document.querySelector('.tableWidth').value}px; height:${document.querySelector('.tableHeight').value}px; border:${document.querySelector('.borderWidth').value}px ${borderStyle} ${color}\">TD</td>`;
        }
    }
    textArea.value += '</table>';
    textArea.value += `</tbody>`;
}

document.forms.createTableButton.addEventListener('click', function () {
    tableCreate(document.querySelector('.create_tr').value, document.querySelector('.create_td').value);
    hideElem(document.querySelector('.addElemBox'));
    showElem(document.querySelector('.mainBox'));
    showElem(editBox);
    hideElem(document.querySelector('.createTable'));
    document.forms.addElem.reset();
    document.forms.createTableTools.reset();
})

// This function writes down HTML code of created list into textarea 
function listCreate(list) {
    textArea.value += `<ul>`;
    let listStyle;
    let marks = document.querySelector('.typeOfMarks');
    for (let a = 0; a < marks.options.length; a++) {
        if (marks.options[a].selected) {
            listStyle = marks.options[a].value;
        }
    }
    for (let j = 1; j <= list; j++) {
        textArea.value += `<li style=\"list-style-type: ${listStyle}\">item ${j}</li>`;
    }
    textArea.value += '</ul>';
}

document.forms.createListButton.addEventListener('click', function () {
    listCreate(document.querySelector('.count_li').value)
    hideElem(document.querySelector('.addElemBox'));
    showElem(document.querySelector('.mainBox'));
    showElem(editBox);
    hideElem(document.querySelector('.createList'));
    document.forms.addElem.reset();
    document.forms.createListTools.reset();
})