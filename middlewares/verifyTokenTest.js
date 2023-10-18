const jwt = require("jsonwebtoken");

async function verifyTokenTest(req, res, next) {
    const authorization = req.headers["authorization"];
    const [, token] = authorization.split(" ");

    try {
        const info = await jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "invalid token" });
    }
}

module.exports = verifyTokenTest;
