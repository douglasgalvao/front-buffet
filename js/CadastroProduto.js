import { TableComponent } from "../components/TableComponent.js";
import { TokenManager } from "../utils/tokenManager2.js"
import { Navbar } from "../components/Navbar.js";
import { Authorization } from "../Components/Authorization.js";


const Modos = {
    CADASTRO: "cadastro",
    UPDATE: "update"
}

var status = Modos.CADASTRO
var idSelecionado = null

//#region Save/Load

function init() {
    getTipos()
    getProdutos()

}

function getTipos() {
    $.ajax({
        type: 'GET',
        url: 'http://44.203.195.117:8080/tipoproduto',
        contentType: 'application/json',

        success: function (data) {
            console.log(data)
            preencherTipoInput(data)
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

function getProdutos() {
    $.ajax({
        type: 'GET',
        url: 'http://44.203.195.117:8080/produto',
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

function preencherTipoInput(data) {
    const tipoInput = document.getElementById("tipo")
    
    tipoInput.innerHTML = ""
    
    if(data.length == 0) {
        tipoInput.innerHTML = `<option selected> - </option>`
    }
    
    data.forEach(opcao => {
        tipoInput.innerHTML += `<option value="${opcao.tipo}">${opcao.tipo}</option>`
    });

    tipoInput.innerHTML += `<option value="0">Novo tipo</option>`

}

//#endregion


//#region CRUD

function createProduto() {
    console.log("criando produto")

    let newProduto = {
        nome: document.getElementById("nome").value,
        quantidade: document.getElementById("quantidade").value,
        precoPago: document.getElementById("preco").value,
        margemLucro: document.getElementById("margem").value,
        tipoProduto: {
            tipo: document.getElementById("tipo").value
        }

    }

    console.log(newProduto)
    console.log(JSON.stringify(newProduto))

    for (let campo in newProduto) {
        if (newProduto[campo] == '' || newProduto[campo] == null || newProduto[campo] == undefined) {
            alert("O campo " + campo + "esta vazio");
            return
        }
    }

    $.ajax({
        type: 'POST',
        url: 'http://44.203.195.117:8080/produto',
        contentType: 'application/json',
        headers: {
            'Authorization': TokenManager.getToken()
        },
        success: function (data) {
            console.log("Requisicao completa")
            document.getElementById("nome").value = ""
            document.getElementById("quantidade").value = ""
            document.getElementById("tipo").value = ""
            document.getElementById("preco").value = ""
            document.getElementById("margem").value = ""
            getProdutos()
        },
        data: JSON.stringify(newProduto),
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

    console.log("Requisicao feita")
}


function removeProduto(produto) {
    $.ajax({
        type: 'DELETE',
        url: `http://44.203.195.117:8080/produto/${idSelecionado}`,
        contentType: 'application/json',
        success: function (data) {
            console.log("Requisicao completa")
            document.getElementById("nome").value = ""
            document.getElementById("quantidade").value = ""
            document.getElementById("tipo").value = ""
            document.getElementById("preco").value = ""
            document.getElementById("margem").value = ""
            getProdutos()
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


function updateProduto(index, produto) {
    let newProduto = {
        nome: document.getElementById("nome").value,
        quantidade: document.getElementById("quantidade").value,
        precoPago: document.getElementById("preco").value,
        margemLucro: document.getElementById("margem").value,
        tipoProduto: {
            tipo: document.getElementById("tipo").value
        }

    }

    if (document.getElementById("quantidade").value == '' || document.getElementById("preco").value == '' || document.getElementById("margem").value == '') {
        alert("Preencha todos os campos ante de submeter")
        return
    }

    $.ajax({
        type: 'PUT',
        url: `http://44.203.195.117:8080/produto/${idSelecionado}`,
        contentType: 'application/json',
        success: function (data) {
            console.log("Requisicao completa")
            document.getElementById("nome").value = ""
            document.getElementById("quantidade").value = ""
            document.getElementById("tipo").value = ""
            document.getElementById("preco").value = ""
            document.getElementById("margem").value = ""
            getProdutos()
        },
        data: JSON.stringify(newProduto),
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

//#endregion


//#region InterfaceCRUD

function IAddProduto() {
    let campos = {
        nome: document.getElementById("nome").value,
        quantidade: document.getElementById("quantidade").value,
        tipo: document.getElementById("tipo").value,
        preco: document.getElementById("preco").value,
        margem: document.getElementById("margem").value

    }

    console.log("campos")
    console.log(campos)

    addProduto(campos)

}

//#endregion


//#region Eventos

document.getElementById("tipo").onchange = () => {
    if (document.getElementById("tipo").value == 0) {
        document.getElementById("novo-tipo-input").value = ""
        const modal = new bootstrap.Modal(document.getElementById("modal-novo-tipo"))
        modal.show();
    }
}

document.getElementById("close-novo-tipo-modal").onclick = () => {
    document.getElementById("tipo").selectedIndex = 0
}

document.getElementById("save-novo-tipo-modal").onclick = () => {
    const newTipo = { tipo: document.getElementById("novo-tipo-input").value }

    $.ajax({
        type: 'POST',
        url: 'http://44.203.195.117:8080/tipoproduto',
        contentType: 'application/json',
        success: function (data) {
            console.log("Que data é essa:")
            console.log(data)

            getTipos();
            const inputTipo = document.getElementById("tipo")
            inputTipo.selectedIndex = inputTipo.options.length - 2

        },
        data: JSON.stringify(newTipo),
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

document.getElementById("btn-create").onclick = () => {
    createProduto()
}

document.getElementById("btn-update").onclick = () => {
    updateProduto()
}

document.getElementById("btn-delete").onclick = () => {
    removeProduto()
}

document.getElementById("btn-cancel").onclick = () => {
    document.getElementById("nome").value = ""
    document.getElementById("quantidade").value = ""
    document.getElementById("tipo").value = ""
    document.getElementById("preco").value = ""
    document.getElementById("margem").value = ""

    idSelecionado = null
}

//#endregion


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

    var table = new TableComponent(data, "myGrid2", true);
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

    table.setHeight("90%")
    table.setWidth("100%")
    table.initTable();

}


init()


document.addEventListener('DOMContentLoaded', function () {
    Authorization.authManager('estoque');
    Navbar.init();
    document.getElementById('btnLogOut').addEventListener('click', function () {
        TokenManager.removeToken();
        window.location.href = './index.html';
    });
});
