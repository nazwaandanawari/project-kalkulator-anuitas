function showPage(page) {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('calculator').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById(page).classList.remove('hidden');
}

function formatCurrency(amount) {
    return 'Rp ' + amount
        .toFixed(2)
        .replace('.', ',')
        .replace(/\d(?=(\d{3})+(?!\d))/g, '$&.');
}

function calculateAnuitas() {
    const loan = parseFloat(document.getElementById('loan').value);
    const interestRate = parseFloat(document.getElementById('interest').value);
    const totalMonths = parseInt(document.getElementById('period').value);

    let anuitas;
    const tbody = document.querySelector("#resultTable tbody");
    tbody.innerHTML = '';

    let balance = loan;
    let monthlyInterestRate = interestRate;
    anuitas = (loan * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));

    for (let i = 1; i <= totalMonths; i++) {
        let interestPayment = balance * interestRate;
        let principalPayment = anuitas - interestPayment;
        balance -= principalPayment;

        let row = `<tr>
                    <td>${i}</td>
                    <td>${formatCurrency(principalPayment)}</td>
                    <td>${formatCurrency(interestPayment)}</td>
                    <td>${formatCurrency(anuitas)}</td>
                    <td>${formatCurrency(balance)}</td>
                </tr>`;
        tbody.innerHTML += row;
    }

    showPage('result');
}