import jwt from "jsonwebtoken";

export default function accessToken(user) {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SEC,
    { expiresIn: "600000" }
  );
}
