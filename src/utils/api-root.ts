import ky from "ky";

const prefixUrl = process.env.VUE_APP_API_BASE_URL;
export const apiRoot = ky.create({ prefixUrl });
