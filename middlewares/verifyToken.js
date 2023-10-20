const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
   const auth = req.header("Authorization");
   const token = auth.split(" ")[1];

   if (token === "null") {
      console.log("no token");
      return res.status(400).json({ message: "No Token Provided" });
   }

   console.log("here checking");

   jwt.verify(token, "secretkey", (err, email) => {
      if (err) {
         return res.status(400).json({ message: "Invalid Token" });
      }

      req.email = email;
      console.log(email.email);
      next();
   });
}

module.exports = verifyToken;
