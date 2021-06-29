const Modal = {
  open() {
    // Abrir Modal
    // Adicionar a class active ao modal.
    document.querySelector('.modal-overlay').classList.add('active');
  },
  close() {
    // Fechar Modal
    // Remover a class active ao modal.
    document.querySelector('.modal-overlay').classList.remove('active');
  },
  save() {},
};

const Transactions = {
  all: [
    {
      id: 1,
      description: 'Luz',
      amount: -50000,
      date: '27/06/2021',
    },
    {
      id: 2,
      description: 'Criação web site',
      amount: 500000,
      date: '27/06/2021',
    },
    {
      id: 3,
      description: 'Internet',
      amount: -20000,
      date: '27/06/2021',
    },
    {
      id: 4,
      description: 'Pagamento',
      amount: 10000,
      date: '27/06/2021',
    },
  ],

  add(transaction) {
    Transactions.all.push(transaction);

    App.reload();
  },

  remove(index) {
    Transactions.all.splice(index, 1);
    App.reload();
  },

  incomes() {
    // Somar as entradas
    let income = 0;
    Transactions.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
  },

  expenses() {
    //Somar as saídas
    let expense = 0;
    Transactions.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    let total = 0;

    total = Transactions.incomes() + Transactions.expenses();

    return total;
  },
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const cssClass = transaction.amount > 0 ? 'income' : 'expense';

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
        <td class="description">${transaction.description}</td>

        <td class=${cssClass}>${amount}</td>

        <td class="date">${transaction.date}</td>

        <td>
            <img src="./assets/minus.svg" alt="Remover transação" onClick="Transactions.remove" />
        </td>
      `;

    return html;
  },

  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(
      Transactions.incomes()
    );

    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(
      Transactions.expenses()
    );

    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(
      Transactions.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = '';
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : '';
    value = String(value).replace(/\D/g, ''); //Remove todos os caracteres diferentes de números global /\D/g
    value = Number(value) / 100;
    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return signal + value;
  },
};

const Form = {
  submit(event) {
    event.preventDefault();
  },
};

const App = {
  init() {
    Transactions.all.forEach((transaction) => {
      DOM.addTransaction(transaction);
    });

    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

// Inicialização da Aplicação.

App.init();

/*

Transactions.add({
  id: 5,
  description: 'Pagamento 2',
  amount: 36521,
  date: '27/06/2021',
});

Transactions.remove(4);

*/
