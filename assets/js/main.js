const searchData = [
  { title: 'Admissions', url: 'admissions.html', text: 'See intakes, steps to apply, fees guidance and student support.' },
  { title: 'Courses & Programmes', url: 'courses.html', text: 'Browse digital skills, business studies, exam preparation and practical pathways.' },
  { title: 'Student Life', url: 'student-life.html', text: 'Discover mentorship, learning environment and campus culture.' },
  { title: 'About Rasuco', url: 'about.html', text: 'Learn about the institute, its story, values and training approach.' },
  { title: 'News & Updates', url: 'news.html', text: 'Read admissions updates, outreach stories and institute highlights.' },
  { title: 'Contact', url: 'contact.html', text: 'Call, WhatsApp, email or visit the institute in Bondo.' }
];

const searchOverlay = document.querySelector('[data-search-overlay]');
const searchBtn = document.querySelectorAll('[data-open-search]');
const closeSearch = document.querySelector('[data-close-search]');
const searchInput = document.querySelector('[data-search-input]');
const searchResults = document.querySelector('[data-search-results]');
const menuBtn = document.querySelector('[data-menu-btn]');
const mobileNav = document.querySelector('[data-mobile-nav]');

searchBtn.forEach(btn => btn?.addEventListener('click', () => {
  if (!searchOverlay) return;
  searchOverlay.style.display = 'flex';
  setTimeout(() => searchInput?.focus(), 20);
  renderResults(searchData);
}));

closeSearch?.addEventListener('click', () => searchOverlay.style.display = 'none');
searchOverlay?.addEventListener('click', (e) => {
  if (e.target === searchOverlay) searchOverlay.style.display = 'none';
});

function renderResults(items) {
  if (!searchResults) return;
  searchResults.innerHTML = items.map(item => `
    <a class="result-item" href="${item.url}">
      <strong>${item.title}</strong>
      <div>${item.text}</div>
    </a>
  `).join('');
}

searchInput?.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) return renderResults(searchData);
  const filtered = searchData.filter(item =>
    item.title.toLowerCase().includes(q) || item.text.toLowerCase().includes(q)
  );
  renderResults(filtered.length ? filtered : [{ title: 'No quick matches', url: 'contact.html', text: 'Try contacting the admissions team for help.' }]);
});

menuBtn?.addEventListener('click', () => mobileNav?.classList.toggle('show'));

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach(item => io.observe(item));

window.addEventListener('scroll', () => {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  topbar.style.boxShadow = window.scrollY > 10 ? '0 12px 36px rgba(0,0,0,.16)' : 'none';
});

document.querySelectorAll('[data-current-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});
