// PWA Logic

let deferredPrompt;

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
      
    // ALWAYS check if we are already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      // We are running as an installed app
      const mobileInstallBtn = document.getElementById('mobileInstallBtn');
      if (mobileInstallBtn) mobileInstallBtn.style.display = 'none';
    } else {
      // Not installed, ensure the burger menu button is always visible
      const mobileInstallBtn = document.getElementById('mobileInstallBtn');
      if (mobileInstallBtn) mobileInstallBtn.style.display = 'block';
    }
  });
}

// Catch the install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  
  // Show first-visit popup if never shown before
  if (!localStorage.getItem('pwaPromptShown')) {
    setTimeout(() => {
      // Only show popup on mobile devices
      if (window.innerWidth <= 768) {
        showInstallPopup("Install AG Mobiles app in your device for your convenience.");
      }
      localStorage.setItem('pwaPromptShown', 'true');
    }, 4000); 
  }
});

// App is successfully installed
window.addEventListener('appinstalled', (evt) => {
  console.log('App was installed.');
  const mobileInstallBtn = document.getElementById('mobileInstallBtn');
  if (mobileInstallBtn) {
    mobileInstallBtn.style.display = 'none';
  }
  closeInstallPopup();
});

// Functions to trigger install
function triggerAppInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  } else {
    // FALLBACK for devices (like the Redmi A7 or iPhones) where the browser blocks the automatic prompt
    if (typeof showToast === 'function') {
      showToast("To install: Tap your browser's menu (3 dots) and select 'Add to Home screen' or 'Install app'.");
    } else {
      alert("To install this app, tap your browser's menu (the 3 dots in the top right) and select 'Add to Home screen' or 'Install app'. For iPhones, tap the Share icon and select 'Add to Home Screen'.");
    }
  }
}

// Build and show custom popup
function showInstallPopup(message) {
  if (document.getElementById('pwaInstallPopup')) return;

  const popupHTML = `
    <div id="pwaInstallPopup" style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#fff;padding:20px;border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,0.2);z-index:9999;width:90%;max-width:400px;display:flex;flex-direction:column;gap:12px;border:2px solid #F59E0B;animation:slideUp 0.4s ease-out;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div style="display:flex;gap:12px;align-items:center;">
          <img src="icons/android-chrome-192x192.png" style="width:48px;height:48px;border-radius:12px;" />
          <div style="display:flex;align-items:center;">
            <h4 style="margin:0;font-weight:700;font-size:18px;color:#111827;">AG Mobile Service</h4>
          </div>
        </div>
        <button onclick="closeInstallPopup()" style="background:none;border:none;font-size:20px;color:#9CA3AF;cursor:pointer;">&times;</button>
      </div>
      <p style="margin:0;font-size:14px;color:#374151;">${message}</p>
      <button onclick="triggerAppInstall(); closeInstallPopup();" style="background:#F59E0B;color:#fff;border:none;padding:10px;border-radius:8px;font-weight:700;cursor:pointer;">Install App</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', popupHTML);

  if (!document.getElementById('pwaStyles')) {
    const style = document.createElement('style');
    style.id = 'pwaStyles';
    style.innerHTML = `@keyframes slideUp { from { transform: translate(-50%, 100%); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }`;
    document.head.appendChild(style);
  }
}

function closeInstallPopup() {
  const el = document.getElementById('pwaInstallPopup');
  if (el) el.remove();
}
