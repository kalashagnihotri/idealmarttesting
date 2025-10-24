// Dummy data for Diwali Contest APIs
// This data will be used as fallback when APIs are not available

// export const dummyContestParticipation = {
//   is_participant: false,
//   contest_id: "693bf5cd-e6f2-4658-8823-2323a21d8067"
// };

// export const dummyContestParticipationSuccess = {
//   message: "Contest participation recorded successfully",
//   status: "success"
// };

// export const dummyContestDetails = {
// "data": {
//     "id": "f49832f4-b948-4aba-b0e6-2ed4a288ddf3",
//     "user": {
//       "email": "aakashchamolababa@gmail.com",
//       "name": "aakash chamola billu barber",
//       "pcode": "l6p4n3",
//       "phone": "1946-695-4653",
//       "usertype": "customer",
//       "imageurl": "https://idealmart.s3.ca-central-1.amazonaws.com/development/products/84dec98b-05e0-409b-a0e7-84b23e7e1498_resized_1756061268754.jpg"
//     },
//     "contest": {
//       "id": "693bf5cd-e6f2-4658-8823-2323a21d8067",
//       "name": "Diwali Contest",
//       "url": "http://localhost:5173/contests/diwali",
//       "game_type": "CONTEST",
//       "start_date": "2025-09-30T07:00:15-04:00",
//       "end_date": "2025-10-20T00:00:42-04:00"
//     },
//     "orders": 12,
//     "points": 360,
//     "recentOrders": [
//       { "date": "2025-01-14", "amount": 45.99, "points": 30 },
//       { "date": "2025-01-12", "amount": 67.50, "points": 45 }
//     ],
//     "game": {
//       "id": "693bf5cd-e6f2-4658-8823-2323a21d8067",
//       "name": "Diwali Contest",
//       "url": "http://localhost:5173/contests/diwali",
//       "game_type": "CONTEST",
//       "start_date": "2025-09-30T07:00:15-04:00",
//       "end_date": "2025-10-20T00:00:42-04:00"
//     },
//     "description": "🎆 iDealMart's Grand Diwali Dhamaka is ON! 🎆\r\nWe believe every celebration deserves a reward. That's why we're introducing the iDealMart Diwali Dhamaka, where every order is a winning one!\r\n\r\nThe mantra is simple: The more you order, the more you get rewarded! 🎁🛍️\r\n\r\nGet ready to unlock exclusive goodies, festive hampers, and grand prizes. Your journey to guaranteed rewards starts with a single order!\r\n\r\nWhat are you waiting for? Let the festive shopping spree begin! 🥳\r\n\r\n#iDealMart #DiwaliContest #DiwaliDhamaka #ShopAndWin #FestivalOfLights #GuaranteedRewards #DiwaliShopping",
//     "rewardDate": "2025-10-20"
//   },
//   "message": "Contest participation and reward details fetched successfully."
// };

// // Alternative dummy data for existing participant
// export const dummyExistingParticipant = {
//   is_participant: true
// };

// // Dummy data for new user (not participated)
// export const dummyNewUser = {
//   is_participant: false
// };

// // Simulate different user scenarios
// export const dummyScenarios = {
//   NEW_USER: {
//     participation: dummyNewUser,
//     details: null
//   },
//   EXISTING_PARTICIPANT: {
//     participation: dummyExistingParticipant,
//     details: dummyContestDetails
//   },
//   HIGH_SCORER: {
//     participation: dummyExistingParticipant,
//     details: {
//       ...dummyContestDetails,
//       data: {
//         ...dummyContestDetails.data,
//         orders: 25,
//         points: 750,
//         user: {
//           ...dummyContestDetails.data.user,
//           name: "Diwali Champion User"
//         }
//       }
//     }
//   }
// };

// // Function to get random scenario for testing
// export const getRandomScenario = () => {
//   const scenarios = Object.keys(dummyScenarios);
//   const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
//   return {
//     scenarioName: randomScenario,
//     ...dummyScenarios[randomScenario]
//   };
// };