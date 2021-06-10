function removeProduct() {
    var id=document.getElementById('product-id').value;
	$.ajax({
		type : 'DELETE',
		url : '/api/products/'+id,
		success : function(response) {
			if(response.value==1){
                document.getElementById('remove-product-msg').innerHTML="Status : Product Removed!!"
                document.getElementById("remove-product-msg").style.color = "green";  
            }else{
                document.getElementById('remove-product-msg').innerHTML="Status : Inavlid Product ID!!"
                document.getElementById("remove-product-msg").style.color = "red";
            }
		}
	});
}