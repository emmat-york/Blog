import { firebaseConfig } from "./environment";

export const environment = {
  production: true,
  apiKey: firebaseConfig.apiKey,
  baseStorageUrl: "https://clarkson-s-reviews-default-rtdb.firebaseio.com",
};
