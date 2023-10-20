const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

    const auth = req.header("Authorization");
    const token = auth.split(" ")[1];

    if (token === "null") {
        console.log("no token");
        return res.status(400).json({ message: "No Token Provided" });
    }


    jwt.verify(token, process.env.JWT_KEY, (err, email) => {
        if (err) {
            return res.status(400).json({ message: "Invalid Token" });
        }


        //req.email = email;
        next();
    });
}

module.exports = verifyToken;
