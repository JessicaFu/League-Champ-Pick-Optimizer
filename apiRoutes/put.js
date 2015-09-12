function init(router, query){
	//edit user info
	router.put('/users/:username', function(req, res, next) {
	  	var sqlCommand = "UPDATE users SET username = ?, password = ?, email = ?, contact_email = ?, phone_number = ?, first_name = ?, last_name = ? WHERE username = ?";
		var params = [req.body.username, req.body.password, req.body.email, req.body.contact_email, req.body.phone_number, req.body.first_name, req.body.last_name, req.body.old_username];

		if (query(res, sqlCommand, params) === "erorr") {
			return;
		}

		res.status(200).send("User information succesfully edited");
	});

	//edit item
	router.put('/items/:id', function(req, res, next) {
		var sqlCommand = "";
		var params = [];
		
		switch(req.query.type) {
			case "soldStatus":
				sqlCommand = "UPDATE items SET isSold = ? WHERE id = ?";
				params = [1];
				if (req.query.isSold === 1){ //TODO is this possibly a string??
					var params = [0];
				}
				break; 
			case "metadata":
				sqlCommand = "UPDATE items SET name = ?, price = ?, is_negotiable = ?, description = ?, quality = ?, available_until = ?, reduce_price_by = ?, reduce_rate = ?, is_free_last_day = ?, area_name = ?, units = ? WHERE id = ?";
				params = [req.body.name, req.body.price, req.body.is_negotiable, req.body.description, req.body.quality, req.body.available_until, req.body.reduce_price_by, req.body.is_free_last_day, req.body.area_name, req.body.units, req.body.id];

				break;
		}

		if (query(res, sqlCommand, params) === "erorr") {
			return;
		}

		res.status(200).send("Item edited succesfully");
	});
}
module.exports = init;