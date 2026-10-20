// Progressive enhancement only — the page reads fine with JS off.
// The `js` class that arms .reveal is set inline in <head> to avoid a flash.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function setupReveal() {
  const items = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'))
    return
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-in')
      observer.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -8% 0px' })
  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`
    observer.observe(el)
  })
}

function formatCount(el, value) {
  const { prefix = '', suffix = '' } = el.dataset
  el.textContent = `${prefix}${value}${suffix}`
}

function animateCount(el) {
  const target = Number(el.dataset.count)
  if (prefersReducedMotion) return formatCount(el, target)
  const duration = 1400
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    formatCount(el, Math.round(target * eased))
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

function setupCounters() {
  const counters = document.querySelectorAll('[data-count]')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      animateCount(entry.target)
      observer.unobserve(entry.target)
    })
  }, { threshold: .6 })
  counters.forEach((el) => observer.observe(el))
}

function setupSpotlight() {
  document.querySelectorAll('.spot').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      card.style.setProperty('--my', `${event.clientY - rect.top}px`)
    })
  })
}

function setupCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((button) => {
    const label = button.querySelector('[data-copy-label]')
    const original = label.textContent
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy)
        label.textContent = 'Copied ✓'
      } catch {
        window.location.href = `mailto:${button.dataset.copy}`
        return
      }
      setTimeout(() => { label.textContent = original }, 1800)
    })
  })
}

function setYear() {
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear() })
}

setupReveal()
setupCounters()
setupSpotlight()
setupCopyButtons()
setYear()
