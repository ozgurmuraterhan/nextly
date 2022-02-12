const router = require("express").Router();

let Users = require("../models/users.model");
let usersData = require("../db/users.json");

let Settings = require("../models/settings.model");
let settingsData = require("../db/settings.json");

let Variants = require("../models/variants.model");
let variantsData = require("../db/variants.json");

let Turkey = require("../models/turkey.model");
let turkeyData = require("../db/turkey.json");

let Topmenu = require("../models/topmenu.model");
let topmenuData = require("../db/topmenu.json");

let Productimages = require("../models/productimages.model");
let productimagesData = require("../db/productimages.json");

let Products = require("../models/products.model");
let productsData = require("../db/products.json");


let Paymentmethods = require("../models/paymentmethods.model");
let paymentmethodsData = require("../db/paymentmethods.json");

let Orderstatus = require("../models/orderstatus.model");
let orderstatusData = require("../db/orderstatus.json");

let Orders = require("../models/orders.model");
let ordersData = require("../db/orders.json");

let Homeslider = require("../models/homeslider.model");
let homesliderData = require("../db/homeslider.json");

let Country = require("../models/country.model");
let countryData = require("../db/country.json");


let Categories = require("../models/categories.model");
let categoriesData = require("../db/categories.json");

let Cargoes = require("../models/cargoes.model");
let cargoesData = require("../db/cargoes.json");

let Brands = require("../models/brands.model");
let brandsData = require("../db/brands.json");


router.route("/").get((req, res) => {

	Settings.find().then(val => {
		if (val.length > 0) {
			console.log("have Settings  ");
		} else {
			Settings.insertMany(settingsData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Settings  data");
				}
			});
		}
	});

	Users.find().then(val => {
		if (val.length > 0) {
			console.log("have Users  ");
		} else {

			Users.insertMany(usersData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Users  data");
				}
			});
		}
	});


	Variants.find().then(val => {
		if (val.length > 0) {
			console.log("have Variants  ");
		} else {

			Variants.insertMany(variantsData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Variants  data");
				}
			});
		}
	});


	Turkey.find().then(val => {
		if (val.length > 0) {
			console.log("have Turkey  ");
		} else {

			Turkey.insertMany(turkeyData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Turkey  data");
				}
			});
		}
	});


	Topmenu.find().then(val => {
		if (val.length > 0) {
			console.log("have Topmenu  ");
		} else {

			Topmenu.insertMany(topmenuData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Topmenu data");
				}
			});
		}
	});


	Products.find().then(val => {
		if (val.length > 0) {
			console.log("have Products  ");
		} else {

			Products.insertMany(productsData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Products  data");
				}
			});
		}

	});


	Productimages.find().then(val => {
		if (val.length > 0) {
			console.log("have Productimages  ");
		} else {

			Productimages.insertMany(productimagesData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Productimages  data");
				}
			});
		}
	});


	Paymentmethods.find().then(val => {
		if (val.length > 0) {
			console.log("have Paymentmethods  ");
		} else {

			Paymentmethods.insertMany(paymentmethodsData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Paymentmethods  data");
				}
			});
		}
	});


	Orderstatus.find().then(val => {
		if (val.length > 0) {
			console.log("have Orderstatus  ");
		} else {

			Orderstatus.insertMany(orderstatusData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Orderstatus  data");
				}
			});
		}
	});

	Orders.find().then(val => {
		if (val.length > 0) {
			console.log("have Orders  ");
		} else {

			Orders.insertMany(ordersData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Orders  data");
				}
			});
		}
	});


	Homeslider.find().then(val => {
		if (val.length > 0) {
			console.log("have Homeslider  ");
		} else {

			Homeslider.insertMany(homesliderData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Homeslider  data");
				}
			});
		}
	});

	Country.find().then(val => {
		if (val.length > 0) {
			console.log("have Country  ");
		} else {

			Country.insertMany(countryData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Country  data");
				}
			});
		}
	});


	Categories.find().then(val => {
		if (val.length > 0) {
			console.log("have Categories  ");
		} else {

			Categories.insertMany(categoriesData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Categories  data");
				}
			});
		}
	});

	Cargoes.find().then(val => {
		if (val.length > 0) {
			console.log("have Cargoes  ");
		} else {

			Cargoes.insertMany(cargoesData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Cargoes  data");
				}
			});
		}
	});

	Brands.find().then(val => {
		if (val.length > 0) {
			console.log("have Brands  ");
		} else {

			Brands.insertMany(brandsData, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("add Brands  data");
				}
			});
		}
	});
	res.json({
		messagge: "instalitions okey ",
	});
});

module.exports = router;


