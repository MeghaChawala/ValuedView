function getUserTransactions() {
    var id = getUserId();
    if(id!="Anonymous") {
	    $.ajax({
		    type : 'GET',
            url : '/api/transactions/'+id,
		    success : function(response) {
                var table = document.getElementById("transaction");
                for(var i=0;i<response.length;i++) {
                    var row =`<tr class="row100 body">
                                <td class="cell100 column1">`+response[i].product_name+`</td>
                                <td class="cell100 column2">`+new Date(response[i].createdAt)+`</td>
                                <td class="cell100 column3">`+response[i].store_name+`</td>
                                <td class="cell100 column5"><a href="`+response[i].review_link+`" target="_blank"><button class="button"><span>Tell Us What You Think</span></button></a></td>
                            </tr>`;
                    table.innerHTML = table.innerHTML + row;
                }
		    }
        });
    }
}