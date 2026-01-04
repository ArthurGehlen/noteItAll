const check_hour = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

const get_today_message = () => {
  return new Date().toISOString().split("T")[0]; // ano/mês/dia
};

const greetings = (username) => {
  const greetingsList = [
    `${check_hour()}, ${username} 👋 pronto pra anotar umas ideias?`,
    "De volta? Bora bagunçar mais umas notas 😅",
    "Bem-vindo de volta! Suas ideias estavam com saudade (ou não).",
    "Pronto pra escrever algo que vai esquecer de ler depois?",
  ];

  const today = get_today_message();
  const stored = JSON.parse(localStorage.getItem("greeting"));

  if (stored && stored.date === today) {
    return stored.message;
  }

  const message =
    greetingsList[Math.floor(Math.random() * greetingsList.length)];

  localStorage.setItem("greeting", JSON.stringify({ date: today, message }));

  return message;
};

export default greetings;
