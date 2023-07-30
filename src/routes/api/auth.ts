import spiderman from "@/spiderman";
import { ApiError } from "@/classes";
import express, { Request, Response } from "express";

const router = express.Router();

const refreshTokens: string[] = [];

router.post("/login", (req: Request, res: Response) => {
  const user = { name: "test" };
  const accessToken = spiderman.jwt.generateAccessToken(user);
  const refreshToken = spiderman.jwt.generateRefreshToken(user);
  refreshTokens.push(refreshToken);
  console.log("refreshTokens:", refreshTokens);

  res.status(200).json({
    accessToken,
    refreshToken,
  });
});

router.post("/token", (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) throw new ApiError(401);
  if (!refreshTokens.includes(refreshToken)) throw new ApiError(403);

  const user = spiderman.jwt.decryptRefreshToken(refreshToken);
  const accessToken = spiderman.jwt.generateAccessToken(user);

  res.status(200).json({
    accessToken,
  });
});

router.delete("/logout", (req: Request, res: Response) => {
  refreshTokens.splice(refreshTokens.indexOf(req.body.token), 1);
  console.log("refreshTokens:", refreshTokens);

  res.status(200).json({
    message: "success",
  });
});

export default router;
