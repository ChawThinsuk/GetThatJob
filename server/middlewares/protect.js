import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token || !token.startsWith("Bearer")) {
        return res.status(401).json({
            message: "Token doesnt exist",
        });
    }

    jwt.verify(token.split(' ')[1],process.env.SECRET_KEY, (err,payload) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }
        req.user = payload;
        next();
    })
}