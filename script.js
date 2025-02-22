document.addEventListener("DOMContentLoaded", function () {
  console.log("CreditWise is ready to help you manage your credit!");

  document
    .querySelectorAll('input[type="number"], input[type="date"]')
    .forEach((input) => {
      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent default form submission on Enter key
          calculateUtilization(); // Trigger utilization calculation
        }
      });
    });

  // Set the minimum allowable date to today for the payment due date input
  document
    .getElementById("dueDate")
    .setAttribute("min", new Date().toISOString().split("T")[0]);
});

function calculateUtilization() {
  var creditLimit = parseFloat(document.getElementById("creditLimit").value);
  var currentBalance = parseFloat(
    document.getElementById("currentBalance").value
  );
  var dueDate = document.getElementById("dueDate").value;
  var minimumPayment = parseFloat(
    document.getElementById("minimumPayment").value
  );

  if (
    isNaN(creditLimit) ||
    isNaN(currentBalance) ||
    creditLimit <= 0 ||
    isNaN(minimumPayment)
  ) {
    alert("Please enter valid and positive values for all fields.");
    return; // Stop execution if any input is invalid
  }

  var idealLimit = creditLimit * 0.3; // 30% of credit limit as the ideal limit
  var utilization = (currentBalance / creditLimit) * 100; // Current utilization percentage

  document.getElementById(
    "newLimit"
  ).innerText = `Your Ideal Credit Limit Should Be: $${idealLimit.toFixed(2)}`;
  document.getElementById(
    "utilizationResult"
  ).innerText = `Your current credit utilization is: ${utilization.toFixed(
    2
  )}%`;

  document.getElementById("suggestion").innerText =
    currentBalance > idealLimit
      ? `Your balance is above the ideal 30% by $${(
          currentBalance - idealLimit
        ).toFixed(2)}. Consider paying down to improve your credit score.`
      : "Great job! Your balance is within the ideal limit.";

  calculatePaymentDates(dueDate, minimumPayment);
}

function calculatePaymentDates(dueDate, minimumPayment) {
  const today = new Date();
  const paymentDate = new Date(dueDate);
  const outputElement = document.getElementById("paymentSuggestion");

  // Set the minimum allowable date to today for the payment due date input
  document
    .getElementById("dueDate")
    .setAttribute("min", new Date().toISOString().split("T")[0]);

  if (paymentDate.getTime() < today.getTime()) {
    outputElement.innerText = `The due date has already passed. Please select a future date.`;
  } else {
    const daysBeforeDue = 15;
    const firstPaymentDate = new Date(paymentDate.getTime());
    firstPaymentDate.setDate(paymentDate.getDate() - daysBeforeDue);
    const secondPaymentDate = new Date(firstPaymentDate.getTime());
    secondPaymentDate.setDate(firstPaymentDate.getDate() + 10); // Ensures the second payment is after the first

    const firstPaymentAmount = minimumPayment / 2;
    const secondPaymentAmount = minimumPayment - firstPaymentAmount;

    outputElement.innerText = `Split your total minimum payment of $${minimumPayment.toFixed(
      2
    )} into two parts: Pay $${firstPaymentAmount.toFixed(
      2
    )} by ${firstPaymentDate.toLocaleDateString()} and the remainder $${secondPaymentAmount.toFixed(
      2
    )} by ${secondPaymentDate.toLocaleDateString()} to optimize your credit score impact.`;
  }
}
