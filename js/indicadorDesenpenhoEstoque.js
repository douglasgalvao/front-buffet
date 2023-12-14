fetch("https://gestaobusiness.shop/produto/famosos")
    .then(response => response.json())
    .then(dados => {

        console.log(dados)
        const ctx = document.getElementById('grafico');

        let testa = [1, 2, 3]
        let testb = [10, 20 ,30]
        console.log(dados.map(d => dados.idProduto))
        console.log(dados.map(q => dados.quantidade))

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dados.map(d => d.nome),
                datasets: [{
                    label: '# of Votes',
                    data: dados.map(d => d.quantidade),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    })