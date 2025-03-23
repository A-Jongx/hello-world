// bron voor de drag en drop onderzoek: https://youtu.be/EFJg4nUg9sM?si=ByGFcVuBrr2gSWJP
const objecten = document.querySelectorAll(".object");
const vakken = document.querySelectorAll('rect');
const startTijd = 20;
const audio = new Audio("music/spel_muziek.mp3")
let beingDragged = null;
let overigeTijd = 20;
let secondes = document.querySelector("#timer");

function dragStart(e) {
    beingDragged = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.preventDefault();
    const rect = e.target;
    const vak = rect.parentElement;
    console.log("Dropped in: " + vak.id);

    const rectBounds = rect.getBoundingClientRect();
    const svg = document.querySelector("svg").getBoundingClientRect();

    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute("href", beingDragged.src);

    const imgWidth = beingDragged.offsetWidth; 
    const imgHeight = beingDragged.offsetHeight;
    image.setAttribute("width", imgWidth);
    image.setAttribute("height", imgHeight);

    const rectWidth = rectBounds.width;
    const rectHeight = rectBounds.height;
    const x = (rectBounds.left - svg.left) + (rectWidth - imgWidth) / 2;
    const y = (rectBounds.top - svg.top) + (rectHeight - imgHeight) / 1.22;
    image.setAttribute("x", x);
    image.setAttribute("y", y);

    vak.append(image);

    const correctVak = beingDragged.getAttribute("data-correct");
    if (vak.id === correctVak) {
        beingDragged.style.display = "none";
    } else {
        vak.removeChild(image);
    }
}

// bron voor audio tutorial, audio en timer
// https://youtu.be/xihrbIE2JNM?si=8nYUV7wwg1vlH-lC
// https://www.youtube.com/watch?v=A7dCq_u7o0Y
// https://youtu.be/3xlws5og44U?si=-SQFxL-iyYFQUm8Z

function startTimer() {
    audio.play();
    const timer = setInterval(() => {
        overigeTijd--;
        secondes.textContent = overigeTijd;

        if (overigeTijd < 0) {
            clearInterval(timer);
            alert("GAME OVER...");
            audio.currentTime = 0;
            overigeTijd = startTijd;
            secondes.textContent = overigeTijd;
        }
    }, 1000);
}

objecten.forEach(object => {
    object.addEventListener("dragstart", dragStart);
});

vakken.forEach(rect => {
    rect.addEventListener("dragover", dragOver);
    rect.addEventListener("drop", dragDrop);
});

document.getElementById("startButton").addEventListener("click", startTimer);

// bronnen van MDN web docs:
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
// https://developer.mozilla.org/en-US/docs/Web/API/Node
// https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
// https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
// https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect
// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
// https://developer.mozilla.org/en-US/docs/Web/API/Element/append#