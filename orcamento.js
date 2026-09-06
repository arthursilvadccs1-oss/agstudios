const form = document.querySelector('#budget-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const date = new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('pt-BR');
  const message = [
    'Olá, AG Studios! Gostaria de solicitar um orçamento.',
    '',
    `Nome: ${data.get('name')}`,
    `Data: ${date}`,
    `Serviço: ${data.get('service')}`,
    `Evento/projeto: ${data.get('type')}`,
    `Local: ${data.get('location')}`,
    data.get('message') ? `Detalhes: ${data.get('message')}` : ''
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/5561999092639?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
