function getLoginStatus() {
	$.ajax({
		type : 'GET',
		url : '/admin/getLoginStatus',
		success : function(response) {
			console.log(response.status);
			if(response.status==true){
				window.location.replace('index.html');  
			} 
		}
	});
}