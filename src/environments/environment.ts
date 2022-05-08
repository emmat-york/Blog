import { Environment } from "./environment-model";

export const firebaseConfig = {
  apiKey: "AIzaSyAUYlZgYXsESU5DBXDTq15ppchV7X5kIY4",
  authDomain: "autoreview-c2b09.firebaseapp.com",
  projectId: "autoreview-c2b09",
  storageBucket: "autoreview-c2b09.appspot.com",
  messagingSenderId: "429922282552",
  appId: "1:429922282552:web:18bb4e7ecff1ff9b364acd",
  measurementId: "G-BMRD96MEBT"
};

export const environment: Environment = {
  production: false,
  apiKey: firebaseConfig.apiKey,
};
