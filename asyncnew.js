var url = "http://apps.debusana.com/api/stock?code="+code;
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function callback(data){
	var obj = JSON.parse(data);
	var container = document.getElementById("detail-stock");
	console.log(obj);
	
	var text = "";
	for(var i=0; i < obj.stocks.length; i++){
		text += '<span>'+obj.stocks[i].name+"</span>  <span class=\"badge\">"+obj.stocks[i].quantity+"</span>";
		
	}
	
	if (obj.stocks.length == 0){
		text += '<span class="out-of-stock">HABIS</span>';
	}
	
	container.innerHTML = text;

}

function addStyle(){
	var css = '#detail-stock .badge{margin:auto 5px;border-radius:10px;background:rgb(103,126,82);color:rgb(255,255,255);padding:2px 6px;}.out-of-stock{border-radius:3px;    background:#EC2A2A;color:#ffffff;padding: 3px 10px;}',
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);
}

addStyle();
httpGetAsync(url, callback);