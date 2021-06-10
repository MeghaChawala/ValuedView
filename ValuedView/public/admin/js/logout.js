function logout() {
	$.ajax({
		type : 'GET',
		url : '/admin/logout',
		success : function(response) {
			console.log(response.status);
			if(response.message=="logged out"){
				window.location.replace('login.html');  
			} 
		}
	});
}