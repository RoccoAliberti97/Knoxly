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
        <th scope="col" style="text-align: center">Text</th>
        <th scope="col" style="text-align: center">Result</th>
        <th scope="col" style="text-align: center"></th>
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
    let topic = ["politics", "health", "job", "travel", "general"]
    const PATH = "img/bollini/"
    const R = "-red.png"
    const Y = "-yellow.png"
    let bollini = [PATH+"p"+Y, PATH+"p"+R, PATH+"h"+Y, PATH+"h"+R, PATH+"j"+Y, PATH+"j"+R, PATH+"t"+Y, PATH+"t"+R, PATH+"g"+Y, PATH+"g"+R]
    const MEANLY = "This icon indicates a text mainly talking about <strong>"
    const RISK_Y = `</strong>. <p><span style="color: #e9c545"><strong>Yellow</strong></span> background indicates <span style="color: #e9c545"><strong>low</strong></span> risk for your privacy</p>`
    const RISK_R = `</strong>. <p> <span style="color: #d65845"><strong>Red</strong></span> background indicates <span style="color: #d65845"><strong>high</strong></span> risk for your privacy</p>`
    let tr = `
    <table class="table">
    <thead class="thead-dark">
    <tr>
        <th scope="col" style="text-align: center">Privacy Awareness icon</th>
        <th scope="col" style="text-align: center">Descriptions</th>
    </tr>
    </thead>
    <tbody>`

    for(let i=0; i < 10; i++){
        tr += "<tr> <td><img src = \""+bollini[i]+"\"></td>"
        tr += "<td>"
        if(i<=1) tr += (i%2==0)? MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        else if (i<=3) tr += (i%2==0)?MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        else if (i<=5) tr += (i%2==0)?MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        else if (i<=7) tr += (i%2==0)?MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        else if (i<=9) tr += (i%2==0)?MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        tr+= "</td></tr>"
    }
    tr+="</tbody>"
    tr+="</table>"
    return tr
}

loadAnalysis()
loadStatistic()
loadAbout()