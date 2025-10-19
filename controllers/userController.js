
const users = require("../db/users.json");
var jwt = require("jsonwebtoken");

const login = (name, phone) => {
  let user = users.find(
    (el) => el.name === name && el.phone === phone
  );

  if (!user) {
    return null;
  }

  var token = jwt.sign({ id: user.id, name: user.name, phone: user.phone }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
};
const getCurrentUser = (name) => {
  const user = users.find((el) => el.name === name);
  if (!user) {
    return null;
  } else {
  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    balance: user.balance,
  };
  }
}


module.exports = {
  login,
  getCurrentUser,
};
