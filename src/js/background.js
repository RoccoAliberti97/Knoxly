let c=0
let listOfTxt = []
let n_avg = 1
let avg = 0
chrome.storage.sync.set({"listOfTxt": ""}, function(){})//inizializzo lo storage
chrome.storage.sync.set({"occurrence": [0,0,0,0,0]}, function(){})//inizializzo lo storage
chrome.storage.sync.set({"avg": 0}, function(){})//inizializzo lo storage

chrome.runtime.onMessage.addListener(function(req){
    if(req.type === 'additem'){
        listOfTxt.push(req.opt)     
        chrome.storage.sync.set({"listOfTxt": listOfTxt}, function(){})//setto lo storage
        updateOccurrence(req.opt.topicList)
        const l = req.opt.sensList.length
        for(let  i = 0; i < l; i++) setAvg(req.opt.sensList[i][1])
        setBadgeText(++c)
    }
    if(req.type === 'rmvitem'){
        listOfTxt.splice(req.opt.toRemove,1) 
        if(listOfTxt.length == 0) chrome.storage.sync.set({"listOfTxt": ""}, function(){})
        else  chrome.storage.sync.set({"listOfTxt": listOfTxt}, function(){})
        setBadgeText(--c)
    }
    if(req.type === 'rmvAll'){
        listOfTxt = []
        c = 0
        chrome.storage.sync.set({"listOfTxt": ""}, function(){})
        setBadgeText(c)
    }
    return true
})

function setBadgeText(c){
    if(c>999) chrome.browserAction.setBadgeText({"text": "999+"}); 
    else if(c==0) chrome.browserAction.setBadgeText({"text":""});
    else chrome.browserAction.setBadgeText({"text": c+""})
}

function updateOccurrence(topicList){
    chrome.storage.sync.get(['occurrence'], function(res){
        //res.occurrence[topic]++
        for(let i =0; i<topicList.length; i++) res.occurrence[topicList[i]]++
        chrome.storage.sync.set({"occurrence": res.occurrence}, function(){})
    })
}

function setAvg(sens){
    avg = avg + (sens - avg)/n_avg
    n_avg++
    chrome.storage.sync.set({"avg": avg}, function(){})
}