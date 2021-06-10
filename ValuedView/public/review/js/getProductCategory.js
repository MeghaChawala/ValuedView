function getProductCategory(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("proid");
    var name;
    $.ajax({
		type : 'GET',
        url : '/api/products/category/'+id,
        async: !1,
		success : function(response) {
            document.getElementById('product_category').value=response;
        },
        error: function(error){
            console.log( error+"error");
        }
    });
    
}