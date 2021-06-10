function addProduct() {
    document.getElementById('add-product-msg').innerHTML="Status :";
    document.getElementById("add-product-msg").style.color = "black";
    var id=document.getElementById('add-product-id').value;
	$.ajax({
		type : 'POST',
		url : '/api/products/'+id,
		success : function(response) {
			if(response.value==1){
                document.getElementById('add-product-msg').innerHTML="Status : Product Added!!"
                document.getElementById("add-product-msg").style.color = "green";  
            }
            else if(response.value==-1) {
                document.getElementById('add-product-msg').innerHTML="Status : Product Already Exists!!"
                document.getElementById("add-product-msg").style.color = "red";  
            } else{
                document.getElementById('add-product-msg').innerHTML="Status : Inavlid Product ID!!"
                document.getElementById("add-product-msg").style.color = "red";
            }
		}
	});
}