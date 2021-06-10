function getProductDetails() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("id");
    if(id==null || id=="") {
        window.location.replace('index.html');
    } else{
        $.ajax({
		    type : 'GET',
		    url : '/api/products/'+id,
		    success : function(response) {
			    if(response.value==-1){
				    window.location.replace('index.html');  
			    } else{
                    var div = document.getElementById("product-main-img");
                    div.innerHTML="";
                    const images=response.product_images;
                    for(var i=0;i<images.length;i++) {
                        var img_div = '<div class="product-preview"><img src="'+images[i]+'" alt="" class="middleimg"></div>'
                        div.innerHTML = div.innerHTML+img_div;                                          
                    }

                    var smalldiv = document.getElementById("product-imgs");
                    smalldiv.innerHTML="";
                    for(var i=0;i<images.length;i++) {
                        var img_div ='<div class="product-preview"><img src="'+images[i]+'" alt="" style="margin-left: 0px"></div>'
                        smalldiv.innerHTML = smalldiv.innerHTML + img_div;                       
                    }

                    const name = response.product_name;
                    document.getElementById('pro-name').innerHTML=name;
                    document.title = name + ' | Valued View';

                    getProductPrice();

                    const specs = response.main_specs;

                    var spec_table = document.getElementById('customers');

                    const table_header = `<tr>
                        
                        <th>Specs</th>
                        </tr>`;
                    spec_table.innerHTML = table_header;

                    for(var i=0;i<specs.length;i++) {
                        var row = `<tr>
                                     
                                    <td>`+specs[i]+`</td>
                                </tr>`;
                        spec_table.innerHTML = spec_table.innerHTML + row;                
                    }
                }
		    }
        });
    }
}