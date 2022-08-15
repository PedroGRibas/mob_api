
const botaoAnt = document.querySelector('#botaoAnt');
const botaoProx = document.querySelector('#botaoProx')
botaoAnt.addEventListener("click", funcAnt);
botaoProx.addEventListener("click", funcProx);
const indexAtual = document.querySelector('#index').textContent



 function funcProx() {
    if (parseInt(indexAtual) >= 0) {
        const proxIndex  = parseInt(indexAtual) + 1;
        window.location.href = "http://localhost:3000/" + proxIndex 
    }
}
function funcAnt() {
    const indexAnt  = parseInt(indexAtual) -1;
    window.location.href = "http://localhost:3000/" + indexAnt   ; 
}
