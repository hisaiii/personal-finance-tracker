import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-oauth2";

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL:
        "https://secure.splitwise.com/oauth/authorize",
      tokenURL:
        "https://secure.splitwise.com/oauth/token",
      clientID: process.env.SPLITWISE_CONSUMER_KEY,
      clientSecret: process.env.SPLITWISE_CONSUMER_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, params, done) => {
      return done(null, { accessToken });
    }
  )
);

