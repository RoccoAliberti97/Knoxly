function loadFromStorage(){
    chrome.storage.sync.get(['listOfTxt'], function(res){
        if(res.listOfTxt != ""){
            let listOfTxt = res.listOfTxt
            const l = listOfTxt.length
            for(let i = 0; i < l; i++)
                $("#tbl").append(addRow(listOfTxt[i].text,"img/knoxly128.png"))
        }
    })
}

function addRow(txt, img){
    return`<tr>
            <td scope="row">`+txt+`</th>
            <td><img src="`+img+`"></td>
            <td style="text-align: center;"><button type="button" class="btn btn-secondary btn-sm .btn-block">feedback</button></td>
            </tr>`
}

loadFromStorage()