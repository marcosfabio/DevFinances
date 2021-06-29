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
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const cssClass = transaction.amount > 0 ? 'income' : 'expense';

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
        <td class="description">${transaction.description}</td>

        <td class=${cssClass}>${amount}</td>

        <td class="date">${transaction.date}</td>

        <td>
            <img src="./assets/minus.svg" alt="Remover transação" onclick="Transactions.remove(${index})" />
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

  formatAmount(value) {
    value = Number(value) * 100;
    console.log(value);
    return value;
  },

  formatDate(date) {
    const splittedDate = date.split('-');
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },
};

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();
    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('Por favor preencha todos os campos');
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  saveTransaction(transaction) {
    Transactions.add(transaction);
  },

  clearFields() {
    Form.description.value = '';
    Form.amount.value = '';
    Form.date.value = '';
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      Form.saveTransaction(transaction);
      Form.clearFields();
      Modal.close();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Transactions.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    });

    /*
    
    poderia ser escrito da seguinte maneira:

    Transactions.all.forEach(DOM.addTransaction);

    porque os parâmetros passados no forEach são os mesmos passados na função addTransaction.
    
    */

    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

// Inicialização da Aplicação.

App.init();
