import './style.css'
import { format } from "date-fns"
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

// izbacit budget, display funkcije, reduce umjesto expenses= 0, disable button umjesto toastify, get funkcije umjesto state

const totalExpenses = document.querySelector(".total-expenses");
const totalBalance = document.querySelector(".total-balance");
const inputTransactionPurpose = document.querySelector(".input-transaction-purpose");
const inputTransactionCost = document.querySelector(".input-transaction-cost");
const inputIncome = document.querySelector(".input-income");
const transactionForm = document.querySelector(".add-transaction");
const incomeForm = document.querySelector(".add-income")
const incomeList = document.querySelector(".income-list");
const transactionList = document.querySelector(".transaction-list");
const averageIncomeParagraph = document.querySelector(".average-income");
const addTransactionBtn = document.querySelector(".submit-btn");
const incomeBtn = document.querySelector(".income-btn");
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
    this.expenses = 0
    this.balance = 0
  }

  calculateExpenses(transactionsArray) {
    let newExpenses = 0
    transactionsArray.forEach(transaction => {
      newExpenses += parseInt(transaction.cost)
    })
    this.expenses = newExpenses;
  }
  
  setBalance(transaction) {
    this.balance = parseInt(this.balance - transaction)
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

  averageIncome() {
    let total = 0;
    for(let i = 0; i < this.incomeArray.length; i++) {
      total += parseInt(this.incomeArray[i].amount)
    }
    return Math.floor(total / this.incomeArray.length)
  }
}

// ovo umjesto display funkcija
function updateTextContent(element, value) {
  element.textContent = "$" + value
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
    text: "You don't have enough money",
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
updateTextContent(totalBalance, budgetManager.balance)
updateTextContent(totalExpenses, budgetManager.expenses)

transactionForm.addEventListener("input", (event) => {
  if (inputTransactionCost.value > 0 && inputTransactionPurpose.value ) addTransactionBtn.disabled = false
  else addTransactionBtn.disabled = true
})

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault() 
  if (parseInt(inputTransactionCost.value) > budgetManager.balance) return toastifyAlert()
  const transaction = new Transaction(inputTransactionCost.value, inputTransactionPurpose.value)
  transactionManager.addTransaction(transaction)
  budgetManager.calculateExpenses(transactionManager.transactionArray)
  budgetManager.setBalance(inputTransactionCost.value)
  updateTextContent(totalBalance, budgetManager.balance)
  updateTextContent(totalExpenses, budgetManager.expenses)
  transactionManager.renderTransactions()
  clearTransactionInput()
  addTransactionBtn.disabled = true
})

incomeForm.addEventListener("input", (event) => {
  let incomeInput = event.target.value
  if (incomeInput  && inputIncome.value > 0) incomeBtn.disabled = false
  else incomeBtn.disabled = true
})

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const income = new Income(inputIncome.value)
  incomeManager.addIncome(income)
  budgetManager.increaseBalance(income.amount)
  updateTextContent(totalBalance, budgetManager.balance)
  clearIncomeInput()
  incomeManager.renderIncomes(incomeManager.incomeArray)
  updateTextContent(averageIncomeParagraph, incomeManager.averageIncome())
  incomeBtn.disabled = true
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