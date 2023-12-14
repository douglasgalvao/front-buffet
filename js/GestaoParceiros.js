import { TableComponent } from "../Components/TableComponent.js";
import { Utils } from "../utils/Utils.js";
import { ParceiroRepository } from "../repositories/ParceiroRepository.js";
import { createParceiroView } from "../Components/ParceiroComponent.js";
import { Authorization } from "../Components/Authorization.js";
import { Navbar } from "../Components/Navbar.js";
import { TokenManager } from "../utils/tokenManager2.js";
//init
var div = document.getElementById("userContent");
createParceiroView(div);
var utils = new Utils();

//declaração das variavies
var id = document.getElementById("idParceiro");
var cnpj = document.getElementById("cnpj");
var username = document.getElementById("nome");
var email = document.getElementById("email");
var tipo = document.getElementById("tipo");
var valorPorPessoa = document.getElementById("valor");
var parceiroRepository = new ParceiroRepository();

implementTable();

cnpj.addEventListener("keypress", () => {
  cnpj.value = utils.maskCNPJ(cnpj.value);
});
cnpj.addEventListener("change", () => {
  cnpj.value = utils.maskCNPJ(cnpj.value);
});
// configurando os botoes
var createButton = document.getElementById("cadastro");
createButton.onclick = createParceiro;

var updateButton = document.getElementById("update");
updateButton.onclick = updateParceiro;

var deleteButton = document.getElementById("deletar");
deleteButton.onclick = deleteParceiro;

// funções
function getParceiroInfo() {
  if (checkIsNullOrEmptyInput()) {
    if (utils.isValidCNPJ(cnpj.value)) {
      var newParceiro = {
        nome: username.value,
        cnpj: cnpj.value,
        email: email.value,
        tipo: tipo.value,
        valorPorPessoa: valorPorPessoa.value,
        id: id.value,
      };

      return newParceiro;
    } else {
      window.alert("CNPJ invalido");
    }
  } else {
    return false;
  }
}

function createParceiro() {
  var parceiroResult = getParceiroInfo();
  if (parceiroResult == false) {
    window.alert("Complete os campos");
  } else {
    parceiroRepository.add(parceiroResult).then(result => {
      window.alert("Parceiro Cadastrado");
      implementTable();
    });

  }

}

function updateParceiro() {
  var parceiroResult = getParceiroInfo();
  if (parceiroResult == false) {
    window.alert("Complete os campos");
  } else {
    parceiroRepository.update(parceiroResult).then(result => {
      window.alert("Parceiro Atualizado");
      console.log(result);
      implementTable();
    });
  }

}

function deleteParceiro() {
  parceiroRepository.remove(id.value).then(result => {
    implementTable();
    window.alert("Parceiro Deletado");
  });

}

function implementTable() {
  parceiroRepository.read().then(data => {
    if (data.length < 1 || data == null) {
      var newParceiro = {
        nome: "",
        cnpj: "",
        email: "",
        tipo: "",
        valorPorPessoa: "",
        id: "",
      };

      data.push(newParceiro);
    }
    var table = new TableComponent(data, "myGrid2", true);
    table.setFloatingFilter(true);
    var newClicked = table.setOnCellClicked();
    newClicked = function (str) {
      id.value = str.data.id;
      cnpj.value = str.data.cnpj;
      username.value = str.data.nome;
      email.value = str.data.email;
      valorPorPessoa.value = str.data.valorPorPessoa;
      tipo.value = str.data.tipo;
    };
    table.setOnCellClicked = newClicked;

    table.setHeight("100%");
    table.setWidth("100%");
    table.initTable();
  })
}

function checkIsNullOrEmptyInput() {
  if (
    cnpj.value != null &&
    nome.value != null &&
    valorPorPessoa.value != null &&
    email.value != null &&
    tipo.value != null
  ) {
    if (
      cnpj.value != "" &&
      nome.value != "" &&
      valorPorPessoa.value != "" &&
      email.value != "" &&
      tipo.value != ""
    ) {
      return true;
    } else {
      window.alert("Complete os campos");
      return false;
    }
  } else {
    window.alert("Complete os campos");
    return false;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  Authorization.authManager('parceiro');
  Navbar.init();


  document.getElementById('btnLogOut').addEventListener('click', function () {
    TokenManager.removeToken();
    window.location.href = './index.html';
  });
});




