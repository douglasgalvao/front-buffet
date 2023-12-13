import { Authorization } from '../Components/Authorization.js';



document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#cadastroForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const requestBody = {
            nome: $('#username').val(),
            tipoAcesso: $('#tipoAcesso').val(),
            telefone: $('#telefone').val(),
            senha: $('#password').val(),
            email: $('#email').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://52.91.224.207:8080/usuario/save',
            contentType: 'application/json',
            data: JSON.stringify(requestBody),
            success: function (data, textStatus, xhr) {
                Authorization.token.setToken(data.token);
                let tipoAcesso = Authorization.token.decodeJwtToken(Authorization.token.getToken()).payload.tipoAcesso;
                if (tipoAcesso && tipoAcesso != '') {

                    switch (tipoAcesso) {
                        case 'financeiro':
                            window.location.href = 'financeiro.html'
                            break;
                        case 'estoque':
                            window.location.href = 'cadastroProduto.html'
                            break;
                        case 'servico':
                            window.location.href = 'servico.html'
                            break;
                        case 'evento':
                            window.location.href = 'evento.html'
                            break;
                        case 'parceiro':
                            window.location.href = 'parceiro.html'
                            break;
                        default:
                            window.location.href = 'index.html'
                            break;
                    }
                }

            },
            error: function (xhr, status, error) {
                // Tratamento de erro geral
                if (xhr.status === 409) {
                    alert('Email já registrado no sistema. tente outro');
                    window.location.href = '#'
                }
                console.error('Erro na requisição de cadastro:', error);
            }
        });

    });
});
