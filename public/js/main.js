//login
var email;
var nome;

var tentativas = 5;
function redirectDash() {
    while (tentativas > 0) {
        let email = ipt_email.value;
        let senha = ipt_senha.value;

        if ((email == "lucas.previtero@controlbeef.com" ||
            email == "vitorio.bearari@controlbeef.com" ||
            email == "gustavo.menezes@controlbeef.com" ||
            email == "gabriel.torres@controlbeef.com" ||
            email == "arthur.ferreira@controlbeef.com" ||
            email == "celina.benedito@controlbeef.com") && senha == "123") {
            if (email == "celina.benedito@controlbeef.com") {
                nome = "Celina";
            } else if (email == "lucas.previtero@controlbeef.com") {
                nome = "Lucas";
            } else if (email == "vitorio.bearari@controlbeef.com") {
                nome = "Vitório";
            } else if (email == "gustavo.menezes@controlbeef.com") {
                nome = "Gustavo";
            } else if (email == "gabriel.torres@controlbeef.com") {
                nome = "Gabriel";
            } else if (email == "arthur.ferreira@controlbeef.com") {
                nome = "Arthur";
            }

            alert("Login efetuado com sucesso✔");

            div_buttonDash.innerHTML = `
                <a href='dashboard.html'>Acessar dashboard</a>
            `;
            break;
        } else {
            tentativas--;
            alert(`ERRO: Email ou senha incorreta.Tentativas restantes: ${tentativas}`);
            break;
        }
    }

    if (tentativas == 0) {
        alert("Você excedeu o número máximo de tentativas. Acesso bloqueado.");
       div_buttonDash.innerHTML = '';
    }
}

//dashboard
nome_lateral.innerHTML = `User`;
bem_vindo.innerHTML = `Bem-Vindo de volta.`;



subgraficos.style.display = "none";


