import { TokenManager } from "../utils/tokenManager2.js" 

export class ProductRepository {

  async add(newProduto) {
    return await $.ajax({
      method: "POST",
      url: "http://52.91.224.207:8080/produto",
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
      url: "http://52.91.224.207:8080/produto/checarQuantidade",
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
      url: "http://52.91.224.207:8080/produto"+`/${idProduto}`,
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
      url: "http://52.91.224.207:8080/produto"+`/${newProduto.id}`,
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
      url: "http://52.91.224.207:8080/produto",
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
