import ky from "ky";

export const apiRoot = ky.create({ prefixUrl: "/api" });
