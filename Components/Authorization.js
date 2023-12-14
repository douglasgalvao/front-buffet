import { TokenManager } from "../utils/tokenManager2.js";
export const Authorization = {
  token: TokenManager,
  authManager: function Authorization(permissao) {
    if (TokenManager.getToken() == null) {
      alert("Você não está logado para acessar essa página.");
      window.location.href = "./index.html";
    } else if (
      TokenManager.decodeJwtToken(TokenManager.getToken()).payload.tipoAcesso !=
      permissao
    ) {
      alert("Não tem permissão para acessar essa página");
      window.location.href = "./index.html";
    } else {
      let idUsuario = TokenManager.decodeJwtToken(TokenManager.getToken())
        .payload.id;

      $.ajax({
        type: "GET",
        url: "https://gestaobusiness.shop/usuario/getUsuario/" + idUsuario,
        contentType: "application/json",
        success: function (data) {
          localStorage.setItem("nameUser", data.nome);
          localStorage.setItem("idUser", data.id);
        },
        error: function (xhr, status, error) {
          if (xhr.status === 404) {
            window.location.href = "./index.html";
          } else {
            console.error("Erro na requisição:", error);
          }
          return false;
        },
      });
    }
  },
};
