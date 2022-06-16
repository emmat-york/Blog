import { Environment } from "../app/models/environment.model";

export const firebaseConfig = {
  apiKey: "AIzaSyAWs4st5XYJWKsdT4_K_Bgq-SUEJdtkPaI",
  authDomain: "clarkson-s-reviews.firebaseapp.com",
  projectId: "clarkson-s-reviews",
  storageBucket: "clarkson-s-reviews.appspot.com",
  messagingSenderId: "169085516353",
  appId: "1:169085516353:web:fbb8784cecd12fc49de4c0",
  measurementId: "G-2KM62ZWPN4"
};

export const environment: Environment = {
  production: false,
  apiKey: firebaseConfig.apiKey, // Using for the auth data
  baseStorageUrl: "https://clarkson-s-reviews-default-rtdb.firebaseio.com", // Using for get access to data base
};
