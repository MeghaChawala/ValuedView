function updateAllProducts(){
	$.ajax({
		type : 'PUT',
		url : '/api/products/price',
		success : function(response) {
			if(response.value==1){
                document.getElementById('update-all-product-msg').innerHTML="Status : Products Updated!!"
                document.getElementById("update-all-product-msg").style.color = "green";  
            }
            else if(response.value==-1) {
                document.getElementById('update-all-product-msg').innerHTML="Status : Oops some error occurred!!"
                document.getElementById("update-all-product-msg").style.color = "red";  
            } 
		}
	});
}