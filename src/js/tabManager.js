currentTab = 0//current tab are 0 for Analysis 1 for Statistic 2 for About
function loadAnalysis(){
    $("#analysisTab").click(function(){
        if(currentTab != 0){
            $("#contentepage").empty()
            $("#contentepage").html(createTbl())
            loadFromStorage()
            clearTbl()
            currentTab = 0
        }
    })
}

function loadStatistic(){
    $("#statTab").click(function(){
        if(currentTab != 1){
            $("#contentepage").empty()
            $("#contentepage").html(createStat())
            loadBarPlot()
            loadOverall()
            currentTab = 1
        }
    })
}

function loadAbout(){
    $("#aboutTab").click(function(){
        if(currentTab != 2){
            $("#contentepage").empty()
            $("#contentepage").html(createAbout())
            currentTab = 2
        }
    })
}

function createTbl(){
    return `
    <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col" style="text-align: center">Frase</th>
        <th scope="col" style="text-align: center">Badge</th>
        <th scope="col" style="text-align: center">Feedback</th>
      </tr>
    </thead>
    <tbody id="tbl">
    </tbody>
    
    <tfoot id="tblfoot" style="visibility: hidden;">
      <tr><td colspan="3" style="text-align: center"> <button id="clearTbl" class="btn btn-info btn-sm btn-block">Cancella tutto</button>  </td></tr>
    </tfoot>
  </table>	
    `
}

function createStat(){
    return `
      <div id = "bp" style="height: 250px; width: 350px;"></div>
      <div id = "overall" style="height: 250px; width: 350px;"></div>
      `
}

function createAbout(){
    return `<p>Spiegazioni</p>
    <table class="table">
    <thead class="thead-dark">
    <tr>
        <th scope="col" style="text-align: center">Bollino</th>
        <th scope="col" style="text-align: center">Descrizione</th>
    </tr>
    </thead>
    <tbody>

    <tr>
    <td> <img src = "img/bollini/p-yellow.png"></td>
    <td>descrizione</td>
    </tr>

    <tr>
    <td> <img src = "img/bollini/p-red.png"></td>
    <td>descrizione</td>
    </tr>

    <tr>
    <td> <img src = "img/bollini/h-yellow.png"></td>
    <td>descrizione</td>
    </tr>

    <tr>
    <td> <img src = "img/bollini/h-red.png"></td>
    <td>descrizione</td>
    </tr>
    
    <tr>
    <td> <img src = "img/bollini/j-yellow.png"></td>
    <td>descrizione</td>
    </tr>
    
    <tr>
    <td> <img src = "img/bollini/j-red.png"></td>
    <td>descrizione</td>
    </tr>
    
    <tr>
    <td> <img src = "img/bollini/t-yellow.png"></td>
    <td>descrizione</td>
    </tr>
    
    <tr>
    <td> <img src = "img/bollini/t-red.png"></td>
    <td>descrizione</td>
    </tr>

    <tr>
    <td> <img src = "img/bollini/g-yellow.png"></td>
    <td>descrizione</td>
    </tr>

    <tr>
    <td> <img src = "img/bollini/g-red.png"></td>
    <td>descrizione</td>
    </tr>    
    </tbody>
    </table>`
}

loadAnalysis()
loadStatistic()
loadAbout()