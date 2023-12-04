const cursor = document.querySelector("div.cursor")
const canvasIn = document.querySelector("canvas.in")
const canvasOut = document.querySelector("canvas.out")

let isMouseDown = false

// variables for mouse position
let mouseX = 0 
let mouseY = 0

//variable for the cursor dot position
let cursorX = 0
let cursorY = 0

let speed = 0.3

// When I hold the mouse down on the page, make the cursor bigger
const growCursor = function () {
    cursor.classList.add("is-down")
    cursor.innerHTML = `<span>Let go please</span>`
}

// When I let go of the mouse, make the cursor smaller
const shrinkCursor = function () {
    cursor.classList.remove("is-down")
    cursor.innerHTML = `<span>Click me!</span>`
}

// move the cursor based on coordinates
function animate () {

    // the distance between the mouse and the cursor
    let distX = mouseX - cursorX
    let distY = mouseY - cursorY

    cursorX = cursorX + (distX * speed) // mouseX 
    cursorY = cursorY + (distY * speed) // mouseY 

    distX = mouseX - cursorX
    distY = mouseY - cursorY

     //update cursor css top/left 
    cursor.style.left = cursorX + "px"
    cursor.style.top = cursorY + "px"

    requestAnimationFrame(animate);

}

animate()

// set up a canvas
const setupCanvas = function (canvas) {
    // const sectionTag = document.querySelector("section")
    // const h = sectionTag.offsetHeight
    const w = window.innerWidth
    const h = window.innerHeight

    //retina-friendly canvas, device dimensions
    const dpi = window.devicePixelRatio // retina-friendly = 2 ; non retina-friendly = 1
    canvas.width = w * dpi
    canvas.height = h * dpi

    // width and height in css itself
    canvas.style.width = w + "px"
    canvas.style.height = h + "px"

    // which context are we talking about? 2D? 3D?
    const context = canvas.getContext("2d")

    if (canvas.classList.contains("out")) {
        context.fillStyle = "#ffffff"
        context.strokeStyle = "#000000"
    } else {
        context.fillStyle = "#000000"
        context.strokeStyle = "#ffffff"
    }

    context.scale(dpi, dpi) // for retina screens
    context.lineWidth = 80
    context.lineCap = "round"
    context.lineJoin = "round"

    context.rect(0, 0, w, h)
    context.fill()

    context.shadowBlur = 80
    context.shadowColor = context.strokeStyle
}

// lets draw based on three things: canvas, x and y
const moveDraw = function (canvas, x, y) {
    //get the context of this canvas
    const context = canvas.getContext("2d")
    // context.rect(x-30, y-30, 60, 40)
    // context.fill()
    if (isMouseDown) {
        context.lineTo(x, y)
        context.stroke()
    }
}

// lets start to draw, based on the canvas, x and y
const startDraw = function (canvas, x, y) {
    const context = canvas.getContext("2d")
    context.moveTo(x, y)

    // const colors = ["red", "yellow", "blue", "green"]
    // const randomNum = Math.floor(Math.random() * colors.length)

    // context.strokeStyle = colors[randomNum]

    context.beginPath()

}

setupCanvas(canvasIn)
setupCanvas(canvasOut)

document.addEventListener("mousedown", function (event) {
    // console.log("mousedown")
    isMouseDown = true
    growCursor()
    startDraw(canvasIn, event.pageX, event.pageY)
    startDraw(canvasOut, event.pageX, event.pageY)
})

document.addEventListener("mouseup", function () {
    // console.log("mouseup")
    isMouseDown = false
    shrinkCursor()
})

document.addEventListener("mousemove", function (event) {
    // event.pageX -> where we are on the page across
    // event.pageY -> where we are on the page downwards
    mouseX = event.pageX
    mouseY = event.pageY

    moveDraw(canvasIn, event.pageX, event.pageY)
    moveDraw(canvasOut, event.pageX, event.pageY)
})

window.addEventListener ("resize", function () {
    setupCanvas(canvasIn)
    setupCanvas(canvasOut)
})