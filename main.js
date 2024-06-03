import './style.css'

const totalBudget = document.querySelector(".total-budget");
const totalExpenses = document.querySelector(".total-expenses");
const totalBalance = document.querySelector(".total-balance");
const inputBudget = document.querySelector(".input-budget");
const inputTransactionPurpose = document.querySelector(".input-transaction-purpose");
const inputTransactionCost = document.querySelector(".input-transaction-cost");
const transactionList = document.querySelector(".transaction-list");

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
  constructor(totalBudget) {
    this.totalBudget = totalBudget
    this.totalExpenses = 0
    // sta dodijelit na totalBalance
    this.totalBalance = totalBudget
  }

  // pregledat ovu funkciju
  calculateExpenses(transactionsArray) {
    this.totalExpenses = 0
    transactionsArray.forEach(transaction => {
      this.totalExpenses += transaction.cost
    })
  }

  setBalance() {
    this.totalBalance = this.totalBudget - this.totalExpenses
  }
}
