import { Navbar } from "../components/Navbar.js";
import { TokenManager } from "../utils/tokenManager2.js";
import { Utils } from "../utils/Utils.js";
import { ParceiroRepository } from "../repositories/ParceiroRepository.js";
import { ClienteRepository } from "../repositories/ClienteRepository.js";
import { ProductRepository } from "../repositories/ProductRepository.js";
import { EventosRepository } from "../repositories/EventosRepository.js";

// // endereço
var rua = document.getElementById("rua");
var cidade = document.getElementById("cidade");
var estado = document.getElementById("estado");
var cep = document.getElementById("cep");
var numero = document.getElementById("numero");
//evento

var dataEvento = document.getElementById("dataEvento");
var horaInicio = document.getElementById("horaInicio");
var horaTermino = document.getElementById("horaTermino");
var quantidadePessoas = document.getElementById("qConvidados");
var descricao = document.getElementById("descricao");
var valorTotal = document.getElementById("valorTotal");
var idCliente = document.getElementById("clientId");

//list
var parceirosIds = [];
var produtosIds = [];
var produtosDto = [];
var produtoDtoWithOutUpdate = [];
var produtosIdsWithOutUpdate = [];
//buttons
let addPartnerButton = document.getElementById("addPartner");
let addProductButton = document.getElementById("AddProduto");
let createEventButton = document.getElementById("finalizar");
let createWithConfirmation = document.getElementById("createEvent");
let returnButton = document.getElementById("btn-return");
returnButton.addEventListener("click", function () {
  window.location.href = "./evento.html";
});
//selects
let productSelect = document.getElementById("produtosId");
var selectPartnersIds = document.getElementById("parceiroId");
//ul
let ulPartner = document.getElementById("ListParceiro");
let ulProduct = document.getElementById("listProduct");
let quantidade = document.getElementById("qProduct");
//modals
let modalCreateCliente = document.getElementById("createClient");
//imports
let utils = new Utils();
let clienteRepository = new ClienteRepository();
let parceiroRepository = new ParceiroRepository();
let productRepository = new ProductRepository();
let eventoRepository = new EventosRepository();
var parceiros;
var produtos;

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("eventId");

document.addEventListener("DOMContentLoaded", function () {
  Navbar.init();
  console.log(eventId);
  loadParceiro();
  loadClient();
  loadProdutos();
  deletePartner();
  if (eventId != null) {
    update(eventId);
    createEventButton.innerHTML = "Atualizar Evento";
    createWithConfirmation.innerHTML = "Confirmar Atualização";
  }
  document.getElementById("btnLogOut").addEventListener("click", function () {
    TokenManager.removeToken();
    window.location.href = "./index.html";
  });
});

cep.addEventListener("blur", function () {
  completeAddress();
});

function completeAddress() {
  utils.getAddres(cep.value).then((result) => {
    cidade.value = result.localidade;
    estado.value = result.uf;
    rua.value = result.logradouro;
  });
}

function update(id) {
  eventoRepository
    .readToUpdate(id)
    .then((result) => {
      let data = result;
      console.log("Success:", data);
      cep.value = data.endereco.cep;
      completeAddress();
      numero.value = data.endereco.numero;
      dataEvento.value = data.dataEvento;
      horaInicio.value = data.horaInicio;
      horaTermino.value = data.horaTermino;
      quantidadePessoas.value = data.quantidadePessoas;
      loadParceiro();
      descricao.value = data.descricao;
      idCliente.value = data.idCliente;
      parceirosIds = data.parceirosIds;
      showSelectPartner();
      produtosDto = data.produtosDto;
      produtosDto.forEach((dto) => {
        produtosIds.push(dto.idProduto);
      });
      produtoDtoWithOutUpdate = produtosDto;
      produtosIdsWithOutUpdate = produtosIds;
      showSelectProducts();
      quantidadePessoas.value = data.quantidadePessoas;
      quantidadePessoas.value = data.quantidadePessoas;
    })
    .catch((error) => {
      alert("Erro ao obter o evento. Por favor, tente novamente.");
      console.error("Erro na requisição:", error);
    });
}

