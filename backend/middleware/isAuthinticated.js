import jwt from "jsonwebtoken";
import { User } from "../model/usermodel.js";

export const isAuthenticated = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(400).json({ success: false, message: "Token missing or invalid" });
        }
        const token = authHeader.split(" ")[1]
        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            if (error.name === "TokeneExpiredError") {
                return res.status(400).json({ success: false, message: "Token Expired " })
            }
            return res.status(401).json({ success: false, message: "Token Missing or Invailid" })
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(400).json({ success: false, message: "User Not found" });
        }
        req.user= user
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}