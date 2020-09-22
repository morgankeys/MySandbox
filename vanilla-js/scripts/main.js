const appDiv = document.querySelector('.app');

let buffer = []

const handleKeypress = (event) => {
    if (event.code == "Backspace" || event.code == "Delete") {
        buffer.pop()
    } else {
        buffer.push(event.key)
    }
    update()
}

const update = () => {
    let bufferString = ''
    for (let i = 0; i<buffer.length; i++) {
        bufferString = bufferString+buffer[i]
    }
    appDiv.innerHTML = `<div class="frame"><h1>${bufferString}<span class="cursor">|</h1></div>`
}

appDiv.innerHTML = `<div class="frame"><h1><span class="cursor">|</h1></div>`
document.addEventListener('keydown', handleKeypress);