const $ = selector => document.querySelector(selector);

const login = $('#loginScreen');
const app = $('#app');

// Demo giriş bilgileri
// İstersen sadece bu iki değeri değiştirebilirsin.
const SABIT_KULLANICI = 'AFAD ARAMA';
const SABIT_SIFRE = 'AFAD1234';

// Giriş ekranında görsel hata/bilgi mesajı gösterir.
function mesajGoster(metin, tur = 'hata') {
  let mesaj = $('#loginMessage');

  if (!mesaj) {
    mesaj = document.createElement('div');
    mesaj.id = 'loginMessage';
    mesaj.setAttribute('role', 'alert');
    mesaj.style.marginTop = '14px';
    mesaj.style.padding = '12px 14px';
    mesaj.style.borderRadius = '10px';
    mesaj.style.fontSize = '12px';
    mesaj.style.fontWeight = '700';
    mesaj.style.lineHeight = '1.4';
    $('#loginForm').appendChild(mesaj);
  }

  mesaj.textContent = metin;
  mesaj.style.color = tur === 'basari' ? '#166534' : '#991b1b';
  mesaj.style.background = tur === 'basari' ? '#dcfce7' : '#fee2e2';
  mesaj.style.border = tur === 'basari'
    ? '1px solid #86efac'
    : '1px solid #fca5a5';
  mesaj.hidden = false;
}

function mesajTemizle() {
  const mesaj = $('#loginMessage');
  if (mesaj) {
    mesaj.hidden = true;
    mesaj.textContent = '';
  }
}

// Şifre göster/gizle
$('#togglePassword')?.addEventListener('click', () => {
  const password = $('#password');
  password.type = password.type === 'password' ? 'text' : 'password';
  $('#togglePassword').textContent = password.type === 'password'
    ? 'Göster'
    : 'Gizle';
});

// Sabit kullanıcı adı ve şifre ile giriş kontrolü
$('#loginForm')?.addEventListener('submit', event => {
  event.preventDefault();
  mesajTemizle();

  const kullanici = $('#username').value.trim();
  const sifre = $('#password').value;

  if (kullanici !== SABIT_KULLANICI || sifre !== SABIT_SIFRE) {
    mesajGoster('Kullanıcı adı veya şifre yanlış. Lütfen tekrar deneyin.');
    $('#password').focus();
    return;
  }

  login.classList.add('hidden');
  app.classList.remove('hidden');
  sessionStorage.setItem('itfaiye_demo_login', '1');
});

// Çıkış yap butonu
$('#logout')?.addEventListener('click', () => {
  sessionStorage.removeItem('itfaiye_demo_login');
  app.classList.add('hidden');
  login.classList.remove('hidden');
  $('#loginForm')?.reset();
  mesajTemizle();
});

// Daha önce giriş yapılmışsa oturumu koru.
if (sessionStorage.getItem('itfaiye_demo_login') === '1') {
  login.classList.add('hidden');
  app.classList.remove('hidden');
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

window.scrollToId = scrollToId;

// Tarihi göster
const today = $('#today');
if (today) {
  today.textContent = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date());
}

// Kullanıcının seçtiği fotoğrafları galeriye anında ekle.
$('#photoInput')?.addEventListener('change', event => {
  const grid = $('#galleryGrid');
  if (!grid) return;

  [...event.target.files].forEach(file => {
    const url = URL.createObjectURL(file);
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img
        src="${url}"
        alt="Yüklenen fotoğraf"
        style="width:100%;height:100%;object-fit:cover"
      >`;
    grid.appendChild(item);
  });
});

// Sayfa içi menü aktifliği
window.addEventListener('hashchange', () => {
  const hash = location.hash.replace('#', '') || 'dashboard';
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${hash}`);
  });
});

// Ağır Arama Kurtarma alt menüsü
const rescueMenuButton = $('#rescueMenuButton');
const rescueSubnav = $('#rescueSubnav');

rescueMenuButton?.addEventListener('click', () => {
  const isOpen = rescueSubnav.classList.toggle('open');
  rescueMenuButton.classList.toggle('open', isOpen);
  rescueMenuButton.setAttribute('aria-expanded', String(isOpen));
});

// İBB İTF 01-05 grupları kendi oklarıyla açılıp kapanır.
document.querySelectorAll('.team-button').forEach(button => {
  button.addEventListener('click', () => {
    const links = button.nextElementSibling;
    const isOpen = links.classList.toggle('open');
    button.classList.toggle('open', isOpen);
  });
});
