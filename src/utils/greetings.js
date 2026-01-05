const check_hour = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

const get_today = () => {
  return new Date().toISOString().split("T")[0];
};

const greetings = (username) => {
  const greetingsList = [
    `${check_hour()}, ${username} 👋 pronto pra anotar umas ideias?`,
    "De volta? Bora bagunçar mais umas notas 😅",
    "Bem-vindo de volta! Suas ideias estavam com saudade (ou não).",
    "Pronto pra escrever algo que vai esquecer de ler depois?",
  ];

  const today = get_today();
  const stored = JSON.parse(localStorage.getItem("greeting"));

  if (stored && stored.date === today) {
    return stored.message;
  }

  // filtra pra não repetir a mensagem do dia anterior
  const filteredList = stored
    ? greetingsList.filter((msg) => msg !== stored.message)
    : greetingsList;

  const message = filteredList[Math.floor(Math.random() * filteredList.length)];

  localStorage.setItem("greeting", JSON.stringify({ date: today, message }));

  return message;
};

export default greetings;
