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
var jsSHA = require("jssha");

app.post("/payment/payumoney", (req, res) => {
  console.log("Payumoney");
  if (
    !req.body.txnid ||
    !req.body.amount ||
    !req.body.productinfo ||
    !req.body.firstname ||
    !req.body.email
  ) {
    res.send("Mandatory fields missing");
  } else {
    var pd = req.body;
    var hashString =
      "BK1duTpE" +
      "|" +
      pd.txnid +
      "|" +
      pd.amount +
      "|" +
      pd.productinfo +
      "|" +
      pd.firstname +
      "|" +
      pd.email +
      "|" +
      "||||||||||" +
      "HVSKkuPmKz";
    var sha = new jsSHA("SHA-512", "TEXT");
    sha.update(hashString);
    var hash = sha.getHash("HEX");
    res.send({ hash: hash });
  }
});

app.post("payment/payumoney/response", (req, res) => {
  var pd = req.body;

  var hashString =
    config.payumoney.salt +
    "|" +
    pd.status +
    "||||||||||" +
    "|" +
    pd.email +
    "|" +
    pd.firstname +
    "|" +
    pd.productinfo +
    "|" +
    pd.amount +
    "|" +
    pd.txnid +
    "|" +
    config.payumoney.key;

  var sha = new jsSHA("SHA-512", "TEXT");

  sha.update(hashString);

  var hash = sha.getHash("HEX");

  if (hash == pd.hash) {
    res.send({ status: pd.status });
  } else {
    res.send({ status: "Error occured" });
  }
});
