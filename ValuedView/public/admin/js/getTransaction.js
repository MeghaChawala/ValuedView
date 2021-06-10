function getTransaction() {
    var table = document.getElementById("transaction-body");
    var url_string = window.location.href;
    var url = new URL(url_string);
    const tid = url.searchParams.get("tid");
	$.ajax({
		type : 'GET',
		url : '/api/transactions/single/'+tid,
		success : function(response) {
            var keys = Object.keys(response);

			for(var i=0;i<keys.length;i++) {
                if(keys[i]=="_id") {
                    var row=`<tr>
                                <td scope="row">Transaction Id</td>
                                <td>`+response._id+`</td> </tr>`;
                    table.innerHTML = table.innerHTML + row;
                } else {
                var row =`<tr>
                            <td scope="row">`+keys[i]+`</td>
                            <td >`+response[keys[i]]+`</td>
                        </tr>`;
                    table.innerHTML = table.innerHTML + row;
                }
            }
		}
	});
}