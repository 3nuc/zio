import { apiRoot } from "@/utils/api-root";

export const getLogin = (user: string, password: string) => {
  return apiRoot
    .post("oauth/token", {
      searchParams: {
        grant_type: "password",
        password: user,
        username: password,
      },
      headers: {
        Authorization: "Basic Zm9vQ2xpZW50SWQ6cm9vdA==",
      },
    })
    .json<any>();
};
