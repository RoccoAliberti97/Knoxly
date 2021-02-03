function loadDict(toLoad){
    let tmp
    $.ajax({
        type: 'GET',
        url: chrome.runtime.getURL(toLoad),//../dict/cognomi.json
        async: false,
        success: function(data) {tmp = data.list}
    })
    return tmp
}

function loadJSON(toLoad){
    let tmp
    $.ajax({
        type: 'GET',
        url: chrome.runtime.getURL(toLoad),//../dict/cognomi.json
        async: false,
        success: function(data) {tmp = data}
    })
    return tmp
}

const icd = loadDict('../dict/icd.json')
const ideolPol = loadJSON('../dict/ideolPol.json') //dizionario delle ideologie politiche
const religioni = loadJSON('../dict/religioni.json')//dizionario delle principali religioni
const citUSA = loadDict('../dict/citUSA.json')
const citIT = loadDict('../dict/citIT.json')
const citEU = loadDict('../dict/citEU.json')
const cognomiList = loadDict('../dict/cognomi.json')//i primi 1000 cognomi più diffusi nell' USA e in Italia
const nomiList = loadDict('../dict/nomi.json')
//const URL = loadJSON('js/host.json').url CARICA L'INDIRIZZO DELL' HOST

$(document).ready(function(){
    //Espressioni regolari
    let emailReg = /\b([A-z0-9\.\+_-]+@[A-z0-9\._-]+\.[A-z]{2,6})\b/ig; 
    let ssnReg= /\b(\d{9})\b/g; 
    let cfReg = /\b([A-Z]{6}\d{2}[ABCDEHLMPRST]\d{2}[A-z0-9]{4}[A-Z]{1})\b/ig; 
    let npassReg= /\b([A-Z]{2}\d{7})\b/ig; 
    let ipReg = /\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/g; 
    let patReg = /\b([A-Z]{2}\d{7}[A-Z]{1}|(U1)[A-Z0-9]{7}[A-Z]{1})\b/ig; 
    let carCredReg= /\b(\d{13,19})\b/g;
    let ibanItReg = /\b([A-Z]{2}\d{2}[A-Z]{1}\d{22})\b/ig;
    let ibanReg1 = /\b(BG|IE|LV|MT|NL|GB|RO)\d{2}[A-Z]{4}(\d{23}|\d{16}|\d{14}|\d{13}|\d{10})\b/g;
    let ibanReg2 = /\b(AT|BE|HR|DK|EE|FR|DE|GR|IS|LT|LU|PL|PT|CZ|ES|SE|HU)\d{2}(\d{24}|\d{22}|\d{21}|\d{20}|\d{18}|\d{17}|\d{16}|\d{14}|\d{12})\b/g;
    let tarBeReg = /\b[1-7](\s|-)[A-Z]{3}(\s|-)(?!000)[0-9]{3}\b/g; 
    let tarBgReg = /\b[A-Z]{1,2}\s[0-9]{4}\s[A-Z]{1,2}\b/g;
    let tarHrFrReg = /\b[A-Z]{2}(\s|-)[0-9]{3}-[A-Z]{2}\b/g;
    let tarDkReg = /\b[A-Z]{2}\s[0-9]{2}\s[0-9]{3}\b/g;
    let tarEeReg = /\b[0-9]{3}\s[A-Z]{3}\b/g;
    let tarDeReg = /\b[A-Z]{1,3}\s[A-Z]{1,2}[0-9]{1,4}\b/g;
    let tarGrReg = /\b[A-Z]{3}-[1-9]{1}[0-9]{3}\b/g;
    let tarIsReg = /\b[A-Z]{2}\s[0-9]{3}\b/g;
    let tarIeReg = /\b[0-9]{3}-[A-Z]-[0-9]{5}\b/g;
    let tarItReg = /\b[A-Z]{2}\s[0-9]{3}[A-Z]{2}\b/g;
    let tarLvLuReg = /\b[A-Z]{2}(\s|-)[0-9]{4}\b/g;
    let tarLSUReg = /\b[A-Z]{3}(\s|-)[0-9]{3}\b/g;
    let tarNlReg = /\b[A-Z]{2}-[0-9]{3}-[A-Z]\b/g;
    let tarPlReg = /\b[A-Z]{3}\s[0-9]{2}[A-Z]{2}\b/g;
    let tarPtReg = /\b[0-9]{2}-[0-9]{2}-[A-Z]{2}\b/g;
    let tarGbReg = /\b[A-Z]{2}[0-9]{2}\s[A-Z]{3}\b/g;
    let tarCzReg = /\b[0-9][A-Z][0-9]\s[0-9]{4}\b/g;
    let tarRoReg = /\b([A-Z]{2}|B)\s[0-9]{2}\s[0-9]{3}\b/g;
    let tarEsReg = /\b[0-9]{4}\s[A-Z]{3}\b/g;
    let dataDMYReg = /\b([0-2][1-9]|(3)[0-1]|[1-9]|[1-2]0)[\/.\s-]((Gennaio|January|Febbraio|February|Marzo|March|Aprile|April|Maggio|May|Giugno|June|Luglio|July|Agosto|August|Settembre|September|Ottobre|October|Novembre|November|Dicembre|December|Gen|Jan|Feb|Mar|Apr|Mag|Giu|Jun|Lug|Jul|Ago|Aug|Set|Sept|Ott|Oct|Nov|Dic|Dec)|(((0)[1-9])|((1)[0-2])|[1-9]))[\/.\s-](\d{2}|\d{4})\b/gi;
    let dataYDMReg =/\b(\d{2}|\d{4})[\/.\s-]((Gennaio|January|Febbraio|February|Marzo|March|Aprile|April|Maggio|May|Giugno|June|Luglio|July|Agosto|August|Settembre|September|Ottobre|October|Novembre|November|Dicembre|December|Gen|Jan|Feb|Mar|Apr|Mag|Giu|Jun|Lug|Jul|Ago|Aug|Set|Sept|Ott|Oct|Nov|Dic|Dec)|(((0)[1-9])|((1)[0-2])|[1-9]))[\/.\s-]([0-2][1-9]|(3)[0-1]|[1-9]|[1-2]0)\b/gi;
    let dataMDYReg =/\b((Gennaio|January|Febbraio|February|Marzo|March|Aprile|April|Maggio|May|Giugno|June|Luglio|July|Agosto|August|Settembre|September|Ottobre|October|Novembre|November|Dicembre|December|Gen|Jan|Feb|Mar|Apr|Mag|Giu|Jun|Lug|Jul|Ago|Aug|Set|Sept|Ott|Oct|Nov|Dic|Dec)|(((0)[1-9])|((1)[0-2])|[1-9]))[\/.\s-]([0-2][1-9]|(3)[0-1]|[1-9]|[1-2]0)[\/.\s-](\d{2}|\d{4})\b/gi;
    let nTelReg = /\+[0-9]{1,4}(\s)*[0-9]{10}\b/g;
    let indITReg = /\b(Borgo|Contrada|Corso|Frazione|Largo|Località|Piazza|Piazzale|Via|Viale|Vicolo|Vicoletto)\s[A-z]{3,}\b/img;
    let indUSAReg = /\b[A-z]{3,}\s(Alley|Avenue|Broadway|Boulevard|Circle|Court|Drive|Garden|Green|Groov|Hill|Island|Park|Plaine|Plaza|Point|Ridge|Road|Square|Street)\b/ig;
    let sindReg = /\b(ÖGB|CGSLB|FGTB|CITUB|PODKREPA|UATUC|CMKOS|ACFTF|LO|EAKL|CFDT|CGT-FO|UIR-CFDT|DGB|GSEE|ICTU|CGIL|CISL|UIL|LPSS|LPSS|LPSK|CGTL|GWU|NSZZ|UGT-P|BNS|CNSLR-FRATIA|CC\.OO|ELA-STV|UGT|AFL-CIO)\b/ig;
    let sexReg = /\b(Asessuale|Bisessuale|Eterosessuale|Omosessuale|Pansessuale|Heterosexuality|Homosexuality|Bisexuality|Asexuality|Pansexual|Polysexual|Transgender|Gay)\b/ig;
    let razzeReg = /\b(caucasoide|europide|mongoloide|amerindioide|indianoide|negroide|congoide|capoide|australoide|caucasoid|europid|mongoloid|amerindian|negroid|congoid|capoid|australoid)\b/ig;
    let zipCode = /\b\d{5}\b/g;
    //altri dati
    let countPII = 0, countMed = 0, countPol = 0, countRel = 0, countTradeUnion = 0, countSex = 0, countRazza = 0, countCap = 0;

    var ICD ={}  //dizionario per dati medici
    var icdTrovati ; //array dei dati medici trovati
    var pol ; //array per i dati politici trovati
    var rel ; //array per i dati religiosi trovati
    var cities = {} //dizionario per i luoghi di nascita
    //principali città Europee   
    var citTrovati;// array dei luoghi trovati
    var cognomi ={}; //dizionario per i cognomi
    var cognTrovati;//array per i cognomi trovati
    var nomi={}; //dizionario per i nomi
    var nomiTrovati;//array per i nomi trovati

    //creo dizionari
    getDict(icd,ICD); //dati icd
    getDict(citUSA,cities); //città
    getDict(citEU,cities);//città
    getDict(citIT,cities);//città
    getDict(cognomiList,cognomi);//cognomi
    getDict(nomiList,nomi); //nomi

    var arr ;// array della stringa di input
    var wordsPII; // array per le parole Personally identifiable information trovate
    var wordsSD; // array per i dati sensibili trovati
    var wordsQI ; // array per le parole Quasi Identificatifier trovate 
    var telefoni; // array per i numeri di telefono
    var inText;//testo inserito in input suddiviso a parole
    var nPII = 0; //numero di PII citTrovati
    var nSQ = 0; //numero di SDeQI trovati
    var temp ; // array per le stop word trovate
    var tradeUnion; // array per le trade union
    var orientamentoSessuale; // array per l'orientamento sessuale
    var razza; // array per le razze
    var cap; // array per i cap
 
    //popup per l'hover del mouse su un dato sottolineato
    let popup = "<div class='tooltip_knoxly'  style='display:none'> "+
                "<span class='tooltiptext'></span>"+
                "<li class ='info'></li>"+
                "<li class ='anonymity'>Apply Anonymization</li></div>";
    var arrRegPII = [
        emailReg,ssnReg,cfReg,npassReg,ipReg,patReg,carCredReg,ibanItReg,ibanReg1,ibanReg2,
        tarBeReg,tarBgReg,tarCzReg,tarDeReg,tarDkReg,tarEeReg,tarEsReg,tarGbReg,tarGrReg,
        tarHrFrReg,tarIeReg,tarIsReg,tarItReg,tarLSUReg,tarLvLuReg,tarNlReg,tarPlReg,tarPtReg,
        tarRoReg,dataDMYReg,dataMDYReg,dataYDMReg, indITReg,indUSAReg
    ];

    var arrRegSD = [
       sindReg,sexReg,razzeReg,zipCode 
    ];

    // stop word IT/EN
    const listStopWords = loadDict('../dict/stopwords.json')
    const a = listStopWords.a, b = listStopWords.b, c = listStopWords.c,
    d = listStopWords.d, e = listStopWords.e, f = listStopWords.f,
    g = listStopWords.g, h = listStopWords.h, i_let = listStopWords.i,
    j_let = listStopWords.j, k = listStopWords.k, l = listStopWords.l,
    m = listStopWords.m, n = listStopWords.n, o = listStopWords.o,
    p = listStopWords.p, q = listStopWords.q, r = listStopWords.r,
    s = listStopWords.s, t = listStopWords.t, u = listStopWords.u,
    v = listStopWords.v, w = listStopWords.w, y = listStopWords.y, z = listStopWords.z;

    // funzione per sottolineare
    function hightLight(div) {

        var className = $(div).attr('class');
        //console.log("Class:" + className);
        $("div[class='" + className +"'] span").removeAttr("class");
        // rimuove tutti gli span multipli
        var html = div.html().replace(/<\/?span>/gi, ''),
            text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '),
            exp;

        $.each(wordsPII, function(i, word) { //aggiunge il tag span
            exp = new RegExp('\\b(' + word + ')\\b', 'g');
            html = html.replace(exp,function(m) {
        //console.log('WORD MATCH:', m);
                return '<span class = "rosso">' + m + '</span>';
            });
        });
        
        $.each(wordsSD, function(i, word) { //aggiunge il tag span
            exp = new RegExp('\\b(' + word + ')\\b', 'g');
            html = html.replace(exp, function(m) {
        //console.log('WORD MATCH:', m);
                return '<span class = "giallo">' + m + '</span>';
            });
        });
      
        $.each(telefoni, function(i, word) { //aggiunge il tag span 
            var s = word.replace(/\+/,"\\+");
            exp = new RegExp('(' + s + ')', 'g');
            html = html.replace(exp, function(m) {
        //console.log('WORD MATCH:', m);
                return '<span class = "rosso">' + m + '</span>';
            });
        });
         div.html(html); 
    }

  //telegram web
$('body').on('focus', '.im_send_form_wrap.clearfix', function() {
    const $this = $(this);
    $this.data('before', $this.html());
}).on('blur keyup paste input', '.im_send_form_wrap.clearfix', function(){
    const $this = $(this);
    if ($this.data('before') !== $this.html()) {//è stato inserito un nuovo input come testo
        $this.data('before', $this.html());
        var element = $(".composer_rich_textarea");
        var text = $(".composer_rich_textarea").text();
        $this.trigger(getInput(element,text));//find data 
    }  
});
//comparsa/scomparsa del tooltip
$('body').on('mouseover','.im_send_form_wrap.clearfix',function(){
   
    if($('.tooltip_knoxly').length){
     //tooltipExist
     }
     else{
         $('.im_send_form_wrap.clearfix').append(popup);
     }

    $(this).on("mouseover","span.rosso",function(e){  
        var span = $(this);
        mouseoverRed(span);
    });
    $(this).on("mouseover","span.giallo",function(e){
        var span = $(this);
        mouseoverYel(span);
    });
    $(this).on("mouseleave","span.rosso", function(){	
 
        mouseleaveRed();
    });
    $(this).on("mouseleave","span.giallo", function(){	
        mouseleaveYel();
    });
    $(this).on("click",".anonymity",function(){//click sull' anonimizzazione
     var element = $(".composer_rich_textarea");
     var div = element;
     var currentCaretPosition = getCaretPosition(div[0]);
     kAnonymity(element);//funzione kanonymity
     var data = getCaretData(div[0], currentCaretPosition);
     setCaretPosition(data);
     });
 });

//gmail
    $('body').on('focus', '.Ar.Au', function() {
        const $this = $(this);
        $this.data('before', $this.html());
    }).on('blur keyup paste input', '.Ar.Au', function(){
        const $this = $(this);
        if ($this.data('before') !== $this.html()) {//è stato inserito un nuovo input come testo
            $this.data('before', $this.html());
            var element = $(".Am.Al.editable.LW-avf.tS-tW");
            var text = $(".Am.Al.editable.LW-avf.tS-tW").text();
            $this.trigger(getInput(element,text));//find data
        }
    });
//comparsa/scomparsa del tooltip
    $('body').on('mouseover','.Ar.Au',function(){

        if($('.tooltip_knoxly').length){
            //tooltipExist
        }
        else{
            $('.Ar.Au').append(popup);
        }

        $(this).on("mouseover","span.rosso",function(e){
            var span = $(this);
            mouseoverRed(span);
        });
        $(this).on("mouseover","span.giallo",function(e){
            var span = $(this);
            mouseoverYel(span);
        });
        $(this).on("mouseleave","span.rosso", function(){

            mouseleaveRed();
        });
        $(this).on("mouseleave","span.giallo", function(){
            mouseleaveYel();
        });
        $(this).on("click",".anonymity",function(){//click sull' anonimizzazione
            var element = $(".Am.Al.editable.LW-avf.tS-tW");
            var div = element;
            var currentCaretPosition = getCaretPosition(div[0]);
            kAnonymity(element);//funzione kanonymity
            var data = getCaretData(div[0], currentCaretPosition);
            setCaretPosition(data);
        });
    });

//twitter
    $('body').on('focus', '.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu', function() {
        const $this = $(this);
        $this.data('before', $this.html());
    }).on('blur keyup paste input', '.r-42olwf.r-z2wwpe.r-1phboty.r-d045u9.r-6koalj.r-eqz5dr', function(){
        const $this = $(this);
        if ($this.data('before') !== $this.html()) {//è stato inserito un nuovo input come testo
            $this.data('before', $this.html());
            var element = $(".css-1dbjc4n.r-xoduu5.r-1sp51qo.r-mk0yit.r-13qz1uu");
            var text = $(".css-1dbjc4n.r-xoduu5.r-1sp51qo.r-mk0yit.r-13qz1uu").text();
            $this.trigger(getInput(element,text));//find data
        }
    });
//comparsa/scomparsa del tooltip
    $('body').on('mouseover','.r-42olwf.r-z2wwpe.r-1phboty.r-d045u9.r-6koalj.r-eqz5dr',function(){

        if($('.tooltip_knoxly').length){
            //tooltipExist
        }
        else{
            $('.r-42olwf.r-z2wwpe.r-1phboty.r-d045u9.r-6koalj.r-eqz5dr').append(popup);
        }

        $(this).on("mouseover","span.rosso",function(e){
            var span = $(this);
            mouseoverRed(span);
        });
        $(this).on("mouseover","span.giallo",function(e){
            var span = $(this);
            mouseoverYel(span);
        });
        $(this).on("mouseleave","span.rosso", function(){

            mouseleaveRed();
        });
        $(this).on("mouseleave","span.giallo", function(){
            mouseleaveYel();
        });
        $(this).on("click",".anonymity",function(){//click sull' anonimizzazione
            var element = $(".css-1dbjc4n.r-xoduu5.r-1sp51qo.r-mk0yit.r-13qz1uu");
            var div = element;
            var currentCaretPosition = getCaretPosition(div[0]);
            kAnonymity(element);//funzione kanonymity
            var data = getCaretData(div[0], currentCaretPosition);
            setCaretPosition(data);
        });
    });

    //twitter messaggi
    $('body').on('focus', '.css-1dbjc4n.r-1niwhzg.r-p1n3y5.r-1867qdf.r-1phboty.r-rs99b7.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-1777fci.r-13qz1uu', function() {
        const $this = $(this);
        $this.data('before', $this.html());
    }).on('blur keyup paste input', '.css-1dbjc4n.r-1niwhzg.r-p1n3y5.r-1867qdf.r-1phboty.r-rs99b7.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-1777fci.r-13qz1uu', function(){
        const $this = $(this);
        if ($this.data('before') !== $this.html()) {//è stato inserito un nuovo input come testo
            $this.data('before', $this.html());
            var element = $(".css-1dbjc4n.r-xoduu5.r-1sp51qo.r-atwnbb.r-13qz1uu");
            var text = $(".css-1dbjc4n.r-xoduu5.r-1sp51qo.r-atwnbb.r-13qz1uu").text();
            $this.trigger(getInput(element,text));//find data
        }
    });
//comparsa/scomparsa del tooltip
    $('body').on('mouseover','.css-1dbjc4n.r-1niwhzg.r-p1n3y5.r-1867qdf.r-1phboty.r-rs99b7.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-1777fci.r-13qz1uu',function(){

        if($('.tooltip_knoxly').length){
            //tooltipExist
        }
        else{
            $('.css-1dbjc4n.r-1niwhzg.r-p1n3y5.r-1867qdf.r-1phboty.r-rs99b7.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-1777fci.r-13qz1uu').append(popup);
        }

        $(this).on("mouseover","span.rosso",function(e){
            var span = $(this);
            mouseoverRed(span);
        });
        $(this).on("mouseover","span.giallo",function(e){
            var span = $(this);
            mouseoverYel(span);
        });
        $(this).on("mouseleave","span.rosso", function(){

            mouseleaveRed();
        });
        $(this).on("mouseleave","span.giallo", function(){
            mouseleaveYel();
        });
        $(this).on("click",".anonymity",function(){//click sull' anonimizzazione
            var element = $(".css-1dbjc4n.r-xoduu5.r-1sp51qo.r-atwnbb.r-13qz1uu");
            var div = element;
            var currentCaretPosition = getCaretPosition(div[0]);
            kAnonymity(element);//funzione kanonymity
            var data = getCaretData(div[0], currentCaretPosition);
            setCaretPosition(data);
        });
    });

    //reddit
    $('body').on('focus', '._13Sj3UMDKkCCJTq88berCB ', function() {
        const $this = $(this);
        $this.data('before', $this.html());
    }).on('blur keyup paste input', '._13Sj3UMDKkCCJTq88berCB ', function(){
        const $this = $(this);
        if ($this.data('before') !== $this.html()) {//è stato inserito un nuovo input come testo
            $this.data('before', $this.html());
            var element = $("._13Sj3UMDKkCCJTq88berCB ");
            var text = $("._13Sj3UMDKkCCJTq88berCB ").text();
            $this.trigger(getInput(element,text));//find data
        }
    });
//comparsa/scomparsa del tooltip
    $('body').on('mouseover','._13Sj3UMDKkCCJTq88berCB ',function(){

        if($('.tooltip_knoxly').length){
            //tooltipExist
        }
        else{
            $('.DraftEditor-editorContainer').append(popup);
        }

        $(this).on("mouseover","span.rosso",function(e){
            var span = $(this);
            mouseoverRed(span);
        });
        $(this).on("mouseover","span.giallo",function(e){
            var span = $(this);
            mouseoverYel(span);
        });
        $(this).on("mouseleave","span.rosso", function(){

            mouseleaveRed();
        });
        $(this).on("mouseleave","span.giallo", function(){
            mouseleaveYel();
        });
        $(this).on("click",".anonymity",function(){//click sull' anonimizzazione
            var element = $("._13Sj3UMDKkCCJTq88berCB ");
            var div = element;
            var currentCaretPosition = getCaretPosition(div[0]);
            kAnonymity(element);//funzione kanonymity
            var data = getCaretData(div[0], currentCaretPosition);
            setCaretPosition(data);
        });
    });

 
//funzione per trovare nel testo di input dati PII,QI,SD
let lastSep = 0
let start = 0

function getInput(el,text){
// QUESTO BLOCCO FA PARTIRE LE CHIAMATE VERSO L'INTELLIGENZA ARTIFICIALE
const isSemi = text.includes(';',lastSep)
const isQmark = text.includes('?',lastSep)
const isDot = text.includes('.',lastSep)
const isScalar = text.includes('!',lastSep)
let sep = "."
    if(isSemi || isQmark || isDot || isScalar){
        if(isSemi) sep = ";"; else if(isQmark) sep = "?"; else if(isScalar) sep = "!"
        lastSep = text.indexOf(sep, lastSep)
        let str = text.substring(start, lastSep)
        lastSep++
        start = lastSep
        if(text.length>5){
            $.ajax({
                type: 'POST',
                url: URL,
                data: JSON.stringify({"text": str}),
                contentType: 'application/json',
                success: function(data){
                    console.log(data.sensList+"\t"+data.text+"\t"+data.topicList)
                    let embed_pt1 = [], embed_pt2 = []//data.embed[0]
                    const l = data.embed[0].length/2
                    for(let i = 0; i<l; i++) embed_pt1.push(data.embed[0][i])
                    for(let i = l; i<512;i++) embed_pt2.push(data.embed[0][i])
                    chrome.storage.sync.set({'embed_pt1':embed_pt1, 'embed_pt2':embed_pt2}, function(){})
                    chrome.runtime.sendMessage({type:"additem", opt: {"sensList": data.sensList, "text":data.text, "topicList":data.topicList}}, function(){})
                    
                    
                }//fine success
            })//fine ajax
    }//fine if
    }//fine chiamata IA

        wordsPII = new Array();
        wordsSD = new Array();
        telefoni = new Array();
        wordsQI = new Array();
        pol= new Array();
        rel = new Array();
        icdTrovati = new Array();
        citTrovati = new Array();
        cognTrovati = new Array();
        nomiTrovati = new Array();
        nPII = 0;
        nSQ  = 0;
        var i = 0;
        var str = text;//tutto il testo in input
        var div = el;
        tradeUnion = new Array();
        orientamentoSessuale = new Array();
        razza = new Array();
        cap = new Array();

        inText = str;
        //match con Regex 
        //parole PII
        for(var i = 0; i< arrRegPII.length ; i++){
            if(arrRegPII[i].test(str)){
                if(wordsPII.length == 0){
                   wordsPII = str.match(arrRegPII[i]);
                   str = removePD(str,wordsPII);
                }
                else{
                   wordsPII = wordsPII.concat(str.match(arrRegPII[i]));
                   str = removePD(str,wordsPII);
                }
          
            }     
        }

        //parole QI
        for(var i = 0; i< arrRegSD.length ; i++){
            if(arrRegSD[i].test(str)){
            
                if(wordsSD.length == 0){
                   wordsSD = str.match(arrRegSD[i]);
                }
                else{
                    wordsSD = wordsSD.concat(str.match(arrRegSD[i]));
                }
            }
        }
        //telefoni
        if(nTelReg.test(str)){
            if(telefoni.length == 0) telefoni = str.match(nTelReg);
            else telefoni = telefoni.concat(str.match(nTelReg));
        }
    //trade union
    if(sindReg.test(str)){
        if(tradeUnion.length == 0) tradeUnion = str.match(sindReg);
        else tradeUnion = tradeUnion.concat(str.match(sindReg));
    }
    //orientamento sessuale
    if(sexReg.test(str)){
        if(orientamentoSessuale.length == 0) orientamentoSessuale = str.match(sexReg);
        else orientamentoSessuale = orientamentoSessuale.concat(str.match(sexReg));
    }
    //razza
    if(razzeReg.test(str)){
        if(razza.length == 0) razza = str.match(razzeReg);
        else razza = razza.concat(str.match(razzeReg));
    }
    //cap
    if(zipCode.test(str)){
        if(cap.length == 0) cap = str.match(zipCode);
        else cap = cap.concat(str.match(zipCode));
    }
        //rimuovi dalla stringa di input tutti i dati trovati con le regex
        str = removePD(str,wordsPII);
        str = removePD(str,wordsSD);

        // dati medici
        icdTrovati = getDati(str,ICD); 
        if(icdTrovati!= null)wordsSD = wordsSD.concat(icdTrovati);
        inText = str.split(/[\s\?!,;:\.'"]+/ig);

       // dati politici
       pol = findDati(ideolPol,inText); 
       if(pol!= null)wordsSD= wordsSD.concat(pol);
       // dati religiosi
       rel = findDati(religioni,inText); 
       if(rel!= null) wordsSD = wordsSD.concat(rel);
       str = removePD(str,wordsSD);
       var st = findStopWord(str);
       // rimuovo le stop word dall'input 
       if(st!= null){
            inText = str;
           for(i = 0; i< st.length;i++){
               var exp = new RegExp('\\b('+ st[i]+')\\b','g');
               str = str.replace(exp,'');
           }
        }
        inText = str.split(/[\s\?!,;:\.'"]+/ig);
       // luoghi
       citTrovati = getDati(str,cities);
       if(citTrovati!= null){
           wordsPII = wordsPII.concat(citTrovati);
       }
        str = removePD(str,wordsPII);
        inText = str.split(/[\s\?!,;:\.'"]+/ig);

        nomiTrovati = findDati(nomi,inText); //nomi
        if(nomiTrovati != null){
          
            wordsPII = wordsPII.concat(nomiTrovati);
        }
        str = removePD(str,wordsPII);
        
        inText = str.split(/[\s\?!,;:\.'"]+/ig);
        //cognomi
       cognTrovati = findDati(cognomi,inText);
       if(cognTrovati != null){
         
           wordsPII = wordsPII.concat(cognTrovati);
       }
        var currentCaretPosition = getCaretPosition(div[0]); // posizione corrente del cursore
        hightLight(div);//funzione per sottolineare 
        
        var data = getCaretData(div[0], currentCaretPosition);
        setCaretPosition(data);

        if(telefoni!= null){
            wordsPII = wordsPII.concat(telefoni);
        }
        if(wordsPII!= null){
            nPII = wordsPII.length;

        }
        if(wordsSD!= null){
            nSQ = wordsSD.length;
        }
        updateData();
        sendData();//passa i dati al popup
    }


    function removePD(str,words){//rimuove dalla stringa i dati già trovati
        var i = 0;
        
        if(words != null){
            for(i in words){
                var exp = new RegExp('\\b(' + words[i] + ')\\b', 'g');
                str = str.replace(exp,'');
            }
        }
        return str;
    } 
    //funzioni per il cursore
    //funzioni per la posizione del cursore 
    function getCaretPosition(el){
        var caretOffset = 0, sel;
        if (typeof window.getSelection !== "undefined") {
        var range = window.getSelection().getRangeAt(0);
        var selected = range.toString().length;
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(el);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length - selected;
        }
        return caretOffset;
    } 
    function getAllTextnodes(el){
        var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
        while(n=walk.nextNode()) a.push(n);
        return a;
    }
    function getCaretData(el, position){
        var node; nodes = getAllTextnodes(el);
        for(var n = 0; n < nodes.length; n++) {
        if (position > nodes[n].nodeValue.length && nodes[n+1]) {
            // remove amount from the position, go to next node
            position -= nodes[n].nodeValue.length;
        } else {
            node = nodes[n];
            break;
        }
        }
        // you'll need the node and the position (offset) to set the caret
        return { node: node, position: position };
    }
    function setCaretPosition(d){
        var sel = window.getSelection(),
        range = document.createRange();
        range.setStart(d.node, d.position);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    // funzione per creare dizionario 
    function getDict(obj,dict){
        var i = 0;
        var j = 0;
        var str;
        count = 0;
        
        if(obj == icd){
            for(i in obj){ 
                var el = obj[i].Malattie.toLowerCase();
                dict[el] = 0;
            }
        }
        if(obj == citUSA){
            for (i in obj){
                var el = obj[i].city.toLowerCase();
                dict[el] = 0;
            }
        }
        if(obj == citIT){
            for (i in obj){
                var el = obj[i].nome.toLowerCase();
                dict[el] = 0;
            } 
        }
        if(obj == citEU){
            for (i in obj){
                var el = obj[i].asciiname.toLowerCase();
                dict[el] = 0;
            }
        }
        if(obj == cognomiList){
            for (i in obj){
                var el = obj[i].surnames.toLowerCase();
                dict[el] = 0;
            }
        }
        if(obj == nomiList){
            for (i in obj){
                var el = obj[i].name.toLowerCase();
                dict[el] = 0; 
            }
        }
    }

    //trova i dati nalla stringa di input
    function getDati(str,dict){
        var arr = new Array();
        for(var key in dict){
            var exp = new RegExp('\\b(' + key + ')\\b', 'gi');
            var word = str.match(exp);
            if(word != null){
                arr = arr.concat(word);  
            }
            //break;
        }  
        return arr;
    }

    //funzioni per trovare dati nella stringa di input "splittata"
    function findDati(dict,str){
        var i = 0;
        var j = 0;
        var temp = [];
        for(i in str){
            var k = str[i].toLowerCase();
            if(dict[k] == 0)temp.push(str[i]);
        }  
        return temp;
    }
    
    //numero di stop words
    function findStopWord(str){
        var j=0;
        temp = new Array();
      //  var count = 0;
        
        arr = str.split(/(\?|:|;|!|"|,|\s|')+/ig);

        for(var i = 0; i< arr.length; i++){
            switch(arr[i][0]){
                case 'a':
                    if(a.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];
                        j++;
                    }
                    break;
                case 'b':
                    if(b.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];
                        j++;
                    }
                    break;
                case 'c':
                    
                    if(c.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                        
                    }
                    break;
                case 'd':  
                    if(d.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];
                        j++;
                    }
                    break;
                case 'e':   
                    if(e.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'f':
                   
                    if(f.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'g':
                  
                    if(g.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'h':
                    
                    if(h.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'i':
                   
                    if(i_let.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'j':
                   
                    if(j_let.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'k':
                  
                    if(k.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'l':
                   
                    if(l.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'm':
                
                    if(m.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'n':
                  
                    if(n.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'o':
                   
                    if(o.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'p':
                    if(p.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'q':
                    if(q.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'r':
                    
                    if(r.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 's':
                    if(s.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 't':
                    if(t.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'u':
                    if(u.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'v':   
                    if(v.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'w':      
                    if(w.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'y':
                    
                    if(y.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
                case 'z':        
                    if(z.includes(arr[i].toLowerCase()))
                    {
                        temp[j] = arr[i];                           
                        j++;
                    }
                    break;
            }
        }   
       // console.log("Stopword:"+ temp);
        
               //conto il numero di caratteri delle stopwords
           // count = lengths.reduce(getSum,0);
        return temp;
    }
    //show popup 
    var testo ;
    //mouse in
    
    //aggiungi messaggio per i dati PII
    function mouseoverRed(element){
             
        testo = $(element).text();
        var text = testo.toLowerCase();
        var mess1 = "Warning! The"  

        var mess2 = "is a Personally Identifiable Information.\nIt enables uniquely identification of your or another person's identity"
        switch(true){
            case emailReg.test(testo):
                $(".info").text(mess1 + " Email " + mess2);
                break;
            case ssnReg.test(testo)||cfReg.test(testo):
                $(".info").text(mess1 + " Social Security Number " + mess2);
                break;
            case tarGbReg.test(testo)||tarGrReg.test(testo)||tarHrFrReg.test(testo) ||tarNlReg.test(testo) || tarPlReg.test(testo) || tarPtReg.test(testo) || tarRoReg.test(testo)||tarIeReg.test(testo)||tarIsReg.test(testo) || tarItReg.test(testo) || tarLSUReg.test(testo) || tarLvLuReg.test(testo):
                $(".info").text(mess1 + " European car number plate " + mess2);
                break;
            case patReg.test(testo):
                $(".info").text(mess1 + " European driving licence " + mess2);
                break;
            case npassReg.test(testo):
                $(".info").text(mess1 + " Passaport Number" + mess2);
                break;
            case ipReg.test(testo):
                $(".info").text(mess1 + " IP address " + mess2);
                break;
            case indITReg.test(testo) || indUSAReg.test(testo):
                $(".info").text(mess1 + " Home address " + mess2);
                break;
            case dataDMYReg.test(testo):
                $(".info").text(mess1 + " Date of birth " + mess2);
                break;
            case dataMDYReg.test(testo):
                $(".info").text( mess1 + " Date of birth " + mess2);
                break;
            case dataYDMReg.test(testo):
                $(".info").text( mess1 + " Date of birth " + mess2);
                break;
            case nTelReg.test(testo):
                $(".info").text( mess1 + " Telephone number " + mess2);
                break;
            case ibanItReg.test(testo)||ibanReg1.test(testo) || ibanReg2.test(testo) || carCredReg.test(testo):
                $(".info").text( mess1 + " Credit Card " + mess2 );
                break;
            case citTrovati.includes(testo):
                $(".info").text( mess1 + " City " + mess2);
                break;
            case nomiTrovati.includes(testo):
                $(".info").text(mess1 + " Name " + mess2);
                break;
            case cognTrovati.includes(testo):
                $(".info").text( mess1 + " Surname" + mess2);
                break;
        }       
        $(".tooltiptext").text(testo);
        $(".tooltiptext").css("color","red");
        $(".tooltip_knoxly").show(200);
        var p = $(element).position();
        $(".tooltip_knoxly").css({
          top: (p.top + 15) + "px",
          left: (p.left) + "px"
        });
    }

    //aggiungi messaggio per i dati SD e QI
    function mouseoverYel(element){
        testo = $(element).text();
        var text = testo.toLowerCase();
        var mess1 = "Caution! The";
        var mess2 = "is a sensitive data that would be better to not disclose";
        switch(true){
            case sindReg.test(testo):
                $(".info").text(mess1 + " Trade Union" + mess2);
                break;
            case sexReg.test(testo):
                $(".info").text(mess1 + " Sexual Orientation " + mess2);
                break;
            case icdTrovati.includes(text):
                $(".info").text(mess1 + " Medical datum " + mess2);
                break;
            case razzeReg.test(testo):
                $(".info").text(mess1 + " Race " + mess2);
                break;
            case pol.includes(testo):
                $(".info").text(mess1 + " Political datum " + mess2);
                break;
            case rel.includes(testo):
                $(".info").text(mess1 + " Religious datum " + mess2);
                break;
            case zipCode.test(testo):
                var temp = false;
                temp = isQI();
               
                if(temp){
                    $(".info").text("Alert! The combination of Zip Code, Genre and Date of Birth led to uniquely identification of 87\% US citizens.");
                }else{
                    $(".info").text(mess1 + " Zip Code " + mess2);
                }   
                break; 
        }
        $(".tooltiptext").text(testo);
        $(".tooltiptext").css("color","yellow");
        $(".tooltip_knoxly").show(200);
        var p = $(element).position();
        $(".tooltip_knoxly").css({
          top: (p.top + 15) + "px",
          left: (p.left) + "px"
        });
    }

    //mouse out
    function mouseleaveRed(){
        if($(".tooltip_knoxly").is(':hover')){
                $(".tooltip_knoxly").on("mouseleave",function(){
                    $(this).hide(200);
                });
        }
        else $(".tooltip_knoxly").hide(200);
    }

    function mouseleaveYel()	{
        if($(".tooltip_knoxly").is(':hover')){
                $(".tooltip_knoxly").on("mouseleave",function(){
                    $(this).hide(200);
                });
        }
        else $(".tooltip_knoxly").hide(200);   
    }

    //click k-anonymity
    function kAnonymity(div){

        var className = $(div).attr('class');
      
        $("div[class='" + className +"'] span").removeAttr("class");
        var html = div.html().replace(/<\/?span>/gi, '');
        
        var k = (testo.length)/2;
        var anonymity = '';
            var newWord = testo.substring(testo.length-k,testo.length);
            for(var i = 0; i < k; i++){
                anonymity = anonymity + '*';
            }
            html = html.replace(newWord,anonymity);    
            div.html(html);      
    };
 
    function isQI(){ //funzione che trovato un zip Code vede se ci sta anche almeno una data
        var i = 0;
        if(wordsPII.length > 0){
            for(i = 0; i< wordsPII.length; i++){
                var el = wordsPII[i];
                if(dataDMYReg.test(el) || dataMDYReg.test(el) || dataYDMReg.test(el)){
                    return true;
                }
            }
        }
        else return false;
    }
    //invio dati PII e QII per mostrarli nel popup
    function sendData(){
        chrome.runtime.onMessage.addListener(function (message,sender,sendResponse) {
           switch(message.type) {
                case "getPII":
                    sendResponse(nPII);
                    break;
                case "getSQ":
                    sendResponse(nSQ);
                    break;
                case "getListPII":
                    temp = wordsPII;
                    sendResponse(wordsPII);
                    break;
                case "getListSD":
                    sendResponse(wordsSD);
                    break;
                default:
                    console.error("Unrecognised message: ", message);
            }
        });
    }

    function updateData() {
        chrome.storage.sync.get(['PII','medici','politici','religiosi','tradeunion','orientamentosessuale','razza','cap'], function(res) {
            if (wordsPII.length == 0) countPII = 0;
            else if (wordsPII.length < countPII) countPII--;
            else if (countPII < wordsPII.length) {
                res.PII++;
                chrome.storage.sync.set({"PII": res.PII}, function () {})
                countPII++;
            }
            if (icdTrovati.length == 0) countMed = 0;
            else if (icdTrovati.length < countMed) countMed--;
            else if (countMed < icdTrovati.length) {
                res.medici++;
                chrome.storage.sync.set({"medici": res.medici}, function () {})
                countMed++;
            }
            if (pol.length == 0) countPol = 0;
            else if (pol.length < countPol) countPol--;
            else if (countPol < pol.length) {
                res.politici++;
                chrome.storage.sync.set({"politici": res.politici}, function () {})
                countPol++;
            }
            if (rel.length == 0) countRel = 0;
            else if (rel.length < countRel) countRel--;
            else if (countRel < rel.length) {
                res.religiosi++;
                chrome.storage.sync.set({"religiosi": res.religiosi}, function () {})
                countRel++;
            }
            if (tradeUnion.length == 0) countTradeUnion = 0;
            else if (tradeUnion.length < countTradeUnion) countTradeUnion--;
            else if (countTradeUnion < tradeUnion.length) {
                res.tradeunion++;
                chrome.storage.sync.set({"tradeunion": res.tradeunion}, function () {})
                countTradeUnion++;
            }
            if (orientamentoSessuale.length == 0) countSex = 0;
            else if (orientamentoSessuale.length < countSex) countSex--;
            else if (countSex < orientamentoSessuale.length) {
                res.orientamentosessuale++;
                chrome.storage.sync.set({"orientamentosessuale": res.orientamentosessuale}, function () {})
                countSex++;
            }
            if (razza.length == 0) countRazza = 0;
            else if (razza.length < countRazza) countRazza--;
            else if (countRazza < razza.length) {
                res.razza++;
                chrome.storage.sync.set({"razza": res.razza}, function () {})
                countRazza++;
            }
            if (cap.length == 0) countCap = 0;
            else if (cap.length < countCap) countCap--;
            else if (countCap < cap.length) {
                res.cap++;
                chrome.storage.sync.set({"cap": res.cap}, function () {})
                countCap++;
            }
        })
    }
});
