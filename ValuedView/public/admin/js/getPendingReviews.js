function getPendingReviews() {
    var table = document.getElementById("table-body");
	$.ajax({
		type : 'GET',
		url : '/api/reviews/pending/',
		success : function(response) {
			for(var i=0;i<response.length;i++) {
                var row =`<tr>
                            <td scope="row">`+(i+1)+`</td>
                            <td >`+response[i].transaction_id+`</td>
                            <td >`+response[i]._id+`</td>
                            <td >`+response[i].product_name+`</td>
                            <td >`+new Date(response[i].createdAt)+`</td>
                            <td ><a href="/admin/acceptreview.html?rid=`+response[i]._id+`&tid=`+response[i].transaction_id+`" target="_blank"><button class="btn btn-success">Accept Review</button></a></td>
                        </tr>`;
                table.innerHTML = table.innerHTML + row;
            }
		}
	});
}