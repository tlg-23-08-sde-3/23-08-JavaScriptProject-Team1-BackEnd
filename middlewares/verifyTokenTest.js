const jwt = require("jsonwebtoken");

async function verifyTokenTest(req, res, next) {
    const authorization = req.headers["authorization"];

    try {
        const [, token] = authorization.split(" ");
        const info = await jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "invalid token or no token supplied" });
    }
}

module.exports = verifyTokenTest;
