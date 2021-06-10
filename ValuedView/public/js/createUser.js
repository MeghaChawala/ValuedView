function createUser() {
	document.getElementById("register-msg").innerHTML="";
	var data = $("#signup-form").serialize();
	$.ajax({
		type : 'POST',
		url : '/api/users',
		data : data,
		success : function(response) {
			document.getElementById("signup-form").reset();
			if(response.value==1){
				document.getElementById("register-msg").innerHTML="Registered Successfully!!";
				document.getElementById("register-msg").style.color = "green";   
			} else{
			document.getElementById("register-msg").innerHTML="You are already registered!!";
				document.getElementById("register-msg").style.color = "red";
			} 
		}
	});
}