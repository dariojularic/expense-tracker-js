import './style.css'
import { format } from "date-fns"

const totalBudget = document.querySelector(".total-budget");
const totalExpenses = document.querySelector(".total-expenses");
const totalBalance = document.querySelector(".total-balance");
const inputBudget = document.querySelector(".input-budget");
const inputTransactionPurpose = document.querySelector(".input-transaction-purpose");
const inputTransactionCost = document.querySelector(".input-transaction-cost");
const transactionList = document.querySelector(".transaction-list");
const budgetForm = document.querySelector(".edit-budget");
const transactionForm = document.querySelector(".add-transaction");
const incomeList = document.querySelector(".income-list");

// kako ne ponavljat css code?
// date fns
// income povecava budget

class Transaction {
  constructor(cost, purpose) {
    this.cost = cost
    this.purpose = purpose
    this.id = self.crypto.randomUUID()
    this.date = new Date()
    // kako pisat id?
  }
}

class TransactionManager {
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
      const html = `<li>${transaction.purpose} ${transaction.cost} ${format(transaction.date, "dd/MMMM/yyyy")} <button>Remove</button></li>`;
      transactionList.insertAdjacentHTML("afterbegin", html)
    })

  }
}

// budget state, balance, expenses array
// expenses novi class  expenses manager
// budget manager total budget, total expenses, total balance

class BudgetManager {
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
    // pretvorit u broj
    transactionsArray.forEach(transaction => {
      this.expenses += parseInt(transaction.cost)
    })
  }
  
  setBalance() {
    this.balance = parseInt(this.budget - this.expenses)
  }
}

class Income{
  constructor(amount) {
    this.amount = amount
    this.id = self.crypto.randomUUID()
    this.date = new Date()
  }
}

class IncomeManager {
  constructor() {
    this.incomeArray = []
  }

  addIncome(income) {
    this.incomeArray.push(income)
  }

  removeIncome(incomeId) {
    this.incomeArray.filter(income => income.id !== incomeId)
  }

  renderIncomes(incomeArray) {
    incomeArray.forEach(income => {
      const html = `<li>${income.amount} ${format(income.date, "dd/MM/yyyy")}  ${income.date.getDate()} ${income.date.toLocaleString("default", { month: "short" })} ${income.date.getFullYear()}<button>Remove</button></li>`;
      incomeList.insertAdjacentHTML("afterbegin", html)
    })
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

budgetForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const date = new Date()
  console.log(date.getDate())
  console.log(date.getMonth() + 1)
  console.log(date.toLocaleString("default", { month: "short" }))
  console.log(date.getFullYear())
  if (inputBudget.value !== "") {
    budgetManager.setBudget(inputBudget.value)
    budgetManager.setBalance()
    inputBudget.value = ""
    clearBudgetInput()
    displayBudget()
    displayBalance()
    displayExpenses()
  }
})

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault()
  console.log(format(new Date, "dd/MM/yyyy"))
  console.log(format(new Date, "HH:mm"))
  if (inputTransactionCost.value !== "" && inputTransactionPurpose.value !== "") {
    const transaction = new Transaction(inputTransactionCost.value, inputTransactionPurpose.value)
  
    clearTransactionInput()
    transactionManager.addTransaction(transaction)
    budgetManager.calculateExpenses(transactionManager.transactionArray)
    budgetManager.setBalance()
    displayBalance()
    displayExpenses()
    transactionManager.renderTransactions()
  }
})
