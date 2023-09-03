import spiderman from "@/spiderman";
import { ApiError } from "@/classes";
import express, { Request, Response } from "express";

const router = express.Router();

router.post(
  "/sign-up",
  spiderman.express.catchAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const account = (
      await spiderman
        .knex("accounts")
        .select("*")
        .where("username", "like", `${username}`)
    )[0];

    if (account) throw new ApiError(400, "duplicate username.");

    const saltRounds = 10;
    const hash = spiderman.bcrypt.hashSync(password, saltRounds);

    const result = await spiderman.knex("accounts").insert({
      username,
      password: hash,
    });

    res.status(200).json({
      message: "success",
      result,
    });
  })
);

router.post(
  "/login",
  spiderman.express.catchAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const accounts = await spiderman
      .knex("accounts")
      .select("*")
      .where("username", "like", `${username}`);

    const account = accounts[0];
    if (!account) throw new ApiError(401);

    // 加密方式
    const isPasswordValid = await spiderman.bcrypt.compare(
      password,
      account.password
    );
    if (!isPasswordValid) throw new ApiError(401);

    const tokenPayload = {
      username: account.username,
    };
    const accessToken = spiderman.jwt.generateAccessToken(tokenPayload);
    const refreshToken = spiderman.jwt.generateRefreshToken(tokenPayload);

    const userToken = (
      await spiderman.knex("user_tokens").select("*").where({
        account_id: account.id,
      })
    )[0];

    if (userToken) {
      await spiderman
        .knex("user_tokens")
        .where({
          account_id: account.id,
        })
        .update({
          token: refreshToken,
        });
    } else {
      await spiderman.knex("user_tokens").insert({
        account_id: account.id,
        token: refreshToken,
      });
    }

    res.status(200).json({
      accessToken,
      refreshToken,
      account,
    });
  })
);

router.post(
  "/token",
  spiderman.express.catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) throw new ApiError(401);

    const userToken = (
      await spiderman.knex("user_tokens").select("*").where({
        token: refreshToken,
      })
    )[0];
    if (!userToken) throw new ApiError(403);

    const tokenPayload = spiderman.jwt.decryptRefreshToken(refreshToken);
    const accessToken = spiderman.jwt.generateAccessToken(tokenPayload);

    res.status(200).json({
      accessToken,
    });
  })
);

router.delete(
  "/logout",
  spiderman.express.catchAsync(async (req: Request, res: Response) => {
    await spiderman
      .knex("user_tokens")
      .where({
        token: req.body.token,
      })
      .delete();

    res.status(200).json({
      message: "success",
    });
  })
);

export default router;
