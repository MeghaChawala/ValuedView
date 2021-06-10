function createTransaction(store_name) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("id");
    const category = getProductCategory();
    const transaction = {
        product_id : id,
        product_name : document.getElementById('pro-name').innerHTML,
        product_category : category,
        store_name : store_name,
        review_link : "/review/"+category+"/index.html?proid="+id+"&tid="
    };
    $.ajax({
        url: "/transaction",
        type: "POST",
        data: JSON.stringify(transaction),
        contentType: "application/json",
        success : function(response) {
            console.log(response);
        },
        error: function(error){
            console.log( error+"error");
        }
        
    });
}