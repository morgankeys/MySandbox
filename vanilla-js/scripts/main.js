const appDiv = document.querySelector('.app');

let buffer = []

const handleKeypress = (event) => {
    console.log(event)

    switch (event.key) {
        case "Backspace" || "Delete":
            buffer.pop()
        case "Shift" || "Alt" || "Control":
            break
        default:
            buffer.push(event.key)
    }
    update()
}

const update = () => {
    let bufferString = ''
    buffer.map(char => bufferString = bufferString+char)

    appDiv.innerHTML = `<div class="frame"><h1>${bufferString}<span class="cursor">|</h1></div>`
}

appDiv.innerHTML = `<div class="frame"><h1><span class="cursor">|</h1></div>`
document.addEventListener('keydown', handleKeypress);