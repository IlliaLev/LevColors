let colorDiv1 = document.querySelector("#cone");
let colorDiv2 = document.querySelector("#ctwo");
let colorDiv3 = document.querySelector("#cthree");
let colorDiv4 = document.querySelector("#cfour");
let colorDiv5 = document.querySelector("#cfive");

let colorText1 = document.querySelector("#coneText");
let colorText2 = document.querySelector("#ctwoText");
let colorText3 = document.querySelector("#cthreeText");
let colorText4 = document.querySelector("#cfourText");
let colorText5 = document.querySelector("#cfiveText");

let rgbText1 = document.querySelector("#rgbB1");
let rgbText2 = document.querySelector("#rgbB2");
let rgbText3 = document.querySelector("#rgbB3");
let rgbText4 = document.querySelector("#rgbB4");
let rgbText5 = document.querySelector("#rgbB5");

let switchIsolation = document.querySelector("#switchIsolation");

let array = [colorDiv1, colorDiv2, colorDiv3, colorDiv4, colorDiv5];
let colorCodes = [colorText1,colorText2,colorText3,colorText4,colorText5];
let rgbCodes = [rgbText1, rgbText2, rgbText3, rgbText4, rgbText5];

colorText1.onclick = copyToClipboard;
colorText2.onclick = copyToClipboard;
colorText3.onclick = copyToClipboard;
colorText4.onclick = copyToClipboard;
colorText5.onclick = copyToClipboard;

rgbText1.onclick = copyToClipboard;
rgbText2.onclick = copyToClipboard;
rgbText3.onclick = copyToClipboard;
rgbText4.onclick = copyToClipboard;
rgbText5.onclick = copyToClipboard;

setAllRandomColors();

document.addEventListener("keydown", function(event) {
    if(event.code === "Space" || event.key === " "){
        setAllRandomColors();
    }
});

switchIsolation.addEventListener('change', function() {
    if(switchIsolation.checked){
        setBorders();
    } else {
        unsetBorders();
    }
});


function getRandomHexColor() {
    let randomColor = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
    return randomColor;
}

function setColor(colorDiv, color){
    colorDiv.style["background-color"] = color;
}

function setAllRandomColors(){
    for(let i = 0; i < array.length; i++){
        let color = getRandomHexColor();
        let isLight = isLightColor(color); 
        setColor(array[i], color);
        colorCodes[i].innerText = color;
        let rgb = getRgb(color);
        rgbCodes[i].innerText = rgb[0] + ", " + rgb[1] + ", " + rgb[2];

        colorCodes[i].setAttribute("data-original-color", color);
        colorCodes[i].setAttribute("data-is-light", isLight);

        if(isLight){
            colorCodes[i].style.color = "white";
            let lRgb = lightenRgb(rgb, 0.5);
            rgbCodes[i].style.color = "rgb(" + lRgb[0] + ", " + lRgb[1] + ", " + lRgb[2] + ")";
        } else {
            colorCodes[i].style.color = "black";
            let dRgb = darkenRgb(rgb, 0.5);
            rgbCodes[i].style.color = "rgb(" + dRgb[0] + ", " + dRgb[1] + ", " + dRgb[2] + ")";
        }

        colorCodes[i].onmouseenter = null;
        colorCodes[i].onmouseleave = null;

        addHoverEffect(colorCodes[i]);
    }
}

function addHoverEffect(element) {
    element.addEventListener("mouseenter", function() {
        let color = this.getAttribute("data-original-color");
        let isLight = this.getAttribute("data-is-light") === "1";
        let rgb = getRgb(color);
        let bg;

        if(isLight){
            bg = lightenRgb(rgb, 0.3);
        } else {
            bg = darkenRgb(rgb, 0.3);
        }

        this.style["background-color"] = "rgba(" + bg[0] + ", " + bg[1] + ", " + bg[2] + ", " + "0.3)";
    });

    element.addEventListener("mouseleave", function() {
        this.style["background-color"] = "";
    });
}

function getRgb(hex){
    hex = hex.replace(/^#/, "");

    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);

    return [r, g, b];
}

function lightenRgb(rgb, amount) {
    let newR = Math.round(rgb[0] + (255 - rgb[0]) * amount);
    let newG = Math.round(rgb[1] + (255 - rgb[1]) * amount);
    let newB = Math.round(rgb[2] + (255 - rgb[2]) * amount);

    return [newR, newG, newB];
}

function darkenRgb(rgb, amount) {
    let newR = Math.round(rgb[0] * (1 - amount));
    let newG = Math.round(rgb[1] * (1 - amount));
    let newB = Math.round(rgb[2] * (1 - amount));

    return [newR, newG, newB];
}

function isLightColor(hex){
    let rgb = getRgb(hex);

    let luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];

    return luminance <= 128 ? 1 : 0;
}

function copyToClipboard() {
    let text = this.innerText;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function() {
            
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
        });
    }

}

function setBorders() {
    for(let i = 0; i < array.length - 1; i++){
        array[i].style["border-right"] = "5px solid white";
    }
    for(let i = 1; i < array.length; i++){
        array[i].style["border-left"] = "5px solid white";
    }
}

function unsetBorders() {
    for(let i = 0; i < array.length - 1; i++){
        array[i].style["border-right"] = "none";
    }
    for(let i = 1; i < array.length; i++){
        array[i].style["border-left"] = "none";
    }
}