function getProductName() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("proid");
    const tid = url.searchParams.get("tid");
    if(id==null || id=="") {
        window.location.replace('../../index.html');
    } else{
        $.ajax({
		    type : 'GET',
		    url : '/api/products/name/'+id,
		    success : function(response) {
			    if(response.value==-1){
				    window.location.replace('../../index.html');  
			    } else{
                   document.getElementById('pro-name').innerHTML = response;
                   document.getElementById('product_name').value=response;
                   document.getElementById('product_id').value=id;
                   document.getElementById('transaction_id').value=tid;
                }
		    }
        });
    }
}