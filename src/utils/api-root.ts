import { router } from "@/utils/router";
import ky, { AfterResponseHook, BeforeRequestHook } from "ky";

const afterResponse: AfterResponseHook = (request, options, response) => {
  if (response.status === 401) router.push("/login");
};
const beforeRequest: BeforeRequestHook = (request) => {
  const token = localStorage.getItem("token");
  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Basic")) request.headers.append("Authorization", `Bearer ${token}`);
};
export const apiRoot = ky.create({
  prefixUrl: "https://localhost:8080/api",
  hooks: { afterResponse: [afterResponse], beforeRequest: [beforeRequest] },
});
