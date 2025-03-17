document.addEventListener("DOMContentLoaded", function() {
    const SaldoAtual = document.getElementById("saldo");
    const ValorAposta = document.getElementById("valorAposta");
    const Mais = document.getElementById("mais");
    const Menos = document.getElementById("menos");
    const Girar = document.getElementById("apostar");
    const Ganhou = document.getElementById("ganhou");
    const Pedido = document.getElementById("pedido");

    let saldo = 0.00

    //Atualizar o valor da aposta
    let ValorApostado = 0
    function atualizarAposta(){
        ValorAposta.textContent = ValorApostado.toFixed(2);
    }

    // Gera um número aleatório entre 1 e 3
    function numeroAleatorio() {
        return Math.floor(Math.random() * 3) + 1;
    }

    //Muda as Imagens
    function atualizarImagens() {
        const index1 = numeroAleatorio();
        const index2 = numeroAleatorio();
        const index3 = numeroAleatorio();

        document.querySelector(".fila1 img").src = `Tela Principal/visuais/img${index1}.png`;
        document.querySelector(".fila2 img").src = `Tela Principal/visuais/img${index2}.png`;
        document.querySelector(".fila3 img").src = `Tela Principal/visuais/img${index3}.png`;

        return [index1, index2, index3];
    }

    function verificarResultado(resultado){
        return resultado[0] === resultado[1] && resultado[1] === resultado[2];
    }
    function mensagemGanho(){
        Ganhou.style.display = "block";
        setTimeout(() =>{
            Ganhou.style.display = "none";
        }, 2000);
    }
    function resgatePedido(){
        const valordopedido = localStorage.getItem("pedido");
        const recarga = parseFloat(valordopedido);

        if (!isNaN(recarga)) {
            saldo += recarga;
            SaldoAtual.textContent = saldo.toFixed(2);
            localStorage.removeItem("pedido")
            salvar();
        } else{
            alert("Pedido Não Encontrado");
        }
    }
    //Botão de aumentar a aposta
    Mais.addEventListener("click", function() {
        ValorApostado += 1;
        atualizarAposta();
        salvar();
    });

    //Botão de diminuir a aposta
    Menos.addEventListener("click", function() {
        if (ValorApostado > 0) {
            ValorApostado -= 1;
            atualizarAposta();
            salvar();
        }
    });

    //Botão de Apostar
    Girar.addEventListener("click", function() {
        if (ValorApostado === 0) {
            alert("Sua aposta não pode ser igual a 0");
            return;
        }

       if (ValorApostado > saldo) {
        Ganhou.textContent = `Saldo Insuficiente`
        mensagemGanho();
        return;
       }

       const resultado = atualizarImagens();
       const ganho = ValorApostado * 0.5;

       if (verificarResultado(resultado)) {
        saldo += ganho;
        SaldoAtual.textContent = saldo.toFixed(2);
        Ganhou.textContent = `Você ganhou ${ganho.toFixed(2)}`;
        mensagemGanho();
       } else {
        saldo -= ValorApostado;
        SaldoAtual.textContent = saldo.toFixed(2);
        Ganhou.textContent = `Você perdeu ${ValorApostado.toFixed(2)}`;
        mensagemGanho();
       }

       salvar();
    });

    Pedido.addEventListener("click", function() {
        resgatePedido();
    });

    function salvar() {
        const Cache = localStorage.setItem("Dados", saldo.toFixed(2));
    }

    window.addEventListener("load", function() {
        const Recuperar = localStorage.getItem("Dados")
         
        if (Recuperar !== null) {
            const ValorRecuperado = parseFloat(Recuperar);
            saldo += ValorRecuperado;

            SaldoAtual.textContent = saldo.toFixed(2);
        } else {
            console.log("Nenhum saldo encontrado")
        }
    });
});
