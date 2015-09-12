function init(router, query){
	//delete item
	router.delete('/items/:id', function(req, res, next) {
		var sqlCommand = "DELETE FROM items WHERE id = ?";
		var params = [req.params.id];
		query(res, sqlCommand, params,function(results){		
			console.log(results);	
			$.ajax({
				url: 'delete.php',
				data: {'file' : "<?php echo dirname(__FILE__) . '/uploads/'?>" + results.path },
				success: function (response) {
				 // do something
				},
				error: function () {
				 // do something
				}
	        });

		});

		res.status(200).send("Item successfully deleted");
	});

	//delete item from cart
	router.delete('/users/:username/cart/:itemId', function(req, res, next) {
		var sqlCommand = "DELETE FROM cart WHERE username = ? and id = ?";
		var params = [req.params.username, req.params.id];
		if (query(res, sqlCommand, params) === "erorr") {
			return;
		}

		res.status(200).send("Item successfully deleted from cart");
	});
}
module.exports = init;