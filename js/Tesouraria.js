import { Navbar } from "../Components/Navbar.js";
import { TableComponent } from "../Components/TableComponent.js";
import { Authorization } from "../Components/Authorization.js";

function getProdutoAtual() {
  return localStorage.getItem("produtoAtual");
}



function enableButtonOnSelection(tableComponent, buttons) {
  if (tableComponent && tableComponent.gridOptions) {
    const api = tableComponent.gridOptions.api;

    if (api) {
      //Adicionar um ouvinte de evento para detectar alterações de seleção
      api.addEventListener("selectionChanged", function () {
        // Verificar se há itens selecionados
        const selectedRows = api.getSelectedRows();
        const isDisabled = selectedRows.length > 0;
        //Habilitar os botões
        buttons.forEach((button) => {
          button.disabled = !isDisabled;
        });
      });
    }
  }
}

//Função para desabilitar os botões com base na falta de seleções na tabela
function disableButtonOnSelection(tableComponent, buttons) {
  if (tableComponent && tableComponent.gridOptions) {
    const api = tableComponent.gridOptions.api;

    if (api) {
      //Verificar se há itens selecionados
      const selectedRows = api.getSelectedRows();

      //Adicione um ouvinte de evento de clique ao documento
      document.addEventListener("click", function (event) {
        // Verifica se o alvo do clique não é um dos botões
        if (!buttons.some((button) => button.contains(event.target))) {
          //O clique ocorreu fora dos botões
          //Desabilite os botões
          buttons.forEach((button) => {
            button.disabled = true;
          });
        }
      });
    }
  }
}







// Primeira tabela

function initEvent(dataEvent) {
  var tableEvent = new TableComponent(dataEvent, "myGrid1", false);
  var newClicked = tableEvent.setOnCellClicked();
  newClicked = function (str) {
    localStorage.setItem("eventoAtual", str.data.id);
    console.log("id" + str.data.id);
    buttons1.forEach((button) => {
      button.disabled = false;
    });
  };
  tableEvent.setOnCellClicked = newClicked;

  tableEvent.setHeight("80%");
  tableEvent.setWidth("100%");
  tableEvent.setFloatingFilter(true);
  tableEvent.initTable();

  var btn_send = document.getElementById("btnSend");
  var btn_cancel = document.getElementById("btnCancel");

  var buttons1 = [btn_send, btn_cancel];

  buttons1.forEach((button) => {
    button.disabled = true;
  });

  enableButtonOnSelection(tableEvent, buttons1);
  disableButtonOnSelection(tableEvent, buttons1);
}

function initProduct(obj) {
  var tableProduct = new TableComponent(obj, "myGrid2", false);
  var newClicked = tableProduct.setOnCellClicked();
  newClicked = function (str) {
    localStorage.setItem("produtoAtual", str.data.id);
    console.log("id" + str.data.id);
    
  };
  tableProduct.setOnCellClicked = newClicked;

  tableProduct.setFloatingFilter(true);
  tableProduct.setHeight("80%");
  tableProduct.setWidth("100%");
  tableProduct.initTable();

  var btn_aprove = document.getElementById("btnAprove");
  var btn_refuse = document.getElementById("btnRefuse");

  var buttons2 = [btn_aprove, btn_refuse];

  buttons2.forEach((button) => {
    button.disabled = true;
  });

  enableButtonOnSelection(tableProduct, buttons2);
  disableButtonOnSelection(tableProduct, buttons2);
}

function atualizarCampoValorEmCaixa(valorEmCaixa, valorMedioEventos) {
  $("#staticValor").html("Valor em Caixa: " + valorEmCaixa);
  $("#staticValor2").html("Valor médio eventos: " + valorMedioEventos);

}

$.ajax({
  type: "GET",
  url: "https://gestaobusiness.shop/balancos",
  contentType: "application/json",
  headers: {
    Authorization: Authorization.token.getToken(),
  },
  success: function (data) {
    var balanco = data;
    console.log(data);
    // Atualizar o valor do staticValor
    $('#staticValor').html("Valor em Caixa: R$" + balanco.valorEmCaixa);
    $("#staticValor2").html("Valor médio eventos último mes: R$" + balanco.valorMedioEventos);
  },
  error: function (xhr, status, error) {
    alert("Erro ao obter o balanço. Por favor, tente novamente.");
    console.error("Erro na requisição:", error);
  },
});



