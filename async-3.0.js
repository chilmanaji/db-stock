var url = "http://apps.debusana.com/api/list-stock?code="+code+"&type=json";

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
	datax = obj;
	/*
	var text = "";
	container.innerHTML = text;
	for(var i=0; i < obj.stocks.length; i++){
		text += '<span>'+obj.stocks[i].name+"</span>  <span class=\"badge\">"+obj.stocks[i].quantity+"</span>";
		
	}
	
	if (obj.stocks.length == 0){
		text += '<span class="out-of-stock">HABIS</span>';
	}
	*/

	for(var i=0; i< datax.length; i++){
		var product = datax[i].product;
		var code = datax[i].product.reference;
		var stocks = datax[i].stocks;
		var text = "<table class=\"table table-bordered\">";
		text += "<tr><td class=\"bold\">Rp "+parseInt(product.price).toLocaleString()+"</td><td class=\"bold\">"+code+"</td><tr>";
		for(var j=0; j < stocks.length; j++){
			/*text += '<span>'+stocks[i].name+"</span>  <span class=\"badge\">"+stocks[i].quantity+"</span>";*/
			text += '<tr><td class="color">'+stocks[j].name+'</td>  <td class="qty">'+stocks[j].quantity+'</td><tr>';
		}
		text += "</table>"

		if (stocks.length == 0){
			text = '<span class="out-of-stock">HABIS</span>';
		}

		var containers = document.getElementsByClassName("stock-"+code);
		for(var k=0; k < containers.length; k++){
			containers[k].innerHTML = text;
		}
	}

}

function addStyle(){
	var css = 'table{border-spacing: 0;border-collapse: collapse;}.table>tbody>tr>td{padding:5px;border: 1px solid #ddd;}td{vertical-align:text-top;padding:0}td.bold{font-weight:bold}td.qty{text-align:right}.stock .badge{margin:auto 5px;border-radius:10px;background:rgb(103,126,82);color:rgb(255,255,255);padding:2px 6px;}.out-of-stock{border-radius:3px;    background:#EC2A2A;color:#ffffff;padding: 3px 10px;}',
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