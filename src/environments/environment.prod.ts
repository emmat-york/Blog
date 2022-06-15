import { firebaseConfig } from "./environment";

export const environment = {
  production: true,
  apiKey: firebaseConfig.apiKey,
  fbDbUrl: "https://clarkson-s-reviews-default-rtdb.firebaseio.com",
};
