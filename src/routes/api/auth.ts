import spiderman from "@/spiderman";
import express, { Request, Response } from "express";

const router = express.Router();

const refreshTokens: string[] = [];

router.post("/login", async (req: Request, res: Response) => {
  const user = { name: "test" };
  const accessToken = spiderman.jwt.generateAccessToken(user);
  const refreshToken = spiderman.jwt.generateRefreshToken(user);
  refreshTokens.push(refreshToken);

  res.status(200).json({
    accessToken,
    refreshToken,
  });
});

router.post("/token", async (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) throw new Error("401");
  if (!refreshTokens.includes(refreshToken)) throw new Error("403");

  const user = spiderman.jwt.decryptRefreshToken(refreshToken);
  const accessToken = spiderman.jwt.generateAccessToken(user);

  res.status(200).json({
    accessToken,
  });
});

router.delete("/logout", (req: Request, res: Response) => {
  refreshTokens.splice(refreshTokens.indexOf(req.body.token), 1);

  res.status(200).json({
    message: "success",
  });
});

export default router;
