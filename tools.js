function textToHTML(text){
    return `<p>${text}</p>`.replace(new RegExp("\t","gi"), " ").replace(new RegExp("\n","gi"), "</p><p>").replace(new RegExp("<p>[\n ]*</p>", "gi"), "")
}

function sourceToHTML(source, originalText, {minScore = 5}={}){
    comparedText = source.text
    originalTextCopy = originalText
    for(var match of source.matches){
        if(match.score >= minScore){
            originalText = originalText.replace(originalText.slice(match.inputStart, match.inputEnd), `<u>${originalText.slice(match.inputStart, match.inputEnd)}</u>`)
            comparedText = comparedText.replace(comparedText.slice(match.comparedStart, match.comparedEnd), `<u>${comparedText.slice(match.comparedStart, match.comparedEnd)}</u>`)
        }
    }
    if(originalText == originalTextCopy){     // No matches greater than the minimum score or no matches at all
        return false
    }
    originalText = `<p>${originalText}</p>`.replace(new RegExp("\t","gi"), " ").replace(new RegExp("\n","gi"), "</p><p>").replace(new RegExp("<p>[\n ]*</p>", "gi"), "")
    comparedText = `<p>${comparedText}</p>`.replace(new RegExp("\t","gi"), " ").replace(new RegExp("\n","gi"), "</p><p>").replace(new RegExp("<p>[\n ]*</p>", "gi"), "")
    return [source.source, originalText, comparedText]
}

function sourcesToHTML(sources, originalText, {minScore = 5}={}){
    var links = [], inputs = [], compared = []
    for(source of sources){
        result = sourceToHTML(source, originalText, {minScore: minScore})
        if(result){
            var [link, input, compare] = result
            links.push(link); inputs.push(input); compared.push(compare)
        }
    }
    return [links, inputs, compared]
}

module.exports = {sourceToHTML, sourcesToHTML, textToHTML}