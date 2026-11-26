// NATAL CRIANÇA FELIZ 2026
// Versão 1.1 - Integração Pública

const API_URL = "https://script.google.com/macros/s/AKfycbwpCvKbgIt0tGd1ehkdlKSBUaQqYBNMaB8-Z16YBW3dIM53sO3TsL7VXebrFLXkj2w/exec";

// COPIAR CHAVE PIX

async function copiarPix() {
  const chave = document
    .getElementById("chavePix")
    .textContent.trim();

  const mensagem = document
    .getElementById("mensagemPix");

  try {
    await navigator.clipboard.writeText(chave);

    mensagem.textContent =
      "✓ Chave Pix copiada com sucesso!";

    setTimeout(() => {
      mensagem.textContent = "";
    }, 5000);

  } catch (erro) {
    mensagem.textContent =
      "Copie a chave manualmente.";
  }
}

// FORMATAÇÃO MONETÁRIA

function formatarMoeda(valor) {
  return Number(valor).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  );
}

// ATUALIZAR ELEMENTOS

function atualizarTexto(id, valor) {
  const elemento = document.getElementById(id);

  if (elemento) {
    elemento.textContent = valor;
  }
}

// CARREGAR DADOS DA API

async function carregarPainel() {

  try {

    const resposta = await fetch(API_URL, {
      cache: "no-store"
    });

    if (!resposta.ok) {
      throw new Error("Falha na conexão");
    }

    const dados = await resposta.json();

    if (!dados.sucesso) {
      throw new Error("API indisponível");
    }

    // VALORES FINANCEIROS

    atualizarTexto(
      "totalArrecadado",
      formatarMoeda(dados.receitas)
    );

    atualizarTexto(
      "receitas",
      formatarMoeda(dados.receitas)
    );

    atualizarTexto(
      "despesas",
      formatarMoeda(dados.despesas)
    );

    atualizarTexto(
      "rendimentos",
      formatarMoeda(dados.rendimentos)
    );

    atualizarTexto(
      "saldo",
      formatarMoeda(dados.saldo)
    );

    // KITS

    atualizarTexto(
      "kitsMontados",
      dados.kitsMontados
    );

    atualizarTexto(
      "kitsEntregues",
      dados.kitsEntregues
    );

    // MURAL DE COLABORADORES

    const mural = document.getElementById(
      "listaColaboradores"
    );

    mural.replaceChildren();

    if (dados.colaboradores.length === 0) {

      mural.textContent =
        "Seja um dos nossos colaboradores!";

    } else {

      dados.colaboradores.forEach(nome => {

        const item = document.createElement("p");

        item.textContent = "❤️ " + nome;

        mural.appendChild(item);

      });

    }

    // PRESTAÇÃO DE CONTAS

    const lista = document.getElementById(
      "listaDespesas"
    );

    lista.replaceChildren();

    if (dados.listaDespesas.length === 0) {

      lista.textContent =
        "Nenhuma despesa registrada até o momento.";

    } else {

      dados.listaDespesas.forEach(despesa => {

        const item = document.createElement("p");

        item.textContent =
          despesa.descricao +
          " — " +
          formatarMoeda(despesa.valor);

        lista.appendChild(item);

      });

    }

    console.log("Painel atualizado com sucesso!");

  } catch (erro) {

    console.error(erro);

    atualizarTexto(
      "totalArrecadado",
      "Dados indisponíveis"
    );

  }

}

// INICIALIZAÇÃO

document.addEventListener(
  "DOMContentLoaded",
  function () {

    carregarPainel();

    // ATUALIZAÇÃO A CADA 60 SEGUNDOS

    setInterval(carregarPainel, 60000);

  }
);
