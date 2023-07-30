import jwt, { JwtPayload } from "jsonwebtoken";

export default () => {
  function generateAccessToken({ username }: { username: string }): string {
    return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET || "", {
      expiresIn: "15s",
    });
  }

  function decryptAccessToken(token: string): { username: string } {
    const payload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || ""
    ) as JwtPayload;

    const { username } = payload;
    return { username };
  }

  function generateRefreshToken({ username }: { username: string }): string {
    return jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET || "");
  }

  function decryptRefreshToken(token: string): { username: string } {
    const payload = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET || ""
    ) as JwtPayload;

    const { username } = payload;
    return { username };
  }

  return {
    generateAccessToken,
    decryptAccessToken,
    generateRefreshToken,
    decryptRefreshToken,
  };
};
