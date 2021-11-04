const form = document.getElementById('form');
const input = document.getElementById('input');
const lista = document.getElementById('lista');

// Buscando do localstorage e adicionando em uma variável
const listaTarefas = JSON.parse(localStorage.getItem('listaTarefas'));

// Verifica se existe valor na variável listaTarefas e adiciona item na lista
// com a função adicionarItem
if (listaTarefas) {
  listaTarefas.forEach(function (item) {
    adicionaItem(item);
  });
}

// Salva item na lista quando envia o formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();
  adicionaItem();
});

function adicionaItem(item) {
  let itemTexto = input.value;

  if (item) {
    itemTexto = item.text;
  }

  if (itemTexto) {
    // Cria uma tag li (item da lista)
    const itemLi = document.createElement('li');

    // Adiciona a classe completed se existir
    if (item && item.completed) {
      itemLi.classList.add('completed');
    }

    // Adiciona o texto do input na tag li (item da lista) criado
    itemLi.innerText = itemTexto;

    // Click com o botão esquerdo do mouse
    itemLi.addEventListener('click', function () {
      itemLi.classList.toggle('completed');
      atualizaLocalStorage();
    });

    // Click com o botão direito do mouse
    itemLi.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      itemLi.remove();
      atualizaLocalStorage();
    });

    // Adiciona a tag li (item da lista) na lista
    lista.appendChild(itemLi);

    // Limpa o input de texto
    input.value = '';

    atualizaLocalStorage();
  }
}

function atualizaLocalStorage() {
  // Busca todos os LI existentes na página
  const listaItens = document.querySelectorAll('li');

  // Criar um array
  const listaTarefa = [];

  listaItens.forEach(function (itemLista) {
    // Adicionando itens no array no formato de objeto
    listaTarefa.push({
      text: itemLista.innerText,
      completed: itemLista.classList.contains('completed'),
    });
  });

  // Salvando no localstorage
  localStorage.setItem('listaTarefas', JSON.stringify(listaTarefa));
}
