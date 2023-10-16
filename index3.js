const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8000, () => {
  console.log("Server is listening at http://localhost:8000");
});

const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_AfpBuMUpaRxS0f",
  key_secret: "XoY3fdzEgedpp4eMCsvPhPl9",
});

app.post("/order", (req, res) => {
  console.log(req.body);
  try {
    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0,
    };
    instance.orders.create(options, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      console.log(order);
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

app.post("/capture/:paymentId", (req, res) => {
  console.log(req.body, "post2");
  try {
    return request(
      {
        method: "POST",
        url: `https://rzp_test_AfpBuMUpaRxS0f:XoY3fdzEgedpp4eMCsvPhPl9@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          //   amount: 10 * 100,
          currency: "INR",
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            message: "Something Went Wrong",
          });
        }
        console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", body);
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});
