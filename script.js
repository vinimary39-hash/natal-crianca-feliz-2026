// NATAL CRIANÇA FELIZ 2026
// Versão 1.0

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
      "Não foi possível copiar. Copie a chave manualmente.";
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

// INICIALIZAÇÃO DO SITE

document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log(
      "Natal Criança Feliz 2026 - Site iniciado"
    );
  }
);