quantidadePessoas.addEventListener("blur", function () {
  if (quantidadePessoas.value > 0) {
    loadParceiro();
  } else {
    selectPartnersIds.innerHTML = `<option selected value="">Informe os convidados...</option>`;
  }
});

addPartnerButton.addEventListener("click", function () {
  console.log(selectPartnersIds.value)
  if(selectPartnersIds.value != ""){
    parceirosIds.push(parseInt(selectPartnersIds.value));
    showSelectPartner();
  }
});

addProductButton.addEventListener("click", function () {

  produtosDto.push({
    idProduto: parseInt(productSelect.value),
    quantidade: parseInt(quantidade.value * quantidadePessoas.value),
  });
  produtosIds.push(parseInt(productSelect.value));
  showSelectProducts();
});

function getAddres() {
  return {
    rua: rua.value,
    cidade: cidade.value,
    estado: estado.value,
    cep: cep.value,
    numero: numero.value,
  };
}

function getEventInfo() {
  return {
    dataEvento: dataEvento.value,
    horaInicio: horaInicio.value,
    horaTermino: horaTermino.value,
    quantidadePessoas: parseInt(quantidadePessoas.value),
    descricao: descricao.value,
    valorTotal: getValue(),
    idCliente: idCliente.value,
    endereco: getAddres(),
    parceirosIds: parceirosIds,
    produtosDto: produtosDto,
    qFuncionarios: parseInt(quantidadePessoas / 5),
  };
}
function deletePartner() {
  let allPartnerButton = document.getElementsByClassName("removePartner");
  for (let i = 0; i < allPartnerButton.length; i++) {
    allPartnerButton[i].addEventListener("click", function () {
      parceirosIds = parceirosIds.filter(
        (partner) => partner != parseInt(allPartnerButton[i].id)
      );
      showSelectPartner();
      getValue();
    });
  }
}
function showSelectPartner() {
  let allSelectPartners = parceiros.filter((parceiro) =>
    parceirosIds.includes(parceiro.id)
  );
  ulPartner.innerHTML = "";
  allSelectPartners.forEach((partner) => {
    ulPartner.innerHTML += `<li id="${partner.id}">Categoria: ${
      partner.tipo
    } Empresa:${partner.nome}  
    valor para o evento ${
      partner.valorPorPessoa * quantidadePessoas.value
    } <button  id="${
      partner.id
    }" class="btn-danger ms-5 rounded-circle removePartner">X</button></li>`;
  });
  deletePartner();
  getValue();
}

function loadParceiro() {
  selectPartnersIds.innerHTML = "";
  selectPartnersIds.innerHTML += `<option selected value="">selecione os Parceiros...</option>`;
  parceiroRepository.read().then((result) => {
    parceiros = result;
    result.forEach((partner) => {
      selectPartnersIds.innerHTML += `<option  value="${
        partner.id
      }">Categoria: ${partner.tipo} Empresa:${partner.nome}  
      valor para o evento  R$${
        partner.valorPorPessoa * quantidadePessoas.value
      }</option>`;
    });
  });
}

function loadClient() {
  idCliente.innerHTML = `<option selected value="">selecione um Cliente...</option>`;
  clienteRepository.read().then((result) => {
    result.forEach((client) => {
      idCliente.innerHTML += `<option  value="${client.id}">Nome: ${client.nome} cpf:${client.cpf}</option>`;
    });
  });
}

