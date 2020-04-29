chrome.runtime.onMessage.addListener(function(req, sender, sendRes){
    if(req.type === 'notifications'){
        chrome.notifications.create('notify', req.opt, function(){
        })
    }
})