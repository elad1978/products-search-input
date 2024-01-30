const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

let products = [
  { id: 1, name: "milk" },
  { id: 2, name: "bread" },
  { id: 3, name: "eggs" },
  { id: 4, name: "cheese" },
  { id: 5, name: "butter" },
  { id: 6, name: "tomato" },
  { id: 7, name: "potato" },
  { id: 8, name: "apple" },
  { id: 9, name: "banana" },
  { id: 10, name: "pineapple" },
  { id: 11, name: "strawberry" },
  { id: 12, name: "pear" },
  { id: 13, name: "orange" },
  { id: 14, name: "grapes" },
  { id: 15, name: "lemon" },
  { id: 16, name: "peach" },
  { id: 17, name: "mango" },
  { id: 18, name: "cherries" },
  { id: 19, name: "sugar" },
  { id: 20, name: "salt" },
  { id: 21, name: "oil" },
  { id: 22, name: "rice" },
  { id: 23, name: "pasta" },
  { id: 24, name: "pizza" },
  { id: 25, name: "burger" },
  { id: 26, name: "chicken" },
  { id: 27, name: "fish" },
  { id: 28, name: "beef" },
  { id: 29, name: "cake" },
  { id: 30, name: "candy" },
  { id: 31, name: "ice cream" },
  { id: 32, name: "apple juice" },
  { id: 33, name: "water" },
  { id: 34, name: "juice" },
  { id: 35, name: "milkshake" },
  { id: 36, name: "tea" },
  { id: 37, name: "coffee" },
  { id: 38, name: "beer" },
  { id: 39, name: "wine" },
  { id: 40, name: "wine" },
];

//let id = 3;

let users = [
  { id: 1, email: "elad", password: "123", role: "admin" },
  { id: 2, email: "efrat", password: "123", role: "gest" },
];

app.use(cors());

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:text", (req, res) => {
  const text = req.params.text;
  if (!text) {
    res.status(400).send("there is no text sent");
    return;
  }
  const productsFound = products.filter((p) =>
    p.name.toLowerCase().includes(text.toLowerCase())
  );
  if (productsFound.length == 0) {
    res.json({ text: "There are no products found" });
    return;
  }
  res.json(productsFound);
});

app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("there is no id");
    return;
  }
  try {
    products = products.filter((p) => p.id != id);
    res.json(products);
  } catch (error) {}
});

//login and auth API`s

app.post("/api/login/", jsonParser, (req, res) => {
  const { email, password } = req.body;
  let user = users.find((u) => u.email === email);
  if (!user) {
    res.status(400).send({ err: "email or password are missing" });
    return;
  }

  if (user.password != password) {
    res.status(404).send("Email or password is incorrect");
    return;
  }

  let token = jwt.sign({ email: user.email, role: user.role }, "tatatatatata");
  res.json({ massage: "Thanks for registering", token: token });
});

function auth(req, res, next) {
  let authHeader = req.header("authorization");
  if (authHeader && authHeader.replace("Bearer ", "")) {
    let token = authHeader.replace("Bearer ", "");
    try {
      let decoded = jwt.verify(token, "tatatatatata");
      req.user = decoded;
      next();
      return;
    } catch (err) {}
  }
  res.status(401).json({ massage: "you need to login" });
}
function authRole(role) {
  return function (req, res, next) {
    if (req.user.role != role) {
      res.status(403).send("excess is denied");
    } else {
      next();
    }
  };
}

app.get("/api/users/getUser", auth, (req, res) => {
  res.json(req.user);
});

app.listen(PORT, () => {
  console.log(`listening to port:  ${PORT}`);
});
