// Exercise 3 - Expense Tracker
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// One expense in the array looks like this:
// { id: 1, desc: "Pizza", amount: 42.5, category: "food" }

// Step 1: add an expense on submit (unique id, no reload, validation messages, clear desc + amount, focus desc)
let expenses = [];
let isSorted = false;

const form = document.getElementById('expense-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const formError = document.getElementById('form-error');
const rowsContainer = document.getElementById('rows');
const noRowsElement = document.getElementById('no-rows');
const totalElement = document.getElementById('total');
const filterSelect = document.getElementById('filter');
const sortBtn = document.getElementById('sort-btn');

function render() {
    rowsContainer.innerHTML = '';

    const selectedCategory = filterSelect ? filterSelect.value : 'all';

    let processedExpenses = expenses;
    if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== '') {
        processedExpenses = expenses.filter(expense => expense.category === selectedCategory);
    }

    if (isSorted) {
        processedExpenses = processedExpenses.toSorted((a, b) => b.amount - a.amount);
    }

    if (processedExpenses.length === 0) {
        noRowsElement.hidden = false;
        totalElement.textContent = '0.00';
        return;
    } else {
        noRowsElement.hidden = true;
    }

    let sum = processedExpenses.reduce((acc, expense) => acc + Number(expense.amount), 0);
    totalElement.textContent = sum.toFixed(2);

    processedExpenses.forEach(expense => {
        const tr = document.createElement('tr');

        if (Number(expense.amount) > 100) {
            tr.classList.add('big');
        }

        const tdDesc = document.createElement('td');
        tdDesc.textContent = expense.desc;
        tr.appendChild(tdDesc);

        const tdCategory = document.createElement('td');
        const spanBadge = document.createElement('span');
        spanBadge.className = 'badge';
        spanBadge.textContent = expense.category;
        tdCategory.appendChild(spanBadge);
        tr.appendChild(tdCategory);

        const tdAmount = document.createElement('td');
        tdAmount.textContent = Number(expense.amount).toFixed(2);
        tr.appendChild(tdAmount);

        const tdAction = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.dataset.id = expense.id;
        tdAction.appendChild(deleteBtn);
        tr.appendChild(tdAction);

        rowsContainer.appendChild(tr);
    });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const desc = descInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput ? categoryInput.value : 'food';

    if (desc === '') {
        formError.textContent = 'Please add a description';
        formError.hidden = false;
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        formError.textContent = 'The amount must be larger than 0';
        formError.hidden = false;
        return;
    }

    formError.hidden = true;

    const newId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1;

    const newExpense = {
        id: newId,
        desc: desc,
        amount: amount,
        category: category
    };

    expenses.push(newExpense);

    descInput.value = '';
    amountInput.value = '';
    descInput.focus();

    render();
});

rowsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        const idToDelete = Number(event.target.dataset.id);
        expenses = expenses.filter(expense => expense.id !== idToDelete);
        render();
    }
});

if (filterSelect) {
    filterSelect.addEventListener('change', function () {
        render();
    });
}

if (sortBtn) {
    sortBtn.addEventListener('click', function () {
        isSorted = !isSorted;

        if (isSorted) {
            sortBtn.textContent = 'Sort by amount: on';
        } else {
            sortBtn.textContent = 'Sort by amount: off';
        }

        render();
    });
}

render();
// Step 2: render() - rebuild the table rows from the array

// Step 3: delete (one listener on #rows - event delegation, by data-id)

// Step 4: total of the expenses that are shown

// Step 5: filter by category

// Step 6: sort by amount (toSorted - the original array keeps its order)

// Step 7: rows with an amount above 100 get the class "big"
