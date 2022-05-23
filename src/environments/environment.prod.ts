import { firebaseConfig } from "./environment";

export const environment = {
  production: true,
  apiKey: firebaseConfig.apiKey,
  fbDbUrl: "https://autoreview-c2b09-default-rtdb.firebaseio.com",
};
