// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AizsaY8lQpieITz0t4U-M7pG9Nyy-vyyU0DE0ds",
  authDomain: "kolumbianischegemaelde.firebaseapp.com",
  projectId: "kolumbianischegemaelde",
  storageBucket: "kolumbianischegemaelde.appspot.com",
  messagingSenderId: "469106886611",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export default app;
