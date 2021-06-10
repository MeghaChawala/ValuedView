function getUserId() {
	var id;
	$.ajax({
		type : 'GET',
        url : '/getUserId',
        async: !1,
		success : function(response) {
			id = response.id;
		}
	});
	return id;
}