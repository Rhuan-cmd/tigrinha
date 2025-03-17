document.addEventListener("DOMContentLoaded", function() {
    const Aviso_Recarga = document.getElementById("aviso_recarga");
    const Confirmar = document.getElementById("confirmar");

    function recarregar(){
        const Entrada = document.getElementById("entrada").value.trim();
    
        if (Entrada === "/limparcache") {
            localStorage.clear();
            alert("Cache clean");
            return false;
        } else if (!isNaN(parseFloat(Entrada)) && isFinite(Entrada)) {
            localStorage.setItem("pedido", Entrada);
            return true;
        } else {
            alert("Ensira um Número Valido");
            return false;
        }
    }

    function mensagemRecarga(){
        Aviso_Recarga.style.display = "block";
        setTimeout(() =>{
            Aviso_Recarga.style.display = "none";
        }, 3000);
    }

    Confirmar.addEventListener("click", function() {
        if (recarregar()) {
            Aviso_Recarga.textContent = "Recarga feita com sucesso";
            mensagemRecarga();
        }
    });


});
