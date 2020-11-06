import _ from "lodash";
import Oidc from "oidc-client";

if (process.env.NODE_ENV === "development") {
  Oidc.Log.logger = console;
  Oidc.Log.level = Oidc.Log.DEBUG;
}
const route = {
  auth: "auth",
  redirect_uri: "signin-callback",
  silent_redirect_uri: "silent-callback",
  post_logout_redirect_uri: "logged-out",
};

class AuthService {
  userManager: Oidc.UserManager;
  redirectTimeoutId: number | null;

  constructor() {
    const settings: Oidc.UserManagerSettings = {
      authority: `https://login.microsoftonline.com/vuekcal.onmicrosoft.com/v2.0`,
      client_id: "378dc645-ccbf-4df4-995b-8fb2b522fc2a",
      /**
       * Once user logs in on external login screen, the user will be redirected to
       * the below (`redirect_uri`) URL. Additionally - after redirecting - this URL will contain the authentication code
       * in query params.
       *
       * eg. it'll be http://localhost:8080/auth/signin-callback?code="[long string here]"
       *
       * You need to manually tell Oidc.UserManager - "hey, the authentication code is in query params right now - read it now"
       * This is done by calling `openIdConnectUserManager.signInCallback()` if the user enters the `/auth/signin-callback` route
       */
      redirect_uri: `https://localhost:8080/${route.auth}/${route.redirect_uri}`,
      silent_redirect_uri: `https://localhost:8080/${route.auth}/${route.silent_redirect_uri}`,
      post_logout_redirect_uri: `https://localhost:8080/${route.auth}/${route.post_logout_redirect_uri}`,
      response_type: "code",
      scope: "openid",
    };
    this.userManager = new Oidc.UserManager(settings);
    this.redirectTimeoutId = setTimeout(_.noop, 1000);
  }

  startLogin() {
    return this.userManager.signinRedirect();
  }
  afterLogin() {
    if (this.redirectTimeoutId !== null) {
      clearTimeout(this.redirectTimeoutId);
      this.redirectTimeoutId = null;
    }
    return this.userManager.signinRedirectCallback();
  }
  getUser() {
    return this.userManager.getUser();
  }
}

export const authService = new AuthService();
