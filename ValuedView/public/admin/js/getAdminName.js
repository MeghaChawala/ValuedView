function getAdminName() {
	$.ajax({
		type : 'GET',
		url : '/admin/getAdminName',
		success : function(response) {
			document.getElementById('admin-name').innerHTML=response.name;
		}
	});
}