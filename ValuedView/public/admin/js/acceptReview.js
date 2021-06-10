function acceptReview() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const tid = url.searchParams.get("tid");
    const amount = document.getElementById('amount').value;
	$.ajax({
        type : 'PUT',
		url : '/api/reviews/accept/'+tid+'/'+amount,
		success : function(response) {
			if(response.value==1){
                document.getElementById('accept-msg').innerHTML="Status : Review Accepted!!"
                document.getElementById("accept-msg").style.color = "green";  
            }
            else if(response.value==-4) {
                document.getElementById('accept-msg').innerHTML="Status : User not found!!"
                document.getElementById("accept-msg").style.color = "red";  
            } else{
                document.getElementById('accept-msg').innerHTML="Status : Review already accepted or rejected!!"
                document.getElementById("accept-msg").style.color = "red";
            }
		}
	});
}