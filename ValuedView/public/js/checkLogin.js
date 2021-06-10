function checkLogin() {
	$.ajax({
		type : 'GET',
		url : '/getLoginStatus',
		success : function(response) {
			if(response.status==false){
				window.location.replace('login.html');  
			} 
		}
	});
}