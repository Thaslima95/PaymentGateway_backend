const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
var bodyParser = require("body-parser");
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8000, () => {
  console.log("Server is listening at http://localhost:8000");
});
var jsSHA = require("jssha");

app.post("/hash", (req, res) => {
  console.log(req.body);
  const params = req.body;

  const hash = generateHash(params, "2OrOtieOBGZhA2bb0KypvqLtKIhjvmDw");

  //   // Add the hash to the parameter map
  params["hash"] = hash;

  //   // Encode the parameters for use in the URL
  // const encodedParams = new URLSearchParams(params).toString();

  //   // Build the URL for the PayU API request
  //   const url = apiEndpoint + "?" + encodedParams;

  //   // Output the URL for the PayU API request
  //   fetch(url)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));

  function generateHash(params, salt) {
    let hashString =
      params["key"] +
      "|" +
      params["txnid"] +
      "|" +
      params["amount"] +
      "|" +
      params["productinfo"] +
      "|" +
      params["firstname"] +
      "|" +
      params["email"] +
      "|||||||||||" +
      "2OrOtieOBGZhA2bb0KypvqLtKIhjvmDw";

    console.log(hashString);
    const hash = sha512(hashString);
    console.log(hash);

    return hash;
  }

  function sha512(str) {
    return crypto.createHash("sha512").update(str).digest("hex");
  }
  res.json({ hash: hash, txnId: req.body.txnid });
});
