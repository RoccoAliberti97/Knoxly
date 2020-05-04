function loadFromStorage(){
    chrome.storage.sync.get(['listOfTxt'], function(res){
        if(res.listOfTxt != ""){
            let listOfTxt = res.listOfTxt
            const l = listOfTxt.length
            for(let i = 0; i < l; i++)
                $("#tbl").append(addRow(listOfTxt[i].text,"img/knoxly128.png","row"+i))
            sendFeedback()
        }
    })
}

function addRow(txt, img, id){
    return`<tr id=`+id+`>
            <td scope="row">`+txt+`</th>
            <td><img src="`+img+`"></td>
            <td style="text-align: center;"><button type="button" class="btn btn-secondary btn-sm .btn-block">feedback</button></td>
            </tr>`
}

function sendFeedback(){
    let btnList = document.getElementsByClassName("btn")
    let l = btnList.length
    for(let i = 0; i < l; i++){
        btnList[i].onclick = function (){
            chrome.storage.sync.get(['listOfTxt'], function(res){
                let listOfTxt = res.listOfTxt
                listOfTxt.splice(i,1)
                $("#row"+i).remove()
                if(listOfTxt.length == 0)afterFeedback(""); else afterFeedback(listOfTxt)
                /*
                 *   TODO invio feedback per personalizzare
                 */
            })
        }
    }
}

function afterFeedback(toStore){
    chrome.storage.sync.set({"listOfTxt": toStore}, function(){
        chrome.browserAction.getBadgeText({}, function(badgeTxt){
            let badgeNum = parseInt(badgeTxt)
            badgeNum--
            if(badgeNum >=1) chrome.browserAction.setBadgeText({text: badgeNum+""}, function(){});
            else chrome.browserAction.setBadgeText({text: ""}, function(){})
        })
    })
}

loadFromStorage()