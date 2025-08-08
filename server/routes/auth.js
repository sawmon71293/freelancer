const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/google", async (req, res) => {
  const { token } = req.body;
  console.log(token);
  try {
    const googleRes = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    const { email, name, picture, sub } = googleRes.data;
    console.log(email);

    res.status(200).json({ email, name, picture });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Google Token" });
  }
});

module.exports = router;
