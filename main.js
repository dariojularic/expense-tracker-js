import './style.css'
import { format } from "date-fns"
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"



const totalBudget = document.querySelector(".total-budget");
const totalExpenses = document.querySelector(".total-expenses");
const totalBalance = document.querySelector(".total-balance");
const inputBudget = document.querySelector(".input-budget");
const inputTransactionPurpose = document.querySelector(".input-transaction-purpose");
const inputTransactionCost = document.querySelector(".input-transaction-cost");
const inputIncome = document.querySelector(".input-income");
const budgetForm = document.querySelector(".edit-budget");
const transactionForm = document.querySelector(".add-transaction");
const incomeForm = document.querySelector(".add-income")
const incomeList = document.querySelector(".income-list");
const transactionList = document.querySelector(".transaction-list");
const averageIncomeParagraph = document.querySelector(".average-income");

// kako ne ponavljat css code?
// date fns
// income povecava budget
// jel render funkcije primaju argument array ili po defaultu koriste this.array??
// ubacit Toast, zavrsit average income, uredit <li>, brisanje transakcija i incoma
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
    this.transactionArray = this.transactionArray.filter(transaction => transaction.id !== transactionId)
  }

  renderTransactions() {
    // jos doradit ovu funkciju
    transactionList.innerHTML = ""
    this.transactionArray.forEach(transaction => {
      const html = `<li class="transaction-list-item" data-id="${transaction.id}"><span>${transaction.purpose}</span> <span>${transaction.cost}$</span> <span>${format(transaction.date, "HH:mm")}</span> <span>${format(transaction.date, "dd/MMMM/yyyy")}</span> <i class="fa-solid fa-circle-xmark delete-btn"></i></li>`;
      transactionList.insertAdjacentHTML("beforeend", html)
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

  // koji manager povecava budget kad dodam income??
  increaseBudget(income) {
    this.budget = parseInt(this.budget) + parseInt(income)
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
    this.incomeArray = this.incomeArray.filter(income => income.id !== incomeId)
  }

  renderIncomes(incomeArray) {
    incomeList.innerHTML = ""
    incomeArray.forEach(income => {
      const html = `<li class="income-list-item" data-id="${income.id}"><span>${income.amount}$</span> <span>${format(income.date, "HH:mm")}</span> <span>${format(income.date, "dd/MM/yyyy")}</span> <i class="fa-solid fa-circle-xmark delete-btn"></i></li>`;
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

function displayAverageIncome() {
  averageIncomeParagraph.textContent = `$${averageIncome(incomeManager.incomeArray)}`
}

function clearBudgetInput() {
  inputBudget.value = ""
}

function clearTransactionInput() {
  inputTransactionCost.value = ""
  inputTransactionPurpose.value = ""
}

function clearIncomeInput() {
  inputIncome.value = ""
}

function toastifyAlert() {
  Toastify({
    text: "Something is wrong...",
    duration: 3000,
    position: "center",
    offset: {
      x: 0,
      y: 300
    }
  }).showToast();
}

function averageIncome(array) {
  let total = 0;
  for(let i = 0; i < array.length; i++) {
    total += parseInt(array[i].amount)
  }
  return Math.floor(total / array.length)
}

const transactionManager = new TransactionManager
const budgetManager = new BudgetManager
const incomeManager = new IncomeManager
displayBudget()
displayBalance()
displayExpenses()

budgetForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const date = new Date()
  if (inputBudget.value !== "") {
    budgetManager.setBudget(inputBudget.value)
    budgetManager.setBalance()
    inputBudget.value = ""
    clearBudgetInput()
    displayBudget()
    displayBalance()
    displayExpenses()
  } else {
   toastifyAlert()
  }
})

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault()
  if (inputTransactionCost.value !== "" && inputTransactionPurpose.value !== "" && parseInt(inputTransactionCost.value) <= budgetManager.budget) {
    const transaction = new Transaction(inputTransactionCost.value, inputTransactionPurpose.value)
    clearTransactionInput()
    transactionManager.addTransaction(transaction)
    budgetManager.calculateExpenses(transactionManager.transactionArray)
    budgetManager.setBalance()
    displayBalance()
    displayExpenses()
    transactionManager.renderTransactions()
  }
  // ovaj dio jos treba doradit
  if (inputTransactionCost.value === "") {
    toastifyAlert()
  }

  if (inputTransactionPurpose.value === "") {
    toastifyAlert()
  }

  if (parseInt(inputTransactionCost.value) > budgetManager.budget) {
    toastifyAlert()
  }
})

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault()
  if (inputIncome.value !== "") {
    const income = new Income(inputIncome.value)
    incomeManager.addIncome(income)
    budgetManager.increaseBudget(inputIncome.value)
    displayBudget()
    clearIncomeInput()
    incomeManager.renderIncomes(incomeManager.incomeArray)
    displayAverageIncome()
  } else {
    Toastify({
      text: "Type in Income",
      duration: 3000,
      position: "center",
      offset: {
        x: 0,
        y: 300
      }
    }).showToast();
  }
})

transactionList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const itemId = event.target.closest(".transaction-list-item").getAttribute("data-id");
    transactionManager.removeTransaction(itemId)
    transactionManager.renderTransactions(transactionManager.transactionArray)
  }
})

incomeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const incomeId = event.target.closest(".income-list-item").getAttribute("data-id");
    incomeManager.removeIncome(incomeId)
    incomeManager.renderIncomes(incomeManager.incomeArray)
  }
})

// doradit funkcije