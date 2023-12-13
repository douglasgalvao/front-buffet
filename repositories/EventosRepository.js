import { TokenManager } from "../utils/tokenManager2.js" 

export class EventosRepository {

  async add(newEvento) {
    return await $.ajax({
      method: "POST",
      url: "https://52.91.224.207:8080/evento",
      headers: {
        'Authorization': TokenManager.getToken() 
    },
      contentType: "application/json",
      data: JSON.stringify(newEvento),
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
      url: "https://52.91.224.207:8080/evento"+`/${idParceiro}`,
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

  async update(newEvento) {
    return await $.ajax({
      method: "PUT",
      url: "https://52.91.224.207:8080/evento"+`/${newEvento.id}`,
      headers: {
        'Authorization': TokenManager.getToken() 
    },
      contentType: "application/json",
      data: JSON.stringify(newEvento),
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
      url: "https://52.91.224.207:8080/evento",
      contentType: "application/json",
      success: function (data) {
        if (data.length) {
          data.forEach((e) => {});
        }
        console.log(data);
       
      },
    });
    
  }

  async readToUpdate(id) {
    return await $.ajax({
      method: "GET",
      url: "https://52.91.224.207:8080/evento/update/"+id,
      contentType: "application/json",
      success: function (data) {
        if (data.length) {
          data.forEach((e) => {});
        }
        console.log(data);
       
      },
    });
    
  }

  async readFromTable() {
    return await $.ajax({
      method: "GET",
      url: "https://52.91.224.207:8080/evento/showTable",
      contentType: "application/json",
      success: function (data) {
        if (data.length) {
          data.forEach((e) => {});
        }
        console.log(data);
       
      },
    });
    
  }
  async readIndicador() {
    return await $.ajax({
      method: "GET",
      url: "https://52.91.224.207:8080/evento/inidicador",
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
