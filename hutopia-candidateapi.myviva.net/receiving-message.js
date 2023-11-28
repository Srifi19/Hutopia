// const { initializeApp } = require("firebase/app");
// const { getMessaging, getToken } = require("firebase/messaging");

// // Initialize the Firebase app by passing in your app's Firebase config object.
// const firebaseConfig = {
//   apiKey: "AIzaSyCbtue6jKXvVTuP0MUAjWCTWfpVe9wVo_k",
//   authDomain: "hutopia-entreprise.firebaseapp.com",
//   projectId: "hutopia-entreprise",
//   storageBucket: "hutopia-entreprise.appspot.com",
//   messagingSenderId: "816679936834",
//   appId: "1:816679936834:web:f37f046fb3b5d792e15edb",
//   measurementId: "G-EVFTBFR44D",
// };

// exports.initializeFirebase = async () => {
//   const firebaseApp = initializeApp(firebaseConfig);

//   const messaging = getMessaging(firebaseApp);

//   try {
//     const currentToken = await getToken(messaging, {
//       vapidKey:
//         "BPpvCpJN8xlvWWMc3K0PVo2jEf9_gWB5rfSlBJFT3QL-PoavgvKWg2tsn93b8IlR-SLba9rZcoucfMGrFauFtPg",
//     });

//     if (currentToken) {
//       console.log("Current token:", currentToken);
//     } else {
//       console.log("Unable to get token");
//     }

//     return firebaseApp; // Return the Firebase app instance after token retrieval
//   } catch (error) {
//     console.error("Error getting token:", error);
//     throw error;
//   }
// };
