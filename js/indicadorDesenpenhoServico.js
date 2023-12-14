fetch("https://44.202.145.192:8080/usuario/indicador")
    .then(response => response.json())
    .then(dados => {

        console.log(dados)
        const ctx = document.getElementById('grafico');

        let testa = [1, 2, 3]
        let testb = [10, 20 ,30]
        console.log(dados.funcionarios.map(d => d.idFuncionario))
        console.log(dados.funcionarios.map(d => d.mediaEventosPorMes))

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dados.funcionarios.map(d => d.idFuncionario),
                datasets: [{
                    label: '# of Votes',
                    data: dados.funcionarios.map(d => d.mediaEventosPorMes),
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

        const num = document.getElementById("num-funcionarios")
        const media = document.getElementById("media");
        const moda = document.getElementById("moda");
        const mediana = document.getElementById("mediana");
        const desvio = document.getElementById("desvio");
        const max = document.getElementById("max");
        const min = document.getElementById("min");

        num.innerHTML += dados.numeroDeFuncionarios;
        media.innerHTML += dados.media;
        moda.innerHTML += dados.moda;
        mediana.innerHTML += dados.mediana;
        desvio.innerHTML += dados.desvioPadrao;
        max.innerHTML += dados.max;
        min.innerHTML += dados.min;





    })