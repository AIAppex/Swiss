document.addEventListener("DOMContentLoaded", function () {
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("terminal-output");

  const correctPassword = "RTLM019"; // Senha correta (não explícita no código)
  let hackingInterval;
  let hackingInProgress = true;
  let attempts = 0;
  const maxAttempts = 3;

  
  const randomMessages = [
    "Initializing secure SwissBank protocol... Bitte warten...",
    "Loading system core... Jahr: 1984, Basel...",

    // 🔐 Pistas implícitas da senha RTLM019:
    "Which brand carries the crown? Wer trägt die Krone?",
    "Founded in 1860, this brand times champions. Wer misst den Sieg? → (T...?)",
    "What Swiss chocolate brand was born in Zürich, 1845? Welche ist süß und alt?",
    "Which Formula 1 Grand Prix is sponsored by TAG Heuer? Welcher GP ist das? → (M...?)",
    "Zero compromise. Null Toleranz. Is this the beginning of the code?",
    "What number comes first after nothing? Was kommt nach Null? → (X)",
    "A legendary race in 1929... Die letzte Zahl? → (9)",

    // Mensagens extras
    "Decrypting pattern: R_#SysEror*...",
    "Lindt: Sweetness from Zürich since 1845.",
    "TAG Heuer: Precision in every second since 1860.",
    "The crown never sleeps... Rolex domination.",
    "M is not just for Monaco, it's for momentum.",
    "Historic moment: First Monaco GP - 1929.",
    "Zürich, Luzern, Geneva... where secrets hide.",
    "Encrypted vault access requires watchmaker's knowledge.",
    "Vault code pattern matches Rolex-Tag-Lindt-Monaco formula.",
    "System nodes: R | T",
    "TAG sponsors Monaco GP. Speed meets precision.",
    "Was bedeutet RTLM? Die Initialen sagen mehr als Worte.",
    "Access token verified: R***_01*#",
    "Safe code aligned with 1845 → 1860 → 1905 → 1929",
    "Access pattern resembles race schedule...",
    "Match biometric signature: ?.?././ – confirmed.",
    "Session active: SWISSNET-M1, LAT: 43.7, LON: 7.4",
    "Geneva archives decrypted. Matching: Rolex, TAG, Lindt...",
    "No coincidence in numbers. Alles ist geplant.",
  ];

  function generateRandomCode() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let code = "";
    for (let i = 0; i < Math.floor(Math.random() * 60) + 20; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  function displayRandomCode() {
    const randomCode = generateRandomCode();
    terminalOutput.innerHTML += `<div class="glitch" data-text="${randomCode}">${randomCode}</div>\n`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function typeHalfGlitchMessage(text, callback) {
    let i = 0;
    const speed = 40; // velocidade da digitação

    function step() {
      if (i <= text.length) {
        // Parte já digitada (texto normal)
        let typedPart = text.substring(0, i);

        // Parte que ainda não foi digitada (texto glitch)
        let glitchPart = text.substring(i);

        // Atualiza terminal, com typedPart normal + glitchPart dentro de span glitch
        let lastLine = terminalOutput.querySelector(".typing-line");
        if (lastLine) {
          terminalOutput.removeChild(lastLine);
        }

        let newLine = document.createElement("div");
        newLine.classList.add("typing-line");
        newLine.innerHTML =
          escapeHtml(typedPart) +
          `<span class="glitch" data-text="${escapeHtml(glitchPart)}">${escapeHtml(glitchPart)}</span>`;
        terminalOutput.appendChild(newLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        i++;
        setTimeout(step, speed);
      } else {
        // Finaliza a linha com quebra normal (remove glitch)
        let lastLine = terminalOutput.querySelector(".typing-line");
        if (lastLine) {
          // Substitui pelo texto completo normal, sem glitch
          lastLine.innerHTML = escapeHtml(text);
        }
        terminalOutput.innerHTML += "<br>";
        if (callback) callback();
      }
    }

    step();
  }

  // Helper para escapar caracteres HTML especiais
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Alterar para usar efeito meio a meio nas mensagens
  function displayRandomMessage() {
    const message =
      randomMessages[Math.floor(Math.random() * randomMessages.length)];
    typeHalfGlitchMessage(message);
  }

  function displayLoadingSequence(callback) {
    const loadingMessages = [
      "Initializing connection...",
      "Verbindung wird aufgebaut...",
      "Encrypting tunnel...",
      "Verschlüsselung aktiv...",
      "Locating Swiss server node...",
      "Standort wird ermittelt...",
      "Handshake successful.",
      "Verbindung erfolgreich.",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < loadingMessages.length) {
        terminalOutput.innerHTML += `<div class="glitch" data-text="${loadingMessages[index]}">${loadingMessages[index]}</div>\n`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        index++;
      } else {
        clearInterval(interval);
        callback();
      }
    }, 600);
  }

  function startHackingSequence() {
    hackingInterval = setInterval(function () {
      if (Math.random() > 0.7) {
        displayRandomMessage();
      } else {
        displayRandomCode();
      }
    }, Math.random() * 600 + 500);
  }

  function stopHacking() {
    clearInterval(hackingInterval);
    terminalOutput.innerHTML +=
      `<div class="glitch" data-text="✔ Access granted. Willkommen im System.">✔ Access granted. Willkommen im System.</div>\n` +
      `<div class="glitch" data-text="Swiss Bank Account Balance: CHF 8'674'320.00">Swiss Bank Account Balance: CHF 8'674'320.00</div>\n` +
      `<div class="glitch" data-text="Transaction Code: ZRH-RTLM019-SYS2025">Transaction Code: ZRH-RTLM019-SYS2025</div>\n`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    hackingInProgress = false;
  }

  terminalInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && hackingInProgress) {
      let inputPassword = terminalInput.value.trim();
      terminalInput.value = "";

      if (inputPassword === correctPassword) {
        stopHacking();
      } else {
        attempts++;
        if (attempts >= maxAttempts) {
          terminalOutput.innerHTML +=
            `<div class="glitch" data-text="Maximum attempts reached. System locked.">Maximum attempts reached. System locked.</div>\n`;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
          hackingInProgress = false;
          clearInterval(hackingInterval);
          terminalInput.disabled = true;
        } else {
          terminalOutput.innerHTML +=
            `<div class="glitch" data-text="Incorrect password. Try again. (${attempts}/${maxAttempts})">Incorrect password. Try again. (${attempts}/${maxAttempts})</div>\n`;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
      }
    }
  });

  displayLoadingSequence(startHackingSequence);
});

