
var value = 0;
var nPII = 0;
var nQI = 0;

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('body').addEventListener('onload', initialize());
	
})


function initialize(){
	createCircleProgress();
}

function createCircleProgress(){//create counter
	
	var circleProgress = (function(selector) {
	  var wrapper = document.querySelectorAll(selector);
	  Array.prototype.forEach.call(wrapper, function(wrapper, i) {
		var wrapperWidth,
		  wrapperHeight,
		  innerHTML,
		  context,
		  lineWidth,
		  centerX,
		  centerY,
		  radius,
		  newPercent,
		  speed,
		  from,
		  to,
		  duration,
		  start,
		  strokeStyle,
		  text;
  
		var getValues = function() {
		  wrapperWidth = parseInt(window.getComputedStyle(wrapper).width);
		  wrapperHeight = wrapperWidth;
		  strokeStyle = wrapper.getAttribute('data-cp-color');
		
		 
		  if(strokeStyle == "yellow"){
		
			  value = nQI;
		  }
		  else if(strokeStyle == "red"){
	
			value = nPII;
		  }
		 
		  innerHTML = '<span class="percentage"><strong>' + value + '</strong> %</span><canvas class="circleProgressCanvas" width="' + (wrapperWidth * 2) + '" height="' + wrapperHeight * 2 + '"></canvas>';
		  wrapper.innerHTML = innerHTML;
		  text = wrapper.querySelector(".percentage");
		  canvas = wrapper.querySelector(".circleProgressCanvas");
		  wrapper.style.height = canvas.style.width = canvas.style.height = wrapperWidth + "px";
		  context = canvas.getContext('2d');
		  centerX = canvas.width / 2;
		  centerY = canvas.height / 2;
		  newPercent = 0;
		  speed = 1;
		  from = 0;
		  to = 100;
		  duration = 1000;
		  lineWidth = 15;
		  radius = canvas.width / 2 - lineWidth;
		
		  start = new Date().getTime();
		}
  
		function animate() {
		 // requestAnimationFrame(animate);
		  
			if(strokeStyle == "yellow"){
			
				  value = nQI;
			  }
			else if(strokeStyle == "red"){
	
				value = nPII;
			  }
			newPercent = value;
			text.innerHTML = Math.round(newPercent) ;
			drawArc();
		  
		}
  
		function drawArc() {
		  var circleStart = 1.5 * Math.PI;
		  var circleEnd = 100;
		  context.clearRect(0, 0, canvas.width, canvas.height);
		  context.beginPath();
		  context.arc(centerX, centerY, radius, circleStart, 4 * Math.PI, false);
		  context.lineWidth = lineWidth;
		  context.strokeStyle = "#ddd";
		  context.stroke();
		  context.beginPath();
		  context.arc(centerX, centerY, radius, circleStart, circleEnd, false);
		  context.lineWidth = lineWidth;
		  context.strokeStyle = strokeStyle;
		  context.stroke();
  
		}
		var update = function() {
		  getValues();
		  animate();
		}
		update();
  
		
  
	});

	
  
	
  
  });
  circleProgress('.counter');
}


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	//richiedo il numero di PII trovati
	chrome.tabs.sendMessage(tabs[0].id,{type:"getPII"},function(val){
		if(typeof val == "undefined"){
			console.log("Errore");
		}
		else{
		
			nPII= val;
			createCircleProgress();
		
		}
	})
	//richiedo il numero di QI trovati
	chrome.tabs.sendMessage(tabs[0].id,{type:"getSQ"},function(val){
		if(typeof val == "undefined"){
			console.log("Errore");
		}
		else{
			
			nQI= val;
			
			createCircleProgress();
		}
	})
	  
	  

//richiedo la lista dei PII trovati
chrome.tabs.sendMessage(tabs[0].id,{type:"getListPII"},function(words){
	if(typeof words == "undefined"){
		console.log("Errore");
	}
	else{
		
		showListPII(words);
	}
})

//richiedo la lista dei QI trovati
chrome.tabs.sendMessage(tabs[0].id,{type:"getListSD"},function(words){
	if(typeof words == "undefined"){
		
	}
	else{
		
		showListQI(words);
	}
})
});

function showListQI(words){

	$.each(words,function(i,val){
		
		var riga = "<li class='list-group-item'><i class = 'fas fa-circle text-in mx-2'></i>" + val + "</li>";
		$(".list-group").append(riga);

	});
}
//mostra tutte i dati PII trovati nel popup
function showListPII(words){

	$.each(words,function(i,val){
		
		var riga = "<li class='list-group-item'><i class = 'fas fa-circle text-info mx-2'></i>" + val + "</li>";
		$(".list-group").append(riga);

	});
}


