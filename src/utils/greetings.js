const check_hour = () => {
  const now = new Date().getHours();

  if (now >= 0 && now <= 12) {
    return "Bom dia";
  } else if (now >= 13 && now <= 16) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
};

const greetings = (username) => {
  const greetings_list = [
    `${check_hour()}, ${username} 👋 pronto pra anotar umas ideias?`,
    "De volta? Bora bagunçar mais umas notas 😅",
    "Bem-vindo de volta! Suas ideias estavam com saudade (ou não).",
    "Pronto pra escrever algo que vai esquecer de ler depois?",
  ];

  return greetings_list[Math.floor(Math.random() * greetings_list.length)];
};

// useEffect(() => {
//   const interval = setInterval(() => {
//     localStorage.setItem("greetings_message", greetings());
//   }, 2000);

//   clearInterval(interval);
// }, []);

export default greetings;
