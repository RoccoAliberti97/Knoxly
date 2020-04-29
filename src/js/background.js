chrome.runtime.onMessage.addListener(function(req, sender, sendRes){
    if(req.type === 'notifications'){
        chrome.notifications.create('notify', req.opt, function(){
        })
        chrome.notifications.onButtonClicked.addListener(function(id,btn){
            if(btn == 0){
                //send feedback
                alert("feedbeck inviato")
            }
        })
    }
})

