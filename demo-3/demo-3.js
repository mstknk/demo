/* global hipay */
var hipay = HiPay({
  username: "94659327.stage-secure-gateway.hipay-tpp.com",
  password: "Test_rVb7sxPkhiEdVd1Aqf1xfdXH",
  environment: "stage",
  lang: "en"
});
// Config hostedfields card object
var configCardHipay3 = {
  selector: "hipay-3-form",
  multi_use: false,
  fields: {
    cardHolder: {
      selector: "hipay-3-card-holder",
      defaultLastname: "DOE",
      defaultFirstname: "John",
      helpButton: true
    },
    cardNumber: {
      selector: "hipay-3-card-number",
      helpButton: true,
      hideCardTypeLogo: false
    },
    expiryDate: {
      selector: "hipay-3-date-expiry",
      helpButton: true
    },
    cvc: {
      selector: "hipay-3-cvc",
      helpButton: true,
      helpSelector: "hipay-3-help-cvc"
    }
  },
  styles: {
    base: {
      fontFamily: "Roboto",
      color: "#000000",
      fontSize: "15px",
      fontWeight: 400,
      caretColor: "#00ADE9",
      iconColor: "#00ADE9"
    },
    invalid: {
      color: "#D50000",
      caretColor: "#D50000"
    }
  }
};

// Init the hostedfields card
var cardHipay3 = hipay.create("card", configCardHipay3);

// Listen to change event to handle errors in live
cardHipay3.on("change", function(data) {
  handleErrorHipay3(data.valid, data.error);
});

// Function to call when card change
// It display/hide the error message
function handleErrorHipay3(valid, error) {
  document.getElementById("hipay-3-error-message").innerHTML = error
    ? '<i class="material-icons">cancel</i>' + error
    : error;
  document.getElementById("hipay-3-submit-button").disabled = !valid;
}

// Tokenize your card when the submit button is clicked
var formHipay3 = document.getElementById("hipay-3-form");

formHipay3.addEventListener("submit", function(event) {
  event.preventDefault();
  cardHipay3.getPaymentData().then(
    function(response) {
      document.getElementById("hipay-3-result").classList.add("visible");
      document.getElementById(
        "hipay-3-result-token"
      ).innerHTML = JSON.stringify(response, null, 2);
      // Pay with API order
    },
    function(error) {
      document.getElementById("hipay-3-result").classList.remove("visible");
      document.getElementById("hipay-3-result-token").innerHTML = "";

      handleErrorHipay3(false, error);
    }
  );
});
// Test HelpButton
cardHipay3.on("helpButtonToggled", function(data) {
  // test carholder help
  if (
    document
      .getElementById("hipay-3-cardholder-help")
      .classList.contains("visible") &&
    data.element == "cardHolder"
  ) {
    document
      .getElementById("hipay-3-cardholder-help")
      .classList.remove("visible");
  } else if (data.element == "cardHolder") {
    document.getElementById("hipay-3-cardholder-help").classList.add("visible");
  }
  // test cardnumber help
  if (
    document
      .getElementById("hipay-3-cardnumber-help")
      .classList.contains("visible") &&
    data.element == "cardNumber"
  ) {
    document
      .getElementById("hipay-3-cardnumber-help")
      .classList.remove("visible");
  } else if (data.element == "cardNumber") {
    document.getElementById("hipay-3-cardnumber-help").classList.add("visible");
  }
});
