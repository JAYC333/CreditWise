document.addEventListener("DOMContentLoaded", function () {
  console.log("CreditWise is ready to help you manage your credit!");

  document
    .querySelectorAll('input[type="text"], input[type="date"]')
    .forEach((input) => {
      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent default form submission on Enter key
          calculateUtilization(); // Trigger utilization calculation
        }
      });
    });

  document
    .getElementById("dueDate")
    .setAttribute("min", new Date().toISOString().split("T")[0]);
});

function calculateUtilization() {
  var creditLimitInput = document
    .getElementById("creditLimit")
    .value.replace(/,/g, "");
  var currentBalanceInput = document
    .getElementById("currentBalance")
    .value.replace(/,/g, "");
  var dueDate = document.getElementById("dueDate").value;
  var minimumPaymentInput = document
    .getElementById("minimumPayment")
    .value.replace(/,/g, "");

  var creditLimit = parseFloat(creditLimitInput);
  var currentBalance = parseFloat(currentBalanceInput);
  var minimumPayment = parseFloat(minimumPaymentInput);

  if (
    !creditLimitInput ||
    !currentBalanceInput ||
    !dueDate ||
    !minimumPaymentInput
  ) {
    alert("Please fill in all fields before calculating.");
    return;
  }

  if (
    isNaN(creditLimit) ||
    isNaN(currentBalance) ||
    isNaN(minimumPayment) ||
    creditLimit <= 0
  ) {
    alert("Please enter valid and positive numbers for all numeric fields.");
    return;
  }

  displayCalculations(creditLimit, currentBalance, minimumPayment, dueDate);
}

function displayCalculations(
  creditLimit,
  currentBalance,
  minimumPayment,
  dueDate
) {
  const today = new Date();
  const dueDateObject = new Date(dueDate + "T23:59:59");
  const daysToDueDate = Math.floor(
    (dueDateObject - today) / (1000 * 60 * 60 * 24)
  );

  var idealLimit = creditLimit * 0.3;
  var utilization = (currentBalance / creditLimit) * 100;
  var excessAmount = currentBalance - idealLimit;

  document.getElementById(
    "newLimit"
  ).innerText = `Your Ideal Credit Limit Should Be: $${idealLimit.toFixed(2)}`;
  document.getElementById(
    "utilizationResult"
  ).innerText = `Your current credit utilization is: ${utilization.toFixed(
    2
  )}%`;

  if (currentBalance >= 0) {
    var suggestionText =
      currentBalance > idealLimit
        ? `Your balance is above the ideal 30% by $${excessAmount.toFixed(
            2
          )}. Consider paying down to improve your credit score. Additionally, making an extra payment of $${(
            excessAmount / 2
          ).toFixed(2)} could further help lower your credit utilization.`
        : "Great job! Your balance is within the ideal limit.";
    document.getElementById("suggestion").innerText = suggestionText;
    calculatePaymentDates(minimumPayment, dueDate, daysToDueDate);
  } else {
    document.getElementById(
      "suggestion"
    ).innerText = `You have a credit balance. No payment necessary.`;
  }
}

function calculatePaymentDates(minimumPayment, dueDate, daysToDueDate) {
  if (daysToDueDate > 0) {
    const today = new Date();
    if (daysToDueDate > 10) {
      const firstPaymentDate = new Date(
        today.getTime() + (daysToDueDate / 3) * 24 * 60 * 60 * 1000
      );
      const secondPaymentDate = new Date(
        today.getTime() + ((2 * daysToDueDate) / 3) * 24 * 60 * 60 * 1000
      );
      const firstPaymentAmount = minimumPayment / 2;
      const secondPaymentAmount = minimumPayment - firstPaymentAmount;

      document.getElementById(
        "paymentSuggestion"
      ).innerText = `Split your total minimum payment of $${minimumPayment.toFixed(
        2
      )} into two parts: Pay $${firstPaymentAmount.toFixed(2)} by ${formatDate(
        firstPaymentDate
      )} and the remainder $${secondPaymentAmount.toFixed(2)} by ${formatDate(
        secondPaymentDate
      )} to optimize your credit score impact.`;
    } else {
      document.getElementById(
        "paymentSuggestion"
      ).innerText = `Pay the full minimum payment of $${minimumPayment.toFixed(
        2
      )} by ${formatDate(
        new Date(dueDate)
      )} to optimize your credit score impact.`;
    }
  } else {
    document.getElementById("paymentSuggestion").innerText =
      "Your payment due date has passed. Please update your due date to plan future payments.";
  }
}

function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
