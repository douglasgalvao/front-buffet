import { TokenManager } from "../utils/tokenManager2.js" 

export class ParceiroRepository {

  async add(newParceiro) {
    return await $.ajax({
      method: "POST",
      url: "http://44.203.195.117:8080/parceiro",
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
      url: "http://44.203.195.117:8080/parceiro"+`/${idParceiro}`,
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
      url: "http://44.203.195.117:8080/parceiro"+`/${newParceiro.id}`,
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
      url: "http://44.203.195.117:8080/parceiro",
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
