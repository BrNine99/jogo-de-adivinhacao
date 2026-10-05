/*
=================================
JOGO DE ADIVINHAÇÃO
=================================

ETAPAS DO JOGO:

1. Gerar o numero aleatório.
2. Obter numero do usuário.
3. Comparar o valor do usuario com numero gerado.
4. Exibir mensagem de erro ou acerto.
5. Atualizar interface.

*/

//===============================
// 1. OBTER ELEMENTOS
//===============================

const obterElemento = (id) => document.getElementById(id);

//===============================
// 2. GERAR E GUARDAR NUMERO SECRETO
//===============================

const numeroAleatorio = () => {
    return Math.floor(Math.random() * 100) + 1;    
}

const numeroComputador = numeroAleatorio();

//==============================
// 3. OBTER NUMERO DO USUÁRIO
//==============================

const numeroUsuario = () => {
   return parseInt(obterElemento("guess").value);
}

//==============================
// 4. FUNÇÕES AUXILIARES
//==============================

//Verifica de numero é entre 0 e 100.
const numeroInvalido = (valor) => (valor < 1) || (valor > 100);

//Limpa o campo digitado pelo usuario
const limpaCampo = () => {
    obterElemento("guess").value = ""; 
}

const desabilitarBotao = () => {
    const botao = obterElemento("meuBotao");
    botao.disabled = true;
};

//Contador de Tentativas
const maximoTentativas = 10
let contador = maximoTentativas;


//==============================
// 5. ATUALIZA INTERFACE
//==============================

const exibirMensagem = (texto) => {
    const mensagem = obterElemento("mensagem");
    mensagem.textContent = texto;
}

const tentativasRealizadas = (valor) => {
    const mensagemCont = obterElemento("tentativas");
    mensagemCont.textContent = `Você acertou em ${valor} tentativas.`
}

const atualizaContador = (valor) => {
    const tentativas = obterElemento("tentativas");
    tentativas.textContent = `Numero de tentativas restantes: ${valor}`;
}

//======================================
// 6. FUNÇÃO PRINCIPAL
//======================================

function chutar() {
    
    const numeroEscolhido = numeroUsuario();
            
    //Valida o valor digitado pelo usuário
    if(!Number.isFinite(numeroEscolhido) || numeroInvalido(numeroEscolhido)) {
        alert("Numero inválido! Escolha um numero entre 1 e 100.");
        return;
    }

    //Classifica o valor com o escolhido pelo computador.
    if (numeroComputador < numeroEscolhido) {
        exibirMensagem("O numero secreto é menor.");        
    }

    else if (numeroComputador > numeroEscolhido) {        
        exibirMensagem("O numero secreto é maior.");        
    }

    else {
        exibirMensagem(`Parabéns, você acertou! O numero escolhido foi ${numeroComputador}`);
        const totalTentativas = maximoTentativas - contador + 1;
        tentativasRealizadas(totalTentativas);
        desabilitarBotao();
        return;        
    }

    contador--;
    atualizaContador(contador);
    limpaCampo();

    //Verifica se contador chegou a 0 e revela numero secreto.
    if (contador === 0) {
        exibirMensagem(`Você perdeu! O numero  era ${numeroComputador}`);
        desabilitarBotao();
        return;       
    }
}




