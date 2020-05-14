function loadFromStorage(){
    chrome.storage.sync.get(['listOfTxt'], function(res){
        if(res.listOfTxt != ""){
            let listOfTxt = res.listOfTxt         
            const l = listOfTxt.length
            for(let i = 0; i < l; i++)
                $("#tbl").append(
                    addRow(listOfTxt[i].text,
                    getImg(listOfTxt[i].sensList[0][1], listOfTxt[i].topicList[0]),
                    "row"+i)
                    )
                //$("#tbl").append(addRow(listOfTxt[i].text,"img/knoxly32.png","row"+i))
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
                chrome.runtime.sendMessage({type:"rmvitem", opt: {toRemove: i}}, function(){})
                $("#row"+i).remove()
                if(btnList.length == 0)$("#tblfoot").css("visibility", "hidden")
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


function getImg(sens, topic){
    let path = "img/bollini/"
    switch(topic){
        case 0: path = chooseImg(sens, path+"p"); break;
        case 1: path = chooseImg(sens, path+"h"); break;
        case 2: path = chooseImg(sens, path+"j"); break;
        case 3: path = chooseImg(sens, path+"t"); break;
        case 4: path = chooseImg(sens, path+"g"); break;
    }
    return path
}

function chooseImg(sens, path){
    if (sens>=0.36 && sens <= 0.68) path+="-yellow.png"
    else if (sens>=0.69 && sens <= 1) path+="-red.png"
    /*if(sens >= 0 && sens <= 0.25) path+="-green.png"
    else if(sens >= 0.26 && sens <= 0.50) path+="-yellow.png"
    else if(sens >= 0.51 && sens <= 0.75) path+="-orange.png"
    else if(sens >= 0.76 && sens <= 1) path+="-red.png"
    return path*/
}

loadFromStorage()
clearTbl()