import { TableComponent } from "../Components/TableComponent.js";
import { EventosRepository } from "../repositories/EventosRepository.js";
import { Navbar } from "../Components/Navbar.js";
import { TokenManager } from "../utils/tokenManager2.js";
import { Authorization } from "../Components/Authorization.js";

var createButton = document.getElementById("btn-cadastrar");
createButton.addEventListener("click", function(){
    window.location.href = "./cadastroEvento.html";
}
);

var updateButton = document.getElementsByClassName("atualizar");
updateButton[0].addEventListener("click", function(){
  window.location.href = "./cadastroEvento.html?eventId="+deleteButton[0].id;
}
);
var deleteButton = document.getElementsByClassName("deletar");
deleteButton[0].onclick = deleteEvent;

let eventoRepository = new EventosRepository();
document.addEventListener("DOMContentLoaded", function () {
    Authorization.authManager("evento");
    Navbar.init();
    implementTable()
    document.getElementById("btnLogOut").addEventListener("click", function () {
      TokenManager.removeToken();
      window.location.href = "./index.html";
    });
  });
  
function implementTable() {
    eventoRepository.readFromTable().then(data => {
      if (data.length < 1 || data == null) {
        var newEvent = {
            dataEvento: "",
            horaInicio: "",
            horaTermino: "",
            quantidadePessoas: "",
            descricao: "",
            valorTotal: "",
            idCliente: "",
            qFuncionarios: "",
        };
  
        data.push(newEvent);
      }
      var table = new TableComponent(data, "myGrid2", true);
      table.setFloatingFilter(true);
      var newClicked = table.setOnCellClicked();
      newClicked = function (str) {
        console.log(deleteButton)
        deleteButton[0].setAttribute(`id`,str.data.id)
        updateButton[0].setAttribute(`id`,str.data.id)
      };
      table.setOnCellClicked = newClicked;
  
      table.setHeight("100%");
      table.setWidth("100%");
      table.initTable();
    })
  }

  function deleteEvent() {
    eventoRepository.remove(deleteButton[0].id).then(result => {
      implementTable();
        console.log(result);
      window.alert("Evento Deletado");
    });
}