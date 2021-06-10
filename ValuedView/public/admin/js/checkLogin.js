function checkLogin() {
	$.ajax({
		type : 'GET',
		url : '/admin/getLoginStatus',
		success : function(response) {
			console.log(response.status);
			if(response.status==false){
				window.location.replace('login.html');  
			} 
		}
	});
}