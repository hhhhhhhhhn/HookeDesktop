var comparedTexts = {}

function setTexts(input, links, texts){
    document.getElementById("text1").innerHTML = input
    list = document.getElementById("links")
    for(link of links){
        list.insertAdjacentHTML("beforeend", `<li><a href="">${link}</a></li>`)
    }
    for(var i = 0; i < links.length; i++){
        comparedTexts[links[i]] = texts[i]
    }
}

document.addEventListener("click", (e)=>{
    if(e.target.tagName == "A"){
        e.preventDefault()
        document.getElementById("text2").innerHTML = comparedTexts[e.target.innerText]
    }
})