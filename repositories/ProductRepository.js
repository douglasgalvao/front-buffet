import { TokenManager } from "../utils/tokenManager2.js" 

export class ProductRepository {

  async add(newProduto) {
    return await $.ajax({
      method: "POST",
      url: "https://gestaobusiness.shop/produto",
      headers: {
        'Authorization': TokenManager.getToken() 
    },
      contentType: "application/json",
      data: JSON.stringify(newProduto),
      success: function (data) {
        if (data.length) {
          data.forEach((e) => {});
        }
        console.log(data);
       
      },
    });
    
  }
  async checarQuantidade(newProdutoDTO) {
    return await $.ajax({
      method: "POST",
      url: "https://gestaobusiness.shop/produto/checarQuantidade",
      headers: {
        'Authorization': TokenManager.getToken() 
    },
      contentType: "application/json",
      data: JSON.stringify(newProdutoDTO),
      success: function (data) {
        if (data.length) {
          data.forEach((e) => {});
        }
        console.log(data);
       
      },
    });
    
  }
  async remove(idProduto) {
    return await $.ajax({
      method: "DELETE",
      url: "https://gestaobusiness.shop/produto"+`/${idProduto}`,
      headers: {
        'Authorization': TokenManager.getToken() 
    },
      contentType: "application/json",
      success: function (data) {
        if (data.length) {
          data.forEach((e) => {});
        }
        console.log(data);
       
      },
    });
  }

  async update(newProduto) {
    return await $.ajax({
      method: "PUT",
      url: "https://gestaobusiness.shop/produto"+`/${newProduto.id}`,
      headers: {
        'Authorization': TokenManager.getToken() 
    },
      contentType: "application/json",
      data: JSON.stringify(newProduto),
      success: function (data) {
        if (data.length) {
          data.forEach((e) => {});
        }
        console.log(data);
       
      },
    });
    
  }

  async read() {
    return await $.ajax({
      method: "GET",
      url: "https://gestaobusiness.shop/produto",
      contentType: "application/json",
      success: function (data) {
        if (data.length) {
          data.forEach((e) => {});
        }
        console.log(data);
       
      },
    });
    
  }
}
