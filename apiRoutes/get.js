function init (router, query){
	
	//get user information
	router.get('/users/:username', function(req, res, next) {
		var sqlCommand = "SELECT username, email, contact_email, phone_number, description, notify_method, first_name, first_name FROM users WHERE username = ?";
		var params = [req.params.username];

		query(res, sqlCommand, params, function(results){
			res.json(results);
		})
	});

	//get all categories
	router.get('/categories', function(req, res, next) {
		var sqlCommand = "SELECT name FROM categories";
		var params = [];

		query(res, sqlCommand, params, function(results){
			res.json(results);
		})
	});

	//get all categories
	router.get('/categories/:category', function(req, res, next) {
		var sqlCommand = "SELECT name FROM subCategories WHERE category_name = ?";
		var params = [req.params.category_name];

		query(res, sqlCommand, params, function(results){
			res.json(results);
		})
	});


	////////////////////////////////////////////////////
	//items related queries

	//get the 6 most recently added items
	router.get('/items/recAdded', function(req, res, next) {
		var sqlCommand = "SELECT * FROM items WHERE id > ? ORDER BY id DESC LIMIT 6";		
		var params = [req.params.lastId];

		query(res, sqlCommand, params, function(results){
			res.json(results);
		})
	});

	//get item based on:
	//the last item id found,
	//above or below that item id,
	//item main category and sub-categories
	router.get('/items/:lastId', function(req, res, next) {
		var sqlCommand = "";
		var params = [];
		var operation = "";

		switch (req.query.type){
			case "above":
				operation = "<";
				break;
			case "below":
				operation = ">";
				break;
		}

		if (req.query.mainCategory) {
			var count = 30;
			if (req.query.subCategories){
				var subCatCommand = [];
				for (var i=0; i<req.query.subCategories.length; i++){
					subCatCommand.push("subCategories_items.subCategory_name = ?");
				}

				sqlCommand = "SELECT items.* "+
				"FROM items "+
				"INNER JOIN subCategories_items "+
				"ON items.id = subCategories_items.item_id "+
				"WHERE items.id "+ operation +" ? and " + subCatCommand.join(" OR ") +
				" ORDER BY items.id "+
				"DESC LIMIT ?";
				params = [req.params.lastId].concat(req.query.subCategories).push(count);
			}else {
				sqlCommand = "SELECT items.* "+
				"FROM items "+
				"INNER JOIN categories_items "+
				"ON items.id = categories_items.item_id "+
				"WHERE items.id "+ operation +" ? and categories_items.name = ? "+
				"ORDER BY items.id "+
				"DESC LIMIT ?";
				params = [req.params.lastId, mainCategory, count];
			}
		}else {
			sqlCommand = "SELECT * FROM items WHERE id "+ operation +" ? ORDER BY id DESC LIMIT 6";
			params = [req.params.lastId];
		}

		query(res, sqlCommand, params, function(results){
			res.json(results);
		})
	});

	//get all items favorited by user
	router.get('/users/:username/cart', function(req, res, next) {		
		var sqlCommand = "SELECT items.* "+
		"FROM carts "+
		"INNER JOIN items "+
		"ON carts.username = items.username "+
		"WHERE carts.username = ?";		
		var params = [req.params.username];

		query(res, sqlCommand, params, function(results){
			res.json(results);
		})
	});

	//get all items sold/being sold by user
	router.get('/users/:username/history', function(req, res, next) {		
		var sqlCommand = "SELECT items.* "+
		"FROM items "+
		"WHERE items.username = ?";	
		var params = [req.params.username];
		
		query(res, sqlCommand, params, function(results){
			res.json(results);
		})
	});
}
module.exports = init;