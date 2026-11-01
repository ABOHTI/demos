/* SalonLove - Full Application Logic (Light Mode & English Numerals) */

const DEFAULT_STATE = {
  isAdminLocked: true,
  adminPin: "1234",
  cashierName: "SalonLove Cashier",
  services: [
    { id: "srv-1", name: "قص شعر وتصفيف (نسائي)", price: 75000, category: "خدمات الشعر", duration: "45 min" },
    { id: "srv-2", name: "سشوار وتسريحة فخمة", price: 50000, category: "خدمات الشعر", duration: "30 min" },
    { id: "srv-3", name: "صبغة شعر كاملة + خصل", price: 250000, category: "صبغات وتشارم", duration: "120 min" },
    { id: "srv-4", name: "جلسة كيراتين / بروتين مغذي", price: 400000, category: "معالجات الشعر", duration: "150 min" },
    { id: "srv-5", name: "تنظيف بشرة هيدرافيسيال", price: 180000, category: "عناية بالبشرة", duration: "60 min" },
    { id: "srv-6", name: "بدكير ومانكير ملكي", price: 90000, category: "أظافر وتجميل", duration: "50 min" },
    { id: "srv-7", name: "ماكياج عرائس وسهرة", price: 350000, category: "ماكياج وتجميل", duration: "90 min" },
    { id: "srv-8", name: "قص شعر وحلاقة ذقن (رجالي)", price: 45000, category: "رجالي", duration: "30 min" }
  ],
  inventory: [
    { id: "inv-1", name: "شامبو لوريال بروفيسيونال 1000ml", category: "عناية بالشعر", stock: 12, minStock: 3, costPrice: 110000, sellPrice: 150000 },
    { id: "inv-2", name: "صبغة لاكمي إسباني ألوان متعددة", category: "صبغات ومستحضرات", stock: 25, minStock: 5, costPrice: 28000, sellPrice: 40000 },
    { id: "inv-3", name: "سيروم الكيراتين البرازيلي الأصلي", category: "عناية بالشعر", stock: 2, minStock: 4, costPrice: 95000, sellPrice: 135000 },
    { id: "inv-4", name: "زيت أرغان مغربي فاخر 100ml", category: "عناية بالبشرة", stock: 8, minStock: 3, costPrice: 45000, sellPrice: 70000 },
    { id: "inv-5", name: "طلاء أظافر جيل OPI متعدّد", category: "أظافر وتجميل", stock: 18, minStock: 5, costPrice: 18000, sellPrice: 30000 }
  ],
  employees: [
    { id: "emp-1", name: "ريم الأحمد", role: "خبيرة قص وتصفيف", phone: "0933112233", payType: "both", fixedSalary: 600000, commissionRate: 15 },
    { id: "emp-2", name: "نور الشام", role: "أخصائية بشرة ومكياج", phone: "0944556677", payType: "commission", fixedSalary: 0, commissionRate: 25 },
    { id: "emp-3", name: "سامر الحلبي", role: "حلاق ومصفف رجالي", phone: "0955889900", payType: "both", fixedSalary: 500000, commissionRate: 20 },
    { id: "emp-4", name: "ميساء حمصي", role: "موظفة استقبال وكاشير", phone: "0988112244", payType: "salary", fixedSalary: 750000, commissionRate: 0 }
  ],
  appointments: [
    { id: "apt-101", customerName: "سارة الزين", phone: "0991234567", date: getTodayDateString(), time: "14:00", serviceId: "srv-3", serviceName: "صبغة شعر كاملة + خصل", employeeId: "emp-1", employeeName: "ريم الأحمد", price: 250000, status: "confirmed" },
    { id: "apt-102", customerName: "هدى دروبي", phone: "0933445566", date: getTodayDateString(), time: "16:30", serviceId: "srv-5", serviceName: "تنظيف بشرة هيدرافيسيال", employeeId: "emp-2", employeeName: "نور الشام", price: 180000, status: "pending" }
  ],
  receipts: [
    {
      id: "INV-9001",
      date: getTodayDateString() + " 11:30",
      customerName: "منى الكردي",
      employeeId: "emp-1",
      employeeName: "ريم الأحمد",
      items: [
        { name: "قص شعر وتصفيف (نسائي)", qty: 1, price: 75000 },
        { name: "سيروم الكيراتين البرازيلي الأصلي", qty: 1, price: 135000 }
      ],
      subtotal: 210000,
      discount: 10000,
      total: 200000,
      paymentMethod: "cash"
    },
    {
      id: "INV-9002",
      date: getTodayDateString() + " 12:45",
      customerName: "عمر السوري",
      employeeId: "emp-3",
      employeeName: "سامر الحلبي",
      items: [
        { name: "قص شعر وحلاقة ذقن (رجالي)", qty: 1, price: 45000 }
      ],
      subtotal: 45000,
      discount: 0,
      total: 45000,
      paymentMethod: "epayment"
    }
  ],
  bills: [
    { id: "bill-1", title: "فاتورة كهرباء الصالون - تشرين", category: "كهرباء", amount: 350000, date: getTodayDateString(), status: "مدفوعة" },
    { id: "bill-2", title: "شراء مازوت للمولدة الكهربائية (200L)", category: "مازوت/محروقات", amount: 1200000, date: getTodayDateString(), status: "مدفوعة" },
    { id: "bill-3", title: "إيجار مقسم الصالون الشهري", category: "إيجار", amount: 2500000, date: getTodayDateString(), status: "غير مدفوعة" }
  ]
};

let AppState = loadState();
let posCart = [];
let currentPosTab = "services";
let selectedPaymentMethod = "cash";
let currentView = "dashboard";

function getTodayDateString() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function loadState() {
  try {
    const saved = localStorage.getItem('salonlove_app_state');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error loading state", e);
  }
  return DEFAULT_STATE;
}

function saveState() {
  try {
    localStorage.setItem('salonlove_app_state', JSON.stringify(AppState));
  } catch (e) {
    console.error("Error saving state", e);
  }
}

// Utility: Format currency using English numerals (en-US)
function formatCurrency(amount) {
  return Number(amount || 0).toLocaleString('en-US') + " SYP";
}

// Realtime Clock & System Init
function initApp() {
  updateClock();
  setInterval(updateClock, 1000);
  setupNavigation();
  setupAdminLock();
  setupBackupButton();
  updateBadges();
  switchView('dashboard');
}

function updateClock() {
  const clockEl = document.getElementById('live-clock');
  if (clockEl) {
    const now = new Date();
    // Use en-GB to guarantee English numerals (00:00:00 24h format)
    clockEl.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
  }
}

