const cursor = document.querySelector("div.cursor")

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
const moveCursor = function (x, y) {
    //update cursor css top/left 
    cursor.style.left = x + "px"
    cursor.style.top = y + "px"
}


document.addEventListener("mousedown", function () {
    // console.log("mousedown")
    growCursor()
})

document.addEventListener("mouseup", function () {
    // console.log("mouseup")
    shrinkCursor()
})

document.addEventListener("mousemove", function (event) {
	// console.log(event)
    // event.pageX -> where we are on the page across
    // event.pageY -> where we are on the page downwards
    moveCursor(event.pageX, event.pageY)
})

