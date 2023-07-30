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

    const databases = await spiderman.mysql.query("SHOW DATABASES");

    res.status(200).json({
      user,
      databases,
    });
  })
);

export default router;
