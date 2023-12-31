import { TokenManager } from "../utils/tokenManager2.js" 

export class ParceiroRepository {

  async add(newParceiro) {
    return await $.ajax({
      method: "POST",
      url: "https://gestaobusiness.shop/parceiro",
      headers: {
        'Authorization': TokenManager.getToken() 
    },
      contentType: "application/json",
      data: JSON.stringify(newParceiro),
      success: function (data) {
        if (data.length) {
          data.forEach((e) => {});
        }
        console.log(data);
       
      },
    });
    
  }
  async remove(idParceiro) {
    return await $.ajax({
      method: "DELETE",
      url: "https://gestaobusiness.shop/parceiro"+`/${idParceiro}`,
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

  async update(newParceiro) {
    return await $.ajax({
      method: "PUT",
      url: "https://gestaobusiness.shop/parceiro"+`/${newParceiro.id}`,
      headers: {
        'Authorization': TokenManager.getToken() 
    },
      contentType: "application/json",
      data: JSON.stringify(newParceiro),
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
      url: "https://gestaobusiness.shop/parceiro",
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
