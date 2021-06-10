function addSpecs() {
    var id=document.getElementById('specs-product-id').value;
    document.getElementById('add-specs-msg').innerHTML="Status :";
    document.getElementById("add-specs-msg").style.color = "black";
	$.ajax({
		type : 'PUT',
		url : '/api/products/specs/'+id,
		success : function(response) {
			if(response.value==1){
                document.getElementById('add-specs-msg').innerHTML="Status : Specs Added!!"
                document.getElementById("add-specs-msg").style.color = "green";  
            }
            else if(response.value==-1) {
                document.getElementById('add-specs-msg').innerHTML="Status : Specs Already Exists!!";
                document.getElementById("add-specs-msg").style.color = "red";  
            } else if(response.value==-2){
                document.getElementById('add-specs-msg').innerHTML="Status : Specs Not Available!!"
                document.getElementById("add-specs-msg").style.color = "red";
            } else {
                document.getElementById('add-specs-msg').innerHTML="Status : Product Doesn't Exist!!";
                document.getElementById("add-specs-msg").style.color = "red";
            }
		}
	});
}