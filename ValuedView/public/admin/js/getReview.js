function getReview() {
    var table = document.getElementById("review-body");
    var url_string = window.location.href;
    var url = new URL(url_string);
    const rid = url.searchParams.get("rid");
	$.ajax({
		type : 'GET',
		url : '/api/reviews/'+rid,
		success : function(response) {
            var keys = Object.keys(response);
			for(var i=0;i<keys.length;i++) {
                if(keys[i]=="product_images") {
                    var row=`<tr>
                                <td scope="row">Product Images</td>
                                <td>`;
                    var temp="";
                    for(var j=0;j<response.product_images.length;j++)
                    {
                        temp= temp+`<a href="../`+response.product_images[j].replace("public","")+`" target="_blank">`+response.product_images[j].replace("public","")+`</a><br>`;
                    }
                    row = row + temp + "</td> </tr>";
                    table.innerHTML = table.innerHTML + row;
                }else if(keys[i]=="bill_image") {
                    var row=`<tr>
                                <td scope="row">Bill Image</td>
                                <td>`;
                    var temp="";
                    
                        temp= temp+`<a href="../`+response.bill_image.replace("public","")+`" target="_blank">`+response.bill_image.replace("public","")+`</a>`;
                    
                    row = row + temp + "</td> </tr>";
                    table.innerHTML = table.innerHTML + row;
                }else if(keys[i]=="_id") {
                    var row=`<tr>
                                <td scope="row">Review Id</td>
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