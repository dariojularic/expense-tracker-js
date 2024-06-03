import './style.css'

const totalBudget = document.querySelector(".total-budget");
const totalExpenses = document.querySelector(".total-expenses");
const totalBalance = document.querySelector(".total-balance");
const inputBudget = document.querySelector(".input-budget");
const inputTransactionPurpose = document.querySelector(".input-transaction-purpose");
const inputTransactionCost = document.querySelector(".input-transaction-cost");
const transactionList = document.querySelector(".transaction-list");
const budgetForm = document.querySelector(".edit-budget");
const transactionForm = document.querySelector(".add-transaction");

class Transaction{
  constructor(cost, purpose) {
    this.cost = cost
    this.purpose = purpose
    this.id = self.crypto.randomUUID()
    // this.day = 
    // this.time = 
    // kako pisat id?
  }
}

class TransactionManager{
  constructor() {
    this.transactionArray = []
  }

  addTransaction(transaction) {
    this.transactionArray.push(transaction)
  }

  removeTransaction(transactionId) {
    this.transactionArray.filter(transaction => transaction.id !== transactionId)
  }

  renderTransactions() {
    // jos doradit ovu funkciju
    transactionList.innerHTML = ""
    this.transactionArray.forEach(transaction => {
      const html = `<li>${transaction.purpose} ${transaction.cost} <button>Remove</button></li>`;
      transactionList.insertAdjacentElement("afterbegin", html)
    })

  }
}

// budget state, balance, expenses array
// expenses novi class  expenses manager
// budget manager total budget, total expenses, total balance

class BudgetManager{
  constructor() {
    this.budget = 0
    this.expenses = 0
    // sta dodijelit na totalBalance
    this.balance = 0
  }

  setBudget(budget) {
    this.budget = budget
  }

  // pregledat ovu funkciju
  calculateExpenses(transactionsArray) {
    this.expenses = 0
    transactionsArray.forEach(transaction => {
      this.expenses += transaction.cost
    })
  }

  setBalance() {
    this.balance = this.budget - this.expenses
  }
}

function displayBudget() {
  totalBudget.textContent = `$${budgetManager.budget}`
}

function displayExpenses() {
  totalExpenses.textContent = `$${budgetManager.expenses}`
}

function displayBalance() {
  totalBalance.textContent = `$${budgetManager.balance}`
}

function clearBudgetInput() {
  inputBudget.value = ""
}

function clearTransactionInput() {
  inputTransactionCost.value = ""
  inputTransactionPurpose.value = ""
}

const transactionManager = new TransactionManager
const budgetManager = new BudgetManager
displayBudget()
displayBalance()
displayExpenses()


// inputBudget.addEventListener("input", (event) => {  
//   budgetManager.setBudget(event.target.value)
// })

budgetForm.addEventListener("submit", (event) => {
  event.preventDefault()
  budgetManager.setBudget(inputBudget.value)
  inputBudget.value = ""
  clearBudgetInput()
  displayBudget()
  displayBalance()
  displayExpenses()
})

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const transaction = new Transaction(inputTransactionCost.value, inputTransactionPurpose.value)

  clearTransactionInput()
  transactionManager.addTransaction(transaction)
  // transactionManager.renderTransactions()
  displayBalance()
  displayExpenses()

})
// console.log(budgetManager) 