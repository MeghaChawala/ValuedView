function userLogin() {
	document.getElementById("login-msg").innerHTML="";
	var data = $("#login-form").serialize();
	$.ajax({
		type : 'POST',
		url : '/login',
		data : data,
		success : function(response) {
			document.getElementById("login-form").reset();
			if(response.value==1){
				window.location.replace('transaction.html');  
			} else{
			document.getElementById("login-msg").innerHTML="Invalid Id or Password!!";
				document.getElementById("login-msg").style.color = "red";
			} 
		}
	});
}