function getLoginStatus() {
	$.ajax({
		type : 'GET',
		url : '/getLoginStatus',
		success : function(response) {
			if(response.status==true){
				window.location.replace('transaction.html');  
			} 
		}
	});
}