function setupNavigation() {
  document.querySelectorAll('#main-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      switchView(targetView);
    });
  });
}

function switchView(viewName) {
  if ((viewName === 'employees' || viewName === 'reports') && AppState.isAdminLocked) {
    openAdminPinModal(viewName);
    return;
  }

  currentView = viewName;
  document.querySelectorAll('#main-nav .nav-item').forEach(btn => {
    if (btn.getAttribute('data-view') === viewName) {
      btn.classList.add('active', 'bg-amber-50', 'text-amber-700', 'font-bold');
    } else {
      btn.classList.remove('active', 'bg-amber-50', 'text-amber-700', 'font-bold');
    }
  });

  const mainContainer = document.getElementById('app-main-content');
  if (!mainContainer) return;

  switch (viewName) {
    case 'dashboard':
      mainContainer.innerHTML = renderDashboardHTML();
      break;
    case 'appointments':
      mainContainer.innerHTML = renderAppointmentsHTML();
      bindAppointmentsEvents();
      break;
    case 'pos':
      mainContainer.innerHTML = renderPOSHTML();
      bindPOSEvents();
      break;
    case 'receipts':
      mainContainer.innerHTML = renderReceiptsHTML();
      bindReceiptsEvents();
      break;
    case 'bills':
      mainContainer.innerHTML = renderBillsHTML();
      bindBillsEvents();
      break;
    case 'inventory':
      mainContainer.innerHTML = renderInventoryHTML();
      bindInventoryEvents();
      break;
    case 'employees':
      mainContainer.innerHTML = renderEmployeesHTML();
      bindEmployeesEvents();
      break;
    case 'reports':
      mainContainer.innerHTML = renderReportsHTML();
      break;
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateBadges() {
  const apptBadge = document.getElementById('nav-badge-appointments');
  if (apptBadge) {
    const today = getTodayDateString();
    const count = AppState.appointments.filter(a => a.date === today && a.status !== 'cancelled').length;
    apptBadge.textContent = count.toString();
  }

  const invBadge = document.getElementById('nav-badge-inventory');
  if (invBadge) {
    const lowCount = AppState.inventory.filter(i => i.stock <= i.minStock).length;
    if (lowCount > 0) {
      invBadge.classList.remove('hidden');
      invBadge.textContent = lowCount.toString();
    } else {
      invBadge.classList.add('hidden');
    }
  }
}

// Admin Security Pin Modal Handlers
function setupAdminLock() {
  const lockBtn = document.getElementById('toggle-admin-lock-btn');
  if (lockBtn) {
    lockBtn.addEventListener('click', () => {
      if (!AppState.isAdminLocked) {
        AppState.isAdminLocked = true;
        updateAdminLockUI();
        if (currentView === 'employees' || currentView === 'reports') {
          switchView('dashboard');
        }
      } else {
        openAdminPinModal();
      }
    });
  }
  updateAdminLockUI();
}

function updateAdminLockUI() {
  const icon = document.getElementById('admin-lock-icon');
  const label = document.getElementById('admin-lock-label');
  if (!icon || !label) return;

  if (AppState.isAdminLocked) {
    icon.setAttribute('data-lucide', 'lock');
    label.textContent = "وضع المدير: مقفل";
    document.querySelectorAll('.admin-only').forEach(el => el.classList.add('opacity-50'));
  } else {
    icon.setAttribute('data-lucide', 'unlock');
    label.textContent = "وضع المدير: مفتوح";
    document.querySelectorAll('.admin-only').forEach(el => el.classList.remove('opacity-50'));
  }
  if (window.lucide) window.lucide.createIcons();
}

function openAdminPinModal(targetViewAfterSuccess = null) {
  window.pendingTargetView = targetViewAfterSuccess;
  const modalsHolder = document.getElementById('modals-placeholder');
  modalsHolder.innerHTML = `
    <div id="admin-pin-modal" class="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
      <div class="glass-panel w-full max-w-sm p-6 rounded-2xl border border-amber-200 text-center space-y-4 animate-fade-in shadow-xl">
        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl mx-auto flex items-center justify-center border border-amber-300">
          <i data-lucide="shield-check" class="w-6 h-6"></i>
        </div>
        <div>
          <h3 class="font-bold text-slate-800 text-base">دخول المدير (Admin PIN)</h3>
          <p class="text-xs text-slate-500 mt-1">الرجاء إدخال الرمز السري (الافتراضي: 1234)</p>
        </div>
        <input type="password" id="admin-pin-input" maxlength="6" placeholder="••••" class="w-full text-center text-2xl font-mono tracking-widest bg-slate-50 border border-slate-300 rounded-xl p-3 text-amber-600 focus:outline-none focus:border-amber-500">
        <div class="flex gap-2">
          <button onclick="closeModalDirect('admin-pin-modal')" class="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-semibold">إلغاء</button>
          <button onclick="verifyAdminPin()" class="w-1/2 gold-gradient-btn py-2.5 rounded-xl text-xs font-bold">تأكيد الرمز</button>
        </div>
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
  setTimeout(() => {
    const input = document.getElementById('admin-pin-input');
    if (input) input.focus();
  }, 100);
}

function verifyAdminPin() {
  const pinInput = document.getElementById('admin-pin-input');
  if (pinInput && pinInput.value === AppState.adminPin) {
    AppState.isAdminLocked = false;
    updateAdminLockUI();
    closeModalDirect('admin-pin-modal');
    if (window.pendingTargetView) {
      switchView(window.pendingTargetView);
      window.pendingTargetView = null;
    }
  } else {
    alert("رمز PIN غير صحيح! الرمز الافتراضي هو 1234");
    if (pinInput) pinInput.value = "";
  }
}

function closeModalDirect(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.remove();
}

function setupBackupButton() {
  const backupBtn = document.getElementById('quick-backup-btn');
  if (backupBtn) {
    backupBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `salonlove_backup_${getTodayDateString()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }
}

// --- 1. DASHBOARD VIEW RENDERER ---
function renderDashboardHTML() {
  const today = getTodayDateString();
  const todayReceipts = AppState.receipts.filter(r => r.date.startsWith(today));
  const todaySalesTotal = todayReceipts.reduce((sum, r) => sum + r.total, 0);
  const todayAppts = AppState.appointments.filter(a => a.date === today);
  const monthlyBillsTotal = AppState.bills.reduce((sum, b) => sum + b.amount, 0);

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-black text-slate-800">SalonLove لوحة التحكم</h2>
          <p class="text-xs text-slate-500">متابعة المبيعات والحجوزات والمخزون اليومي</p>
        </div>
        <div class="flex gap-2">
          <button onclick="switchView('pos')" class="gold-gradient-btn px-4 py-2 rounded-xl text-xs flex items-center gap-2">
            <i data-lucide="plus-circle" class="w-4 h-4"></i><span>فاتورة جديدة</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="glass-panel p-4 flex items-center justify-between border-amber-200">
          <div>
            <p class="text-xs text-slate-500">إيرادات اليوم</p>
            <h3 class="text-xl font-bold text-amber-600 mt-1">${formatCurrency(todaySalesTotal)}</h3>
          </div>
          <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <i data-lucide="banknote" class="w-6 h-6"></i>
          </div>
        </div>
        <div class="glass-panel p-4 flex items-center justify-between border-blue-200">
          <div>
            <p class="text-xs text-slate-500">مواعيد اليوم</p>
            <h3 class="text-xl font-bold text-slate-800 mt-1">${todayAppts.length}</h3>
          </div>
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <i data-lucide="calendar-check" class="w-6 h-6"></i>
          </div>
        </div>
        <div class="glass-panel p-4 flex items-center justify-between border-rose-200">
          <div>
            <p class="text-xs text-slate-500">إجمالي المصاريف</p>
            <h3 class="text-xl font-bold text-rose-600 mt-1">${formatCurrency(monthlyBillsTotal)}</h3>
          </div>
          <div class="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
            <i data-lucide="receipt" class="w-6 h-6"></i>
          </div>
        </div>
      </div>

      <div class="glass-panel p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-bold text-sm text-slate-800">مواعيد اليوم (${today})</h3>
          <button onclick="switchView('appointments')" class="text-xs text-amber-600 hover:underline">عرض الكل</button>
        </div>
        <div class="space-y-2">
          ${todayAppts.length === 0 ? '<p class="text-xs text-slate-400 py-4 text-center">لا توجد مواعيد مسجلة لليوم</p>' : 
            todayAppts.map(apt => `
              <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <h4 class="font-bold text-slate-800">${apt.customerName} (${apt.phone})</h4>
                  <p class="text-[11px] text-slate-500">${apt.serviceName} - المسؤول: <span class="text-amber-600 font-semibold">${apt.employeeName}</span> (${apt.time})</p>
                </div>
                <button onclick="convertApptToPOS('${apt.id}')" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded text-[11px] shadow-sm">تحويل لـ POS</button>
              </div>
            `).join('')}
        </div>
      </div>
    </div>
  `;
}

// --- 2. POS & BILLING VIEW RENDERER & LOGIC ---
function renderPOSHTML() {
  const employeesOptions = AppState.employees.map(e => `<option value="${e.id}">${e.name} (${e.role})</option>`).join('');

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-black text-slate-800">نقطة البيع الكاشير (POS)</h2>
          <p class="text-xs text-slate-500">إصدار الفواتير، حساب الخدمات والمنتجات وعمولات الكادر</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-500">الكاشير الحالي:</span>
          <span class="text-xs font-bold text-amber-700 px-2 py-1 bg-amber-100 border border-amber-200 rounded-lg">${AppState.cashierName}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-7 space-y-4">
          <div class="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
            <div class="flex gap-2">
              <button id="pos-tab-services" onclick="setPosTab('services')" class="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-white">الخدمات والقصات</button>
              <button id="pos-tab-products" onclick="setPosTab('products')" class="px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">المنتجات والمستحضرات</button>
            </div>
            <input type="text" id="pos-search-input" oninput="filterPOSCatalog()" placeholder="بحث..." class="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700">
          </div>

          <div id="pos-catalog-grid" class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto p-1">
            ${renderPOSCatalogItems()}
          </div>
        </div>

        <div class="lg:col-span-5 space-y-4">
          <div class="glass-panel p-4 flex flex-col justify-between space-y-4">
            <div class="space-y-4">
              <div class="border-b border-slate-200 pb-3 space-y-3">
                <div class="flex items-center justify-between">
                  <h3 class="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <i data-lucide="shopping-cart" class="w-4 h-4 text-amber-600"></i> سلة الفاتورة
                  </h3>
                  <button onclick="clearPosCart()" class="text-[11px] text-rose-600 hover:underline">تفريغ السلة</button>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label class="block text-[11px] text-slate-500 mb-1">اسم الزبون</label>
                    <input type="text" id="pos-customer-name" value="زبون عام" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800">
                  </div>
                  <div>
                    <label class="block text-[11px] text-slate-500 mb-1">الموظف المنفذ</label>
                    <select id="pos-employee-select" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800">
                      ${employeesOptions}
                    </select>
                  </div>
                </div>
              </div>

              <div class="min-h-[160px] max-h-[220px] overflow-y-auto space-y-2" id="pos-cart-items-container">
                ${renderPOSCartItems()}
              </div>
            </div>

            <div class="border-t border-slate-200 pt-3 space-y-3">
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-600">خصم (SYP):</span>
                <input type="number" id="pos-discount-input" oninput="updatePOSTotals()" value="0" min="0" class="w-28 bg-slate-50 border border-slate-300 rounded p-1 text-center font-bold text-amber-600">
              </div>

              <div>
                <label class="block text-[11px] text-slate-600 mb-1 font-semibold">طريقة الدفع:</label>
                <div class="grid grid-cols-3 gap-2 text-xs">
                  <button type="button" onclick="setPaymentMethod('cash')" id="pay-btn-cash" class="py-2 rounded-lg border text-center font-bold border-amber-500 bg-amber-50 text-amber-700">كاش</button>
                  <button type="button" onclick="setPaymentMethod('epayment')" id="pay-btn-epayment" class="py-2 rounded-lg border text-center font-bold border-slate-200 bg-slate-50 text-slate-600">سيريتل كاش</button>
                  <button type="button" onclick="setPaymentMethod('transfer')" id="pay-btn-transfer" class="py-2 rounded-lg border text-center font-bold border-slate-200 bg-slate-50 text-slate-600">تحويل بنكي</button>
                </div>
              </div>

              <div class="bg-slate-50 p-3 rounded-xl space-y-1 text-xs border border-slate-200">
                <div class="flex justify-between text-slate-600"><span>المجموع:</span><span id="pos-subtotal-val">${formatCurrency(calculatePosSubtotal())}</span></div>
                <div class="flex justify-between text-base font-black text-amber-600 pt-1 border-t border-slate-200">
                  <span>المبلغ النهائي:</span><span id="pos-total-val">${formatCurrency(calculatePosTotal())}</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <button onclick="checkoutPOS(false)" class="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold border border-slate-300">حفظ الفاتورة</button>
                <button onclick="checkoutPOS(true)" class="gold-gradient-btn py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                  <i data-lucide="printer" class="w-4 h-4"></i> حفظ وطباعة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPOSCatalogItems(filterText = "") {
  const items = currentPosTab === 'services' ? AppState.services : AppState.inventory;
  const filtered = items.filter(i => i.name.toLowerCase().includes(filterText.toLowerCase()));

  return filtered.map(item => {
    const price = currentPosTab === 'services' ? item.price : item.sellPrice;
    return `
      <div onclick="addCartItem('${item.id}', '${currentPosTab}')" class="glass-panel p-3 rounded-xl cursor-pointer hover:border-amber-400 transition flex flex-col justify-between space-y-2">
        <div>
          <span class="text-[10px] text-amber-700 font-semibold">${item.category || ''}</span>
          <h4 class="font-bold text-xs text-slate-800 line-clamp-2 mt-0.5">${item.name}</h4>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
          <span class="font-bold text-amber-600 text-xs">${formatCurrency(price)}</span>
          <span class="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">+</span>
        </div>
      </div>
    `;
  }).join('');
}

function setPosTab(tab) {
  currentPosTab = tab;
  const btnServ = document.getElementById('pos-tab-services');
  const btnProd = document.getElementById('pos-tab-products');
  if (tab === 'services') {
    btnServ.className = "px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-white";
    btnProd.className = "px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-700";
  } else {
    btnProd.className = "px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-white";
    btnServ.className = "px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-700";
  }
  document.getElementById('pos-catalog-grid').innerHTML = renderPOSCatalogItems();
  if (window.lucide) window.lucide.createIcons();
}

function filterPOSCatalog() {
  const q = document.getElementById('pos-search-input').value;
  document.getElementById('pos-catalog-grid').innerHTML = renderPOSCatalogItems(q);
}

function addCartItem(id, type) {
  const catalog = type === 'services' ? AppState.services : AppState.inventory;
  const found = catalog.find(i => i.id === id);
  if (!found) return;
  const price = type === 'services' ? found.price : found.sellPrice;

  const existing = posCart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    posCart.push({ id, name: found.name, price, qty: 1, type });
  }
  refreshCartUI();
}

function refreshCartUI() {
  const container = document.getElementById('pos-cart-items-container');
  if (container) container.innerHTML = renderPOSCartItems();
  updatePOSTotals();
}

function renderPOSCartItems() {
  if (posCart.length === 0) {
    return '<p class="text-xs text-slate-400 py-6 text-center">السلة فارغة. اختر الخدمات أو المنتجات</p>';
  }
  return posCart.map((item, idx) => `
    <div class="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
      <div>
        <h5 class="font-bold text-slate-800">${item.name}</h5>
        <span class="text-[10px] text-amber-600">${formatCurrency(item.price)} × ${item.qty}</span>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="updateCartQty(${idx}, 1)" class="w-6 h-6 bg-white border border-slate-300 text-slate-700 rounded font-bold">+</button>
        <span class="font-bold">${item.qty}</span>
        <button onclick="updateCartQty(${idx}, -1)" class="w-6 h-6 bg-white border border-slate-300 text-slate-700 rounded font-bold">-</button>
      </div>
    </div>
  `).join('');
}

function updateCartQty(index, delta) {
  posCart[index].qty += delta;
  if (posCart[index].qty <= 0) {
    posCart.splice(index, 1);
  }
  refreshCartUI();
}

function clearPosCart() {
  posCart = [];
  refreshCartUI();
}

function calculatePosSubtotal() {
  return posCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function calculatePosTotal() {
  const sub = calculatePosSubtotal();
  const disc = Number(document.getElementById('pos-discount-input')?.value || 0);
  return Math.max(0, sub - disc);
}

function updatePOSTotals() {
  const sub = calculatePosSubtotal();
  const tot = calculatePosTotal();
  const subEl = document.getElementById('pos-subtotal-val');
  const totEl = document.getElementById('pos-total-val');
  if (subEl) subEl.textContent = formatCurrency(sub);
  if (totEl) totEl.textContent = formatCurrency(tot);
}

function setPaymentMethod(method) {
  selectedPaymentMethod = method;
  ['cash', 'epayment', 'transfer'].forEach(m => {
    const btn = document.getElementById(`pay-btn-${m}`);
    if (btn) {
      if (m === method) {
        btn.className = "py-2 rounded-lg border text-center font-bold border-amber-500 bg-amber-50 text-amber-700";
      } else {
        btn.className = "py-2 rounded-lg border text-center font-bold border-slate-200 bg-slate-50 text-slate-600";
      }
    }
  });
}

function checkoutPOS(shouldPrint) {
  if (posCart.length === 0) {
    alert("السلة فارغة! الرجاء إضافة خدمات أو منتجات لإتمام الفاتورة.");
    return;
  }

  const customerName = document.getElementById('pos-customer-name')?.value || "زبون عام";
  const empSelect = document.getElementById('pos-employee-select');
  const employeeId = empSelect?.value || AppState.employees[0]?.id;
  const employeeObj = AppState.employees.find(e => e.id === employeeId);
  const employeeName = employeeObj ? employeeObj.name : "موظف الصالون";

  const subtotal = calculatePosSubtotal();
  const discount = Number(document.getElementById('pos-discount-input')?.value || 0);
  const total = calculatePosTotal();

  const newReceiptId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();
  const nowStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;

  const receipt = {
    id: newReceiptId,
    date: nowStr,
    customerName,
    employeeId,
    employeeName,
    items: [...posCart],
    subtotal,
    discount,
    total,
    paymentMethod: selectedPaymentMethod
  };

  AppState.receipts.push(receipt);

  posCart.forEach(cartItem => {
    if (cartItem.type === 'products') {
      const invItem = AppState.inventory.find(i => i.id === cartItem.id);
      if (invItem) {
        invItem.stock = Math.max(0, invItem.stock - cartItem.qty);
      }
    }
  });

  saveState();
  updateBadges();

  if (shouldPrint) {
    openReceiptModal(receipt);
  } else {
    alert(`تم حفظ الفاتورة بنجاح برقم ${newReceiptId}`);
  }

  posCart = [];
  refreshCartUI();
}

function openReceiptModal(receipt) {
  const holder = document.getElementById('modals-placeholder');
  holder.innerHTML = `
    <div id="modal-receipt-view" class="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
      <div class="glass-panel w-full max-w-sm p-6 rounded-2xl border border-slate-300 space-y-4 animate-fade-in shadow-2xl">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-800 text-sm">إيصال حراري - SalonLove</h3>
          <button onclick="closeModalDirect('modal-receipt-view')" class="text-slate-400 hover:text-slate-700"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>

        <div id="printable-receipt-area" class="bg-white text-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 font-mono text-xs space-y-3">
          <div class="text-center border-b border-dashed border-slate-400 pb-2">
            <h2 class="font-black text-base text-amber-700">SalonLove</h2>
            <p class="text-[10px]">دمشق - الشعلان / شارع 29 أيار</p>
            <p class="text-[10px]">Tel: 011-2233445</p>
          </div>
          <div class="text-[11px] space-y-0.5">
            <div class="flex justify-between"><span>رقم الفاتورة:</span><span class="font-bold">${receipt.id}</span></div>
            <div class="flex justify-between"><span>التاريخ:</span><span>${receipt.date}</span></div>
            <div class="flex justify-between"><span>الزبون:</span><span>${receipt.customerName}</span></div>
            <div class="flex justify-between"><span>المسؤول:</span><span>${receipt.employeeName}</span></div>
            <div class="flex justify-between"><span>طريقة الدفع:</span><span class="font-bold">${receipt.paymentMethod === 'cash' ? 'نقدي (Cash)' : receipt.paymentMethod === 'epayment' ? 'سيريتل كاش' : 'تحويل بنكي'}</span></div>
          </div>
          <table class="w-full border-t border-b border-dashed border-slate-400 py-1 text-right text-[11px]">
            <thead>
              <tr class="text-[10px] text-slate-600 border-b border-slate-200">
                <th>البند</th><th class="text-center">الكمية</th><th class="text-left">السعر</th>
              </tr>
            </thead>
            <tbody>
              ${receipt.items.map(i => `<tr><td>${i.name}</td><td class="text-center">${i.qty}</td><td class="text-left">${formatCurrency(i.price * i.qty)}</td></tr>`).join('')}
            </tbody>
          </table>
          <div class="space-y-0.5 text-[11px]">
            <div class="flex justify-between text-slate-600"><span>المجموع:</span><span>${formatCurrency(receipt.subtotal)}</span></div>
            <div class="flex justify-between text-slate-600"><span>الخصم:</span><span>${formatCurrency(receipt.discount)}</span></div>
            <div class="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-300"><span>الصافي:</span><span>${formatCurrency(receipt.total)}</span></div>
          </div>
          <div class="text-center text-[10px] text-slate-500 pt-1">
            <p>Thank you for visiting SalonLove!</p>
          </div>
        </div>

        <div class="flex gap-2">
          <button onclick="closeModalDirect('modal-receipt-view')" class="w-1/2 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-semibold">إغلاق</button>
          <button onclick="window.print()" class="w-1/2 gold-gradient-btn py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
            <i data-lucide="printer" class="w-4 h-4"></i> طباعة حرارية
          </button>
        </div>
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function viewReceiptModal(receiptId) {
  const r = AppState.receipts.find(rec => rec.id === receiptId);
  if (r) openReceiptModal(r);
}

function convertApptToPOS(apptId) {
  const apt = AppState.appointments.find(a => a.id === apptId);
  if (!apt) return;

  posCart = [{
    id: apt.serviceId,
    name: apt.serviceName,
    price: apt.price,
    qty: 1,
    type: 'services'
  }];

  switchView('pos');
  setTimeout(() => {
    const custInput = document.getElementById('pos-customer-name');
    if (custInput) custInput.value = apt.customerName;
    const empSelect = document.getElementById('pos-employee-select');
    if (empSelect && apt.employeeId) empSelect.value = apt.employeeId;
    refreshCartUI();
  }, 50);
}

function bindPOSEvents() {}

// --- 3. APPOINTMENTS VIEW & LOGIC ---
function renderAppointmentsHTML() {
  const today = getTodayDateString();
  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-black text-slate-800">نظام الحجوزات والمواعيد</h2>
          <p class="text-xs text-slate-500">إدارة وتنظيم مواعيد زبائن SalonLove</p>
        </div>
        <div class="flex items-center gap-3">
          <input type="date" id="appt-date-filter" value="${today}" onchange="filterAppointments()" class="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700">
          <button onclick="openNewAppointmentModal()" class="gold-gradient-btn px-4 py-2 rounded-xl text-xs flex items-center gap-2">
            <i data-lucide="plus" class="w-4 h-4"></i><span>حجز موعد</span>
          </button>
        </div>
      </div>

      <div class="glass-panel p-4 overflow-x-auto">
        <table class="w-full text-right text-xs text-slate-700">
          <thead class="bg-slate-50 text-amber-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-3">اسم الزبون / الهاتف</th>
              <th class="p-3">الوقت والتاريخ</th>
              <th class="p-3">الخدمة</th>
              <th class="p-3">المسؤول</th>
              <th class="p-3">السعر</th>
              <th class="p-3">الحالة</th>
              <th class="p-3 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody id="appointments-table-body" class="divide-y divide-slate-100">
            ${renderAppointmentsRows(today)}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAppointmentsRows(dateFilter = "") {
  const list = dateFilter ? AppState.appointments.filter(a => a.date === dateFilter) : AppState.appointments;
  if (list.length === 0) {
    return `<tr><td colspan="7" class="p-6 text-center text-slate-400">لا توجد مواعيد مسجلة</td></tr>`;
  }
  return list.map(apt => `
    <tr class="hover:bg-slate-50">
      <td class="p-3 font-bold text-slate-800">${apt.customerName} <br><span class="text-[10px] text-slate-500 font-normal">${apt.phone}</span></td>
      <td class="p-3">${apt.date} <br><span class="text-amber-600 font-bold">${apt.time}</span></td>
      <td class="p-3">${apt.serviceName}</td>
      <td class="p-3">${apt.employeeName}</td>
      <td class="p-3 font-bold text-amber-600">${formatCurrency(apt.price)}</td>
      <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-semibold badge-${apt.status}">${apt.status}</span></td>
      <td class="p-3 text-center flex items-center justify-center gap-1">
        <button onclick="convertApptToPOS('${apt.id}')" title="تحويل لـ POS" class="p-1.5 bg-amber-50 text-amber-600 rounded border border-amber-200"><i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i></button>
        <button onclick="updateAppointmentStatus('${apt.id}', 'completed')" title="إنجاز" class="p-1.5 bg-emerald-50 text-emerald-600 rounded border border-emerald-200"><i data-lucide="check" class="w-3.5 h-3.5"></i></button>
        <button onclick="deleteAppointment('${apt.id}')" title="حذف" class="p-1.5 bg-rose-50 text-rose-600 rounded border border-rose-200"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
      </td>
    </tr>
  `).join('');
}

function filterAppointments() {
  const d = document.getElementById('appt-date-filter')?.value;
  const tbody = document.getElementById('appointments-table-body');
  if (tbody) {
    tbody.innerHTML = renderAppointmentsRows(d);
    if (window.lucide) window.lucide.createIcons();
  }
}

function openNewAppointmentModal() {
  const servicesOpt = AppState.services.map(s => `<option value="${s.id}" data-price="${s.price}">${s.name} (${formatCurrency(s.price)})</option>`).join('');
  const empOpt = AppState.employees.map(e => `<option value="${e.id}">${e.name}</option>`).join('');

  const holder = document.getElementById('modals-placeholder');
  holder.innerHTML = `
    <div id="modal-appointment" class="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
      <div class="glass-panel w-full max-w-md p-6 rounded-2xl border border-slate-300 animate-fade-in space-y-4 shadow-xl">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-800 text-base">حجز موعد جديد في SalonLove</h3>
          <button onclick="closeModalDirect('modal-appointment')" class="text-slate-400 hover:text-slate-700"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <form onsubmit="saveNewAppointment(event)" class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-600 mb-1">اسم الزبون *</label>
            <input type="text" id="appt-customer-name" required placeholder="اسم الزبون" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800">
          </div>
          <div>
            <label class="block text-slate-600 mb-1">رقم الهاتف *</label>
            <input type="tel" id="appt-customer-phone" required placeholder="09xxxxxxxx" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 mb-1">التاريخ *</label>
              <input type="date" id="appt-date" value="${getTodayDateString()}" required class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800">
            </div>
            <div>
              <label class="block text-slate-600 mb-1">الوقت *</label>
              <input type="time" id="appt-time" value="12:00" required class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800">
            </div>
          </div>
          <div>
            <label class="block text-slate-600 mb-1">الخدمة المطلوبة *</label>
            <select id="appt-service-select" required class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800">
              ${servicesOpt}
            </select>
          </div>
          <div>
            <label class="block text-slate-600 mb-1">الموظف المسند</label>
            <select id="appt-employee-select" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800">
              ${empOpt}
            </select>
          </div>
          <div class="pt-2 flex gap-2">
            <button type="button" onclick="closeModalDirect('modal-appointment')" class="w-1/2 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-semibold">إلغاء</button>
            <button type="submit" class="w-1/2 gold-gradient-btn py-2.5 rounded-xl font-bold">تأكيد الحجز</button>
          </div>
        </form>
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function saveNewAppointment(e) {
  e.preventDefault();
  const customerName = document.getElementById('appt-customer-name').value;
  const phone = document.getElementById('appt-customer-phone').value;
  const date = document.getElementById('appt-date').value;
  const time = document.getElementById('appt-time').value;
  const serviceSelect = document.getElementById('appt-service-select');
  const serviceId = serviceSelect.value;
  const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text.split(' (')[0];
  const servicePrice = Number(serviceSelect.options[serviceSelect.selectedIndex].getAttribute('data-price') || 0);

  const empSelect = document.getElementById('appt-employee-select');
  const employeeId = empSelect.value;
  const employeeName = empSelect.options[empSelect.selectedIndex].text.split(' (')[0];

  AppState.appointments.push({
    id: `apt-${Date.now()}`,
    customerName,
    phone,
    date,
    time,
    serviceId,
    serviceName,
    employeeId,
    employeeName,
    price: servicePrice,
    status: 'confirmed'
  });

  saveState();
  updateBadges();
  closeModalDirect('modal-appointment');
  if (currentView === 'appointments') filterAppointments();
}

function updateAppointmentStatus(id, newStatus) {
  const apt = AppState.appointments.find(a => a.id === id);
  if (apt) {
    apt.status = newStatus;
    saveState();
    if (currentView === 'appointments') filterAppointments();
  }
}

function deleteAppointment(id) {
  if (confirm("هل أنت متأكد من حذف هذا الموعد؟")) {
    AppState.appointments = AppState.appointments.filter(a => a.id !== id);
    saveState();
    updateBadges();
    if (currentView === 'appointments') filterAppointments();
  }
}

function bindAppointmentsEvents() {}

// --- 4. RECEIPTS & TRANSACTIONS VIEW ---
function renderReceiptsHTML() {
  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-black text-slate-800">سجل الإيصالات والمعاملات</h2>
          <p class="text-xs text-slate-500">أرشيف الفواتير الصادرة وطرق السداد</p>
        </div>
        <div class="flex items-center gap-3">
          <select id="receipt-filter-payment" onchange="filterReceiptsTable()" class="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700">
            <option value="all">جميع طرق الدفع</option>
            <option value="cash">نقدي (Cash)</option>
            <option value="epayment">دفع إلكتروني</option>
            <option value="transfer">تحويل بنكي</option>
          </select>
          <input type="text" id="receipt-search-input" oninput="filterReceiptsTable()" placeholder="بحث برقم الفاتورة..." class="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700">
        </div>
      </div>

      <div class="glass-panel p-4 overflow-x-auto">
        <table class="w-full text-right text-xs text-slate-700">
          <thead class="bg-slate-50 text-amber-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-3">رقم الفاتورة</th>
              <th class="p-3">التاريخ والوقت</th>
              <th class="p-3">الزبون</th>
              <th class="p-3">طريقة الدفع</th>
              <th class="p-3">الموظف</th>
              <th class="p-3">المبلغ</th>
              <th class="p-3 text-center">طباعة</th>
            </tr>
          </thead>
          <tbody id="receipts-table-body" class="divide-y divide-slate-100">
            ${renderReceiptsRows()}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderReceiptsRows(methodFilter = "all", searchQ = "") {
  let list = [...AppState.receipts].reverse();
  if (methodFilter !== "all") list = list.filter(r => r.paymentMethod === methodFilter);
  if (searchQ) {
    const q = searchQ.toLowerCase();
    list = list.filter(r => r.id.toLowerCase().includes(q) || r.customerName.toLowerCase().includes(q));
  }
  if (list.length === 0) return `<tr><td colspan="7" class="p-6 text-center text-slate-400">لا توجد إيصالات</td></tr>`;

  return list.map(r => `
    <tr class="hover:bg-slate-50">
      <td class="p-3 font-bold text-amber-600">${r.id}</td>
      <td class="p-3">${r.date}</td>
      <td class="p-3 font-semibold text-slate-800">${r.customerName}</td>
      <td class="p-3">${r.paymentMethod}</td>
      <td class="p-3">${r.employeeName}</td>
      <td class="p-3 font-black text-emerald-600">${formatCurrency(r.total)}</td>
      <td class="p-3 text-center">
        <button onclick="viewReceiptModal('${r.id}')" class="p-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded"><i data-lucide="printer" class="w-3.5 h-3.5"></i></button>
      </td>
    </tr>
  `).join('');
}

function filterReceiptsTable() {
  const method = document.getElementById('receipt-filter-payment')?.value || 'all';
  const q = document.getElementById('receipt-search-input')?.value || '';
  const tbody = document.getElementById('receipts-table-body');
  if (tbody) {
    tbody.innerHTML = renderReceiptsRows(method, q);
    if (window.lucide) window.lucide.createIcons();
  }
}

function bindReceiptsEvents() {}

// --- 5. MONTHLY BILLS & EXPENSES VIEW ---
function renderBillsHTML() {
  const totalBills = AppState.bills.reduce((sum, b) => sum + b.amount, 0);
  const unpaidCount = AppState.bills.filter(b => b.status === 'غير مدفوعة').length;

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-black text-slate-800">المصاريف التشغيلية لـ SalonLove</h2>
          <p class="text-xs text-slate-500">فواتير الكهرباء، محروقات المولدات، والإيجارات</p>
        </div>
        <button onclick="openNewBillModal()" class="gold-gradient-btn px-4 py-2 rounded-xl text-xs flex items-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i><span>تسجيل مصروف جديد</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="glass-panel p-4 flex items-center justify-between border-rose-200">
          <div>
            <p class="text-xs text-slate-500">إجمالي المصاريف الشهرية</p>
            <h3 class="text-xl font-bold text-rose-600 mt-1">${formatCurrency(totalBills)}</h3>
          </div>
          <i data-lucide="calculator" class="w-8 h-8 text-rose-500/50"></i>
        </div>
        <div class="glass-panel p-4 flex items-center justify-between border-amber-200">
          <div>
            <p class="text-xs text-slate-500">فواتير غير مدفوعة</p>
            <h3 class="text-xl font-bold text-amber-600 mt-1">${unpaidCount}</h3>
          </div>
          <i data-lucide="clock" class="w-8 h-8 text-amber-500/50"></i>
        </div>
        <div class="glass-panel p-4 flex items-center justify-between border-emerald-200">
          <div>
            <p class="text-xs text-slate-500">القسم التشغيلي</p>
            <h3 class="text-base font-bold text-slate-800 mt-1">طاقة ومحروقات وإيجار</h3>
          </div>
          <i data-lucide="flame" class="w-8 h-8 text-amber-500/50"></i>
        </div>
      </div>

      <div class="glass-panel p-4 overflow-x-auto">
        <table class="w-full text-right text-xs text-slate-700">
          <thead class="bg-slate-50 text-amber-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-3">عنوان الفاتورة</th>
              <th class="p-3">الفئة</th>
              <th class="p-3">المبلغ (SYP)</th>
              <th class="p-3">التاريخ</th>
              <th class="p-3">الحالة</th>
              <th class="p-3 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${AppState.bills.map(b => `
              <tr class="hover:bg-slate-50">
                <td class="p-3 font-bold text-slate-800">${b.title}</td>
                <td class="p-3">${b.category}</td>
                <td class="p-3 font-bold text-rose-600">${formatCurrency(b.amount)}</td>
                <td class="p-3">${b.date}</td>
                <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-semibold ${b.status === 'مدفوعة' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">${b.status}</span></td>
                <td class="p-3 text-center flex items-center justify-center gap-1">
                  <button onclick="toggleBillStatus('${b.id}')" title="تبديل الحالة" class="p-1.5 bg-slate-100 text-slate-700 rounded border border-slate-200"><i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i></button>
                  <button onclick="deleteBill('${b.id}')" title="حذف" class="p-1.5 bg-rose-50 text-rose-600 rounded border border-rose-200"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openNewBillModal() {
  const holder = document.getElementById('modals-placeholder');
  holder.innerHTML = `
    <div id="modal-bill" class="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
      <div class="glass-panel w-full max-w-md p-6 rounded-2xl border border-slate-300 animate-fade-in space-y-4 shadow-xl">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-800 text-base">تسجيل مصروف جديد</h3>
          <button onclick="closeModalDirect('modal-bill')" class="text-slate-400 hover:text-slate-700"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <form onsubmit="saveNewBill(event)" class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-600 mb-1">اسم الفاتورة *</label>
            <input type="text" id="bill-title" required placeholder="مثال: فاتورة كهرباء" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-slate-600 mb-1">الفئة *</label>
              <select id="bill-category" required class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800">
                <option value="كهرباء">كهرباء</option>
                <option value="مازوت/محروقات">مازوت ومحروقات</option>
                <option value="إيجار">إيجار</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-600 mb-1">المبلغ (SYP) *</label>
              <input type="number" id="bill-amount" min="1" required placeholder="0" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800">
            </div>
          </div>
          <div class="pt-2 flex gap-2">
            <button type="button" onclick="closeModalDirect('modal-bill')" class="w-1/2 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-semibold">إلغاء</button>
            <button type="submit" class="w-1/2 gold-gradient-btn py-2.5 rounded-xl font-bold">حفظ الفاتورة</button>
          </div>
        </form>
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function saveNewBill(e) {
  e.preventDefault();
  const title = document.getElementById('bill-title').value;
  const category = document.getElementById('bill-category').value;
  const amount = Number(document.getElementById('bill-amount').value);
  const date = getTodayDateString();
  const status = "مدفوعة";

  AppState.bills.push({ id: `bill-${Date.now()}`, title, category, amount, date, status });
  saveState();
  closeModalDirect('modal-bill');
  if (currentView === 'bills') switchView('bills');
}

function toggleBillStatus(id) {
  const b = AppState.bills.find(x => x.id === id);
  if (b) {
    b.status = b.status === 'مدفوعة' ? 'غير مدفوعة' : 'مدفوعة';
    saveState();
    if (currentView === 'bills') switchView('bills');
  }
}

function deleteBill(id) {
  if (confirm("حذف هذا المصروف؟")) {
    AppState.bills = AppState.bills.filter(x => x.id !== id);
    saveState();
    if (currentView === 'bills') switchView('bills');
  }
}

function bindBillsEvents() {}

// --- 6. INVENTORY & SUPPLIES VIEW ---
function renderInventoryHTML() {
  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-black text-slate-800">مخزون وتجهيزات SalonLove</h2>
          <p class="text-xs text-slate-500">تتبع كميات المستحضرات والتنبيه عند النقص</p>
        </div>
      </div>

      <div class="glass-panel p-4 overflow-x-auto">
        <table class="w-full text-right text-xs text-slate-700">
          <thead class="bg-slate-50 text-amber-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-3">المنتج</th>
              <th class="p-3">الكمية الحالية</th>
              <th class="p-3">الحد الأدنى</th>
              <th class="p-3">سعر البيع</th>
              <th class="p-3 text-center">تعديل المخزون</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${AppState.inventory.map(item => `
              <tr class="hover:bg-slate-50 ${item.stock <= item.minStock ? 'bg-rose-50' : ''}">
                <td class="p-3 font-bold text-slate-800">${item.name}</td>
                <td class="p-3 font-bold ${item.stock <= item.minStock ? 'text-rose-600' : 'text-emerald-600'}">${item.stock}</td>
                <td class="p-3">${item.minStock}</td>
                <td class="p-3 font-bold text-amber-600">${formatCurrency(item.sellPrice)}</td>
                <td class="p-3 text-center flex items-center justify-center gap-1">
                  <button onclick="adjustStock('${item.id}', 1)" class="w-6 h-6 bg-white border border-slate-300 rounded font-bold text-slate-700">+</button>
                  <button onclick="adjustStock('${item.id}', -1)" class="w-6 h-6 bg-white border border-slate-300 rounded font-bold text-slate-700">-</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function adjustStock(id, delta) {
  const item = AppState.inventory.find(i => i.id === id);
  if (item) {
    item.stock = Math.max(0, item.stock + delta);
    saveState();
    updateBadges();
    if (currentView === 'inventory') switchView('inventory');
  }
}

function bindInventoryEvents() {}

// --- 7. EMPLOYEES & SALARIES VIEW ---
function renderEmployeesHTML() {
  let totalFixed = 0;
  let totalCommissions = 0;

  const employeeRows = AppState.employees.map(emp => {
    const empReceipts = AppState.receipts.filter(r => r.employeeId === emp.id);
    const empSales = empReceipts.reduce((sum, r) => sum + r.total, 0);
    const commissionEarned = emp.payType !== 'salary' ? (empSales * (emp.commissionRate / 100)) : 0;
    const fixed = emp.payType !== 'commission' ? emp.fixedSalary : 0;
    const grandTotal = fixed + commissionEarned;

    totalFixed += fixed;
    totalCommissions += commissionEarned;

    return `
      <tr class="hover:bg-slate-50">
        <td class="p-3 font-bold text-slate-800">${emp.name} <br><span class="text-[10px] text-slate-500 font-normal">${emp.phone}</span></td>
        <td class="p-3">${emp.role}</td>
        <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-700">${emp.payType}</span></td>
        <td class="p-3">${formatCurrency(fixed)}</td>
        <td class="p-3 font-bold text-amber-600">${emp.payType !== 'salary' ? emp.commissionRate + '%' : '-'}</td>
        <td class="p-3">${formatCurrency(empSales)}</td>
        <td class="p-3 font-bold text-emerald-600">${formatCurrency(commissionEarned)}</td>
        <td class="p-3 font-black text-purple-700">${formatCurrency(grandTotal)}</td>
      </tr>
    `;
  }).join('');

  return `
    <div class="space-y-6 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-black text-slate-800">إدارة موظفي SalonLove والرواتب</h2>
          <p class="text-xs text-slate-500">متابعة الرواتب الثابتة، نسب العمولات، والمستحقات</p>
        </div>
      </div>
      <div class="glass-panel p-4 overflow-x-auto">
        <table class="w-full text-right text-xs text-slate-700">
          <thead class="bg-slate-50 text-amber-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-3">الموظف</th>
              <th class="p-3">المسمى</th>
              <th class="p-3">النظام</th>
              <th class="p-3">الراتب الثابت</th>
              <th class="p-3">النسبة</th>
              <th class="p-3">المبيعات</th>
              <th class="p-3">العمولة</th>
              <th class="p-3">الإجمالي المستحق</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${employeeRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function bindEmployeesEvents() {}

// --- 8. REPORTS VIEW & DOMContentLoaded ---
function renderReportsHTML() {
  const totalRevenue = AppState.receipts.reduce((sum, r) => sum + r.total, 0);
  const totalExpensesBills = AppState.bills.reduce((sum, b) => sum + b.amount, 0);
  const cashTotal = AppState.receipts.filter(r => r.paymentMethod === 'cash').reduce((s, r) => s + r.total, 0);
  const epayTotal = AppState.receipts.filter(r => r.paymentMethod === 'epayment').reduce((s, r) => s + r.total, 0);
  const transferTotal = AppState.receipts.filter(r => r.paymentMethod === 'transfer').reduce((s, r) => s + r.total, 0);

  return `
    <div class="space-y-6 animate-fade-in">
      <div>
        <h2 class="text-2xl font-black text-slate-800">تقارير وأرباح SalonLove</h2>
        <p class="text-xs text-slate-500">تحليل المداخيل، المصاريف، وصافي الأرباح</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="glass-panel p-4 border-emerald-200">
          <p class="text-xs text-slate-500">الإيرادات الكلية</p>
          <h3 class="text-xl font-extrabold text-emerald-600 mt-1">${formatCurrency(totalRevenue)}</h3>
        </div>
        <div class="glass-panel p-4 border-rose-200">
          <p class="text-xs text-slate-500">إجمالي المصاريف</p>
          <h3 class="text-xl font-extrabold text-rose-600 mt-1">${formatCurrency(totalExpensesBills)}</h3>
        </div>
        <div class="glass-panel p-4 border-amber-200">
          <p class="text-xs text-slate-500">صافي الأرباح</p>
          <h3 class="text-xl font-extrabold text-amber-600 mt-1">${formatCurrency(totalRevenue - totalExpensesBills)}</h3>
        </div>
      </div>
      <div class="glass-panel p-5 space-y-3 text-xs">
        <h3 class="font-bold text-slate-800">توزيع طرق التحصيل</h3>
        <div class="flex justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200"><span>نقدي (Cash):</span><b class="text-emerald-600">${formatCurrency(cashTotal)}</b></div>
        <div class="flex justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200"><span>إلكتروني (سيريتل كاش):</span><b class="text-blue-600">${formatCurrency(epayTotal)}</b></div>
        <div class="flex justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200"><span>تحويل بنكي:</span><b class="text-purple-600">${formatCurrency(transferTotal)}</b></div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});