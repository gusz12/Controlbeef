//login
let email;
let nome;
function redirectDash() {
    let email = ipt_email.value;
    let senha = ipt_senha.value;
    let pass;
    if ((email == "lucas.previtero@controlbeef.com" || email == "vitorio.bearari@controlbeef.com" || email == "gustavo.menezes@controlbeef.com" || email == "gabriel.torres@controlbeef.com" || email == "arthur.ferreira@controlbeef.com" || email == "celina.benedito@controlbeef.com") && senha == "123") {
        if (email == "celina.benedito@controlbeef.com") {
            nome = "Celina";
        }
        else if (email == "lucas.previtero@controlbeef.com") {
            nome = "Lucas";
        }
        else if (email == "vitorio.bearari@controlbeef.com") {
            nome = "Vitório";
        }
        else if (email == "gustavo.menezes@controlbeef.com") {
            nome = "Gustavo";
        }
        else if (email == "gabriel.torres@controlbeef.com") {
            nome = "Gabriel";
        }
        else if (email == "arthur.ferreira@controlbeef.com") {
            nome = "Arthur";
        }

        alert("Login efetuado com sucesso✔");

        div_buttonDash.innerHTML = `
     <a href='dashboard.html'>Acessar dashboard</a> `
    } else {
        alert("ERRO: Email ou senha incorreta.")
    }
}
//dashboard

if (email == true) {
    nome_lateral.innerHTML = `${nome}`
    bem_vindo.innerHTML = `Bem Vindo, ${nome}`
}


