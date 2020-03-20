function textToHTML(text){
    return `<p>${text}</p>`.replace(new RegExp("\t","gi"), " ").replace(new RegExp("\n","gi"), "</p><p>").replace(new RegExp("<p>[\n ]*</p>", "gi"), "")
}

function rangeOverlap(start1, end1, start2, end2){
    if(end1 < start2 || end2 < start1){
        return false
    }
    return [Math.min(start1, start2), Math.max(end1, end2)]
}

function addToRanges(ranges, start, end){
    for(var i = 0; i < ranges.length; i++){
        if(rangeOverlap(start, end, ranges[i][0], ranges[i][1])){
            var newRange = rangeOverlap(start, end, ranges[i][0], ranges[i][1])
            ranges.splice(i,1)
            return addToRanges(ranges, newRange[0], newRange[1])
        }
    }
    ranges.push([start, end])
    return ranges
}

function sourceToHTML(source, originalText, {minScore = 5}={}){
    var comparedText = source.text
    var comparedTextCopy = comparedText
    var originalTextCopy = originalText

    var originalTextMatches = []
    var comparedTextMatches = []

    for(var match of source.matches){
        if(match.score >= minScore){
            originalTextMatches = addToRanges(originalTextMatches, match.inputStart, match.inputEnd)
            comparedTextMatches = addToRanges(comparedTextMatches, match.comparedStart, match.comparedEnd)
        }
    }

    for(var match of originalTextMatches){
        originalText = originalText.replace(originalTextCopy.slice(match[0], match[1]), `<u>${originalTextCopy.slice(match[0], match[1])}</u>`)
    }

    for(var match of comparedTextMatches){
        comparedText = comparedText.replace(comparedTextCopy.slice(match[0], match[1]), `<u>${comparedTextCopy.slice(match[0], match[1])}</u>`)
    }

    if(originalText == originalTextCopy){     // No matches greater than the minimum score or there are no matches at all
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