function resetVisitCount(){
	$.ajax({
		type : 'PUT',
		url : '/api/products/visit',
		success : function(response) {
			if(response.value==1){
                document.getElementById('reset-visit-msg').innerHTML="Status : Visit Count Reseted!!"
                document.getElementById("reset-visit-msg").style.color = "green";  
            }
            else if(response.value==-1) {
                document.getElementById('reset-visit-msg').innerHTML="Status : Oops some error occurred!!"
                document.getElementById("reset-visit-msg").style.color = "red";  
            } 
		}
	});
}