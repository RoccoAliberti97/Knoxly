$(document).ready(function(){

   
    var arr ;// array della stringa di input
    var wordsPII; // array per le regex delle parole Personally identifiable information
    var wordsQI ; // array per le regex delle parole Quasi Identificative
    var telefoni;
    
   

    
    //Espressioni regolari
    var emailReg = /\b([A-z0-9\.\+_-]+@[A-z0-9\._-]+\.[A-z]{2,6})\b/ig; 
    var ssnReg= /\b(\d{9})\b/g; 
    var cfReg = /\b([A-Z]{6}\d{2}[ABCDEHLMPRST]\d{2}[A-z0-9]{4}[A-Z]{1})\b/ig; 
    var npassReg= /\b([A-Z]{2}\d{7})\b/ig; 
    var ipReg = /\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/g; 
    var patReg = /\b([A-Z]{2}\d{7}[A-Z]{1}|(U1)[A-Z0-9]{7}[A-Z]{1})\b/ig; 
    var carCredReg= /\b(\d{13,19})\b/g;
    var ibanItReg = /\b([A-Z]{2}\d{2}[A-Z]{1}\d{22})\b/ig;
    var ibanReg1 = /\b(BG|IE|LV|MT|NL|GB|RO)\d{2}[A-Z]{4}(\d{23}|\d{16}|\d{14}|\d{13}|\d{10})\b/g;
    var ibanReg2 = /\b(AT|BE|HR|DK|EE|FR|DE|GR|IS|LT|LU|PL|PT|CZ|ES|SE|HU)\d{2}(\d{24}|\d{22}|\d{21}|\d{20}|\d{18}|\d{17}|\d{16}|\d{14}|\d{12})\b/g;
    var tarBeReg = /\b[1-7](\s|-)[A-Z]{3}(\s|-)(?!000)[0-9]{3}\b/g; 
    var tarBgReg = /\b[A-Z]{1,2}\s[0-9]{4}\s[A-Z]{1,2}\b/g;
    var tarHrFrReg = /\b[A-Z]{2}(\s|-)[0-9]{3}-[A-Z]{2}\b/g;
    var tarDkReg = /\b[A-Z]{2}\s[0-9]{2}\s[0-9]{3}\b/g;
    var tarEeReg = /\b[0-9]{3}\s[A-Z]{3}\b/g;
    var tarDeReg = /\b[A-Z]{1,3}\s[A-Z]{1,2}[0-9]{1,4}\b/g;
    var tarGrReg = /\b[A-Z]{3}-[1-9]{1}[0-9]{3}\b/g;
    var tarIsReg = /\b[A-Z]{2}\s[0-9]{3}\b/g;
    var tarIeReg = /\b[0-9]{3}-[A-Z]-[0-9]{5}\b/g;
    var tarItReg = /\b[A-Z]{2}\s[0-9]{3}[A-Z]{2}\b/g;
    var tarLvLuReg = /\b[A-Z]{2}(\s|-)[0-9]{4}\b/g;
    var tarLMSUReg = /\b[A-Z]{3}(\s|-)[0-9]{3}\b/g;
    var tarNlReg = /\b[A-Z]{2}-[0-9]{3}-[A-Z]\b/g;
    var tarPlReg = /\b[A-Z]{3}\s[0-9]{2}[A-Z]{2}\b/g;
    var tarPtReg = /\b[0-9]{2}-[0-9]{2}-[A-Z]{2}\b/g;
    var tarGbReg = /\b[A-Z]{2}[0-9]{2}\s[A-Z]{3}\b/g;
    var tarCzReg = /\b[0-9][A-Z][0-9]\s[0-9]{4}\b/g;
    var tarRoReg = /\b([A-Z]{2}|B)\s[0-9]{2}\s[0-9]{3}\b/g;
    var tarEsReg = /\b[0-9]{4}\s[A-Z]{3}\b/g;
    var dataReg = /\b(\d{1,2}([\.\/]|\s)([A-Z]+|\d{1,2})([\.\/]|\s)(\d{4}|\d{2}))\b/ig;
    var nTelReg = /\+[0-9]{1,4}(\s)*[0-9]{10}\b/g;
    var indITReg = /\b(Borgo|Contrada|Corso|Frazione|Largo|Località|Piazza|Piazzale|Via|Viale|Vicolo|Vicoletto)\s[A-z]+\b/ig;
    var indUSAReg = /\b[A-z]+\s(Alley|Avenue|Broadway|Boulevard|Circle|Court|Drive|Garden|Green|Groov|Hill|Island|Park|Plaine|Plaza|Point|Ridge|Road|Square|Street)\b/ig;
    var sindReg = /\b(ÖGB|CGSLB|FGTB|CITUB|PODKREPA|UATUC|CMKOS|ACFTF|LO|EAKL|CFDT|CGT-FO|UIR-CFDT|DGB|GSEE|ICTU|CGIL|CISL|UIL|LPSS|LPSS|LPSK|CGTL|GWU|NSZZ|UGT-P|BNS|CNSLR-FRATIA|CC\.OO|ELA-STV|UGT|AFL-CIO)\b/ig;

    var arrRegPII = [
        emailReg,ssnReg,cfReg,npassReg,ipReg,patReg,carCredReg,ibanItReg,ibanReg1,ibanReg2,
        tarBeReg,tarBgReg,tarCzReg,tarDeReg,tarDkReg,tarEeReg,tarEsReg,tarGbReg,tarGrReg,
        tarHrFrReg,tarIeReg,tarIsReg,tarItReg,tarLMSUReg,tarLvLuReg,tarNlReg,tarPlReg,tarPtReg,
        tarRoReg
    ];

    var arrRegQI = [
        dataReg,indITReg,indUSAReg,sindReg
        
    ];



    function hightLight(div) {
       
        $("div span").removeAttr("class");
        var html = div.html().replace(/<\/?span>/gi, ''), // rimuove tutti gli span multipli
        text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '), // rimuove tutti gli span multipli
           
        exp;
            //console.log("html:"+ html);
            //console.log("text:"+ text);
            
        $.each(wordsPII, function(i, word) { //aggiunge il tag span 
            exp = new RegExp('(' + word + ')', 'gi');
            html = html.replace(exp, function(m) {
        console.log('WORD MATCH:', m);
                return '<span class = "rosso">' + m + '</span>';
            });
        });
        
        $.each(wordsQI, function(i, word) { //aggiunge il tag span 
            exp = new RegExp('(' + word + ')', 'gi');
            html = html.replace(exp, function(m) {
        console.log('WORD MATCH:', m);
                return '<span class = "giallo">' + m + '</span>';
            });
        });
      
        $.each(telefoni, function(i, word) { //aggiunge il tag span 
            var s = word.replace(/\+/,"\\+");
            exp = new RegExp('(' + s + ')', 'gi');
            html = html.replace(exp, function(m) {
        console.log('WORD MATCH:', m);
                return '<span class = "rosso">' + m + '</span>';
            });
        });

        
        console.log('HTML:', html);
        console.log('----');
      
         div.html(html);
    }
    /*
    $('body').on('focus', '[contenteditable]', function() {
        const $this = $(this);
        $this.data('before', $this.html());
    }).on('blur keyup paste input', '[contenteditable]', function() {
        const $this = $(this);
        if ($this.data('before') !== $this.html()) {
            $this.data('before', $this.html());
            $this.trigger('change');
        }
    });
  */
    
    
    $("div[contenteditable = 'true'").on('input',function(){
        wordsPII = new Array();
        wordsQI = new Array();
        telefoni = new Array();
       
        var str = this.innerHTML,
            div = $(this);
            
    
        arr = str.split(" "); 

        //match con Regex 
        //parole PII
        for(var i = 0; i< arrRegPII.length ; i++){
            if(arrRegPII[i].test(str)){
            
                if(wordsPII.length == 0){
                   wordsPII = str.match(arrRegPII[i]);
                }
                else{
                   wordsPII = wordsPII.concat(str.match(arrRegPII[i]));
                }
            }
        }

        //parole QI
        for(var i = 0; i< arrRegQI.length ; i++){
            if(arrRegQI[i].test(str)){
            
                if(wordsQI.length == 0){
                   wordsQI = str.match(arrRegQI[i]);
                }
                else{
                    wordsQI = wordsQI.concat(str.match(arrRegQI[i]));
                }
            }
        }

        if(nTelReg.test(str)){
            if(telefoni.length == 0){
                telefoni = str.match(nTelReg);
            }
            else {
                telefoni = telefoni.concat(str.match(nTelReg));
            }
        }
        
        var currentCaretPosition = getCaretPosition(div[0]); // posizione corrente del cursore
        hightLight(div);//funzione per sottolineare 
       
        var data = getCaretData(div[0], currentCaretPosition);
        setCaretPosition(data);
        //setEndOfContenteditable(div[0]); // funzione per settare il cursore
     
    });
    /*
    function setEndOfContenteditable(contentEditableElement)
    {
        var range,selection;
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if(document.selection)//IE 8 and lower
        { 
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }
    }
    */
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
    $("#match").click(function(){
        alert(trovato.length);
         jQuery.each(trovato,function(i,val){
        $("#demo").append(" " + i + " :" + val + '<br>');
       
        })
    });

    $("#test").click(function(){
        //alert(arr.length); 
        jQuery.each( arr,function(i,val){
            $("#demo").append(" " + i + " :" + val);
        })
        
    });
  
    
    
});
