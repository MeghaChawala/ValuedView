function updateProductsByCategory(){
    var name=document.getElementById('category').value;
	$.ajax({
		type : 'PUT',
		url : '/api/products/price/category/'+name,
		success : function(response) {
			if(response.value==1){
                document.getElementById('update-category-product-msg').innerHTML="Status : Products Updated!!"
                document.getElementById("update-category-product-msg").style.color = "green";  
            }
            else if(response.value==-1) {
                document.getElementById('update-category-product-msg').innerHTML="Status : Oops some error occurred!!"
                document.getElementById("update-category-product-msg").style.color = "red";  
            } 
		}
	});
}