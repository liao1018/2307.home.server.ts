import spiderman from "@/spiderman";
import { ApiError } from "@/classes";
import express, { Request, Response } from "express";

const router = express.Router();

const refreshTokens: string[] = [];

router.post(
  "/login",
  spiderman.express.catchAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const accounts = await spiderman.mysql.query(
      `SELECT * FROM accounts WHERE username LIKE '${username}' AND passwoed = '${password}';`
    );
    const account = accounts[0];
    if (!account) throw new ApiError(401);

    const tokenPayload = {
      username: account.username,
    };
    const accessToken = spiderman.jwt.generateAccessToken(tokenPayload);
    const refreshToken = spiderman.jwt.generateRefreshToken(tokenPayload);
    refreshTokens.push(refreshToken);
    console.log("refreshTokens:", refreshTokens);

    res.status(200).json({
      accessToken,
      refreshToken,
      account,
    });
  })
);

router.post("/token", (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) throw new ApiError(401);
  if (!refreshTokens.includes(refreshToken)) throw new ApiError(403);

  const tokenPayload = spiderman.jwt.decryptRefreshToken(refreshToken);
  const accessToken = spiderman.jwt.generateAccessToken(tokenPayload);

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
