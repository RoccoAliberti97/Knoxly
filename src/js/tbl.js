function loadFromStorage(){
    chrome.storage.sync.get(['listOfTxt'], function(res){
        if(res.listOfTxt != ""){
            let listOfTxt = res.listOfTxt
            const l = listOfTxt.length
            for(let i = 0; i < l; i++)
                $("#tbl").append(addRow(listOfTxt[i].text,"img/knoxly128.png","row"+i))
            sendFeedback()
            $("#tblfoot").css("visibility", "visible")
        }
    })
    return true
}

function addRow(txt, img, id){
    return`<tr id=`+id+`>
            <td scope="row">`+txt+`</th>
            <td><img src="`+img+`"></td>
            <td style="text-align: center;"><button type="button" class="btn btn-secondary btn-sm .btn-block">feedback</button></td>
            </tr>`
}

function sendFeedback(){
    let btnList = document.getElementsByClassName("btn btn-secondary btn-sm .btn-block")
    let l = btnList.length
    for(let i = 0; i < l; i++){
        btnList[i].onclick = function (){
                itemToRemove = $("#row"+i).find("td:first").text()
                $("#row"+i).remove()
                chrome.runtime.sendMessage({type:"rmvitem", opt: {toRemove: i}}, function(){})
                if(btnList.length == 0)         $("#tblfoot").css("visibility", "hidden")

                /**
                 * TODO aggiugere invio feedback
                 */
    }
}
return true
}

function clearTbl(){
    $("#clearTbl").click(function(){
        chrome.runtime.sendMessage({type:"rmvAll", opt: {}}, function(){})
        $("#tbl").remove()
        $("#tblfoot").css("visibility", "hidden")
    })
}

loadFromStorage()
clearTbl()