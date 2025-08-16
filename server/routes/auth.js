import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/google", async (req, res) => {
  const { token } = req.body;
  try {
    const googleRes = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    const { email, name, picture, sub } = googleRes.data;

    res.status(200).json({ email, name, picture });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Google Token" });
  }
});
/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Sign in with Google using Google ID token
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Google ID token obtained from client-side Google sign-in
 *             required:
 *               - idToken
 *     responses:
 *       200:
 *         description: User signed in successfully with Google
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for your backend authentication
 *                 user:
 *                   type: object
 *                   description: User profile info
 */

export default router;
