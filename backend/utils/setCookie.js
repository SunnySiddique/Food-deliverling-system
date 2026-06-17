const setTokenCookie = (res, token) => {
  res.cookie("food-jwt", token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    sameSite: "strict", // prevent CSRF attacks
    secure: process.env.NODE_ENV === "production", // secure in production
  });
};

export default setTokenCookie;