document.addEventListener("DOMContentLoaded", function () {
  Authorization.authManager("financeiro");
  Navbar.init();

  document.getElementById("btnLogOut").addEventListener("click", function () {
    document.getElementById("loaderContainer").style.display = "flex";
    Authorization.token.removeToken();
    window.location.href = "./index.html";
    document.getElementById("loaderContainer").style.display = "none";
  });

  $.ajax({
    type: "GET",
    url: "https://gestaobusiness.shop/evento/status?status=PENDENTE",
    contentType: "application/json",
    headers: {
      Authorization: Authorization.token.getToken(),
    },
    success: function (data) {
      initEvent(data);
    },
    error: function (xhr, status, error) {
      // alert('Erro ao obter o evento. Por favor, tente novamente.');
      console.error("Erro na requisição:", error);
    },
  });

  $.ajax({
    type: "GET",
    url: "https://gestaobusiness.shop/produto/status?status=PENDENTE",
    contentType: "application/json",
    headers: {
      Authorization: Authorization.token.getToken(),
    },
    success: function (data) {
      initProduct(data);
    },
    error: function (xhr, status, error) {
      alert("Erro ao obter o evento. Por favor, tente novamente.");
      console.error("Erro na requisição:", error);
    },
  });

  document.getElementById("btnSend").addEventListener("click", function () {
    document.getElementById("loaderContainer").style.display = "flex";
    let id = localStorage.getItem("eventoAtual");
    $.ajax({
      type: "POST",
      url: "https://gestaobusiness.shop/balancos/aprovarEvento",
      headers: {
        Authorization: Authorization.token.getToken(),
      },
      data: JSON.stringify({ idEvento: id }),
      contentType: "application/json",
      success: function (data, textStatus, xhr) {
        alert("E-mail enviado com sucesso!");
        atualizarCampoValorEmCaixa(data.valorEmCaixa, data.valorMedioEventos);
        location.reload(true);
      },
      error: function (xhr, status, error) {
        alert("Erro ao enviar o e-mail. Por favor, tente novamente.");
        console.error("Erro na requisição:", error);
      },
    }).always(function () {
      document.getElementById("loaderContainer").style.display = "none";
    });
  });

  document.getElementById("btnAprove").addEventListener("click", function () {
    if (getProdutoAtual() == "") {
      alert("Você deve selecionar um produto para fazer essa operação.");
      return;
    }
    document.getElementById("loaderContainer").style.display = "flex";
    $.ajax({
      method: "POST",
      url: "https://gestaobusiness.shop/balancos/aprovarCompra",
      headers: {
        Authorization: Authorization.token.getToken(),
      },
      data: JSON.stringify({ idCompra: getProdutoAtual() }),
      contentType: "application/json",
      success: function (data, textStatus, xhr) {
        if (data.status == 406) {
          alert("Saldo Insuficiente para aprovar compra de produtos");
          return;
        }

        alert("Produto aprovado com sucesso!");
        location.reload(true);
        atualizarCampoValorEmCaixa(data.valorEmCaixa, data.valorMedioEventos);
      },
      error: function (xhr, status, error) {
        alert("Erro ao aprovar o produto. Por favor, tente novamente.");
        console.error("Erro na requisição:", error);
      },
    }).always(function () {
      document.getElementById("loaderContainer").style.display = "none";
    });
  });

  document.getElementById("btnRefuse").addEventListener("click", function () {
    document.getElementById("loaderContainer").style.display = "flex";
    if (getProdutoAtual() == "") {
      alert("Você deve selecionar um produto para fazer essa operação.");
      return;
    }
    $.ajax({
      method: "POST",
      url: "https://gestaobusiness.shop/balancos/recusarCompra",
      headers: {
        Authorization: Authorization.token.getToken(),
      },
      data: JSON.stringify({ idCompra: getProdutoAtual() }),
      contentType: "application/json",
      success: function (data, textStatus, xhr) {
        alert("Produto recusado com sucesso!");
        location.reload(true);
      },
      error: function (xhr, status, error) {
        alert("Erro ao recusar o produto. Por favor, tente novamente.");
        console.error("Erro na requisição:", error);
      },
    }).always(function () {
      document.getElementById("loaderContainer").style.display = "none";
    });
  });
});
