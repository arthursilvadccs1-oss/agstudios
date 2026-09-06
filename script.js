const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const galleryTriggers = document.querySelectorAll('.project-gallery-trigger');
const modal = document.querySelector('.photo-modal');
const modalImage = modal?.querySelector('img');
const modalCount = modal?.querySelector('.photo-count');
const modalTitle = modal?.querySelector('.photo-title');
const closeModal = modal?.querySelector('.modal-close');
const previous = modal?.querySelector('.modal-prev');
const next = modal?.querySelector('.modal-next');

const galleries = {
  rayssa: { title: '18 anos da Rayssa', photos: [
    ['assets/portfolio/rayssa-18-celebracao.jpg', 'Rayssa celebrando seus 18 anos ao lado de uma amiga'],
    ['assets/portfolio/rayssa-18-familia.jpg', 'Rayssa recebendo o carinho da familia no aniversario'],
    ['assets/portfolio/rayssa-18-retrato.jpg', 'Retrato de Rayssa em seu aniversario de 18 anos'],
    ['assets/portfolio/rayssa-18-detalhes.jpg', 'Detalhes da decoracao do aniversario de Rayssa']
  ] },
  cepmg: { title: 'Trabalho comunitario - CEPMG', photos: [
    ['assets/portfolio/cepmg/img_8538.jpg', 'Registro do trabalho comunitario no CEPMG'],
    ['assets/portfolio/cepmg/img_8480.jpg', 'Estudante do CEPMG em atividade escolar'],
    ['assets/portfolio/cepmg/img_8460.jpg', 'Momento de familia durante o evento do CEPMG'],
    ['assets/portfolio/cepmg/img_8435.jpg', 'Equipe e estudantes do CEPMG'],
    ['assets/portfolio/cepmg/img_8295.jpg', 'Estudante em uniforme do CEPMG'],
    ['assets/portfolio/cepmg/img_8330.jpg', 'Momento de apoio durante o evento'],
    ['assets/portfolio/cepmg/img_7917.jpg', 'Estudante em cerimonia do CEPMG'],
    ['assets/portfolio/cepmg/img_7914.jpg', 'Estudante do CEPMG com a bandeira'],
    ['assets/portfolio/cepmg/img_7817.jpg', 'Cerimonia escolar no CEPMG'],
    ['assets/portfolio/cepmg/img_7755.jpg', 'Registro de participante do CEPMG'],
    ['assets/portfolio/cepmg/img_7748.jpg', 'Equipe reunida em cerimonia'],
    ['assets/portfolio/cepmg/img_7680.jpg', 'Aluno com a bandeira do Brasil'],
    ['assets/portfolio/cepmg/img_7670.jpg', 'Formacao dos estudantes do CEPMG'],
    ['assets/portfolio/cepmg/img_7547.jpg', 'Retrato de estudante no evento'],
    ['assets/portfolio/cepmg/img_7520.jpg', 'Retrato de estudante uniformizado'],
    ['assets/portfolio/cepmg/img_7503.jpg', 'Estudantes junto a bandeira'],
    ['assets/portfolio/cepmg/img_7292.jpg', 'Representante do CEPMG durante a cerimonia'],
    ['assets/portfolio/cepmg/img_7284.jpg', 'Representante do CEPMG com o publico ao fundo'],
    ['assets/portfolio/cepmg/img_7148.jpg', 'Grupo de estudantes do CEPMG']
  ] }
};

let activeGallery = galleries.rayssa;
let currentPhoto = 0;
const showPhoto = index => {
  const { photos } = activeGallery;
  currentPhoto = (index + photos.length) % photos.length;
  modalImage.src = photos[currentPhoto][0];
  modalImage.alt = photos[currentPhoto][1];
  modalCount.textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
  modalTitle.textContent = activeGallery.title;
};

galleryTriggers.forEach(trigger => trigger.addEventListener('click', () => {
  activeGallery = galleries[trigger.dataset.gallery];
  showPhoto(0);
  modal.showModal();
}));
closeModal?.addEventListener('click', () => modal.close());
previous?.addEventListener('click', () => showPhoto(currentPhoto - 1));
next?.addEventListener('click', () => showPhoto(currentPhoto + 1));
modal?.addEventListener('click', event => { if (event.target === modal) modal.close(); });
document.addEventListener('keydown', event => {
  if (!modal?.open) return;
  if (event.key === 'ArrowLeft') showPhoto(currentPhoto - 1);
  if (event.key === 'ArrowRight') showPhoto(currentPhoto + 1);
});
let touchStartX = 0;
modalImage?.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
modalImage?.addEventListener('touchend', event => {
  const distance = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) > 45) showPhoto(currentPhoto + (distance < 0 ? 1 : -1));
}, { passive: true });
