
const users = require("../db/users.json");
var jwt = require("jsonwebtoken");

const login = (phone, password) => {
  let user = users.find(
    (el) => el.phone === phone && el.password === password
  );

  if (!user) {
    return null;
  }

  var token = jwt.sign({ id: user.id, name: user.name, phone: user.phone }, process.env.SECRET_KEY, {
    expiresIn: "5h",
  });

  return token;
};
const getCurrentUser = (id) => {
  const user = users.find((el) => el.id === id);
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
