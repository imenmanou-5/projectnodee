import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 jours
        httpOnly: true, // Empêche l'accès aux cookies par JavaScript (sécurité XSS)
        sameSite: "strict", // Protège contre les attaques CSRF
        secure: ENV_VARS.NODE_ENV === "production", // Sécurisé uniquement en HTTPS en production
    });

    // ✅ Vérification : Afficher les cookies envoyés
    console.log("✔️ Token généré:", token);
    console.log("✔️ Cookies envoyés:", res.getHeaders()["set-cookie"]);

    return token;
};
