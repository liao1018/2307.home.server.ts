import jwt, { JwtPayload } from "jsonwebtoken";

export default () => {
  function generateAccessToken({ name }: { name: string }): string {
    return jwt.sign({ name }, process.env.ACCESS_TOKEN_SECRET || "", {
      expiresIn: "15s",
    });
  }

  function decryptAccessToken(token: string): { name: string } {
    const payload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || ""
    ) as JwtPayload;

    const { name } = payload;
    return { name };
  }

  function generateRefreshToken({ name }: { name: string }): string {
    return jwt.sign({ name }, process.env.REFRESH_TOKEN_SECRET || "");
  }

  function decryptRefreshToken(token: string): { name: string } {
    const payload = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET || ""
    ) as JwtPayload;

    const { name } = payload;
    return { name };
  }

  return {
    generateAccessToken,
    decryptAccessToken,
    generateRefreshToken,
    decryptRefreshToken,
  };
};
