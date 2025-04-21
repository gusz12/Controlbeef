
    function frigorifico() {
        let frigo = select_frigo.value;
        div_salas.innerHTML = '';
        if (frigo == 1) {
            div_salas.innerHTML = `
                <select id="select_sala" class="select_Sala">
                    <option value="#">Escolha uma sala</option>
                    <option value="1">Sala 1</option>
                    <option value="2">Sala 2</option>
                    <option value="2">Sala 3</option>
                </select>
                <button onclick="mostrar()">Mostrar gráfico</button>
            `
        }
    }

    function mostrar() {
        let sala = select_sala.value;
        div_container.innerHTML = '';
        div_container.innerHTML = `
            <div class="cabecalho">
            <h1>Sala: ${sala}</h1>    
            </div>
        `
        if (sala == 1) {
            var GraficoSala = [
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
            ];
            var dadosSala = {
                labels: GraficoSala,
                datasets: [{
                    label: 'Temperatura',
                    backgroundColor: 'rgb(93,215,237)',
                    borderColor: 'rgb(93,215,237)',
                    data: [4, 3, 2, 1, 0, -2],
                }]
            };
            var config = {
                type: 'line',
                data: dadosSala,
                options: {}
            };
            p_temp.innerHTML = '';
            var myChart = new Chart(
                document.getElementById('tabelaSala'),
                config
            );
            p_temp.innerHTML = `-2`
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

        if (sala == 2) {
            var GraficoSala = [
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
            ];
            var dadosSala = {
                labels: GraficoSala,
                datasets: [{
                    label: 'Temperatura',
                    backgroundColor: 'rgb(93,215,237)',
                    borderColor: 'rgb(93,215,237)',
                    data: [0, 1, 0, 1, 0, -2],
                }]
            };
            var config = {
                type: 'line',
                data: dadosSala,
                options: {}
            };
            var myChart = new Chart(
                document.getElementById('tabelaSala'),
                config
            );
            p_temp.innerHTML = `-2`
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
    }

    function EscolherSensores() {

        let area = select_area.value;
        if (area == '#') {
            alert('POR FAVOR ESCOLHA UMA ÁREA')
            return;
        }
        if (area == 1) {
            div_sensores.innerHTML += `
            <div class="tabelaSensores" id="tablesens">
            <h3>Sensores da área Sul</h3>

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
            <button onclick="sensores()">Mostrar gráficos</button>
            `
        }
    }

    function sensores() {

        if (chk_sensor1.checked) {
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

        if (chk_sensor2.checked) {
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
    
    }

