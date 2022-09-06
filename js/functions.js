import { skillMapping, cardsMap, imgsModal } from './arraysAndObjects.js'


export default {
  points: 0,
  // suavização  de transição entre as sections por meio de link
  transitionSection() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (event) {
        event.preventDefault()

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        })
      })
    })
  },

  // modal das cartas de tecnologias skills
  handleModal:{
    boxModal: document.querySelector('.box__modal'),
    modal: document.querySelector('.modal'),
    titleModal: document.querySelector('.title__modal'),
    modalText: document.querySelector('.text__modal'),
    envelopes: document.querySelectorAll('.img__technologies'),
    logo: document.querySelector('.logo__modal'),

    dateFormatter(index){
      const calculateYear = new Date().getFullYear() - new Date(skillMapping[index].experienceDate).getFullYear()
      const calculateMonth = new Date().getMonth() - new Date(skillMapping[index].experienceDate).getMonth() + 1
      const pluralYear = calculateYear > 1 ? 's' : ''
      const pluralMont = calculateMonth > 1 ? 'eses' : 'ês'
      const full = calculateYear > 0 ? `${calculateYear} ano${pluralYear} e ${calculateMonth} m${pluralMont}` : `${calculateMonth} m${pluralMont}`
      return full
    },

    clikModal({ target }) {
      const index = target.dataset.index
      
      this.boxModal.classList.add('open__modal')
      this.titleModal.innerText = skillMapping[index].title
      this.modalText.innerText = `${skillMapping[index].text} tenho ${this.dateFormatter(index)} de experiência com essa tecnologia.`
      this.modalText.style.textDecorationColor = skillMapping[index].color
      this.modal.style.border = `5px solid ${skillMapping[index].color}`
      this.envelopes[index].src = imgsModal.emptyEnvelope[index]

      // fechar modal com click
      this.boxModal.onclick = (event) => {
        if(event.target.classList.contains('box__modal')){
          this.envelopes[index].src = imgsModal.sealedEnvelope[index]
          this.boxModal.classList.remove('open__modal')
        }
      }
    },
  
    imageExchange(event) {
      const id = event.target.dataset.index
      const envelope = event.target

      if(event.type === 'mouseover'){
        this.logo.src = imgsModal.logo.img[id]
        this.logo.alt = imgsModal.logo.alt[id]
        envelope.src = imgsModal.openEnvelope[id]
      }
      if(event.type === 'mouseout'){
        if(!this.boxModal.classList.contains('open__modal')){
          envelope.src = imgsModal.sealedEnvelope[id]
        }
      }
    }
  },

  // funções relacionadas as bolhas de pontos no about
  // coloca a pontuação na tela
  setScore() {
    const scorePoints = document.querySelector('.score__points')
    
    if (this.points >= 100) return

    this.points += 5

    scorePoints.innerText = this.points
  },

  // destroí bolha com click
  bubbleEraser({ target }) {
    // topDistance: distância do topo mais compensação do translatey
    let topDistance = target.offsetTop + 32

    target.style.pointerEvents = 'none'
    target.style.top = `${topDistance}px`
    target.style.animation = 'bubbleBurst 0.6s ease both'

    this.setScore()
    setTimeout(() => {
      target.remove()
    }, 500)
  },

  // cria as bolhas
  createsBubbles() {
    const bubbleContainer = document.querySelector('.bubble__container')
    const bubble = document.createElement('span')
    const fragmentElement = document.createDocumentFragment()

    // birthPlace: número aleatório entre o tamanho da tela menos a largura do elemento
    // speedToTop é a velocidade em que a bolha passa pela tela, quanto menor o valor, mais rápida ela fica
    const birthPlace = Math.floor(Math.random() * (window.innerWidth - 120))
    const speedToTop = Math.floor(Math.random() * (20 - 10) + 10)

    bubble.className = 'bubble'
    bubble.innerText = '$'
    bubble.style.left = `${birthPlace}px`
    bubble.style.animation = `bubbleUp ${speedToTop}s linear`
    bubble.addEventListener('click', event => this.bubbleEraser(event))

    fragmentElement.append(bubble)
    bubbleContainer.append(fragmentElement)

    // verifica se a bolha saiu da tela, se sim, a remove do DOM
    setTimeout(()=>{
      const bubbles = document.querySelectorAll('.bubble')
    
      bubbles.forEach(bubble => {
        let topDistance = bubble.offsetTop
        if (topDistance < -100) {
          bubble.remove()
        }
      })
    }, 3200)
  },

  // dinheiro do bruxo carteiro
  messengerAlert(message){
    const alertBox = document.querySelector('.context__alert')
    alertBox.innerText = message
    alertBox.style.animation = ''

    setTimeout(()=>{
      alertBox.style.animation = 'context__alert__active 1s alternate 2'
    },10)
  },
  
  getMoney(){
    const dotBox = document.querySelector('.score__points')
    if(this.points <= 0) {
      this.messengerAlert('você não tem pontos :(')
      return
    }
    this.messengerAlert('obrigado :)')
    this.points -= 5
    dotBox.innerText = this.points
  },

  // lida com os cards dos projetos
  createsProjectCards(){
    const cardBox = document.querySelector('.box__cards')
    const elementFragment = document.createDocumentFragment()

    cardsMap.forEach(cardInfo=>{
      const card = document.createElement('li')
      card.className = 'card'
      card.innerHTML = `
      <div class='container__img__card'>
        <img class="card__img" src='${cardInfo.img}' alt='imagem do projeto ${cardInfo.title}'>
      </div>
      <h2 class="title__card">${cardInfo.title}</h2>
      <p class="description__card">${cardInfo.description}</p>
      <a class="link__card" href='${cardInfo.link}' target="_black">Ver projeto <i class="fa-solid fa-link"></i></a>
      `
      elementFragment.appendChild(card)
      cardBox.appendChild(elementFragment)
    })
  },

  // abre/fecha menu mobile
  openMenu(){
    const menu = document.querySelector('.menu')
    menu.classList.toggle('active')
  }
}
