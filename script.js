document.addEventListener("DOMContentLoaded", function () {
  console.log("CreditWise is ready to help you manage your credit!");

  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default Enter key behavior (form submission)
        calculateUtilization(); // Trigger your existing calculation function
      }
    });
  });
});

function calculateUtilization() {
  var creditLimit = parseFloat(document.getElementById("creditLimit").value);
  var currentBalance = parseFloat(
    document.getElementById("currentBalance").value
  );

  if (isNaN(creditLimit) || isNaN(currentBalance) || creditLimit <= 0) {
    alert(
      "Please enter valid and positive values for credit limit and current balance."
    );
    return; // Stop the function if there's invalid input
  }

  var idealLimit = creditLimit * 0.3; // Calculate 30% of the credit limit
  var utilization = (currentBalance / creditLimit) * 100; // Calculate utilization percentage

  // Display the results in the HTML
  document.getElementById(
    "newLimit"
  ).innerText = `Your Ideal Credit Limit Should Be: \$${idealLimit.toFixed(
    2
  )} (30% of your total credit limit).`;
  document.getElementById("utilizationResult").innerText =
    "Your current credit utilization is: " + utilization.toFixed(2) + "%";

  // Provide suggestions based on the 30% ideal limit and calculate over-limit amount and percentage
  if (currentBalance > idealLimit) {
    var overLimitAmount = currentBalance - idealLimit;
    var overLimitPercentage = ((overLimitAmount / creditLimit) * 100).toFixed(
      2
    );

    document.getElementById("suggestion").innerText =
      "Your balance is above the ideal 30% by $" +
      overLimitAmount.toFixed(2) +
      " (" +
      overLimitPercentage +
      "% of your credit limit). Consider paying down to $" +
      idealLimit.toFixed(2) +
      " or less to improve your credit score.";
  } else {
    document.getElementById("suggestion").innerText =
      "Great job! Your balance is within the ideal 30% limit.";
  }
}
