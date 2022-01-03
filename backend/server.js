const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path")
const compression = require('compression');
const companion = require('@uppy/companion')
const mongoSanitize = require('express-mongo-sanitize');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;


app.use(mongoSanitize());
app.use(compression());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ limit: '1gb', parameterLimit: 50000 }));
app.use(express.urlencoded({ limit: "1gb", extended: true, parameterLimit: 50000 }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
   console.log("connection MongoDB");
});

const turkeyRouter = require("./routes/turkey");
const userRouter = require("./routes/users");
const uploadRouter = require("./routes/upload");
const staffRouter = require("./routes/staff");
const customerRouter = require("./routes/customers");
const countryRouter = require("./routes/country");
const productsRouter = require("./routes/products");
const productimagesRouter = require("./routes/productimages");
const variantsRouter = require("./routes/variants");
const categoriesRouter = require("./routes/categories");
const cargoesRouter = require("./routes/cargoes");
const homeSliderRouter = require("./routes/homeslider");
const ordersRouter = require("./routes/orders");
const orderstatusRouter = require("./routes/orderstatus");
const brandsRouter = require("./routes/brands");
const paymentmethodsRouter = require("./routes/paymentmethods");
const topmenuRouter = require("./routes/topmenu");
const settingsRouter = require("./routes/settings");
const basketRouter = require("./routes/basket");

//public Root
const settingsPublicRouter = require("./routes/settingspublic");
const topmenuPublicRouter = require("./routes/topmenupublic");
const categoriesPublicRouter = require("./routes/categoriespublic");
const brandsPublicRouter = require("./routes/brandspublic");
const homeSliderPublicRouter = require("./routes/homesliderpublic");
const productsPublicRouter = require("./routes/productspublic");
const cargoesPublicRouter = require("./routes/cargoespublic");
const customerPublicRouter = require("./routes/customerspublic");
const paymentPublicRouter = require("./routes/payment");
const paymentMethodsPublicRouter = require("./routes/paymentmethodspublic");



app.use("/cargoes", cargoesRouter);
app.use("/homeslider", homeSliderRouter);
app.use("/orders", ordersRouter);
app.use("/orderstatus", orderstatusRouter);
app.use("/paymentmethods", paymentmethodsRouter);
app.use("/topmenu", topmenuRouter);
app.use("/users", userRouter);
app.use("/staff", staffRouter);
app.use("/customers", customerRouter);
app.use("/country", countryRouter);
app.use("/products", productsRouter);
app.use("/productimages", productimagesRouter);
app.use("/variants", variantsRouter);
app.use("/categories", categoriesRouter);
app.use("/brands", brandsRouter);
app.use("/turkey", turkeyRouter);
app.use("/upload", uploadRouter);
app.use("/settings", settingsRouter);
app.use("/basket", basketRouter);

//public Root
app.use("/settingspublic", settingsPublicRouter);
app.use("/topmenupublic", topmenuPublicRouter);
app.use("/categoriespublic", categoriesPublicRouter);
app.use("/brandspublic", brandsPublicRouter);
app.use("/homesliderpublic", homeSliderPublicRouter);
app.use("/productspublic", productsPublicRouter);
app.use("/cargoespublic", cargoesPublicRouter);
app.use("/customerspublic", customerPublicRouter);
app.use("/payment", paymentPublicRouter);
app.use("/paymentmethodspublic", paymentMethodsPublicRouter);


app.use(express.static(path.join(__dirname, '../admin/public')));
//  initialize uppy
// const uppyOptions = {
//    providerOptions: {
//       drive: {
//          key: 'your google key',
//          secret: 'your google secret',
//       },
//       instagram: {
//          key: 'your instagram key',

//          secret: 'your instagram secret',
//       },
//       dropbox: {
//          key: 'your dropbox key',
//          secret: 'your dropbox secret',
//       },
//       box: {
//          key: 'your box key',
//          secret: 'your box secret',
//       },
//       // you can also add options for additional providers here
//    },
//    server: {
//       host: 'localhost:3020',
//       protocol: 'http',
//    },
//    filePath: './output',
//    secret: 'some-secret',
//    debug: true,
// }

// app.use(companion.app(uppyOptions))
// companion.socket(app.listen(3020), uppyOptions)

app.listen(port, () => {
   console.log("sever is runnin port: " + port);
});



