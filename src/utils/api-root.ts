import ky from "ky";

export const apiRoot = ky.create({ prefixUrl: "https://127.0.0.1:8080/api" });
