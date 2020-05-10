var comparedTexts = {};
var inputTexts = {};

function setTexts(links, inputs, texts){
    list = document.getElementById("links")
    for(link of links){
        list.insertAdjacentHTML("beforeend", `<li><a href="">${link}</a></li>`)
    }
    for(var i = 0; i < links.length; i++){
        comparedTexts[links[i]] = texts[i]
        inputTexts[links[i]] = inputs[i]
    }
}

document.addEventListener("click", (e)=>{
    if(e.target.tagName == "A"){
        if(e.target.innerText != "Go Back"){
            e.preventDefault()
            document.getElementById("text2").innerHTML = comparedTexts[e.target.innerText]
            document.getElementById("text1").innerHTML = inputTexts[e.target.innerText]
        }
    }
})

//////////// Electron
const {ipcRenderer} = require("electron");

window.onload = async()=>{
    var [links, inputs, texts] = await ipcRenderer.invoke("match")
    setTexts(links, inputs, texts)
    if(inputTexts[links[0]]){
        document.getElementById("text1").innerHTML = inputTexts[links[0]]
        document.getElementById("text2").innerHTML = comparedTexts[links[0]]
    }else{
        document.getElementById("text1").innerHTML = "No Matches Found"
        document.getElementById("text2").innerHTML = "No Matches Found"
    }
}