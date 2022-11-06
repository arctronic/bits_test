import { User } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";
import config from "../../config";
import { logger } from "../log/logger.util";

export const signAccessToken = (user: Partial<User>) => {
  const payload = user;
  const accessToken = signToken(payload);
  logger.info("JWT produced from:\n", payload, "\n", accessToken);
  return accessToken;
};

// TODO: Add the keys to env and sign and verify properly
const signToken = (token: object) => {
  // const privateKey = Buffer.from(<string>config.accessKey, "base64").toString(
  //   "ascii"
  // );

  const privateKey = <string>config.accessKey;

  const signedToken = sign(token, privateKey, {
    algorithm: "HS256",
    expiresIn: "1d"
  });

  return signedToken;
};

export const verifyToken = (token: string): Omit<User, "password"> | null => {
  // const publicKey = Buffer.from(<string>config.accessKey, "base64").toString(
  //   "ascii"
  // );

  const publicKey = <string>config.accessKey;

  try {
    const decodedToken = verify(token, publicKey) as Omit<User, "password">;
    return decodedToken;
  } catch (error) {
    return null;
  }
};
