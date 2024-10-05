"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = process.env.IS_LIVE === 'false' ? false : true;
const sslCommerzConfiguration = (data) => {
    const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
    return sslcz.init(data).then((apiResponse) => {
        return apiResponse.GatewayPageURL;
    }).catch((error) => {
        console.error('Error initializing SSLCommerz:', error);
        throw new Error('Internal Server Error');
    });
};
exports.default = sslCommerzConfiguration;
/**
 * HERE data variable will be contain these values, you will call the sslCommerzConfiguration function
 * and sent the data to this function.
 * */
// const data = {
//     total_amount: 100,
//     currency: 'BDT',
//     tran_id: 'REF123', // use unique tran_id for each api call
//     success_url: 'http://localhost:3030/success',
//     fail_url: 'http://localhost:3030/fail',
//     cancel_url: 'http://localhost:3030/cancel',
//     ipn_url: 'http://localhost:3030/ipn',
//     shipping_method: 'Courier',
//     product_name: 'Computer.',
//     product_category: 'Electronic',
//     product_profile: 'general',
//     cus_name: 'Customer Name',
//     cus_email: 'customer@example.com',
//     cus_add1: 'Dhaka',
//     cus_add2: 'Dhaka',
//     cus_city: 'Dhaka',
//     cus_state: 'Dhaka',
//     cus_postcode: '1000',
//     cus_country: 'Bangladesh',
//     cus_phone: '01711111111',
//     cus_fax: '01711111111',
//     ship_name: 'Customer Name',
//     ship_add1: 'Dhaka',
//     ship_add2: 'Dhaka',
//     ship_city: 'Dhaka',
//     ship_state: 'Dhaka',
//     ship_postcode: 1000,
//     ship_country: 'Bangladesh',
// };
