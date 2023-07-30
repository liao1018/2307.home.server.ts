import spiderman from "@/spiderman";
import { ApiError } from "@/classes";
import express, { Request, Response } from "express";

const router = express.Router();

router.get(
  "/",
  spiderman.express.catchAsync(async (req: Request, res: Response) => {
    const token = (() => {
      const authHeader: string | undefined = req.headers.authorization;

      return authHeader?.split(" ")[1];
    })();

    if (!token) throw new ApiError(401);

    const user = spiderman.jwt.decryptAccessToken(token);

    const accounts = await spiderman.mysql.query(
      `SELECT * FROM accounts WHERE username LIKE 'Admin' AND passwoed = '123456';`
    );
    const account = accounts[0];

    res.status(200).json({
      user,
      account,
    });
  })
);

export default router;
