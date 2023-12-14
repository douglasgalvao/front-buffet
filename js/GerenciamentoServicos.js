import { Authorization } from "../Components/Authorization.js";
import { Navbar } from "../Components/Navbar.js";
import { TableComponent } from "../Components/TableComponent.js";



function init() {
    getProdutos()
}

function getProdutos() {
    $.ajax({
        type: 'GET',
        url: `https://gestaobusiness.shop/evento/usuario/${localStorage.getItem("idUser")}`,
        contentType: 'application/json',
        success: function (data) {
            initTable(data)
        },
        error: function (xhr, status, error) {

            if (xhr.status === 404) {
                // Tratamento para status 404 (Não Encontrado)
                window.location.href = "https://127.0.0.1:5501/src/front/index.html";
                // alert('Usuário não existente na base de dados com o email informado');
            } else {
                // Outros casos de erro
                console.error('Erro na requisição:', error);
            }
            return false;
        }
    });
}


function initTable(data) {

    console.log(data)
    if (data.length < 1) {
        var newProduto = {
            nome: "",
            quantidade: "",
            tipo: "",
            preco: "",
            margem: "",
        };

        data.push(newProduto);
    }

    var table = new TableComponent(data, "myGrid", true);
    table.setFloatingFilter(true);
    var newClicked = table.setOnCellClicked();
    newClicked = function (str) {
        str = str.data
        console.log(str)
        idSelecionado = str.id
        document.getElementById("nome").value = str.nome
        document.getElementById("quantidade").value = str.quantidade
        document.getElementById("tipo").value = str.tipoProduto
        document.getElementById("preco").value = str.precoPago
        document.getElementById("margem").value = str.margemLucro

    };
    table.setOnCellClicked = newClicked;

    table.setWidth("100%")
    table.initTable();

}





init()


//DOUGLAS THING
document.addEventListener('DOMContentLoaded', function () {
    Authorization.authManager('servico');
    Navbar.init();

    setTimeout(() => {
    }, 2000); // Simulated delay of 2 seconds
    document.getElementById('btnLogOut').addEventListener('click', function () {
        Authorization.token.removeToken();
        window.location.href = './index.html';
    });
});


