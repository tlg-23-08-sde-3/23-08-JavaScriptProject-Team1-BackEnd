const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
   const token = req.header("Authorization").split(" ")[1];
   console.log(token);

   if (token == null) {
      console.log("no token");
      return res.status(400).json({ message: "No Token Provided" });
   }

   jwt.verify(token, "secretkey", (err, email) => {
      if (err) {
         return res.status(400).json({ message: "Invalid Token" });
      }

      // add user in req
      req.email = email;
      console.log(email.email);
      next();
   });
}

module.exports = verifyToken;
