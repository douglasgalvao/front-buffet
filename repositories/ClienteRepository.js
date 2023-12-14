import { TokenManager } from "../utils/tokenManager2.js";

export class ClienteRepository {
  async add(newCliente) {
    return await $.ajax({
      method: "POST",
      url: "https://44.202.145.192:8080/cliente",
      headers: {
        Authorization: TokenManager.getToken(),
      },
      contentType: "application/json",
      data: JSON.stringify(newCliente),
      success: function (data) {
        console.log(data);
      },
    });
  }

  async read() {
    return await $.ajax({
      method: "GET",
      url: "https://44.202.145.192:8080/cliente",
      contentType: "application/json",
      success: function (data) {
        if (data.length) {
          data.forEach((e) => { });
        }
        console.log(data);
      },
    });
  }
}
