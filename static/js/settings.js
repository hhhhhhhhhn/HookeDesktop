function getSettings(){
    var settings = {}
    for(e of document.getElementsByTagName("input")){
        if(e.getAttribute("type") == "number") settings[e.id] = Number(e.value)
        else settings[e.id] = e.value
    }
    for(e of document.getElementsByTagName("select")){
        if(e.getAttribute("type") == "number") settings[e.id] = e.value
        else settings[e.id] = e.value
    }
    return settings
}

electron = require("electron")
const Store = require('electron-store');

const store = new Store();

window.addEventListener("click", (e)=>{
    if(e.target.tagName == "BUTTON"){
        store.set("settings", JSON.stringify(getSettings()))
    }
})