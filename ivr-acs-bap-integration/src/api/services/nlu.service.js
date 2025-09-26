// const logger = require("../../utils/logger");

// const getIntent = (query) => {
//   const lowerCaseQuery = query.toLowerCase();
//   logger.info(`Performing intent recognition for query: "${lowerCaseQuery}"`);

//   // --- Expanded Intents for all 10 services ---

//   // 1. Check Balance
//   if (lowerCaseQuery.includes("balance")) {
//     return "CheckBalance";
//   }
//   // 2. Talk to Agent
//   if (
//     lowerCaseQuery.includes("agent") ||
//     lowerCaseQuery.includes("human") ||
//     lowerCaseQuery.includes("representative")
//   ) {
//     return "TalkToAgent";
//   }
//   // 3. Get Mini Statement
//   if (
//     lowerCaseQuery.includes("statement") ||
//     lowerCaseQuery.includes("transactions")
//   ) {
//     return "GetMiniStatement";
//   }
//   // 4. Report Lost Card
//   if (
//     lowerCaseQuery.includes("lost my card") ||
//     lowerCaseQuery.includes("stolen card")
//   ) {
//     return "ReportLostCard";
//   }
//   // 5. Activate New Card
//   if (lowerCaseQuery.includes("activate") && lowerCaseQuery.includes("card")) {
//     return "ActivateNewCard";
//   }
//   // 6. Pay Utility Bill
//   if (
//     lowerCaseQuery.includes("pay") &&
//     (lowerCaseQuery.includes("bill") || lowerCaseQuery.includes("utility"))
//   ) {
//     return "PayUtilityBill";
//   }
//   // 7. Update Contact Details
//   if (
//     lowerCaseQuery.includes("update") &&
//     (lowerCaseQuery.includes("contact") ||
//       lowerCaseQuery.includes("address") ||
//       lowerCaseQuery.includes("number"))
//   ) {
//     return "UpdateContactDetails";
//   }
//   // 8. Get Loan Details
//   if (lowerCaseQuery.includes("loan") || lowerCaseQuery.includes("emi")) {
//     return "GetLoanDetails";
//   }
//   // 9. Report Suspicious Transaction
//   if (
//     lowerCaseQuery.includes("suspicious") ||
//     lowerCaseQuery.includes("fraud") ||
//     lowerCaseQuery.includes("unauthorized")
//   ) {
//     return "ReportSuspiciousTransaction";
//   }
//   // 10. Request E-Statement
//   if (
//     lowerCaseQuery.includes("email") &&
//     lowerCaseQuery.includes("statement")
//   ) {
//     return "RequestEStatement";
//   }

//   return "Unknown"; // Default fallback intent
// };

// module.exports = {
//   getIntent,
// };

const logger = require("../../utils/logger");

const getIntent = (query) => {
  const lowerCaseQuery = query.toLowerCase();
  logger.info(`Performing intent recognition for query: "${lowerCaseQuery}"`);

  // --- Reordered and more flexible intents ---

  if (lowerCaseQuery.includes("balance")) {
    return "CheckBalance";
  }
  if (
    lowerCaseQuery.includes("agent") ||
    lowerCaseQuery.includes("human") ||
    lowerCaseQuery.includes("representative")
  ) {
    return "TalkToAgent";
  }

  // --- MOVED THIS RULE UP ---
  // This specific rule is now checked BEFORE the general "statement" rule.
  if (
    (lowerCaseQuery.includes("email") ||
      lowerCaseQuery.includes("e-statement")) &&
    lowerCaseQuery.includes("statement")
  ) {
    return "RequestEStatement";
  }

  // This rule will now only be checked if the one above is false.
  if (
    lowerCaseQuery.includes("statement") ||
    lowerCaseQuery.includes("transactions")
  ) {
    return "GetMiniStatement";
  }

  if (
    lowerCaseQuery.includes("lost my card") ||
    lowerCaseQuery.includes("stolen card")
  ) {
    return "ReportLostCard";
  }
  if (lowerCaseQuery.includes("activate") && lowerCaseQuery.includes("card")) {
    return "ActivateNewCard";
  }
  if (
    lowerCaseQuery.includes("pay") ||
    lowerCaseQuery.includes("bill") ||
    lowerCaseQuery.includes("utility") ||
    lowerCaseQuery.includes("recharge")
  ) {
    return "PayUtilityBill";
  }

  if (
    lowerCaseQuery.includes("update") ||
    lowerCaseQuery.includes("contact") ||
    lowerCaseQuery.includes("address") ||
    lowerCaseQuery.includes("number")
  ) {
    return "UpdateContactDetails";
  }
  if (lowerCaseQuery.includes("loan") || lowerCaseQuery.includes("emi")) {
    return "GetLoanDetails";
  }
  if (
    lowerCaseQuery.includes("suspicious") ||
    lowerCaseQuery.includes("fraud") ||
    lowerCaseQuery.includes("unauthorized")
  ) {
    return "ReportSuspiciousTransaction";
  }

  return "Unknown"; // Default fallback intent
};

module.exports = {
  getIntent,
};
