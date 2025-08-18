import express from "express";
const router = express.Router();

router.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("no code provided");

  try {
    // Step 2: Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_WEB_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `http://localhost:5000/api/auth/google`,
        grant_type: "authorization_code",
        codeVerifier: codeVerifier,
      }),
    });

    const res = await tokenResponse.json();
    console.log("response ====>", { res });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(400).json({ error: err });
  }
});
// /**
//  * @swagger
//  * /api/auth/google:
//  *   get:
//  *     summary: Sign in with Google using Google ID token
//  *     tags:
//  *       - User
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               idToken:
//  *                 type: string
//  *                 description: Google ID token obtained from client-side Google sign-in
//  *             required:
//  *               - idToken
//  *     responses:
//  *       200:
//  *         description: User signed in successfully with Google
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 token:
//  *                   type: string
//  *                   description: JWT token for your backend authentication
//  *                 user:
//  *                   type: object
//  *                   description: User profile info
//  */

export default router;
