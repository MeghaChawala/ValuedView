function updateSingleProduct() {
    var id=document.getElementById('product-id').value;
	$.ajax({
		type : 'PUT',
		url : '/api/products/price/'+id,
		success : function(response) {
			if(response.value==1){
                document.getElementById('update-single-product-msg').innerHTML="Status : Product Updated!!"
                document.getElementById("update-single-product-msg").style.color = "green";  
            }
            else if(response.value==-1) {
                document.getElementById('update-single-product-msg').innerHTML="Status : Invalid or Un-added Product ID!!"
                document.getElementById("update-single-product-msg").style.color = "red";  
            } 
		}
	});
}