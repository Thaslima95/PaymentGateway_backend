// This is your test secret API key.

const stripe = require("stripe")(
  "sk_test_51O0fjrSDBBzF7ZzCUSSbgd9ej5rJCFCev9s1Hv0vrNPg58awWJZcQKv6h77oMFV9ZEAArBvtSwCPMKWbCPaiQbBe00cETXXJL9"
);
const cors = require("cors");
var bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(express.static("public"));
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE", // Specify the HTTP methods you want to allow
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
  const products = req.body;
  const lineItems = {
    price_data: {
      currency: "inr",
      product_data: {
        name: products.name,
      },
      unit_amount: products.price,
    },
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [lineItems],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/failure`,
  });

  res.json({ id: session.id });
});

app.listen(8077, () => console.log("Running on port 8077"));
