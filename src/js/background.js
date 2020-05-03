let c=0
let badgeCount=''
let idNotify = "notify-"+c
chrome.runtime.onMessage.addListener(function(req){
    if(req.type === 'notifications'){
            chrome.browserAction.setBadgeText({"text": badgeCount}, function(){}) //per attivare il badge 

    chrome.notifications.create(idNotify, req.opt, function(){
        chrome.notifications.onButtonClicked.addListener(function(id,btn){
            const isNotify = id == "notify-"+c           
            if(isNotify && btn == 0){
                alert("feedback positivo"+c)
            }else{
                if(isNotify && btn == 1){
                    alert("feedback negativo"+c)
                }
            }   
            c++  
            idNotify = "notify-"+c
            badgeCount = parseInt(badgeCount)
            badgeCount++
        })
    })
        
    }
    return true //this fix unchecked runtime.lastError
})

