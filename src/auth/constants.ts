export const jwtConstants = {
  secret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  expiresIn: 30 * 60,
  refreshExpiresIn: 60 * 60 * 24,
};
