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
    ['assets/images/portfolio/rayssa-18-anos/celebracao.jpg', 'Rayssa celebrando seus 18 anos ao lado de uma amiga'],
    ['assets/images/portfolio/rayssa-18-anos/familia.jpg', 'Rayssa recebendo o carinho da familia no aniversario'],
    ['assets/images/portfolio/rayssa-18-anos/retrato.jpg', 'Retrato de Rayssa em seu aniversario de 18 anos'],
    ['assets/images/portfolio/rayssa-18-anos/detalhes.jpg', 'Detalhes da decoracao do aniversario de Rayssa']
  ] },
  cepmg: { title: 'Trabalho comunitario - CEPMG', photos: [
    ['assets/images/portfolio/cepmg-aguas-lindas/img_8538.jpg', 'Registro do trabalho comunitario no CEPMG'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_8480.jpg', 'Estudante do CEPMG em atividade escolar'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_8460.jpg', 'Momento de familia durante o evento do CEPMG'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_8435.jpg', 'Equipe e estudantes do CEPMG'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_8295.jpg', 'Estudante em uniforme do CEPMG'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_8330.jpg', 'Momento de apoio durante o evento'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7917.jpg', 'Estudante em cerimonia do CEPMG'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7914.jpg', 'Estudante do CEPMG com a bandeira'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7817.jpg', 'Cerimonia escolar no CEPMG'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7755.jpg', 'Registro de participante do CEPMG'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7748.jpg', 'Equipe reunida em cerimonia'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7680.jpg', 'Aluno com a bandeira do Brasil'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7670.jpg', 'Formacao dos estudantes do CEPMG'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7547.jpg', 'Retrato de estudante no evento'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7520.jpg', 'Retrato de estudante uniformizado'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7503.jpg', 'Estudantes junto a bandeira'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7292.jpg', 'Representante do CEPMG durante a cerimonia'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7284.jpg', 'Representante do CEPMG com o publico ao fundo'],
    ['assets/images/portfolio/cepmg-aguas-lindas/img_7148.jpg', 'Grupo de estudantes do CEPMG']
  ] },
  'previa-terceiro-2026': { title: 'Prévia do 3º - 2026', photos: [
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0011.JPG', 'Estudantes uniformizados reunidos na prévia do 3º'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0014.JPG', 'Grupo de estudantes em frente à Catedral Metropolitana de Brasília'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0022.JPG', 'Retrato de estudante durante a prévia do 3º'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0036.JPG', 'Grupo de estudantes uniformizados em Brasília'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0059.JPG', 'Retrato de estudante com a Catedral Metropolitana ao fundo'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0063.JPG', 'Estudantes posando juntos durante o evento'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0074.JPG', 'Grupo de estudantes na prévia do 3º'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0088.JPG', 'Estudantes em momento descontraído durante o evento'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0128.JPG', 'Registro dos estudantes em Brasília'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0143.JPG', 'Retrato de estudante uniformizada'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0147.JPG', 'Estudantes reunidos na cerimônia'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0151.JPG', 'Grupo de estudantes uniformizados'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0170.JPG', 'Estudantes em frente à Catedral Metropolitana de Brasília'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0186.JPG', 'Registro de estudantes durante o evento'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0307.JPG', 'Estudantes em momento de celebração'],
    ['assets/images/portfolio/previa-terceiro-2026/IMG_0501.JPG', 'Estudante em cerimônia na Catedral Metropolitana de Brasília']
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
