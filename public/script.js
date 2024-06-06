document.addEventListener('DOMContentLoaded', function() {
    let expenses = [];
    let totalAmount = 0;
    const categorySelect = document.getElementById('category_select');
    const amountInput = document.getElementById('amount_input');
    const infoInput = document.getElementById('info');
    const dateInput = document.getElementById('date_input');
    const addBtn = document.getElementById('add_btn');
    const expenseTableBody = document.getElementById('expense-table-body');
    const totalAmountCell = document.getElementById('total-amount');

    addBtn.addEventListener('click', function(event) {
        event.preventDefault();

        const category = categorySelect.value;
        const info = infoInput.value;
        const amount = Number(amountInput.value);
        const date = dateInput.value;

        if (category === '') {
            alert('Please select a category');
            return;
        }
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        if (info === '') {
            alert('Please enter valid info');
            return;
        }
        if (date === '') {
            alert('Please select a date');
            return;
        }

        const expense = { category, amount, info, date };
        expenses.push(expense);

        if (category === 'Income') {
            totalAmount += amount;
        } else if (category === 'Expense') {
            totalAmount -= amount;
        }

        totalAmountCell.textContent = totalAmount;

        const newRow = expenseTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const infoCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            const index = expenses.indexOf(expense);
            if (index > -1) {
                expenses.splice(index, 1);
                if (expense.category === 'Income') {
                    totalAmount -= expense.amount;
                } else if (expense.category === 'Expense') {
                    totalAmount += expense.amount;
                }

                totalAmountCell.textContent = totalAmount;
                expenseTableBody.removeChild(newRow);
            }
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        infoCell.textContent = expense.info;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);

        // Send the data to the server using fetch
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category_select: category,
                amount_input: amount,
                info: info,
                date_input: date
            })
        }).then(response => {
            if (response.ok) {
                console.log('Record Inserted Successfully');
            } else {
                console.error('Error inserting record');
            }
        }).catch(error => console.error('Error:', error));
    });

    // Initial rendering of the table from expenses array (if any)
    expenses.forEach(expense => {
        if (expense.category === 'Income') {
            totalAmount += expense.amount;
        } else if (expense.category === 'Expense') {
            totalAmount -= expense.amount;
        }

        totalAmountCell.textContent = totalAmount;

        const newRow = expenseTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const infoCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            const index = expenses.indexOf(expense);
            if (index > -1) {
                expenses.splice(index, 1);
                if (expense.category === 'Income') {
                    totalAmount -= expense.amount;
                } else if (expense.category === 'Expense') {
                    totalAmount += expense.amount;
                }

                totalAmountCell.textContent = totalAmount;
                expenseTableBody.removeChild(newRow);
            }
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        infoCell.textContent = expense.info;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    });
});
