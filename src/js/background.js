let c=1
let listOfTxt = []
chrome.storage.sync.set({"listOfTxt": ""}, function(){})//inizializzo lo storage
chrome.runtime.onMessage.addListener(function(req){
    if(req.type === 'notifications'){
        if(c>999) chrome.browserAction.setBadgeText({"text": "999+"}); else chrome.browserAction.setBadgeText({"text": c+""})
        listOfTxt.push(req.opt)
        chrome.storage.sync.set({"listOfTxt": listOfTxt}, function(){})//setto lo storage
        c++
    }
    return true
})