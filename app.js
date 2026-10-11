// =====================================
    // DATA
    // =====================================
    document.addEventListener('DOMContentLoaded', () => { emailjs.init("CB9wWTch2iF-brUq4"); });
    let currentStep = 1;
    let booking = { brand: '', model: '', faults: [], channel: '', date: '', time: '', name: '', phone: '', wa: '', email: '' };

    const BRANDS = [
      { name: 'Apple iPhone', img: 'images/apple.png', scale: 1.1 },
      { name: 'Samsung Galaxy', img: 'images/samsung.png', scale: 1.6 },
      { name: 'Google Pixel', img: 'images/pixel.png', scale: 0.9 },
      { name: 'Xiaomi', img: 'images/xiomi.png', scale: 1.6 },
      { name: 'OPPO', img: 'images/Oppo.png', scale: 0.9 },
      { name: 'Motorola', img: 'images/motorola.png', scale: 1.3 },
      { name: 'Huawei', img: 'images/huawei.png', scale: 1.1 },
      { name: 'Other Brand', icon: '📱' },
    ];

    const FAULTS = [
      { name: 'Cracked OLED / Glass', icon: 'monitor', desc: 'Screen cracked, shattered, or unresponsive' },
      { name: 'Battery Degradation', icon: 'battery-low', desc: 'Fast drain, swollen, or sudden shutdown' },
      { name: 'Liquid / Water Ingress', icon: 'droplets', desc: 'Dropped in water or liquid damage visible' },
      { name: 'Charging Port Failure', icon: 'plug', desc: "Won't charge or intermittent charging" },
      { name: 'Motherboard / IC Chip', icon: 'cpu', desc: 'No power, bootloop, or logic board fault' },
      { name: 'Housing / Back Glass', icon: 'layers', desc: 'Back shattered, frame bent, or cracked' },
      { name: 'Camera Module', icon: 'camera', desc: 'Blurry, black screen, or hardware fault' },
      { name: 'Speaker / Microphone', icon: 'mic', desc: 'No audio, distorted sound, or mute' },
      { name: 'Overheating Issue', icon: 'thermometer', desc: 'Device excessively hot during use' },
    ];

    const MODEL_SUGGESTIONS = {
      'Apple iPhone': ['iPhone Duo', 'iPhone 18 Pro Max', 'iPhone 18 Pro', 'iPhone 18 Plus', 'iPhone 18', 'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17 Plus', 'iPhone 17', 'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16', 'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14', 'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini', 'iPhone SE (2025)', 'iPhone SE (2022)'],
      'Samsung Galaxy': ['Galaxy S26 Ultra', 'Galaxy S26+', 'Galaxy S26', 'Galaxy Z Fold 8', 'Galaxy Z Flip 8', 'Galaxy S25 Ultra', 'Galaxy S25+', 'Galaxy S25', 'Galaxy S25 FE', 'Galaxy Z Fold 7', 'Galaxy Z Flip 7', 'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S24 FE', 'Galaxy Z Fold 6', 'Galaxy Z Flip 6', 'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S23 FE', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5', 'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', 'Galaxy Z Fold 4', 'Galaxy Z Flip 4', 'Galaxy A57', 'Galaxy A56', 'Galaxy A55', 'Galaxy A54', 'Galaxy A53', 'Galaxy A36', 'Galaxy A35', 'Galaxy A34', 'Galaxy A33'],
      'Google Pixel': ['Pixel 11 Pro Fold', 'Pixel 11 Pro XL', 'Pixel 11 Pro', 'Pixel 11', 'Pixel 10 Pro Fold', 'Pixel 10 Pro XL', 'Pixel 10 Pro', 'Pixel 10', 'Pixel 10a', 'Pixel 9 Pro Fold', 'Pixel 9 Pro XL', 'Pixel 9 Pro', 'Pixel 9', 'Pixel 9a', 'Pixel Fold', 'Pixel 8 Pro', 'Pixel 8', 'Pixel 8a', 'Pixel 7 Pro', 'Pixel 7', 'Pixel 7a', 'Pixel 6 Pro', 'Pixel 6', 'Pixel 6a'],
      'Xiaomi': ['Xiaomi 16 Ultra', 'Xiaomi 16 Pro', 'Xiaomi 16', 'Xiaomi 15 Ultra', 'Xiaomi 15 Pro', 'Xiaomi 15', 'Xiaomi 14 Ultra', 'Xiaomi 14 Pro', 'Xiaomi 14', 'Xiaomi 13 Ultra', 'Xiaomi 13 Pro', 'Xiaomi 13', 'Xiaomi 12S Ultra', 'Xiaomi 12 Pro', 'Xiaomi 12', 'Redmi Note 15 Pro+', 'Redmi Note 15 Pro', 'Redmi Note 14 Pro+', 'Redmi Note 14 Pro', 'Redmi Note 13 Pro+', 'Redmi Note 13 Pro', 'Redmi Note 12 Pro+', 'POCO F8 Pro', 'POCO F7 Pro', 'POCO F6 Pro', 'POCO F5 Pro', 'POCO F4 GT'],
      'OPPO': ['Find X9 Ultra', 'Find X9 Pro', 'Find X9', 'Find X8 Ultra', 'Find X8 Pro', 'Find X8', 'Find X7 Ultra', 'Find X7', 'Find X6 Pro', 'Find X6', 'Find X5 Pro', 'Find N5', 'Find N3', 'Find N2', 'Reno 14 Pro', 'Reno 13 Pro', 'Reno 12 Pro', 'Reno 11 Pro', 'Reno 10 Pro', 'Reno 9 Pro', 'Reno 8 Pro'],
      'Motorola': ['Edge 70 Ultra', 'Edge 70 Pro', 'Edge 70', 'Razr 70 Ultra', 'Razr 70', 'Edge 60 Ultra', 'Edge 60 Pro', 'Razr 60 Ultra', 'Razr 60', 'Edge 50 Ultra', 'Edge 50 Pro', 'Razr 50 Ultra', 'Razr 50', 'Edge 40 Pro', 'Razr 40 Ultra', 'Edge 30 Ultra', 'Razr (2022)', 'Moto G Power (2026)', 'Moto G Stylus (2025)'],
      'Huawei': ['Mate 80 Pro+', 'Mate 80 Pro', 'Mate 80', 'Pura 90 Ultra', 'Pura 90 Pro', 'Mate 70 Pro+', 'Mate 70 Pro', 'Mate 70', 'Pura 80 Ultra', 'Pura 80 Pro', 'Pura 70 Ultra', 'Mate 60 Pro', 'Mate 50 Pro', 'P60 Pro', 'Mate X6', 'Mate X5', 'Mate X3', 'Nova 13 Pro', 'Nova 12 Pro', 'Nova 11 Pro'],
      'Other': ['Nothing Phone (4)', 'Nothing Phone (3)', 'Nothing Phone (2a)', 'Nothing Phone (2)', 'Nothing Phone (1)', 'Vivo X200 Pro', 'Vivo X100 Pro', 'Vivo X90 Pro', 'Vivo X80 Pro', 'ZTE Axon 60 Ultra', 'ZTE Axon 50 Ultra', 'ZTE Axon 40 Ultra', 'Nubia Red Magic 9 Pro', 'Nubia Red Magic 8 Pro', 'OnePlus 14', 'OnePlus 13', 'OnePlus 12', 'OnePlus 11', 'OnePlus 10 Pro', 'ROG Phone 10', 'ROG Phone 9', 'ROG Phone 8', 'ROG Phone 7', 'ROG Phone 6', 'Sony Xperia 1 VIII', 'Sony Xperia 1 VII', 'Sony Xperia 1 VI', 'Sony Xperia 1 V', 'Sony Xperia 1 IV', 'Surface Duo 3', 'Surface Duo 2'],
      'Other Brand': ['Nothing Phone (4)', 'Nothing Phone (3)', 'Nothing Phone (2a)', 'Nothing Phone (2)', 'Nothing Phone (1)', 'Vivo X200 Pro', 'Vivo X100 Pro', 'Vivo X90 Pro', 'Vivo X80 Pro', 'ZTE Axon 60 Ultra', 'ZTE Axon 50 Ultra', 'ZTE Axon 40 Ultra', 'Nubia Red Magic 9 Pro', 'Nubia Red Magic 8 Pro', 'OnePlus 14', 'OnePlus 13', 'OnePlus 12', 'OnePlus 11', 'OnePlus 10 Pro', 'ROG Phone 10', 'ROG Phone 9', 'ROG Phone 8', 'ROG Phone 7', 'ROG Phone 6', 'Sony Xperia 1 VIII', 'Sony Xperia 1 VII', 'Sony Xperia 1 VI', 'Sony Xperia 1 V', 'Sony Xperia 1 IV', 'Surface Duo 3', 'Surface Duo 2']
    };

    const EST = {
      'Apple iPhone': { 'Cracked Screen / OLED': [180, 320], 'Battery Replacement': [80, 120], 'Charging Port': [90, 150], 'Water Damage Recovery': [120, 300], 'Motherboard / IC Chip': [150, 400], 'Back Glass / Housing': [100, 180], 'Camera Module': [120, 250], 'Speaker / Mic': [60, 110] },
      'Samsung Galaxy': { 'Cracked Screen / OLED': [140, 280], 'Battery Replacement': [65, 100], 'Charging Port': [70, 130], 'Water Damage Recovery': [100, 280], 'Motherboard / IC Chip': [130, 380], 'Back Glass / Housing': [80, 160], 'Camera Module': [100, 220], 'Speaker / Mic': [55, 100] },
      'Google Pixel': { 'Cracked Screen / OLED': [130, 260], 'Battery Replacement': [60, 95], 'Charging Port': [65, 120], 'Water Damage Recovery': [90, 260], 'Motherboard / IC Chip': [120, 350], 'Back Glass / Housing': [75, 145], 'Camera Module': [95, 200], 'Speaker / Mic': [50, 95] },
      'default': { 'Cracked Screen / OLED': [80, 200], 'Battery Replacement': [50, 90], 'Charging Port': [55, 110], 'Water Damage Recovery': [80, 220], 'Motherboard / IC Chip': [100, 300], 'Back Glass / Housing': [60, 130], 'Camera Module': [80, 180], 'Speaker / Mic': [45, 90] },
    };

    // =====================================
    // FIRESTORE SYNC
    // =====================================
    const firebaseConfig = {
      apiKey: "AIzaSyD8uR1ZT9g6ScRlU02lVyIl0C8jRwYRC_w",
      authDomain: "agms-au.firebaseapp.com",
      projectId: "agms-au",
      storageBucket: "agms-au.firebasestorage.app",
      messagingSenderId: "406757702887",
      appId: "1:406757702887:web:975a3ac118fa2e2fa3b642",
      measurementId: "G-0128XGCFE4"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // SECURITY: the public site never reads the private 'tickets' collection.
    // Ticket IDs are random; customers can only look up one ticket's public status by exact ID.
    function generateTicketId() {
      const n = crypto.getRandomValues(new Uint32Array(1))[0] % 90000000 + 10000000;
      return 'AGMS-' + n;
    }

    // =====================================
    // WIZARD
    // =====================================
    function renderBrands() {
      document.getElementById('brandGrid').innerHTML = BRANDS.map(b => `
    <div onclick="selectBrand('${b.name}')" id="brand-${b.name.replace(/[\s\/]/g, '_')}"
      class="brand-card glass rounded-xl p-4 border cursor-pointer text-center" style="border-color:#E5E7EB;">
      <div style="height:84px;margin-bottom:8px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden;font-size:40px;">${b.img ? `<img src="${b.img}" alt="${b.name}" style="width:100%;height:100%;object-fit:contain;padding:4px;transform:scale(${b.scale || 1});" />` : b.icon}</div>
      <div class="text-xs font-semibold text-gray-700 leading-tight">${b.name}</div>
    </div>`).join('');
      
      const select = document.getElementById('brandSelect');
      if (select) {
        select.innerHTML = '<option value="">Select a brand...</option>' + 
                           BRANDS.map(b => `<option value="${b.name}">${b.name}</option>`).join('');
      }
    }

    function selectBrand(name) {
      booking.brand = name;
      document.querySelectorAll('.brand-card').forEach(c => { c.style.borderColor = '#E5E7EB'; c.style.background = ''; c.style.boxShadow = ''; });
      const el = document.getElementById('brand-' + name.replace(/[\s\/]/g, '_'));
      if (el) { el.style.borderColor = 'rgba(245,158,11,0.8)'; el.style.background = 'rgba(245,158,11,0.08)'; el.style.boxShadow = '0 0 20px rgba(245,158,11,0.2)'; }
      
      const sel = document.getElementById('brandSelect');
      if (sel && sel.value !== name) { sel.value = name; }
      
      const s = MODEL_SUGGESTIONS[name];
      const modSel = document.getElementById('deviceModel');
      if (s) {
        modSel.innerHTML = '<option value="">Select Model</option>' + s.map(m => `<option value="${m}">${m}</option>`).join('') + '<option value="Unknown">Unknown</option><option value="Not in the list">Not in the list</option>';
        modSel.disabled = false;
      } else {
        modSel.innerHTML = '<option value="">Any model</option>';
        modSel.disabled = true;
      }
      onModelSelect();

      if (name === 'Other Brand') {
        document.getElementById('customBrandContainer').style.display = 'block';
        booking.brand = document.getElementById('deviceBrandCustom').value;
      } else {
        document.getElementById('customBrandContainer').style.display = 'none';
      }
    }

    function onModelSelect() {
      const val = document.getElementById('deviceModel').value;
      if (val === 'Not in the list') {
        document.getElementById('customModelContainer').style.display = 'block';
        booking.model = document.getElementById('deviceModelCustom').value;
      } else {
        document.getElementById('customModelContainer').style.display = 'none';
        booking.model = val;
      }
    }

    function renderFaults() {
      document.getElementById('faultGrid').innerHTML = FAULTS.map(f => `
    <div onclick="toggleFault('${f.name}',this)" class="fault-card glass rounded-xl p-4 border cursor-pointer" style="border-color:#E5E7EB;" data-fault="${f.name}">
      <div class="flex items-start gap-3">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style="background:rgba(6,182,212,0.1);border:1px solid rgba(6,182,212,0.2);">
          <i data-lucide="${f.icon}" class="w-4 h-4" style="color:#06B6D4;"></i>
        </div>
        <div><div class="text-sm font-semibold text-gray-900">${f.name}</div><div class="text-xs text-gray-600 mt-0.5">${f.desc}</div></div>
      </div>
    </div>`).join('');
      lucide.createIcons();
      // Re-apply selected state for previously picked faults
      booking.faults.forEach(f => {
        const el = document.querySelector(`[data-fault="${f}"]`);
        if (el) { el.style.borderColor = 'rgba(6,182,212,0.8)'; el.style.background = 'rgba(6,182,212,0.1)'; el.style.boxShadow = '0 0 15px rgba(6,182,212,0.2)'; }
      });
    }

    function toggleFault(name, el) {
      const idx = booking.faults.indexOf(name);
      if (idx > -1) { booking.faults.splice(idx, 1); el.style.borderColor = '#E5E7EB'; el.style.background = ''; el.style.boxShadow = ''; }
      else { booking.faults.push(name); el.style.borderColor = 'rgba(6,182,212,0.8)'; el.style.background = 'rgba(6,182,212,0.1)'; el.style.boxShadow = '0 0 15px rgba(6,182,212,0.2)'; }
    }

    function selectChannel(ch) {
      booking.channel = ch === 'dropoff' ? 'In-Garage Drop-Off' : 'Express Pickup / Courier';
      const dEl = document.getElementById('channelDropoff');
      const pEl = document.getElementById('channelPickup');
      if (ch === 'dropoff') {
        if (dEl) { dEl.style.borderColor = 'rgba(245,158,11,0.8)'; dEl.style.background = 'rgba(245,158,11,0.08)'; }
        if (pEl) { pEl.style.borderColor = '#E5E7EB'; pEl.style.background = ''; }
      } else {
        if (pEl) { pEl.style.borderColor = 'rgba(6,182,212,0.8)'; pEl.style.background = 'rgba(6,182,212,0.08)'; }
        if (dEl) { dEl.style.borderColor = '#E5E7EB'; dEl.style.background = ''; }
      }
    }

    let timeSlotDropdownOpen = false;

    function toggleTimeSlotDropdown() {
      const container = document.getElementById('timeSlotsContainer');
      const chevron = document.getElementById('timeSlotChevron');
      // Only open if there are actually slots rendered
      if (container.children.length === 0) return;
      
      timeSlotDropdownOpen = !timeSlotDropdownOpen;
      if (timeSlotDropdownOpen) {
        container.classList.remove('hidden');
        container.classList.add('flex');
        chevron.style.transform = 'rotate(180deg)';
      } else {
        container.classList.add('hidden');
        container.classList.remove('flex');
        chevron.style.transform = 'rotate(0deg)';
      }
    }

    if (!window._timeSlotListenerAdded) {
      window._timeSlotListenerAdded = true;
      document.addEventListener('click', function(event) {
        const dropdownContainer = document.getElementById('timeSlotDropdownContainer');
        if (dropdownContainer && !dropdownContainer.contains(event.target) && timeSlotDropdownOpen) {
          toggleTimeSlotDropdown();
        }
      });
    }

    async function renderTimeSlots(dateStr) {
      const container = document.getElementById('timeSlotsContainer');
      const note = document.getElementById('slotAvailNote');
      const btnText = document.getElementById('timeSlotSelectedText');
      
      btnText.innerHTML = 'Select a time slot';
      btnText.className = 'text-gray-500';
      if (timeSlotDropdownOpen) toggleTimeSlotDropdown();

      if (!dateStr) { note.innerHTML = '&#8594; Select a date to see available slots'; container.innerHTML = ''; return; }
      
      container.innerHTML = '';
      booking.time = '';
      
      const [y, m, d] = dateStr.split('-');
      const selectedDate = new Date(y, m - 1, d);
      const dow = selectedDate.getDay(); // 0=Sun, 3=Wed, 5=Fri
      const isWedFri = (dow === 3 || dow === 5);
      const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dow];
      
      const today = new Date();
      const isToday = (selectedDate.getFullYear() === today.getFullYear() && 
                       selectedDate.getMonth() === today.getMonth() && 
                       selectedDate.getDate() === today.getDate());
      const currentHour = today.getHours() + (today.getMinutes() / 60);
      
      const ALL_SLOTS = [
        { id: 'ts-1', time: '9:00 AM - 11:00 AM', label: '9:00 AM - 11:00 AM', icon: 'sun', color: '#F59E0B', isWedFri: true, isOther: false, startHour: 9 },
        { id: 'ts-2', time: '11:00 AM - 1:00 PM', label: '11:00 AM - 1:00 PM', icon: 'sun', color: '#F59E0B', isWedFri: true, isOther: false, startHour: 11 },
        { id: 'ts-3', time: '1:00 PM - 3:00 PM', label: '1:00 PM - 3:00 PM', icon: 'sun', color: '#06B6D4', isWedFri: true, isOther: false, startHour: 13 },
        { id: 'ts-4', time: '3:00 PM - 5:00 PM', label: '3:00 PM - 5:00 PM', icon: 'sunset', color: '#06B6D4', isWedFri: true, isOther: false, startHour: 15 },
        { id: 'ts-5', time: '5:00 PM - 7:00 PM', label: '5:00 PM - 7:00 PM', icon: 'sunset', color: '#f97316', isWedFri: true, isOther: false, startHour: 17 },
        { id: 'ts-7', time: '7:00 PM - 9:00 PM', label: '7:00 PM - 9:00 PM', icon: 'moon', color: '#8B5CF6', isWedFri: true, isOther: false, startHour: 19 },
        
        { id: 'ts-o1', time: '9:30 AM - 11:30 AM', label: '9:30 AM - 11:30 AM', icon: 'sun', color: '#F59E0B', isWedFri: false, isOther: true, startHour: 9.5 },
        { id: 'ts-o2', time: '11:30 AM - 1:30 PM', label: '11:30 AM - 1:30 PM', icon: 'sun', color: '#F59E0B', isWedFri: false, isOther: true, startHour: 11.5 },
        { id: 'ts-o3', time: '1:30 PM - 3:30 PM', label: '1:30 PM - 3:30 PM', icon: 'sun', color: '#06B6D4', isWedFri: false, isOther: true, startHour: 13.5 },
        { id: 'ts-o4', time: '3:30 PM - 5:30 PM', label: '3:30 PM - 5:30 PM', icon: 'sunset', color: '#06B6D4', isWedFri: false, isOther: true, startHour: 15.5 },
        { id: 'ts-o5', time: '5:30 PM - 7:30 PM', label: '5:30 PM - 7:30 PM', icon: 'sunset', color: '#f97316', isWedFri: false, isOther: true, startHour: 17.5 },
        { id: 'ts-o6', time: '7:30 PM - 9:30 PM', label: '7:30 PM - 9:30 PM', icon: 'moon', color: '#8B5CF6', isWedFri: false, isOther: true, startHour: 19.5 }
      ];
      
      let renderedCount = 0;
      ALL_SLOTS.forEach(s => {
        if (isWedFri && !s.isWedFri) return;
        if (!isWedFri && !s.isOther) return;
        
        let isPast = false;
        if (isToday && s.startHour <= currentHour) {
          isPast = true;
        }
        
        let isFull = false;
        if (!isWedFri && s.startHour < 17.5) {
          isFull = true;
        }
        
        const el = document.createElement('div');
        el.id = s.id;
        
        if (isPast) {
          el.className = 'rounded-lg px-4 py-3 border flex items-center gap-3 opacity-50 cursor-not-allowed bg-gray-50';
          el.style.borderColor = '#E5E7EB';
          el.innerHTML = `<i data-lucide="${s.icon}" class="w-4 h-4" style="color:#9CA3AF;"></i><span class="text-sm font-medium text-gray-400 line-through">${s.label}</span> <span class="text-xs text-gray-400 ml-auto font-bold uppercase tracking-wider">Past</span>`;
          el.onclick = () => { if (typeof showToast === 'function') showToast('This time slot has passed.', 'error'); };
        } else if (isFull) {
          el.className = 'rounded-lg px-4 py-3 border flex items-center gap-3 cursor-not-allowed';
          el.style.borderColor = '#E5E7EB';
          el.style.backgroundColor = '#F3F4F6';
          el.innerHTML = `<i data-lucide="${s.icon}" class="w-4 h-4" style="color:#9CA3AF;"></i><span class="text-sm font-medium text-gray-400 line-through">${s.label}</span> `;
          el.onclick = () => { if (typeof showToast === 'function') showToast('Busy slot, choose another slot.', 'error'); };
        } else {
          el.className = 'rounded-lg px-4 py-3 border cursor-pointer flex items-center gap-3 transition-colors hover:bg-gray-50';
          el.style.borderColor = 'transparent';
          el.innerHTML = `<i data-lucide="${s.icon}" class="w-4 h-4" style="color:${s.color};"></i><span class="text-sm font-medium text-gray-700">${s.label}</span>`;
          el._slotTime = s.time;
          el.onclick = () => selectTime(s.time, s.label, s.icon, s.color);
        }
        
        container.appendChild(el);
        renderedCount++;
      });
      
      lucide.createIcons();
      
      if (isWedFri) {
        note.innerHTML = `&#10003; ${dayName} &mdash; 9:00 AM to 9:00 PM`;
        note.style.color = '#10B981';
      } else {
        note.innerHTML = `&#10003; ${dayName} &mdash; 9:30 AM to 9:30 PM`;
        note.style.color = '#10B981';
      }
      
      // Auto open dropdown if slots available
      if (renderedCount > 0 && !timeSlotDropdownOpen) {
        toggleTimeSlotDropdown();
      }
    }

    function selectTime(t, label, icon, color) {
      booking.time = t;
      const btnText = document.getElementById('timeSlotSelectedText');
      btnText.className = 'text-gray-900';
      btnText.innerHTML = `<div class="flex items-center gap-2"><i data-lucide="${icon}" class="w-4 h-4" style="color:${color};"></i><span class="font-medium">${label}</span></div>`;
      lucide.createIcons();
      
      document.querySelectorAll('#timeSlotsContainer > div').forEach(el => {
        if (el._slotTime) {
          el.style.borderColor = 'transparent';
          el.style.background = '';
        }
      });
      
      // Highlight the selected option internally if they open it again
      const selectedEl = Array.from(document.querySelectorAll('#timeSlotsContainer > div')).find(el => el._slotTime === t);
      if (selectedEl) {
        selectedEl.style.borderColor = 'rgba(245,158,11,0.5)';
        selectedEl.style.background = 'rgba(245,158,11,0.05)';
      }
      
      toggleTimeSlotDropdown();
    }

    function goToStep(n) {
      if (n === 2 && !booking.brand) { showToast('Please select a device brand', 'error'); return; }
      if (n === 2) { booking.model = document.getElementById('deviceModel').value || booking.model; if (!booking.model) { showToast('Please enter your device model', 'error'); return; } }
      if (n === 3 && booking.faults.length === 0) { showToast('Please select at least one fault', 'error'); return; }
      if (n === 4 && !booking.channel) { showToast('Please select a service channel', 'error'); return; }
      if (n === 4) { booking.date = document.getElementById('apptDate').value; if (!booking.date) { showToast('Please select a preferred date', 'error'); return; } if (!booking.time) { showToast('Please select a time slot', 'error'); return; } }
      ['step1', 'step2', 'step3', 'step4', 'stepSuccess'].forEach(id => document.getElementById(id).style.display = 'none');
      document.getElementById('step' + n).style.display = 'block';
      currentStep = n;
      updateProgress(n);
      if (n === 2) renderFaults();
      if (n === 3) selectChannel('dropoff');
      const wc = document.getElementById('wizardContainer');
      if (wc) wc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function updateProgress(n) {
      const pcts = { 1: 25, 2: 50, 3: 75, 4: 100 };
      document.getElementById('wizardProgressBar').style.width = (pcts[n] || 25) + '%';
      const stepLabels = ['Device', 'Fault', 'Schedule', 'Contact'];
      for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById('stepDot' + i);
        const lbl = document.getElementById('stepLbl' + i);
        const line = document.getElementById('stepLine' + i);
        if (i < n) {
          dot.style.cssText = 'border:2px solid #10B981;background:rgba(16,185,129,0.2);color:#34D399;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;';
          dot.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          if (lbl) { lbl.style.color = '#34D399'; lbl.textContent = stepLabels[i - 1]; }
          if (line) line.style.background = 'linear-gradient(90deg,#F59E0B,#06B6D4)';
        } else if (i === n) {
          dot.style.cssText = 'border:2px solid #F59E0B;background:rgba(245,158,11,0.2);color:#F59E0B;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;';
          dot.textContent = i;
          if (lbl) { lbl.style.color = '#F59E0B'; lbl.textContent = stepLabels[i - 1]; }
        } else {
          dot.style.cssText = 'border:2px solid #E5E7EB;background:#F3F4F6;color:#6B7280;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;';
          dot.textContent = i;
          if (lbl) { lbl.style.color = '#6B7280'; lbl.textContent = stepLabels[i - 1]; }
          if (line) line.style.background = 'rgba(55,65,81,0.6)';
        }
      }
    }

    async function submitBooking(event) {
      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const wa = document.getElementById('custWA').value.trim();
      const email = document.getElementById('custEmail').value.trim();

      if (!name || !phone || !wa || !email) {
        showToast('Please fill in all required contact fields', 'error');
        return;
      }

      if (name.length > 100) {
        showToast('Name is too long (maximum 100 characters)', 'error');
        return;
      }

      const ausPhoneRegex = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/;
      if (!ausPhoneRegex.test(phone.replace(/\s+/g, ''))) {
        showToast('Please enter a valid Australian contact number', 'error');
        return;
      }

      if (!ausPhoneRegex.test(wa.replace(/\s+/g, ''))) {
        showToast('Please enter a valid Australian WhatsApp number', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (email.length > 200 || !emailRegex.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
      }

      if (document.getElementById('faultNotes').value.length > 1000) {
        showToast('Notes are too long (maximum 1000 characters)', 'error');
        return;
      }

      const consentBox = document.getElementById('privacyConsent');
      if (consentBox && !consentBox.checked) {
        showToast('Please tick the privacy consent box to continue.', 'error');
        return;
      }

      const btn = (event && event.currentTarget) || document.querySelector('button[onclick="submitBooking(event)"]');
      const origHtml = btn.innerHTML;
      btn.innerHTML = '<i data-lucide="loader" class="w-5 h-5 animate-spin"></i> Processing...';
      btn.disabled = true;
      lucide.createIcons();

      try {
        const newId = generateTicketId();

        booking.name = name;
        booking.phone = phone;
        booking.wa = wa;
        booking.email = email;
        const ticket = { id: newId, name: booking.name, phone: booking.phone, wa: booking.wa.replace(/\D/g, ''), email: booking.email, brand: booking.brand, model: booking.model, faults: [...booking.faults], faultNotes: document.getElementById('faultNotes').value, channel: booking.channel, date: booking.date, time: booking.time, stage: 0, status: 'New', benchNotes: '', price: 0, warranty: 90, createdAt: new Date().toISOString() };

        const _brand = (ticket.brand || '').trim();
        const _model = (ticket.model || '').trim();

        // Save the private ticket and its public status record together:
        // both succeed or both fail.
        const batch = db.batch();
        batch.set(db.collection('tickets').doc(newId), ticket);
        // Public, non-personal record used only by the "Track your repair" feature
        batch.set(db.collection('ticketStatus').doc(newId), {
          id: newId,
          device: (_model.toLowerCase().startsWith(_brand.toLowerCase()) ? _model : [_brand, _model].filter(Boolean).join(' ')).trim(),
          repair: (ticket.faults || []).join(', '),
          status: ticket.status,
          date: ticket.date || '',
          time: ticket.time || '',
          createdAt: ticket.createdAt
        });
        await batch.commit();

        // Ticket is saved: show the confirmation now. Emails below must
        // never block or fail the booking.
        showSuccessScreen(ticket);
        booking = { brand: '', model: '', faults: [], channel: '', date: '', time: '', name: '', phone: '', wa: '', email: '' };

        try {
        // Trigger automated emails via EmailJS. The wording lives in the
        // EmailJS templates; only plain values are sent from the page.
        const emailDevice = (_model.toLowerCase().startsWith(_brand.toLowerCase()) ? _model : [_brand, _model].filter(Boolean).join(' ')).trim();
        const emailFaults = (ticket.faults || []).join(', ');

        // Customer confirmation
        emailjs.send("service_jx5tlee", "template_ln74vzo", {
          to_email: ticket.email,
          name: ticket.name,
          ticket_id: ticket.id,
          device: emailDevice,
          faults: emailFaults,
          date: ticket.date,
          time: ticket.time,
          channel: ticket.channel
        }).catch(e => console.error('Customer confirmation email failed:', e));

        // Operator alert
        emailjs.send("service_jx5tlee", "template_3n1r405", {
          name: ticket.name,
          email: ticket.email,
          phone: ticket.phone,
          wa: ticket.wa,
          ticket_id: ticket.id,
          device: emailDevice,
          faults: emailFaults,
          notes: ticket.faultNotes || 'None',
          date: ticket.date,
          time: ticket.time,
          channel: ticket.channel
        }).catch(e => console.error('Operator alert email failed:', e));
        } catch (emailErr) {
          console.error('Booking saved, but sending email failed:', emailErr);
        }
      } catch (err) {
        console.error(err);
        showToast('Error saving ticket. Please try again.', 'error');
      } finally {
        btn.innerHTML = origHtml;
        btn.disabled = false;
        lucide.createIcons();
      }
    }

    function showSuccessScreen(ticket) {
      ['step1', 'step2', 'step3', 'step4'].forEach(id => document.getElementById(id).style.display = 'none');
      const sc = document.getElementById('stepSuccess');
      sc.style.display = 'block';
      const waMsg = encodeURIComponent(`Hi AG Mobile Service! 🔧\n\nMy repair booking is confirmed:\n📱 Device: ${ticket.brand} ${ticket.model}\n🔧 Issue: ${ticket.faults.join(', ')}\n📅 Date: ${ticket.date} | ${ticket.time}\n\nTicket ID: *${ticket.id}*\n\nLooking forward to getting it fixed! ✅`);
      const waNum = '61450816230';
      sc.innerHTML = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#10B981,#059669);box-shadow:0 0 30px rgba(16,185,129,0.4);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
        <i data-lucide="check" style="width:40px;height:40px;color:white;"></i>
      </div>
      <h3 style="font-size:24px;font-weight:900;color:white;margin-bottom:8px;">Booking Confirmed!</h3>
      <p style="color:#6B7280;">Your repair ticket has been created successfully</p>
    </div>
    <div class="glass-light" style="border-radius:16px;padding:24px;margin-bottom:24px;text-align:left;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px;">
        <div><div style="font-size:11px;color:#6B7280;margin-bottom:4px;letter-spacing:1px;">TICKET REFERENCE</div><div style="font-size:32px;font-weight:900;font-family:'JetBrains Mono',monospace;color:#F59E0B;">${ticket.id}</div></div>
        <div style="text-align:right;"><div style="font-size:11px;color:#6B7280;margin-bottom:4px;">STATUS</div><div style="padding:4px 12px;border-radius:999px;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);color:#F59E0B;font-size:13px;font-weight:600;">Pending</div></div>
      </div>
      <div style="margin:16px 0;display:flex;justify-content:center;">
        <svg width="260" height="52" viewBox="0 0 260 52">${generateBarcode()}</svg>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:13px;margin-top:12px;">
        <div><span style="color:#6B7280;">Customer:</span> <span style="color:#111827;font-weight:600;">${ticket.name}</span></div>
        <div><span style="color:#6B7280;">Phone:</span> <span style="color:#111827;font-weight:600;">${ticket.phone}</span></div>
        <div><span style="color:#6B7280;">Device:</span> <span style="color:#111827;font-weight:600;">${ticket.brand} ${ticket.model}</span></div>
        <div><span style="color:#6B7280;">Channel:</span> <span style="color:#111827;font-weight:600;">${ticket.channel}</span></div>
        <div><span style="color:#6B7280;">Date:</span> <span style="color:#111827;font-weight:600;">${ticket.date}</span></div>
        <div><span style="color:#6B7280;">Time:</span> <span style="color:#111827;font-weight:600;">${ticket.time}</span></div>
        <div style="grid-column:span 2;"><span style="color:#6B7280;">Faults:</span> <span style="color:#111827;font-weight:600;">${ticket.faults.join(' &middot; ')}</span></div>
        <div style="grid-column:span 2;"><span style="color:#6B7280;">Warranty:</span> <span style="color:#10B981;font-weight:600;">90-Day Parts &amp; Labor</span></div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <a href="https://wa.me/${waNum}?text=${waMsg}" target="_blank" class="btn-amber" style="padding:14px;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:14px;text-decoration:none;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Send to WhatsApp
      </a>
      <button onclick="resetWizard()" class="bg-[#64A8D9] hover:bg-[#5294c4] text-white transition-colors" style="padding:14px;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:14px;font-weight:700;">
        <i data-lucide="plus-circle" class="w-4 h-4"></i> Book Another
      </button>
    </div>
  `;
      lucide.createIcons();
      if (typeof showInstallPopup === 'function' && deferredPrompt) {
        setTimeout(() => {
          showInstallPopup("Booking Confirmed! Install our app to easily track your repair status live.");
        }, 1500);
      }
    }

    function generateBarcode() {
      let bars = ''; let x = 5; let isBar = true;
      [1, 2, 1, 3, 1, 1, 2, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 2, 1, 3, 1, 2, 2, 1, 1, 2].forEach(w => { if (isBar) bars += `<rect x="${x}" y="5" width="${w * 5}" height="42" fill="#E5E7EB" rx="1"/>`; x += w * 5; isBar = !isBar; });
      return bars;
    }

    function resetWizard() {
      ['step1', 'step2', 'step3', 'step4', 'stepSuccess'].forEach(id => document.getElementById(id).style.display = 'none');
      document.getElementById('step1').style.display = 'block';
      document.querySelectorAll('.brand-card').forEach(c => { c.style.borderColor = '#E5E7EB'; c.style.background = ''; c.style.boxShadow = ''; });
      document.getElementById('deviceModel').value = '';
      currentStep = 1; booking = { brand: '', model: '', faults: [], channel: '', date: '', time: '', name: '', phone: '', wa: '', email: '' };
      updateProgress(1);
    }

    // =====================================
    // ESTIMATOR
    // =====================================
    function onEstBrandChange() {
      const brand = document.getElementById('estBrand').value;
      const sel = document.getElementById('estModel');
      const models = MODEL_SUGGESTIONS[brand];
      if (!brand) {
        sel.innerHTML = '<option value="">Select brand first</option>'; sel.disabled = true;
      } else if (!models) {
        sel.innerHTML = '<option value="">Any model</option>'; sel.disabled = true;
      } else {
        sel.innerHTML = '<option value="">Select Model</option>' + models.map(m => `<option>${m}</option>`).join('') + '<option>Other / Not listed</option>';
        sel.disabled = false;
      }
      calcEstimate();
    }

    function onEstModelChange() {
      const v = document.getElementById('estModel').value;
      document.getElementById('estModelCustomContainer').style.display = (v === 'Other / Not listed' || v === 'Other') ? 'block' : 'none';
      calcEstimate();
    }

    function onEstRepairChange() {
      const v = document.getElementById('estRepair').value;
      document.getElementById('estRepairCustomContainer').style.display = (v === 'Other') ? 'block' : 'none';
      calcEstimate();
    }

    function calcEstimate() {
      const brand = document.getElementById('estBrand').value;
      const model = document.getElementById('estModel').value;
      const repair = document.getElementById('estRepair').value;
      const age = parseInt(document.getElementById('estAge').value) || 1;
      const res = document.getElementById('estimateResult');
      if (!brand || !repair) { res.style.display = 'none'; return; }
      const table = EST[brand] || EST['default'];
      let range = table[repair] || [60, 200];
      const mod = 1 + (age - 1) * 0.05;
      const low = Math.round(range[0] * mod), high = Math.round(range[1] * mod);
      const isComplex = repair.includes('Motherboard') || repair.includes('Water');
      const time = isComplex ? '24-72 Hours' : '30-90 Minutes';
      res.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
      <div>
        <div style="font-size:11px;color:#6B7280;margin-bottom:4px;letter-spacing:1px;text-transform:uppercase;">Estimated Price Range</div>
        <div style="font-size:40px;font-weight:900;color:#F59E0B;">&#36;${low}<span style="font-size:24px;color:#6B7280;"> - </span>&#36;${high}</div>
        <div style="font-size:13px;color:#9CA3AF;margin-top:4px;">${model ? model : brand} &middot; ${repair}</div>
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;">
        <div style="text-align:center;"><div style="font-size:11px;color:#6B7280;margin-bottom:4px;">Complexity</div><div style="padding:4px 12px;border-radius:999px;font-size:11px;font-weight:700;${isComplex ? 'background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#F87171;' : 'background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);color:#F59E0B;'}">${isComplex ? 'High Complexity' : 'Standard'}</div></div>
        <div style="text-align:center;"><div style="font-size:11px;color:#6B7280;margin-bottom:4px;">Est. Turnaround</div><div style="color:white;font-weight:700;font-size:14px;">${time}</div></div>
        <div style="text-align:center;"><div style="font-size:11px;color:#6B7280;margin-bottom:4px;">Warranty</div><div style="color:#34D399;font-weight:700;font-size:14px;">90 Days</div></div>
      </div>
      <a href="book.html?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model || brand)}&fault=${encodeURIComponent(repair)}" class="btn-amber" style="padding:10px 20px;border-radius:12px;display:flex;align-items:center;gap:8px;font-size:14px;text-decoration:none;"><i data-lucide="calendar-check" class="w-4 h-4"></i> Book This Repair</a>
      <div style="width:100%;flex-basis:100%;padding:10px 14px;border-radius:10px;font-size:12px;line-height:1.5;color:#FBBF24;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);">&#9888; Approximate estimate only &mdash; the actual price may differ after bench diagnostics.</div>
    </div>
  `;
      res.style.display = 'block';
      lucide.createIcons();
    }

    // =====================================
    // TOAST
    // =====================================
    function showToast(msg, type = 'success') {
      let c = document.getElementById('toastContainer');
      if (!c) { c = document.createElement('div'); c.id = 'toastContainer'; c.style.cssText = 'position:fixed;bottom:100px;right:24px;z-index:99999;display:flex;flex-direction:column;gap:8px;'; document.body.appendChild(c); }
      const toast = document.createElement('div');
      const isErr = type === 'error';
      toast.style.cssText = `display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:12px;font-size:13px;font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,0.5);backdrop-filter:blur(10px);transition:all 0.3s ease;${isErr ? 'background:rgba(127,29,29,0.9);border:1px solid rgba(239,68,68,0.4);color:#FCA5A5;' : 'background:rgba(6,78,59,0.9);border:1px solid rgba(16,185,129,0.4);color:#6EE7B7;'}`;
      const icon = document.createElement('div');
      icon.innerHTML = isErr ? '<i data-lucide="alert-circle" style="width:16px;height:16px;flex-shrink:0;"></i>' : '<i data-lucide="check-circle" style="width:16px;height:16px;flex-shrink:0;"></i>';
      toast.appendChild(icon); toast.appendChild(document.createTextNode(msg));
      c.appendChild(toast); lucide.createIcons();
      setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(20px)'; setTimeout(() => toast.remove(), 300); }, 3000);
    }

    // =====================================
    // INIT
    // =====================================
    // TRACKER
    // =====================================
    // Escape text from the database so it can never run as code in the page
    function esc(v) {
      return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    async function searchTracker(event) {
      const q = document.getElementById('trackInput').value.trim().toLowerCase();
      const res = document.getElementById('trackerResult');
      if (!q) return;

      const btn = (event && event.currentTarget) || document.querySelector('button[onclick="searchTracker()"]');
      const origHtml = btn.innerHTML;
      btn.innerHTML = '<i data-lucide="loader" class="w-5 h-5 animate-spin"></i>';
      btn.disabled = true;
      lucide.createIcons();

      try {
        const idQuery = q.toUpperCase();
        let t = null;
        if (/^AGMS-\d{8}$/.test(idQuery)) {
          const snap = await db.collection('ticketStatus').doc(idQuery).get();
          if (snap.exists) t = snap.data();
        }
        res.style.display = 'block';
        if (t) {
          let statusColor = '#F59E0B';
          if (t.status === 'Completed') statusColor = '#10B981';
          if (t.status === 'In Progress') statusColor = '#3B82F6';
          res.innerHTML = `
          <div class="glass rounded-xl p-6 text-left border border-gray-200 shadow-md">
            <div class="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
              <div><h3 class="font-bold text-gray-900 text-lg">${esc(t.id)}</h3><p class="text-sm text-gray-500">${esc(t.device)} - ${esc(t.repair)}</p></div>
              <span class="px-3 py-1 rounded-full text-xs font-bold text-white" style="background:${statusColor}">${esc(t.status)}</span>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div><span class="text-gray-500 block mb-1">Booked For</span><span class="font-medium text-gray-900">${esc(t.date || '-')} ${esc(t.time || '')}</span></div>
              <div><span class="text-gray-500 block mb-1">Status</span><span class="font-medium text-gray-900">${esc(t.status)}</span></div>
            </div>
          </div>
        `;
        } else {
          res.innerHTML = `<div class="glass rounded-xl p-6 text-center text-red-500 font-medium border border-gray-200 shadow-sm">No ticket found. Please enter your full ticket ID (e.g. AGMS-12345678).</div>`;
        }
      } catch (err) {
        console.error(err);
        showToast('Error searching ticket.', 'error');
      } finally {
        if (btn) { btn.innerHTML = origHtml; btn.disabled = false; }
        lucide.createIcons();
      }
    }

    // =====================================
    // MOBILE MENU
    // =====================================
    setTimeout(() => {
      const btn = document.getElementById('mobileMenuBtn');
      const menu = document.getElementById('mobileMenu');
      if (btn && menu) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          menu.classList.toggle('hidden');
        });
        if (!window._mobileMenuListenerAdded) {
          window._mobileMenuListenerAdded = true;
          document.addEventListener('click', (e) => {
            if (!btn.contains(e.target) && !menu.contains(e.target)) {
              menu.classList.add('hidden');
            }
          });
        }
        document.querySelectorAll('.mobile-link').forEach(link => {
          link.addEventListener('click', () => menu.classList.add('hidden'));
        });
      }
    }, 50);

    
    // =====================================
    // INITIALIZATION
    // =====================================
    setTimeout(() => {
      if (document.getElementById('brandGrid')) renderBrands();
      // Pre-fill booking wizard from estimator URL params
      const urlParams = new URLSearchParams(window.location.search);
      const prefillBrandRaw = urlParams.get('brand');
      const BRAND_MAP = { 'Other': 'Other Brand' };
      const prefillBrand = prefillBrandRaw ? (BRAND_MAP[prefillBrandRaw] || prefillBrandRaw) : null;
      const prefillModel = urlParams.get('model');
      const prefillFaultRaw = urlParams.get('fault');
      const FAULT_MAP = {
        'Cracked Screen / OLED': 'Cracked OLED / Glass',
        'Battery Replacement': 'Battery Degradation',
        'Charging Port': 'Charging Port Failure',
        'Water Damage Recovery': 'Liquid / Water Ingress',
        'Back Glass / Housing': 'Housing / Back Glass',
        'Speaker / Mic': 'Speaker / Microphone',
      };
      const prefillFault = prefillFaultRaw ? (FAULT_MAP[prefillFaultRaw] || prefillFaultRaw) : null;
      if (prefillBrand && document.getElementById('brandGrid')) {
        selectBrand(prefillBrand);
        if (prefillModel) {
          const modSel = document.getElementById('deviceModel');
          if (modSel) {
            // Try to select from dropdown first; fall back to custom input
            let matched = false;
            for (const opt of modSel.options) {
              if (opt.value === prefillModel) { modSel.value = prefillModel; matched = true; break; }
            }
            if (!matched) {
              modSel.value = 'Not in the list';
              const customInput = document.getElementById('deviceModelCustom');
              if (customInput) { customInput.value = prefillModel; customInput.closest('.mt-2') && (customInput.closest('.mt-2').style.display = 'block'); booking.model = prefillModel; }
            } else {
              booking.model = prefillModel;
            }
          }
        }
        // Go to step 2 (fault) so renderFaults() fires, then pre-tick the fault, then advance to step 3
        goToStep(2);
        if (prefillFault) {
          setTimeout(() => {
            const faultCards = document.querySelectorAll('[data-fault]');
            faultCards.forEach(card => {
              if (card.getAttribute('data-fault') === prefillFault) {
                toggleFault(prefillFault, card);
              }
            });
            // Auto-advance to step 3 (Schedule)
            if (booking.faults.length > 0) goToStep(3);
          }, 50);
        }
      }
      const getLocalYMD = (d) => { const y = d.getFullYear(); const m = String(d.getMonth()+1).padStart(2,'0'); const day = String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; };
      const todayObj = new Date();
      const dateEl = document.getElementById('apptDate');
      if (dateEl) { 
        const todayStr = getLocalYMD(todayObj);
        dateEl.value = todayStr; 
        dateEl.min = todayStr; 
        // Automatically render slots for today
        renderTimeSlots(todayStr);
      }
      lucide.createIcons();

      // Scroll to top visibility toggle
      const scrollTopBtn = document.getElementById('scrollToTopBtn');
      if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
            scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollTopBtn.classList.add('opacity-100', 'pointer-events-auto');
          } else {
            scrollTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
            scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
          }
        });
      }
    }, 50);
  