(() => {
  // Fill year
  const y = new Date().getFullYear()
  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = String(y)

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle')
  themeToggle?.addEventListener('click', () => {
    const root = document.documentElement
    if (root.classList.contains('light')) {
      root.classList.remove('light')
      themeToggle.textContent = '🌙'
    } else {
      root.classList.add('light')
      themeToggle.textContent = '🌞'
    }
  })

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle')
  const nav = document.getElementById('nav')
  menuToggle?.addEventListener('click', () => {
    if (!nav) return
    if (nav.style.display === 'block') nav.style.display = ''
    else nav.style.display = 'block'
  })

  // Timeline interaction & modal
  const timeline = document.getElementById('timeline')
  const modal = document.getElementById('modal')
  const modalBackdrop = document.getElementById('modalBackdrop')
  const modalClose = document.getElementById('modalClose')
  const modalTitle = document.getElementById('modalTitle')
  const modalDate = document.getElementById('modalDate')
  const modalDesc = document.getElementById('modalDesc')

  function openModal(title, date, desc){
    if (!modal) return
    modal.setAttribute('aria-hidden','false')
    modalTitle.textContent = title
    modalDate.textContent = date || ''
    modalDesc.textContent = desc || ''
  }

  function closeModal(){
    if (!modal) return
    modal.setAttribute('aria-hidden','true')
  }

  modalClose?.addEventListener('click', closeModal)
  modalBackdrop?.addEventListener('click', closeModal)
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal() })

  timeline?.addEventListener('click', (e)=>{
    const item = e.target.closest('.timeline-item')
    if(!item) return
    const title = item.getAttribute('data-title') || ''
    const date = item.getAttribute('data-date') || ''
    const desc = item.getAttribute('data-desc') || ''
    openModal(title,date,desc)
  })

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal')
  if (reveals.length) {
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e => {
        if(e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    }, {threshold: 0.12})
    reveals.forEach(r => obs.observe(r))
  }
})();
