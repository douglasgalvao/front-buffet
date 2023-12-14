let taxaErrosChart;
let lucroPorParceiroChart;

let originalEventData;
let originalPartnerData;

let documentErrorButton = document.getElementById("filtroError");
documentErrorButton.addEventListener("click",updateChart )
document.addEventListener('DOMContentLoaded', function () {
  fetch('dadosEventos.json')
    .then(response => response.json())
    .then(data => {
      originalEventData = data;
      createTaxaErrosChart(originalEventData);
    })
    .catch(error => console.error('Error:', error));

    fetch('http://localhost:8080/evento/inidicador')
    .then(response => response.json())
    .then(data => {
      originalPartnerData = data;
      createLucroPorParceiroChart(originalPartnerData);
    })
    .catch(error => console.error('Erro ao obter dados:', error));
  
});

function createTaxaErrosChart(data) {
  const timestamps = data.map(entry => entry.timestamp);
  const taxaErros = data.map(entry => (entry.cadastrosComErro / entry.totalCadastros) * 100);

  const ctx = document.getElementById('taxaErrosChart').getContext('2d');
  taxaErrosChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timestamps,
      datasets: [{
        label: '% de Cadastros com Erros',
        data: taxaErros,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 60
        }
      }
    }
  });
}

function createLucroPorParceiroChart(data) {
  const partner = data.nomeParceiro;
  const profit = data.valorNoMes;

  const ctx = document.getElementById('lucroPorParceiroChart').getContext('2d');
  lucroPorParceiroChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [partner],
      datasets: [{
        label: 'Lucro Total',
        data: [profit],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 10000
        }
      }
    }
  });
}


function updateChart() {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  if (startDate > endDate) {
    alert('Data de início não pode ser posterior à data de término.');
    return;
  }

  let filteredData = originalEventData;

  if (startDate && endDate) {
    filteredData = originalEventData.filter(entry => {
      return entry.timestamp >= startDate && entry.timestamp <= endDate;
    });
  }

  taxaErrosChart.data.labels = filteredData.map(entry => entry.timestamp);
  taxaErrosChart.data.datasets[0].data = filteredData.map(entry => (entry.cadastrosComErro / entry.totalCadastros) * 100);
  taxaErrosChart.update();

}


// let documentErrorButton = document.getElementById("filtroError");
// documentErrorButton.addEventListener("click",updateChart )
// document.addEventListener('DOMContentLoaded', function () {
//   fetch('dadosEventos.json')
//     .then(response => response.json())
//     .then(data => {
//       originalEventData = data;
//       createTaxaErrosChart(originalEventData);
//     })
//     .catch(error => console.error('Error:', error));

//   fetch('dadosParceiros.json')
//     .then(response => response.json())
//     .then(data => {
//       originalPartnerData = data;
//       createLucroPorParceiroChart(originalPartnerData);
//     })
//     .catch(error => console.error('Erro ao obter dados:', error));
// });

// function createTaxaErrosChart(data) {
//   const timestamps = data.map(entry => entry.timestamp);
//   const taxaErros = data.map(entry => (entry.cadastrosComErro / entry.totalCadastros) * 100);

//   const ctx = document.getElementById('taxaErrosChart').getContext('2d');
//   taxaErrosChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: timestamps,
//       datasets: [{
//         label: '% de Cadastros com Erros',
//         data: taxaErros,
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 2
//       }]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         y: {
//           beginAtZero: true,
//           max: 60
//         }
//       }
//     }
//   });
// }

// function createLucroPorParceiroChart(data) {
//   const partners = data.map(entry => entry.partner);
//   const profits = data.map(entry => entry.profit);

//   const ctx = document.getElementById('lucroPorParceiroChart').getContext('2d');
//   lucroPorParceiroChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: partners,
//       datasets: [{
//         label: 'Lucro Total',
//         data: profits,
//         backgroundColor: 'rgba(75, 192, 192, 0.5)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1
//       }]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         y: {
//           beginAtZero: true,
//           max: 10000
//         }
//       }
//     }
//   });

// }