function frigorifico() {

    graficoFrigorifico.style.display = "";
    limpar_sub.innerHTML = ` <div class="subgraficos" id="subgraficos"></div>`
    let frigo = select_frigo.value;
    if (frigo == '#') {
        alert('POR FAVOR ESCOLHA UM FRIGORIFICO')
        graficoFrigorifico.innerHTML = " "
        return;
    }
    graficoFrigorifico.innerHTML = `<br><br><h2>Gráfico geral do frigorífico:</h2><br><canvas id="graficoMain"></canvas>`


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
                </div>
                <div id="subgrafico_salas" class="subgraficos"></div>
                </div>
        `
    if (frigo == 1) {
        subgraficos.innerHTML = `
                <div class="graficoSensores">
                <div>
                <h2>Dias da mediana <br> dentro ou fora do limite (%):</h2>
                <canvas id="graficoSub"></canvas>
                </div>
                
            </div>
            <div class="kpi">
                <div class="alertas">Média mais alta: <br>3,5ºC</div>
                <div class="alertas">Média mais baixa: <br>-2,7ºC</div>
                <div class="alertas">Mediana mais alta: <br>4º</div>
                <div class="alertas">Mediana mais baixa: <br>-3,6º</div>
                <div class="alertas-vermelho">ALERTAS: <br>4</div>
               

            </div>`
        //dados KPI
        let dadosFrigoPizza = {
            labels: ['Dentro da faixa (%)', 'Fora da faixa (%)'],
            datasets: [{
                label: 'Sensores',
                backgroundColor: [
                    '#5dd7ed',
                    '#1b7f91',
                    '#a3f1ff'
                ],
                data: [86, 14],
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
        const graf1 = document.getElementById('graficoMain');

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
                    label: 'Temperatura média do mês (ºC)',
                    data:
                        [1.2, 0.8, -1.1, 2.4, 3.0, 0.5, -0.7, 1.9, -2.3, 0.1, 2.7, 1.4, 0.0, -1.5, 3.3, 2.0, -0.9, 1.7, 2.9, -2.1, 0.6, -1.7, -0.2, 3.5, 1.0, 2.3, -0.5, -2.7, 0.3, 1.8],
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
    }

}
function mostrar() {
    limpar_sub.innerHTML = ""
    let sala = select_sala.value;
    if (sala == '#') {
        alert('POR FAVOR ESCOLHA UMA SALA')
        return;
    }
    graficoFrigorifico.style.display = "none";
    div_cabecalho.innerHTML = `<h1>Sala: ${sala}</h1>`


    if (sala == 1) {
        sala1.style.display = "";
        subgrafico_salas.innerHTML = `
              <div class="graficoSensores">
                <div>
               <h2>Tempo da mediana <br> dentro ou fora do limite (%):</h2>
                <canvas id="graficoSub1"></canvas>
                </div>
                
            </div>
            <div class="kpi">
                <div class="alertas">Mediana mais alta: <br>4,3º</div>
                <div class="alertas">Mediana mais baixa: <br>-3,4º</div>
                <div class="alertas-vermelho">ALERTAS: <br>7</div>
                <div class="alertas-none"><br></div>
               
            </div>`

        sala2.style.display = "none";
        sala3.style.display = "none";

        let dadosFrigoPizza = {
            labels: ['Dentro da faixa (%)', 'Fora da faixa (%)'],
            datasets: [{
                label: 'Sensores',
                backgroundColor: [
                    '#5dd7ed',
                    '#1b7f91',
                    '#a3f1ff'
                ],
                data: [73, 27],
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
            document.getElementById('graficoSub1'),
            configFrigoPizza
        );

        const graf2 = document.getElementById('tabelaSala1');

        new Chart(graf2, {
            type: 'line',
            data: {
                labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'
                ],
                datasets: [{

                    label: 'Temperatura máxima ideal',
                    data:
                        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                    borderWidth: 3
                }, {

                    label: 'Temperatura mínima ideal',
                    data:
                        [-3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura sensor 1 (ºC)',
                    data:
                        [-2.3, -2.7, -3.4, -1.9, -1.7, 0.8, 3.9, 4.6, 2.5, 0.3, -3.4, -2.6],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura sensor 2 (ºC)',
                    data:
                        [-2, -2.5, -2.8, -2.1, -2, 1, 4.2, 3.8, 2.7, -0.2, -2.8, -2.9
                        ],
                    borderWidth: 3
                },
                {
                    label: 'Temperatura sensor 3 (ºC)',
                    data:
                        [-1.8, -2.4, -3.1, -1.5, -1.4, 0.6, 3.5, 4.1, 2.9, 0.1, -3.1, -2.3
                        ],
                    borderWidth: 3
                },




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
                <div>
               <h2>Tempo da mediana <br> dentro ou fora do limite (%):</h2>
                <canvas id="graficoSub2"></canvas>
                </div>
                
            </div>
            <div class="kpi">
                <div class="alertas">Mediana mais alta: <br>-1º</div>
                <div class="alertas">Mediana mais baixa: <br>-7º</div>
                <div class="alertas-vermelho">ALERTAS: <br>20</div>
                <div class="alertas-none"><br></div>
`
        sala1.style.display = "none";
        sala3.style.display = "none";

        let dadosSala2Pizza = {
            labels: ['Dentro da faixa (%)', 'Fora da faixa (%)'],
            datasets: [{
                label: 'Sensores',
                backgroundColor: [
                    '#5dd7ed',
                    '#1b7f91',
                    '#a3f1ff'
                ],
                data: [58, 42],
            }]
        };
        let configSala2Pizza = {
            type: 'pie',
            data: dadosSala2Pizza,
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
            document.getElementById('graficoSub2'),
            configSala2Pizza
        );

        const graf3 = document.getElementById('tabelaSala2');

        new Chart(graf3, {
            type: 'line',
            data: {
                labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'
                ],
                datasets: [{

                    label: 'Temperatura máxima ideal',
                    data:
                        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                    borderWidth: 3
                }, {

                    label: 'Temperatura mínima ideal',
                    data:
                        [-3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura sensor 1 (ºC)',
                    data:
                        [-4.2, -2.4, -3.7, -1.6, -4.7, -3, -1.5, -2, -3.9, -5, -1, -3.5
                        ],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura sensor 2 (ºC)',
                    data:
                        [-7, -6, -4, -3, -4, -2, -2.9 - 3, -3.2, -2.1, -3, -4],
                    borderWidth: 3
                },
                {
                    label: 'Temperatura sensor 3 (ºC)',
                    data:
                        [-4, -3, -7, -6.3, -3.1, -3, -3.1, -2, -3.1, -3, -4, -6,],
                    borderWidth: 3
                },




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
                <div>
               <h2>Tempo da mediana <br> dentro ou fora do limite (%):</h2>
                <canvas id="graficoSub3"></canvas>
                </div>
                
            </div>
            <div class="kpi">
                <div class="alertas">Mediana mais alta: <br>3,8º</div>
                <div class="alertas">Mediana mais baixa: <br>-5,1º</div>
                <div class="alertas-vermelho">ALERTAS: <br>3</div>
                <div class="alertas-none"><br></div>
`
        sala1.style.display = "none";
        sala2.style.display = "none";

        let dadosSala3Pizza = {
            labels: ['Dentro da faixa (%)', 'Fora da faixa (%)'],
            datasets: [{
                label: 'Sensores',
                backgroundColor: [
                    '#5dd7ed',
                    '#1b7f91',
                    '#a3f1ff'
                ],
                data: [91, 9],
            }]
        };
        let configSala3Pizza = {
            type: 'pie',
            data: dadosSala3Pizza,
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
            document.getElementById('graficoSub3'),
            configSala3Pizza
        );

        const graf4 = document.getElementById('tabelaSala3');

        new Chart(graf4, {
            type: 'line',
            data: {
                labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'
                ],
                datasets: [{

                    label: 'Temperatura máxima ideal',
                    data:
                        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                    borderWidth: 3
                }, {

                    label: 'Temperatura mínima ideal',
                    data:
                        [-3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura sensor 1 (ºC)',
                    data:
                        [-1.9, -2.5, -3.5, -1.8, -1.4, 1.5, 3.5, 2.9, 2.8, 0.7, -2.9, -2.2
                        ],
                    borderWidth: 3
                },
                {

                    label: 'Temperatura sensor 2 (ºC)',
                    data:
                        [-2.3, -2.7, -3 - 2.1, -1.6, 1.3, 3.8, 3, 2.9, 0.5, -2.6, -2.5
                        ],
                    borderWidth: 3
                },
                {
                    label: 'Temperatura sensor 3 (ºC)',
                    data:
                        [-2, -2.2, -3.2, -1.5, -1.1, 1, 2, 3.5, 3.1, 0.3, -2.8, -2,
                        ],
                    borderWidth: 3
                },




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
    /*  div_sensores.innerHTML = `
      <select id="select_area">
          <option value="#">Selecione o setor da sala</option>
          <option value="1">Sul</option>
          <option value="2">Leste</option>
          <option value="3">Norte</option>
          <option value="4">Oeste</option>
      </select>
      <button onclick="EscolherSensores()">Enviar</button>
      `*/
}
/*   function EscolherSensores() {

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
                   Sensor 1
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
           </div>
      </div>
       <button onclick="sensores1()">Mostrar gráficos</button>
       `
   }
}

let graficoSensor1;
   function sensores1() {
       
   if (chk_sensor1.checked) {
      // sensor1.style.display = "";
      console.log(sensor1)
   
      if(!graficoSensor1){
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

       graficoSensor1 = new Chart(
           document.getElementById('sensor1'),
           config
       );
      }
      
      
   }
  // else{
   //    sensor1.style.display = "none";
  // }

   if (chk_sensor2.checked) {
       //sensor2.style.display = "";


       var Sensor2 = [
           "12:00",
           "13:00",
           "14:00",
           "15:00",
           "16:00",
           "17:00",
       ];
       var dadosSensor2 = {
           labels: Sensor2,
           datasets: [{
               label: 'Temperatura',
               backgroundColor: 'rgb(93,215,237)',
               borderColor: 'rgb(93,215,237)',
               data: [0, 1, -1, 1, 0, -2],
           }]
       };
       var config2 = {
           type: 'line',
           data: dadosSensor2,
           options: {}
       };

       var myChart = new Chart(
           document.getElementById('sensor2'),
           config2
       );
   }
  // else{
      // sensor2.style.display = "none";
 
  // }

}*/