var perda = 0;
var lucro = 0;
var lucroPerda = lucro * perda;
var lucroAfetado = lucro - lucroPerda;


function Calcular() {
    var carne = (ipt_carneInfo.value);
    var carneQnt = Number(ipt_carneQnt.value);
    var temperatura = Number(ipt_temp.value);
    var horas = Number(ipt_hora.value);
    var vendas = Number(ipt_precoV.value);
    var compras = Number(ipt_precoC.value);
    var perdaVendas = 0
    var perdaCompras = 0
    var receitaBruta = carneQnt * vendas
    var custoCompra = carneQnt * compras
    lucro = receitaBruta - custoCompra;
    // Máxima temperatura segura 4ºC
    // Mínima temperatura segura -3 para refrigeração, dps ela congela

    // Se a temperatura estiver entre -3°C e 4°C não há perda
    if (temperatura >= -3 && temperatura <= 4) {
        div_resp.innerHTML = `<p>O lote de ${carne} não sofrerá perdas dentro de 12 meses</p>`;
    }

    if (temperatura > 4) {
        // Se a temperatura for superior a 4°C
        if (horas >= 0 && horas <= 2) {
            // Até 2 horas → Sem perdas
            var tempoRest = 2 - horas;
            perda = 0;
            div_resp.innerHTML = ` <p>O lote de ${carne} não sofrerá perdas dentro de ${tempoRest} horas</p>`;
        } else if (horas <= 4) {
            // 2 - 4 horas → 2% de perda
            perda = 0.02;
        } else if (horas <= 8) {
            // 4 - 8 horas → 10% de perda
            perda = 0.1;
        } else if (horas <= 12) {
            // 8 - 12 horas → 20% de perda
            perda = 0.2;
        } else if (horas <= 24) {
            // 12 - 24 horas → 35% de perda
            perda = 0.35;
        } else {
            // Acima de 24 horas → 50% de perda
            perda = 0.5;
        }
    } else if (temperatura < -3) {
        // Se a temperatura for inferior a -3°C
        if (horas >= 0 && horas <= 2) {
            // Até 2 horas → Sem perdas
            var tempoRest = 2 - horas;
            perda = 0;
            div_resp.innerHTML = ` <p>O lote de ${carne} não sofrerá perdas dentro de ${tempoRest} horas</p>`;
        } else if (horas <= 23) {
            // Até 23 horas → 3% de perda
            perda = 0.03;
        } else if (horas <= 47) {
            // Até 47 horas → 7% de perda
            perda = 0.07;
        } else {
            // Acima de 47 horas → 15% de perda
            perda = 0.15;
        }
    }

    if (perda > 0) {
        perdaVendas = perda * vendas;
        perdaCarne = (vendas - perdaVendas) * carneQnt;
        lucroPerda = perdaCarne - custoCompra;
        lucroAfetado = lucro - lucroPerda;

        div_resp.innerHTML = `<p><b>Cada carne custará R$${perdaVendas.toFixed(2)} a menos na venda para o consumidor.
                Resultando em uma perda de R$${lucroAfetado.toFixed(2)} no lucro final.</b></p>`;

        if (perda === 0.5) {
            lucroAfetado = custoCompra;
            div_resp.innerHTML = `<p><b>O lote de ${carne} não poderá mais ser comercializado,
                podendo ir apenas para processamento ou apenas será descartado. <br>
                Resultando em uma perda total de <span style="color: red;">R$${lucroAfetado}.</span></b> <br>`;
        } else if (perda === 0.15) {
            div_resp.innerHTML += `<p><b><p>O lote de ${carne} poderá ir para o uso industrial (embutidos ou moída)</p></b> <br>`;
        }

        div_resp.innerHTML += `<button id="botaoDiv" onclick="VerMais()" style="margin-top: 0.5rem">Ver Mais</button>`;
    }
}

function VerMais() {
    var carne = (ipt_carneInfo.value);
    var carneQnt = Number(ipt_carneQnt.value);
    var temperatura = Number(ipt_temp.value);
    var horas = Number(ipt_hora.value);
    var vendas = Number(ipt_precoV.value);
    var compras = Number(ipt_precoC.value);
    var custoCompra = carneQnt * compras

    lucro = (carneQnt * vendas) - (carneQnt * compras);
    lucroPerda = lucro - lucroAfetado

    if (perda === 0.5) {
        lucroPerda = custoCompra;  // Prejuízo total é o custo de compra
        lucro = 0;  // Não há mais lucro
    }

    // alterando o style da div "botaoDiv" -> ela vai para o display: "none", ou seja, some.
    botaoDiv.style.display = "none";

    div_resp.innerHTML += `
        <p style="text-align: justify; line-height: 1.6;">
            A carne ficou exposta a uma temperatura de <br>
            <b>${temperatura}°C</b> por <b>${horas}</b> horas.<br><br>

            De acordo com o tempo fora da temperatura segura
            (que normalmente é de <b>-3°C a 4°C</b>), <br>
            aplicamos uma taxa de deterioração de <b>${perda * 100}%</b>.<br><br>

            ${perda === 0.5 ? `Devido à deterioração extrema, o lote não poderá ser vendido,
            resultando em uma perda total de <b>R$${lucroPerda.toFixed(2)}</b>, equivalente ao valor de compra do lote.`
            : `Isso significa que a carne perderá <b>${perda * 100}%</b> de seu valor de venda por peça.<br><br>
            Como resultado, a perda estimada no lucro total do lote será de <b>R$${lucroAfetado.toFixed(2)}</b>,
             considerando que o lucro original seria de <b>R$${lucro.toFixed(2)}</b>.<br>
             <b>Lucro final: R$${lucroPerda.toFixed(2)}</b>`
        }
        </p>
`;
    }