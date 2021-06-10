function adminLogin() {
	document.getElementById("login-msg").innerHTML="";
	var data = $("#login-form").serialize();
	$.ajax({
		type : 'POST',
		url : '/admin/login',
		data : data,
		success : function(response) {
			document.getElementById("login-form").reset();
			if(response.value==1){
				window.location.replace('index.html');    
			} else{
				document.getElementById("login-msg").innerHTML="Invalid Id or Password!!";
				document.getElementById("login-msg").style.color = "red";
			} 
		}
	});
}