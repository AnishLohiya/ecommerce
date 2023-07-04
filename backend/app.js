const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: ".env" });

app.use(cors(
  {
    origin: 'https://mern-frontend-faq1.onrender.com/',
  }
));

app.use(express.json({ limit: '100mb' }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ 
  limit: '100mb',
  extended: true, 
  parameterLimit: 100000
}));
app.use(fileUpload());

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

app.use(errorMiddleware);

module.exports = app;