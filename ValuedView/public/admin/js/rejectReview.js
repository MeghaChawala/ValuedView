function rejectReview() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const tid = url.searchParams.get("tid");
	$.ajax({
        type : 'PUT',
		url : '/api/reviews/reject/'+tid,
		success : function(response) {
			if(response.value==1){
                document.getElementById('reject-msg').innerHTML="Status : Review Rejected!!"
                document.getElementById("reject-msg").style.color = "green";  
            }else{
                document.getElementById('reject-msg').innerHTML="Status : Review already accepted or rejected!!"
                document.getElementById("reject-msg").style.color = "red";
            }
		}
	});
}