function getProductPrice() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("id");
    $.ajax({
		type : 'GET',
	    url : '/api/products/price/'+id,
		success : function(prices) {
            var table = document.getElementById("price-table");
                    for(var i=0;i<prices.length;i++) {
                        var row =`<tr>
                            <td>
                                <img  src="`+prices[i].product_store_logo+`" alt=""style="height: 45px;width: 80px;object-fit:contain;" class="store">
                            </td>
                            <td>`+prices[i].product_store_name+`</td>
                            <td>Rs.`+prices[i].product_price+`</td>
                            <td>
                               <a href="`+prices[i].product_store_url+`" target="_blank"><button onclick="createTransaction('`+prices[i].product_store_name+`');" class="button button1" style="padding:0px;width: 125px;height: 40px;">Go To Store</button></a>
                            </td>
                        </tr>`
                        table.innerHTML = table.innerHTML + row;                       
                    }
        },
        error: function(error){
            console.log( error+"error");
        }
    });
}