subgraficos.style.display = "none";
graficoFrigorifico.innerHTML = `<canvas id="graficoMain"></canvas>`

    function frigorifico() {
    graficoFrigorifico.style.display = "";
    limpar_sub.innerHTML = ` <div class="subgraficos" id="subgraficos"></div>`
    let frigo = select_frigo.value;
    div_salas.innerHTML = `
            <select id="select_sala" class="select_Sala">
                <option value="#">Escolha uma sala</option>
                <option value="1">Sala 1</option>
                <option value="2">Sala 2</option>
                <option value="3">Sala 3</option>
            </select>
            <button onclick="mostrar()">Mostrar gráfico</button>
        `
    div_container.innerHTML = `
                <div class="cabecalho" id="div_cabecalho"></div>
                <div class="tabelas">
                <div class="salas sala1" id="sala1">
                    <canvas id="tabelaSala1"></canvas>
                </div>
                <div class="salas sala2" id="sala2">
                    <canvas id="tabelaSala2"></canvas>
                </div>
                <div class="salas sala3" id="sala3">
                    <canvas id="tabelaSala3"></canvas>
                </div>
                <div id="subgrafico_salas" class="subgraficos"></div>
                </div>
        `
    if (frigo == 1) {
        subgraficos.innerHTML = `
                <div class="graficoSensores">
                <div>
                <h2>Sensores <br>Ativos e Inativos:</h2>
                <canvas id="graficoSub"></canvas>
                </div>
                
            </div>
            <div class="kpi">
                <div class="alertas">Temperatura Máxima: <br>4ºC</div>
                <div class="alertas">Temperatura Mínima: <br>-1ºC</div>
                <div class="alertas">Data da captura: <br>22/04/2025</div>
                <div class="alertas">Horário da última captura: <br>17:00</div>
            </div>`
        //dados KPI
        let dadosFrigoPizza = {
            labels: ['Ativos', 'Inativos'],
            datasets: [{
                label: 'Sensores',
                backgroundColor: [
                    '#5dd7ed',
                    '#1b7f91',
                    '#a3f1ff'
                ],
                data: [12, 1],
            }]
        };
        let configFrigoPizza = {
            type: 'pie',
            data: dadosFrigoPizza,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        };
        let chartPizza = new Chart(
            document.getElementById('graficoSub'),
            configFrigoPizza
        );

        //dados frigorifico
        let graficoFrigXPTO = [
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
        ];
        let dadosFrigo = {
            labels: graficoFrigXPTO,
            datasets: [{
                label: 'Temperatura (ºC)',
                data: [4, 3, 0, -1, 0, 3],
                borderColor: '#5dd7ed',
                backgroundColor: '#5dd7ed',
                borderWidth: 3,
                tension: .4
            }]
        };
        let configFrigo = {
            type: 'line',
            data: dadosFrigo,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        let Chart1 = new Chart(
            document.getElementById('graficoMain'),
            configFrigo
        );
    }

}
    function mostrar() {
    graficoFrigorifico.style.display = "none";
    limpar_sub.innerHTML = ""
    let sala = select_sala.value;
    div_cabecalho.innerHTML = `<h1>Sala: ${sala}</h1>`

    if (sala == 1) {
        sala1.style.display = "";
        subgrafico_salas.innerHTML += `
              <div class="graficoSensores">
                <div>
                <h2>Sensores <br>Ativos e Inativos:</h2>
                <canvas id="graficoSub1"></canvas>
                </div>
                
            </div>
            <div class="kpi">
                <div class="alertas">Temperatura Máxima: <br>4ºC</div>
                <div class="alertas">Temperatura Mínima: <br>-1ºC</div>
                <div class="alertas">Data da captura: <br>22/04/2025</div>
                <div class="alertas">Horário da última captura: <br>17:00</div>
            </div>`

        sala2.style.display = "none";
        sala3.style.display = "none";

        let dadosSala1Pizza = {
            labels: ['Ativos', 'Inativos'],
            datasets: [{
                label: 'Sensores',
                backgroundColor: [
                    '#5dd7ed',
                    '#1b7f91',
                    '#a3f1ff'
                ],
                data: [10, 2],
            }]
        };
        let configSala1Pizza = {
            type: 'pie',
            data: dadosSala1Pizza,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        };
        let chartPizza = new Chart(
            document.getElementById('graficoSub1'),
            configSala1Pizza
        );

        const graf1 = document.getElementById('tabelaSala1');

        new Chart(graf1, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                datasets: [{

                    label: 'Temperatura mediana do mês (ºC)',
                    data:
                        [1.8, 2.6, 3.5, -1.2, 0.7, -2.8, -3.6, 2.9, 3.2, -1.4, 0.2, 1.0, -0.5, -2.0, 2.4, -3.1, 2.8, 3.6, -2.5, 1.9, 2.5, -1.8, 0.3, 4.0, -0.7, 1.7, 2.2, -3.3, 0.9, 3.4],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura máxima ideal',
                    data:
                        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura mínima ideal',
                    data:
                        [-3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3],
                    borderWidth: 3
                }



                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        sala2.innerHTML = `
        <canvas id="tabelaSala2"></canvas>
        `
        sala3.innerHTML = `
        <canvas id="tabelaSala3"></canvas>
        `

    }
    if (sala == 2) {
        sala2.style.display = "";
        subgrafico_salas.innerHTML = `
        <div class="graficoSensores">
        <h2>Sensores <br>Ativos e Inativos:</h2>
            <canvas id="graficoSub2"></canvas>
        </div>
        <div class="kpi">
            <div class="alertas">Temperatura Máxima: <br>4ºC</div>
            <div class="alertas">Temperatura Mínima: <br>-1ºC</div>
            <div class="alertas">Data da captura: <br>18/03/2025</div>
            <div class="alertas">Horário da última captura: <br>15:23</div>
`
        sala1.style.display = "none";
        sala3.style.display = "none";
        const graf2 = document.getElementById('tabelaSala2');

        new Chart(graf2, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                datasets: [{

                    label: 'Temperatura mediana do mês (ºC)',
                    data:
                        [1.8, 2, 3.5, -1.2, 0.7, -2.8, -3.6, 2.9, 3.2, -1, 0.2, 1.0, -0.5, -2, 2, -3.1, 2.8, 3, -2.5, 1.9, 2.5, -1.8, 0.3, 4.0, -0.7, 1, 2.2, -3.3, 0.9, 3.4],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura máxima ideal',
                    data:
                        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura mínima ideal',
                    data:
                        [-3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3],
                    borderWidth: 3
                }



                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        sala1.innerHTML = `
        <canvas id="tabelaSala1"></canvas>
        `
        sala3.innerHTML = `
        <canvas id="tabelaSala3"></canvas>
        `


    }
    if (sala == 3) {
        sala3.style.display = "";
        subgrafico_salas.innerHTML = `
        <div class="graficoSensores">
        <h2>Sensores <br>Ativos e Inativos:</h2>
            <canvas id="graficoSub3"></canvas>
        </div>
        <div class="kpi">
            <div class="alertas">Temperatura Máxima: <br>4ºC</div>
            <div class="alertas">Temperatura Mínima: <br>-1ºC</div>
            <div class="alertas">Data da captura: <br>18/03/2025</div>
            <div class="alertas">Horário da última captura: <br>15:23</div>
`
        sala1.style.display = "none";
        sala2.style.display = "none";
        const graf3 = document.getElementById('tabelaSala3');

        new Chart(graf3, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                datasets: [{

                    label: 'Temperatura mediana do mês (ºC)',
                    data:
                        [1.8, 2, 3.5, -1, 0.7, -2.8, -3.6, 2.9, 3.2, -1, 0.2, 1.0, -0.5, -2, 2, -3.1, 2.8, 3, -2, 1.9, 2.5, -1.8, 0.3, 4.0, -0.7, 1, 2, -3.3, 0.9, 3],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura máxima ideal',
                    data:
                        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura mínima ideal',
                    data:
                        [-3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3],
                    borderWidth: 3
                }



                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        sala1.innerHTML = `
        <canvas id="tabelaSala1"></canvas>
        `
        sala2.innerHTML = `
        <canvas id="tabelaSala2"></canvas>
        `
    }
    div_sensores.innerHTML = `
    <select id="select_area">
        <option value="#">Selecione o setor da sala</option>
        <option value="1">Sul</option>
        <option value="2">Leste</option>
        <option value="3">Norte</option>
        <option value="4">Oeste</option>
    </select>
    <button onclick="EscolherSensores()">Enviar</button>
    `
}
    function EscolherSensores() {

    let area = select_area.value;
    if (area == '#') {
        alert('POR FAVOR ESCOLHA UMA ÁREA')
        return;
    }
    if (area == 1) {
        div_sensores.innerHTML += `
        <div class="tabelaSensores">
        <h3>Sensores da área Sul</h3>
            <div class="separacao">
                <div class="item sensor1" id="item">
                    sensor 1
                    <input type="checkbox" id="chk_sensor1"><br>
                    <canvas id="sensor1"></canvas><br>
                </div>

                <div class="item sensor2">
                    Sensor 2
                    <input type="checkbox" id="chk_sensor2"><br>
                    <canvas id="sensor2"></canvas><br>
                </div>

                <div class="item sensor3">
                    Sensor 3
                    <input type="checkbox" id="chk_sensor3"><br>
                    <canvas id="sensor3"></canvas><br>
                </div>

                <div class="item sensor4"
                    Sensor 4
                    <input type="checkbox" id="chk_sensor4"><br>
                    <canvas id="sensor4"></canvas><br>
                </div>

                <div class="item sensor5">
                    Sensor 5
                    <input type="checkbox" id="chk_sensor5"><br>
                    <canvas id="sensor5"></canvas><br>  
                </div>
            </div>
       </div>
        <button onclick="sensores()">Mostrar gráficos</button>
        `
    }
}
    function sensores() {
        
    if (chk_sensor1.checked) {
        sensor1.style.display = "";
        var Sensor1 = [
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
        ];
        var dadosSensor1 = {
            labels: Sensor1,
            datasets: [{
                label: 'Temperatura',
                backgroundColor: 'rgb(93,215,237)',
                borderColor: 'rgb(93,215,237)',
                data: [4, 3, 2, 1, 0, -2],
            }]
        };
        var config = {
            type: 'line',
            data: dadosSensor1,
            options: {}
        };

        var myChart = new Chart(
            document.getElementById('sensor1'),
            config
        );
    }
    else{
        sensor1.style.display = "none";
    }

    if (chk_sensor2.checked) {
        sensor2.style.display = "";

        var Sensor1 = [
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
        ];
        var dadosSensor1 = {
            labels: Sensor1,
            datasets: [{
                label: 'Temperatura',
                backgroundColor: 'rgb(93,215,237)',
                borderColor: 'rgb(93,215,237)',
                data: [0, 1, -1, 1, 0, -2],
            }]
        };
        var config = {
            type: 'line',
            data: dadosSensor1,
            options: {}
        };

        var myChart = new Chart(
            document.getElementById('sensor2'),
            config
        );
    }
    else{
        sensor2.style.display = "none";
    }

}