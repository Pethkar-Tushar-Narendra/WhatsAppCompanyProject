import jwt from "jsonwebtoken";
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      mobNo: user.mobNo,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        console.log(req.user);
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};
