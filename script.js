const billNode = document.getElementById("billAmount");
const peopleNode = document.getElementById("numberOfPeople");
const tipPerPersonNode = document.getElementById("tipPerPerson");
const totalPerPersonNode = document.getElementById("totalPerPerson");
const errorMessage = document.getElementById("errorMessage");

let tipPercent = 0;

const customTip = document.getElementById('customTip');

function calculateTip() {
    let billAmount = parseFloat(billNode.value);
    let person = parseInt(peopleNode.value);

    // Hide error message by default
    errorMessage.style.display = 'none';
    peopleNode.classList.remove('error');

    // Only calculate if we have valid inputs
    if (billAmount > 0 && person > 0 && tipPercent > 0) {
        let tip = billAmount * tipPercent / 100;
        let totalBill = billAmount + tip;

        let billPerPerson = (totalBill / person).toFixed(2);
        let tipPerPerson = (tip / person).toFixed(2);

        totalPerPersonNode.innerHTML = "$" + billPerPerson;
        tipPerPersonNode.innerHTML = "$" + tipPerPerson;
    } else {
        // Show error only for people field when it's 0 or empty
        if (person <= 0 && peopleNode.value !== '') {
            errorMessage.style.display = 'block';
            peopleNode.classList.add('error');
        }

        // Reset to default if inputs are incomplete
        if (!billAmount || !person || !tipPercent) {
            tipPerPersonNode.innerHTML = "$0.00";
            totalPerPersonNode.innerHTML = "$0.00";
        }
    }
}

customTip.addEventListener("input", () => {
    tipPercent = customTip.value;
    buttons.forEach(btn => btn.classList.remove('selected'));
    calculateTip();
});

const buttons = document.querySelectorAll(".tip-btn");

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        tipPercent = button.getAttribute('data-tip');
        customTip.value = '';
        calculateTip();
    });
});

// Calculate on input changes
billNode.addEventListener('input', calculateTip);
peopleNode.addEventListener('input', calculateTip);

// Reset button actually resets everything
document.getElementById('resetBtn').addEventListener('click', () => {
    billNode.value = '';
    peopleNode.value = '';
    customTip.value = '';
    tipPercent = 0;
    buttons.forEach(btn => btn.classList.remove('selected'));
    tipPerPersonNode.innerHTML = "$0.00";
    totalPerPersonNode.innerHTML = "$0.00";
    errorMessage.style.display = 'none';
    peopleNode.classList.remove('error');
});