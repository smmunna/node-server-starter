import paypal from 'paypal-rest-sdk';
import config from '../../../config';

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: `${config.paypal_client_id}`,
  client_secret: `${config.paypal_client_secret}`,
});

const createPayPalPayment = (items: any, total: any, description: any) => {
  return new Promise((resolve, reject) => {
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:5000/success',
        cancel_url: 'http://localhost:5000/cancel',
      },
      transactions: [
        {
          item_list: {
            items: [items],
          },
          amount: {
            currency: 'USD',
            total: total,
          },
          description: description,
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        reject(error);
      } else {
        if (payment.links) {
          let approvalUrl;
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              approvalUrl = payment.links[i].href;
              break;
            }
          }
          if (approvalUrl) {
            resolve(approvalUrl);
          } else {
            reject(new Error('Approval URL not found.'));
          }
        } else {
          reject(new Error('No links found in payment response.'));
        }
      }
    });
  });
};

export default createPayPalPayment;
