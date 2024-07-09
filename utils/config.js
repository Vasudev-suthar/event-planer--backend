require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const KEY_ID_RAZORPAY = process.env.KEY_ID_RAZORPAY;
const SECRET_RAZORPAY = process.env.SECRET_RAZORPAY;

module.exports = {
    PORT, MONGO_URL, SECRET_KEY, KEY_ID_RAZORPAY, SECRET_RAZORPAY
}