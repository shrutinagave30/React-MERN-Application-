const express = require("express");
const cors = require("cors");
const user = require("./user");
const mongoose = require("mongoose");
const { data } = require("react-router-dom");
const food = require("./food");

const app = express();
app.use(express.json());
app.use(cors());

try {
  mongoose.connect("mongodb://localhost:27017/Restaurent");
  console.log("Connected to db");
} catch (e) {
  console.error(e);
}

app.post("/register", async (req, res) => {
  const { username, email, mob, password } = req.body;

  try {
    let result = await user.create({
      username: username,
      email: email,
      password: password,
      mob: mob,
    });
    console.log(result);
    res.status(200).json({ registered: "yes" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ registered: "no" });
  }
});

app.post("/additem", async (req, res) => {
  const { Name, price, category } = req.body;

  try {
    let result = await food.create({
      Name: Name,
      price: price,
      category: category,
    });
    console.log(result);
    res.status(200).json({ registered: true });
  } catch (e) {
    console.error(e);
    res.status(400).json({ registered: false });
  }
});

app.get("/login", async (req, res) => {
  const { email, password } = req.query;

  console.log(email, password);

  try {
    let response = await user.findOne({ email: email, password: password });
    console.log(response);
    if (response === null) {
      res.status(401).json({ data: "not found" });
    } else {
      const { __v, password, ...rest } = response.toObject();
      res.status(201).json({ data: rest });
    }
  } catch (e) {
    console.error(e);
    res.status(501).json({ data: "Not connected" });
  }
});

app.get("/owner", async (req, res) => {
  const { user, password } = req.query;

  console.log(user, password);

  if (user === "admin" && password === "123456") {
    res.status(201).json({ data: "ok" });
  } else {
    res.status(401).json({ data: "Not ok" });
  }
});

app.get("/data/:id", async (req, res) => {
  const { id } = req.params; // Get the 'id' from the URL parameter

  try {
    const data = await user.findById(id);

    if (!data) {
      // If no user is found, send a 404 error
      return res.status(404).json({ message: "User not found" });
    }

    // If the user is found, send the user data
    const { __v, _id, password, ...rest } = data.toObject();
    console.log(rest);

    res.status(200).json(rest);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/getitems", async (req, res) => {
  let { type } = req.query;
  console.log(type);
  try {
    let data = await food.find({ category: type });
    console.log(data);
    if (data.length > 0 ) {

      
      res.status(201).json({ response: data });
    }
    else
    res.status(401).json({ response: "NoItems" });
} catch (e) {
    res.status(501).json({ response: "reqErr" });
    console.error(e);
  }
});

app.listen(5000, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`app is listening on port 5000`);
});
