function getAcceptedReviews() {
    var table = document.getElementById("table-body");
	$.ajax({
		type : 'GET',
		url : '/api/reviews/accepted/',
		success : function(response) {
			for(var i=0;i<response.length;i++) {
                var row =`<tr>
                            <td scope="row">`+(i+1)+`</td>
                            <td >`+response[i].transaction_id+`</td>
                            <td >`+response[i]._id+`</td>
                            <td >`+response[i].product_name+`</td>
                            <td >`+new Date(response[i].createdAt)+`</td>
                        </tr>`;
                table.innerHTML = table.innerHTML + row;
            }
		}
	});
}