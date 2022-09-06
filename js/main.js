import functions from './functions.js'

window.onload = () => {
  // variavéis
  const imgsTec = document.querySelectorAll('.img__technologies')
  const menu = document.querySelector('.icon__menu__mobile')
  const tipButton = document.querySelector('.tip__button')

  // funções
  functions.transitionSection()
  functions.createsProjectCards()

  // cria e destrói bolhas a cada 3 segundos
  const intervalBubble = setInterval(() => {
    if(window.innerWidth >= 350){
      functions.createsBubbles()
    }
  }, 3000)
  
  // abre/fecha modal das cartas de tecnologias
  imgsTec.forEach(img => {
    img.addEventListener('click', event => functions.handleModal.clikModal(event))
    img.addEventListener('mouseover', event => functions.handleModal.imageExchange(event))
    img.addEventListener('mouseout', event => functions.handleModal.imageExchange(event))
  })
  
  menu.addEventListener('click', ()=> functions.openMenu())
  tipButton.addEventListener('click', ()=> functions.getMoney())
}