function loadProdutos() {
  productRepository.read().then((result) => {
    productSelect.innerHTML = "";
    produtos = result;

    result.forEach((product) => {
      console.log(product.precoPago * (1 + product.margemLucro / 100));
      productSelect.innerHTML += `<option  value="${product.id}">Produto: ${
        product.nome
      } valor unitario :  R$ ${
        product.precoPago * (1 + product.margemLucro / 100)
      }</option>`;
    });
  });
}
function showSelectProducts() {
  let allSelectProducts = produtos.filter((produto) =>
    produtosIds.includes(produto.id)
  );
  ulProduct.innerHTML = "";
  allSelectProducts.forEach((product) => {
    let dto = produtosDto.filter((dto) => dto.idProduto == product.id);

    ulProduct.innerHTML += `<li id="${product.id}">Produto: ${
      product.nome
    } valor unitario: R$ ${
      product.precoPago * (1 + product.margemLucro / 100)
    }, quantidade total  ${dto[0].quantidade} valor total: R$ ${parseInt(
      dto[0].quantidade * (product.precoPago * (1 + product.margemLucro / 100))
    )}<button  id="${
      product.id
    }" class="btn-danger ms-5 rounded-circle removeProduct">X</button></li>`;
  });
  deleteProduct();
  getValue();
}

function getValue() {
  let valorTotalInt = 0;
  produtosDto;
  produtos.forEach((product) => {
    produtosDto.forEach((productDto) => {
      if (productDto.idProduto == product.id) {
        valorTotalInt +=
          productDto.quantidade *
          (product.precoPago * (1 + product.margemLucro / 100));
      }
    });
  });
  parceiros.forEach((partner) => {
    parceirosIds.forEach((id) => {
      if (partner.id == id) {
        valorTotalInt += partner.valorPorPessoa * quantidadePessoas.value;
      }
    });
  });
  valorTotal.innerHTML = "Valor total  R$" + valorTotalInt;
  return valorTotalInt;
}

function deleteProduct() {
  let allProductsButton = document.getElementsByClassName("removeProduct");
  for (let i = 0; i < allProductsButton.length; i++) {
    allProductsButton[i].addEventListener("click", function () {
      produtosIds = produtosIds.filter(
        (partner) => partner != parseInt(allProductsButton[i].id)
      );
      produtosDto = produtosDto.filter(function (product) {
        return product.idProduto != parseInt(allProductsButton[i].id);
      });
      console.log(produtosIds);
      console.log(produtosDto);
      showSelectProducts();
      getValue();
    });
  }
}

createEventButton.addEventListener("click", function () {
  // comparar as duas arrays se tiver diferença

  productRepository.checarQuantidade(produtosDto).then((result) => {
    document.getElementById(
      "produtoFaltando"
    ).innerHTML = ""
    if (result.length > 0) {
      result.forEach((produto) => {
        document.getElementById(
          "produtoFaltando"
        ).innerHTML += `<li>Nome ${produto.nome} Quantidade faltante: ${produto.quantidade}</li>`;
      });
    } else {
      document.getElementById("produtoFaltando").innerHTML +=
        `<li>Nenhum item faltando</li>`;
    }
  });
});

createWithConfirmation.addEventListener("click", function () {
  console.log(getEventInfo());
  if (eventId != null) {
    var event = getEventInfo();
    event.id = eventId;
    eventoRepository.update(event).then((result) => {
      window.alert("Evento Atualizado");
      window.location.href = "./evento.html";
    });
  } else {
    eventoRepository.add(getEventInfo()).then((result) => {
      window.alert("Evento cadastrado");
      window.location.href = "./evento.html";
    });
  }
});

modalCreateCliente.addEventListener("click", function () {
  $("#modalCreateCliente").modal("show");
  $("#cpfCliente").inputmask("999.999.999-99", {
    placeholder: "___.___.___-__",
  });
  $("#emailCliente").on("input", function () {
    var emailInput = $(this).val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput)) {
      $(this).removeClass("is-invalid");
    } else {
      $(this).addClass("is-invalid");
    }
  });
});

$("#formCreateCliente").submit(function (e) {
  e.preventDefault();
  if ($("#cpfCliente").val().replace(/[_.-]/g, "").length != 11) {
    alert("CPF inválido");
    return;
  }
  clienteRepository.add({
    cpf: $("#cpfCliente").val().replace(/[.-]/g, ""),
    email: $("#emailCliente").val(),
    nome: $("#nomeCliente").val(),
  });
  window.alert("Cliente cadastrado");
  loadClient();
});
