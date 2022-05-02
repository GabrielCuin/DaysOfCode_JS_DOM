const name = document.getElementById("name");
const birthDate = document.getElementById("birth-date");

const buttonSalvar = document.getElementById("btn--salvar");
const buttonAlterar = document.getElementById("btn--alterar");
const buttonDeletar = document.getElementById("btn--deletar");

const alertText = document.querySelectorAll("#alert");
const lista = document.getElementById("lista");

const meuStorage = localStorage;
const pessoas = [];

buttonSalvar.addEventListener("click", Salvar);

function Salvar(event) {
  event.preventDefault();

  if (!name.validity.valid || !birthDate.validity.valid) {
    alertText.forEach((element) => {
      element.classList.remove("alert--hide");
    });
  } else {
    alertText.forEach((element) => {
      element.classList.add("alert--hide");
    });

    let dadosDaPessoa = {
      nome: name.value,
      data: birthDate.value,
      id: pessoas.length,
    };
    pessoas.push(dadosDaPessoa || []);

    meuStorage.setItem("pessoas", JSON.stringify(pessoas));

    atualizaTabela();
    console.log(pessoas);
    console.log(meuStorage);
  }
}

function Alterar(event, id) {
  event.preventDefault();

  let busca = prompt("Tem certeza que quer deletar esse usuário? (s/n)");
  let alteradoNome;
  let alteradoData;

  if (!busca == "s" && !busca == "sim") {
    return;
  } else {
    alteradoNome = prompt("Digite o novo nome.");
    alteradoData = prompt("Digite o nova data. (AAAA-MM-DD)");

    pessoas[id].nome = alteradoNome;

    if (validarData(alteradoData)) {
      pessoas[id].data = alteradoData;
    } else {
      alert("Data inválida");
    }

    meuStorage.setItem("pessoas", JSON.stringify(pessoas));

    atualizaTabela();
    console.log(pessoas);
    console.log(meuStorage);
  }
}

function Deletar(event, id) {
  event.preventDefault;

  let busca = prompt("Tem certeza que quer deletar esse usuário? (s/n)");

  if (!busca == "s" || !busca == "sim") {
    return;
  } else {
    pessoas.splice(id, 1);

    meuStorage.setItem("pessoas", JSON.stringify(pessoas));

    atualizaTabela();
    console.log(pessoas);
    console.log(meuStorage);
  }
}

function atualizaTabela() {
  lista.innerHTML = "";

  for (let index = 0; index < pessoas.length; index++) {
    lista.innerHTML += `<tr>
                          <td>${pessoas[index].nome}</td>
                          <td>${pessoas[index].data}</td>
                          <td>
                            <button type="submit" class="btn" id="btn--alterar" onclick="Alterar(event, ${pessoas[index].id})">Alterar</button>
                            <button type="submit" class="btn" id="btn--deletar" onclick="Deletar(event, ${pessoas[index].id})">Deletar</button>
                          </td>
                        </tr>
                      `;
  }
}

function validarData(data) {
  var padrao = /(\d{4})[-.\/](\d{2})[-.\/](\d{2})/i;
  if (data.match(padrao) == "" || data.match(padrao) == null) {
    return false;
  } else {
    return true;
  }
}
