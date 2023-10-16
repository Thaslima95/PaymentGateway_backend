const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.listen(8000, () => {
  console.log("Server is listening at http://localhost:8000");
});

const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_AfpBuMUpaRxS0f",
  key_secret: "XoY3fdzEgedpp4eMCsvPhPl9",
});

app.get("/order", (req, res) => {
  try {
    const options = {
      amount: 1000 * 100,
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
  try {
    return request(
      {
        method: "POST",
        url: `https://rzp_test_AfpBuMUpaRxS0f:XoY3fdzEgedpp4eMCsvPhPl9@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: 10 * 100,
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
