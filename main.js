import './style.css'
import { format } from "date-fns"
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

// izbacit budget, display funkcije, reduce umjesto expenses= 0, disable button umjesto toastify, get funkcije umjesto state

// const totalBudget = document.querySelector(".total-budget");
const totalExpenses = document.querySelector(".total-expenses");
const totalBalance = document.querySelector(".total-balance");
// const inputBudget = document.querySelector(".input-budget");
const inputTransactionPurpose = document.querySelector(".input-transaction-purpose");
const inputTransactionCost = document.querySelector(".input-transaction-cost");
const inputIncome = document.querySelector(".input-income");
const budgetForm = document.querySelector(".edit-budget");
const transactionForm = document.querySelector(".add-transaction");
const incomeForm = document.querySelector(".add-income")
const incomeList = document.querySelector(".income-list");
const transactionList = document.querySelector(".transaction-list");
const averageIncomeParagraph = document.querySelector(".average-income");
const addTransactionBtn = document.querySelector(".submit-btn");
// addTransactionBtn.disabled = true

class Transaction {
  constructor(cost, purpose) {
    this.cost = cost
    this.purpose = purpose
    this.id = self.crypto.randomUUID()
    this.date = new Date()
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
    transactionList.innerHTML = ""
    this.transactionArray.forEach(transaction => {
      const html = `<li class="transaction-list-item" data-id="${transaction.id}"><span>${transaction.purpose}</span> <span>${transaction.cost}$</span> <span>${format(transaction.date, "HH:mm")}</span> <span>${format(transaction.date, "dd/MMMM/yyyy")}</span> <i class="fa-solid fa-circle-xmark delete-btn"></i></li>`;
      transactionList.insertAdjacentHTML("beforeend", html)
    })

  }
}

class BudgetManager {
  constructor() {
    // this.budget = 0
    this.expenses = 0
    this.balance = 0
  }

  // setBudget(budget) {
  //   this.budget = budget
  // }

  // reduce metoda
  // this.expenses
  calculateExpenses(transactionsArray) {
    // this.expenses = 0
    let newExpenses = 0
    transactionsArray.forEach(transaction => {
      newExpenses += parseInt(transaction.cost)
    })
    this.expenses = newExpenses;
  }
  
  setBalance() {
    this.balance = parseInt(this.balance - this.expenses)
  }

  increaseBalance(income) {
    this.balance += parseInt(income)
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

  renderIncomes() {
    incomeList.innerHTML = ""
    this.incomeArray.forEach(income => {
      const html = `<li class="income-list-item" data-id="${income.id}"><span>${income.amount}$</span> <span>${format(income.date, "HH:mm")}</span> <span>${format(income.date, "dd/MM/yyyy")}</span> <i class="fa-solid fa-circle-xmark delete-btn"></i></li>`;
      incomeList.insertAdjacentHTML("afterbegin", html)
    })
  }
}

// ovo umjesto display funkcija
function updateTextContent(element, value) {
  element.textContent = "$" + value
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
// displayBudget()
updateTextContent(totalBalance, budgetManager.balance)
updateTextContent(totalExpenses, budgetManager.expenses)
// displayBalance()
// displayExpenses()

// budgetForm.addEventListener("submit", (event) => {
//   event.preventDefault()
//   if (inputBudget.value !== "") {
//     budgetManager.setBudget(inputBudget.value)
//     budgetManager.setBalance()
//     inputBudget.value = ""
//     clearBudgetInput()
//     displayBudget()
//     displayBalance()
//     displayExpenses()
//   } else {
//    toastifyAlert()
//   }
// })

transactionForm.addEventListener("input", (event) => {
  event.preventDefault()
  if (inputTransactionCost && inputTransactionPurpose) {
    // addTransactionBtn.removeAttribute("disabled")
  }
})

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault()
  // ovaj dio jos treba doradit
  if (!inputTransactionCost.value) {
    console.log(addTransactionBtn)
    return toastifyAlert()
  }
  
  if (inputTransactionPurpose.value === "") {
    toastifyAlert()
  }
  
  if (parseInt(inputTransactionCost.value) > budgetManager.budget) {
    toastifyAlert()
  }
  
  if (inputTransactionCost.value !== "" && inputTransactionPurpose.value !== "" && parseInt(inputTransactionCost.value) <= budgetManager.balance) {
    console.log(addTransactionBtn)
    const transaction = new Transaction(inputTransactionCost.value, inputTransactionPurpose.value)
    clearTransactionInput()
    transactionManager.addTransaction(transaction)
    budgetManager.calculateExpenses(transactionManager.transactionArray)
    budgetManager.setBalance()
    updateTextContent(totalBalance, budgetManager.balance)
    updateTextContent(totalExpenses, budgetManager.expenses)
    // displayBalance()
    // displayExpenses()
    transactionManager.renderTransactions()
  }
})

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault()
  if (inputIncome.value !== "") {
    const income = new Income(inputIncome.value)
    incomeManager.addIncome(income)
    // budgetManager.increaseBudget(inputIncome.value)
    budgetManager.increaseBalance(income.amount)
    // displayBudget()
    displayBalance()
    clearIncomeInput()
    incomeManager.renderIncomes(incomeManager.incomeArray)
    displayAverageIncome()
  } else {
    toastifyAlert()
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