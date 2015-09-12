function init(router, query){

	//create new user
	router.post('/users', function(req, res, next) {
	  	var sqlCommand = "INSERT INTO users (username, password, email, contact_email, first_name, last_name) VALUES (? ? ? ? ?)";
		var params = [req.body.username, req.body.password, req.body.email, req.body.email, req.body.first_name, req.body.last_name];

		if (query(res, sqlCommand, params) === "error"){ //TODO design better error handling protocol
			return;
		}
		res.status(200).send("User successfully created");
	});

	//add item to cart
	router.post('/users/:username/cart', function(req, res, next) {
	  	var sqlCommand = "INSERT INTO cart (username, item_id) VALUES (? ? ? ? ?)";
		var params = [req.body.username, req.body.item_id];

		if (query(res, sqlCommand, params) === "error"){ 
			return;
		}
		res.status(200).send("Item successfully added to user's cart");
	});

	/////////////////////////////////////////////////////////////////
	//uploads

	var multer  = require('multer');
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, '/uploads')
		},
		filename: function (req, file, cb) {
			cb(null, file.fieldname + '-' + Date.now())
		}
	});
	var upload = multer({ storage: storage, fileSize : 5000000}); // 5mb file limit

	//create new item
	router.post('/items', upload.single("image"), function(req, res, next) {
		console.log(req.file.filename);
		function auxCommands(data){
			var addCatCommand = "INSERT INTO categories_items (category_name, item_id) VALUES (? ?)";
			var params = [req.body.category_name, data.item_id];
			//var errMsg = "Error occured while adding item " + data.item_id + ": " + req.body.name +" main category";
			if (query(res, addCatCommand, params) === "error"){
				return;
			}

			var addSubCatCommand = "INSERT INTO subCategories_items (subCategory_name, item_id) VALUES (? ?)";
			for (var i=0; i<req.body.subCategories.length; i++){
				params = [req.body.subCategories[i], data.item_id];
				//errMsg = "Error occured while adding item " + data.item_id + ": " + req.body.name +" sub-categories"
				if (query(res, addSubCatCommand, params) === "error"){
					return;
				};
			}

			if (req.file) {
				var addImgCmd = "INSERT INTO items_images (path, item_id, is_main_image) VALUES (? ? 1)";
				params = [req.file.filename, data.item_id];
				if (query(res, addImgCmd, params) === "error"){
						return;
				};
			}

			res.status(200).send("Item has been successfully uploaded");
		}

		//create new item in items table
	  	var sqlCommand = "INSERT INTO items (name, price, is_negotiable, description, quality, available_until, reduce_price_by, reduce_rate, is_free_last_day, username, area_name, units) VALUES (? ? ? ? ? ? ? ? ? ? ? ? ?)";
		var params = [req.body.name, req.body.price, req.body.is_negotiable, req.body.description, req.body.quality, req.body.available_until, req.body.reduce_price_by, req.body.is_free_last_day, req.body.username, req.body.area_name, req.body.units];

		if (query(res, sqlCommand, params, auxCommands) === "error") {
			return;
		}
	});

}
module.exports = init;