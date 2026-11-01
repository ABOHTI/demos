/* SalonLove - Dynamic Currency Selection per Action (POS, Deposit, Bills) */

const DEFAULT_STATE = {
  isAdminLocked: true,
  adminPin: "1234",
  cashierName: "كاشير SalonLove",
  activeBranchId: "br-1",
  globalCurrency: "SYP", // "SYP" or "USD"
  exchangeRateUSD: 15000, // 1 USD = 15,000 SYP
  branches: [
    { id: "br-1", name: "فرع حمص", address: "حمص - شارع الدبلان / مقابل مجمع تشرين", phone: "031-224455" },
    { id: "br-2", name: "فرع الوادي", address: "وادي النصارى - مشتى الحلو / الشارع العام", phone: "031-778899" }
  ],
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
    { id: "inv-1", name: "شامبو لوريال بروفيسيونال 1000ml", category: "عناية بالشعر", stocks: { "br-1": 12, "br-2": 8 }, minStock: 3, costPrice: 110000, sellPrice: 150000 },
    { id: "inv-2", name: "صبغة لاكمي إسباني ألوان متعددة", category: "صبغات ومستحضرات", stocks: { "br-1": 25, "br-2": 14 }, minStock: 5, costPrice: 28000, sellPrice: 40000 },
    { id: "inv-3", name: "سيروم الكيراتين البرازيلي الأصلي", category: "عناية بالشعر", stocks: { "br-1": 2, "br-2": 5 }, minStock: 4, costPrice: 95000, sellPrice: 135000 },
    { id: "inv-4", name: "زيت أرغان مغربي فاخر 100ml", category: "عناية بالبشرة", stocks: { "br-1": 8, "br-2": 3 }, minStock: 3, costPrice: 45000, sellPrice: 70000 },
    { id: "inv-5", name: "طلاء أظافر جيل OPI متعدّد", category: "أظافر وتجميل", stocks: { "br-1": 18, "br-2": 20 }, minStock: 5, costPrice: 18000, sellPrice: 30000 }
  ],
  employees: [
    { id: "emp-1", branchId: "br-1", name: "ريم الأحمد", role: "قص وتصفيف", phone: "0933112233", payType: "both", fixedSalary: 600000, commissionRate: 15 },
    { id: "emp-2", branchId: "br-1", name: "نور الشام", role: "بشرة ومكياج", phone: "0944556677", payType: "commission", fixedSalary: 0, commissionRate: 25 },
    { id: "emp-3", branchId: "br-2", name: "سامر الحلبي", role: "حلاق ومصفف", phone: "0955889900", payType: "both", fixedSalary: 500000, commissionRate: 20 },
    { id: "emp-4", branchId: "br-2", name: "ميساء حمصي", role: "استقبال وكاشير", phone: "0988112244", payType: "salary", fixedSalary: 750000, commissionRate: 0 }
  ],
  appointments: [
    { id: "apt-101", branchId: "br-1", customerName: "سارة الزين", phone: "0991234567", date: getTodayDateString(), time: "14:00", serviceId: "srv-3", serviceName: "صبغة شعر كاملة + خصل", employeeId: "emp-1", employeeName: "ريم الأحمد", price: 250000, deposit: 50000, depositCurrency: "SYP", status: "confirmed" },
    { id: "apt-102", branchId: "br-2", customerName: "هدى دروبي", phone: "0933445566", date: getTodayDateString(), time: "16:30", serviceId: "srv-5", serviceName: "تنظيف بشرة هيدرافيسيال", employeeId: "emp-3", employeeName: "سامر الحلبي", price: 180000, deposit: 0, depositCurrency: "SYP", status: "pending" }
  ],
  receipts: [
    {
      id: "INV-9001",
      branchId: "br-1",
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
      paidCurrency: "SYP",
      paymentMethod: "cash"
    }
  ],
  bills: [
    { id: "bill-1", branchId: "br-1", title: "فاتورة كهرباء فرع حمص", category: "كهرباء", amount: 350000, currency: "SYP", date: getTodayDateString(), status: "مدفوعة" },
    { id: "bill-2", branchId: "br-1", title: "شراء مازوت مولدة حمص (200L)", category: "مازوت/محروقات", amount: 1200000, currency: "SYP", date: getTodayDateString(), status: "مدفوعة" },
    { id: "bill-3", branchId: "br-2", title: "إيجار صالون فرع الوادي الشهري", category: "إيجار", amount: 2500000, currency: "SYP", date: getTodayDateString(), status: "غير مدفوعة" }
  ]
};

let AppState = loadState();
let posCart = [];
let currentPosTab = "services";
let selectedPaymentMethod = "cash";
let posPaymentCurrency = "SYP"; // Active checkout currency selection
let currentView = "dashboard";

function getTodayDateString() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function loadState() {
  try {
    const saved = localStorage.getItem('salonlove_multibranch_state_v5');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error loading state", e);
  }
  return DEFAULT_STATE;
}

function saveState() {
  try {
    localStorage.setItem('salonlove_multibranch_state_v5', JSON.stringify(AppState));
  } catch (e) {
    console.error("Error saving state", e);
  }
}

// Convert/Format currencies
function formatCurrency(amountInSYP, targetCurrency = null) {
  const sypVal = Number(amountInSYP || 0);
  const curr = targetCurrency || AppState.globalCurrency;
  if (curr === "USD") {
    const usdVal = sypVal / (AppState.exchangeRateUSD || 15000);
    return "$" + usdVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return sypVal.toLocaleString('en-US') + " SYP";
}

function changeGlobalCurrency(curr) {
  AppState.globalCurrency = curr;
  posPaymentCurrency = curr;
  saveState();
  updateGlobalCurrencyUI();
  updateBadges();
  switchView(currentView);
}

function updateGlobalCurrencyUI() {
  const btnSYP = document.getElementById('curr-btn-syp');
  const btnUSD = document.getElementById('curr-btn-usd');
  const sideLabel = document.getElementById('sidebar-curr-label');

  if (AppState.globalCurrency === 'USD') {
    if (btnUSD) btnUSD.className = "px-2 py-0.5 rounded text-[11px] font-bold transition bg-amber-500 text-white shadow-sm";
    if (btnSYP) btnSYP.className = "px-2 py-0.5 rounded text-[11px] font-bold text-slate-600 hover:text-amber-600 transition";
    if (sideLabel) sideLabel.textContent = "$ (USD)";
  } else {
    if (btnSYP) btnSYP.className = "px-2 py-0.5 rounded text-[11px] font-bold transition bg-amber-500 text-white shadow-sm";
    if (btnUSD) btnUSD.className = "px-2 py-0.5 rounded text-[11px] font-bold text-slate-600 hover:text-amber-600 transition";
    if (sideLabel) sideLabel.textContent = "ل.س (SYP)";
  }
}

function getActiveBranch() {
  return AppState.branches.find(b => b.id === AppState.activeBranchId) || AppState.branches[0];
}

function filterByBranch(list) {
  return list.filter(item => item.branchId === AppState.activeBranchId);
}

// Mobile Sidebar Drawer Controller
function toggleMobileSidebar(shouldOpen) {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('mobile-sidebar-backdrop');
  if (!sidebar || !backdrop) return;

  const openState = shouldOpen !== undefined ? shouldOpen : !sidebar.classList.contains('drawer-open');

  if (openState) {
    sidebar.classList.add('drawer-open');
    backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    sidebar.classList.remove('drawer-open');
    backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Branch Switching Restricted to Manager Mode
function handleBranchChangeAttempt(targetBranchId) {
  if (AppState.isAdminLocked) {
    const sel = document.getElementById('branch-selector');
    if (sel) sel.value = AppState.activeBranchId;
    openAdminPinModal(null, targetBranchId);
    return;
  }
  executeBranchSwitch(targetBranchId);
}

function executeBranchSwitch(newBranchId) {
  AppState.activeBranchId = newBranchId;
  saveState();
  updateBranchHeaderUI();
  updateBadges();
  switchView(currentView);
}

function updateBranchHeaderUI() {
  const sel = document.getElementById('branch-selector');
  if (sel) {
    sel.value = AppState.activeBranchId;
    if (AppState.isAdminLocked) {
      sel.disabled = true;
      sel.className = "bg-slate-100 border border-slate-300 text-slate-500 text-[11px] md:text-xs font-bold rounded-lg px-1.5 md:px-2 py-1 focus:outline-none cursor-not-allowed opacity-80 max-w-[105px] sm:max-w-none truncate";
    } else {
      sel.disabled = false;
      sel.className = "bg-amber-50 border border-amber-300 text-amber-900 text-[11px] md:text-xs font-bold rounded-lg px-1.5 md:px-2 py-1 focus:outline-none cursor-pointer max-w-[105px] sm:max-w-none truncate";
    }
  }

  const icon = document.getElementById('branch-pin-icon');
  if (icon) {
    icon.setAttribute('data-lucide', AppState.isAdminLocked ? 'lock' : 'map-pin');
    icon.className = AppState.isAdminLocked ? 'w-3.5 h-3.5 text-slate-400' : 'w-3.5 h-3.5 text-amber-600';
  }

  const label = document.getElementById('current-branch-label');
  if (label) {
    const cur = getActiveBranch();
    label.textContent = cur.name;
  }

  if (window.lucide) window.lucide.createIcons();
}

function initApp() {
  updateClock();
  setInterval(updateClock, 1000);
  setupNavigation();
  setupAdminLock();
  setupBackupButton();
  updateBranchHeaderUI();
  updateGlobalCurrencyUI();
  updateBadges();
  switchView('dashboard');
}

function updateClock() {
  const clockEl = document.getElementById('live-clock');
  if (clockEl) {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
  }
}

function setupNavigation() {
  document.querySelectorAll('#main-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      switchView(targetView);
      toggleMobileSidebar(false);
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

  if (window.lucide) window.lucide.createIcons();
}

function updateBadges() {
  const apptBadge = document.getElementById('nav-badge-appointments');
  if (apptBadge) {
    const today = getTodayDateString();
    const appts = filterByBranch(AppState.appointments);
    const count = appts.filter(a => a.date === today && a.status !== 'cancelled').length;
    apptBadge.textContent = count.toString();
  }

  const invBadge = document.getElementById('nav-badge-inventory');
  if (invBadge) {
    const branchKey = AppState.activeBranchId;
    const lowCount = AppState.inventory.filter(i => (i.stocks[branchKey] || 0) <= i.minStock).length;
    if (lowCount > 0) {
      invBadge.classList.remove('hidden');
      invBadge.textContent = lowCount.toString();
    } else {
      invBadge.classList.add('hidden');
    }
  }
}

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

  const branchWrapper = document.getElementById('branch-switch-wrapper');
  if (branchWrapper) {
    branchWrapper.addEventListener('click', () => {
      if (AppState.isAdminLocked) {
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

  updateBranchHeaderUI();
  if (window.lucide) window.lucide.createIcons();
}

function openAdminPinModal(targetViewAfterSuccess = null, pendingBranchAfterSuccess = null) {
  window.pendingTargetView = targetViewAfterSuccess;
  window.pendingBranchSwitch = pendingBranchAfterSuccess;

  const modalsHolder = document.getElementById('modals-placeholder');
  modalsHolder.innerHTML = `
    <div id="admin-pin-modal" class="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
      <div class="glass-panel w-full max-w-sm p-6 rounded-2xl border border-amber-200 text-center space-y-4 animate-fade-in shadow-xl">
        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl mx-auto flex items-center justify-center border border-amber-300">
          <i data-lucide="shield-check" class="w-6 h-6"></i>
        </div>
        <div>
          <h3 class="font-bold text-slate-800 text-base">دخول المدير (Admin PIN)</h3>
          <p class="text-xs text-slate-500 mt-1">التبديل بين الفروع مخصص للمدير فقط (PIN: 1234)</p>
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

    if (window.pendingBranchSwitch) {
      executeBranchSwitch(window.pendingBranchSwitch);
      window.pendingBranchSwitch = null;
    }

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

// --- 1. DASHBOARD ---
function renderDashboardHTML() {
  const today = getTodayDateString();
  const curBranch = getActiveBranch();
  const branchReceipts = filterByBranch(AppState.receipts).filter(r => r.date.startsWith(today));
  const todaySalesTotal = branchReceipts.reduce((sum, r) => sum + r.total, 0);
  const todayAppts = filterByBranch(AppState.appointments).filter(a => a.date === today);
  const monthlyBillsTotal = filterByBranch(AppState.bills).reduce((sum, b) => sum + b.amount, 0);

  return `
    <div class="space-y-4 md:space-y-6 animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl md:text-2xl font-black text-slate-800">لوحة التحكم</h2>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">${curBranch.name}</span>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">متابعة المبيعات والحجوزات والمخزون الحالي</p>
        </div>
        <div>
          <button onclick="switchView('pos')" class="gold-gradient-btn w-full sm:w-auto px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2">
            <i data-lucide="plus-circle" class="w-4 h-4"></i><span>فاتورة جديدة (${curBranch.name})</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div class="glass-panel p-4 flex items-center justify-between border-amber-200">
          <div>
            <p class="text-xs text-slate-500">إيرادات اليوم (${curBranch.name})</p>
            <h3 class="text-lg md:text-xl font-bold text-amber-600 mt-1">${formatCurrency(todaySalesTotal)}</h3>
          </div>
          <div class="w-10 h-10 md:w-12 md:h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <i data-lucide="banknote" class="w-5 h-5 md:w-6 md:h-6"></i>
          </div>
        </div>
        <div class="glass-panel p-4 flex items-center justify-between border-blue-200">
          <div>
            <p class="text-xs text-slate-500">مواعيد اليوم (${curBranch.name})</p>
            <h3 class="text-lg md:text-xl font-bold text-slate-800 mt-1">${todayAppts.length}</h3>
          </div>
          <div class="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <i data-lucide="calendar-check" class="w-5 h-5 md:w-6 md:h-6"></i>
          </div>
        </div>
        <div class="glass-panel p-4 flex items-center justify-between border-rose-200">
          <div>
            <p class="text-xs text-slate-500">إجمالي المصاريف</p>
            <h3 class="text-lg md:text-xl font-bold text-rose-600 mt-1">${formatCurrency(monthlyBillsTotal)}</h3>
          </div>
          <div class="w-10 h-10 md:w-12 md:h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
            <i data-lucide="receipt" class="w-5 h-5 md:w-6 md:h-6"></i>
          </div>
        </div>
      </div>

      <div class="glass-panel p-4 md:p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-bold text-sm text-slate-800">مواعيد اليوم (${today})</h3>
          <button onclick="switchView('appointments')" class="text-xs text-amber-600 hover:underline">عرض الكل</button>
        </div>
        <div class="space-y-2">
          ${todayAppts.length === 0 ? '<p class="text-xs text-slate-400 py-4 text-center">لا توجد مواعيد مسجلة لهذا الفرع اليوم</p>' : 
            todayAppts.map(apt => `
              <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs gap-2">
                <div>
                  <h4 class="font-bold text-slate-800">${apt.customerName} (${apt.phone})</h4>
                  <p class="text-[11px] text-slate-500">${apt.serviceName} - المسؤول: <span class="text-amber-600 font-semibold">${apt.employeeName}</span> (${apt.time})</p>
                  ${apt.deposit > 0 ? `<p class="text-[10px] text-emerald-600 font-bold mt-0.5">رعبون مدفوع: ${formatCurrency(apt.deposit, apt.depositCurrency)} | المتبقي: ${formatCurrency(apt.price - apt.deposit, apt.depositCurrency)}</p>` : ''}
                </div>
                <button onclick="convertApptToPOS('${apt.id}')" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded text-[11px] shadow-sm self-end sm:self-auto">تحويل لـ POS</button>
              </div>
            `).join('')}
        </div>
      </div>
    </div>
  `;
}

// --- 2. POS VIEW WITH IN-CHECKOUT CURRENCY SELECTION ---
function setPOSCheckoutCurrency(curr) {
  posPaymentCurrency = curr;
  updatePOSTotals();
  const btnSYP = document.getElementById('pos-curr-syp');
  const btnUSD = document.getElementById('pos-curr-usd');
  if (curr === 'USD') {
    if (btnUSD) btnUSD.className = "py-1.5 rounded-lg border text-center font-bold border-amber-500 bg-amber-50 text-amber-700 shadow-sm";
    if (btnSYP) btnSYP.className = "py-1.5 rounded-lg border text-center font-bold border-slate-200 bg-slate-50 text-slate-600";
  } else {
    if (btnSYP) btnSYP.className = "py-1.5 rounded-lg border text-center font-bold border-amber-500 bg-amber-50 text-amber-700 shadow-sm";
    if (btnUSD) btnUSD.className = "py-1.5 rounded-lg border text-center font-bold border-slate-200 bg-slate-50 text-slate-600";
  }
}

function renderPOSHTML() {
  const curBranch = getActiveBranch();
  const branchEmployees = AppState.employees.filter(e => e.branchId === curBranch.id);
  const employeesOptions = branchEmployees.map(e => `<option value="${e.id}">${e.name} (${e.role})</option>`).join('');

  return `
    <div class="space-y-4 md:space-y-6 animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 class="text-xl md:text-2xl font-black text-slate-800">نقطة البيع الكاشير (POS)</h2>
          <p class="text-xs text-slate-500">إصدار فواتير وسداد لـ <span class="font-bold text-amber-700">${curBranch.name}</span></p>
        </div>
        <div class="flex items-center gap-2 self-start sm:self-auto">
          <span class="text-xs text-slate-500">الكاشير:</span>
          <span class="text-xs font-bold text-amber-700 px-2 py-1 bg-amber-100 border border-amber-200 rounded-lg">${AppState.cashierName}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <div class="lg:col-span-7 space-y-3 md:space-y-4">
          <div class="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm gap-2">
            <div class="flex gap-1 sm:gap-2">
              <button id="pos-tab-services" onclick="setPosTab('services')" class="px-3 sm:px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-white">الخدمات والقصات</button>
              <button id="pos-tab-products" onclick="setPosTab('products')" class="px-3 sm:px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">المستحضرات</button>
            </div>
            <input type="text" id="pos-search-input" oninput="filterPOSCatalog()" placeholder="بحث..." class="bg-slate-50 border border-slate-300 rounded-lg px-2 sm:px-3 py-1.5 text-xs text-slate-700 w-28 sm:w-auto">
          </div>

          <div id="pos-catalog-grid" class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-h-[380px] sm:max-h-[520px] overflow-y-auto p-1">
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

              <div class="min-h-[130px] max-h-[190px] overflow-y-auto space-y-2" id="pos-cart-items-container">
                ${renderPOSCartItems()}
              </div>
            </div>

            <div class="border-t border-slate-200 pt-3 space-y-3">
              <!-- Checkpoint 1: POS Currency Selector -->
              <div>
                <label class="block text-[11px] text-slate-600 mb-1 font-semibold">عملة محاسبة الزبون:</label>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <button type="button" onclick="setPOSCheckoutCurrency('SYP')" id="pos-curr-syp" class="py-1.5 rounded-lg border text-center font-bold ${posPaymentCurrency === 'SYP' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-600'}">ليرة سورية (SYP)</button>
                  <button type="button" onclick="setPOSCheckoutCurrency('USD')" id="pos-curr-usd" class="py-1.5 rounded-lg border text-center font-bold ${posPaymentCurrency === 'USD' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-600'}">دولار أمريكي (USD $)</button>
                </div>
              </div>

              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-600">خصم / رعبون مسبق (<span id="pos-disc-curr-label">${posPaymentCurrency}</span>):</span>
                <input type="number" id="pos-discount-input" oninput="updatePOSTotals()" value="0" min="0" step="any" class="w-32 bg-slate-50 border border-slate-300 rounded p-1 text-center font-bold text-amber-600">
              </div>

              <div>
                <label class="block text-[11px] text-slate-600 mb-1 font-semibold">طريقة الدفع:</label>
                <div class="grid grid-cols-3 gap-2 text-xs">
                  <button type="button" onclick="setPaymentMethod('cash')" id="pay-btn-cash" class="py-2 rounded-lg border text-center font-bold border-amber-500 bg-amber-50 text-amber-700">كاش</button>
                  <button type="button" onclick="setPaymentMethod('epayment')" id="pay-btn-epayment" class="py-2 rounded-lg border text-center font-bold border-slate-200 bg-slate-50 text-slate-600">سيريتل كاش</button>
                  <button type="button" onclick="setPaymentMethod('transfer')" id="pay-btn-transfer" class="py-2 rounded-lg border text-center font-bold border-slate-200 bg-slate-50 text-slate-600">تحويل</button>
                </div>
              </div>

              <div class="bg-slate-50 p-3 rounded-xl space-y-1 text-xs border border-slate-200">
                <div class="flex justify-between text-slate-600"><span>المجموع:</span><span id="pos-subtotal-val">${formatCurrency(calculatePosSubtotal(), posPaymentCurrency)}</span></div>
                <div class="flex justify-between text-base font-black text-amber-600 pt-1 border-t border-slate-200">
                  <span>المبلغ النهائي المطلوب:</span><span id="pos-total-val">${formatCurrency(calculatePosTotal(), posPaymentCurrency)}</span>
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
  const branchKey = AppState.activeBranchId;
  const items = currentPosTab === 'services' ? AppState.services : AppState.inventory;
  const filtered = items.filter(i => i.name.toLowerCase().includes(filterText.toLowerCase()));

  return filtered.map(item => {
    const price = currentPosTab === 'services' ? item.price : item.sellPrice;
    const stockNote = currentPosTab === 'products' ? `<span class="text-[10px] text-slate-400">المتوفر: ${item.stocks[branchKey] || 0}</span>` : '';
    return `
      <div onclick="addCartItem('${item.id}', '${currentPosTab}')" class="glass-panel p-2.5 sm:p-3 rounded-xl cursor-pointer hover:border-amber-400 transition flex flex-col justify-between space-y-2">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-[10px] text-amber-700 font-semibold truncate">${item.category || ''}</span>
            ${stockNote}
          </div>
          <h4 class="font-bold text-xs text-slate-800 line-clamp-2 mt-0.5">${item.name}</h4>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
          <span class="font-bold text-amber-600 text-xs">${formatCurrency(price, posPaymentCurrency)}</span>
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
    btnServ.className = "px-3 sm:px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-white";
    btnProd.className = "px-3 sm:px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-700";
  } else {
    btnProd.className = "px-3 sm:px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-white";
    btnServ.className = "px-3 sm:px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-700";
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
        <span class="text-[10px] text-amber-600">${formatCurrency(item.price, posPaymentCurrency)} × ${item.qty}</span>
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
  let disc = Number(document.getElementById('pos-discount-input')?.value || 0);
  if (posPaymentCurrency === 'USD') {
    disc = disc * (AppState.exchangeRateUSD || 15000);
  }
  return Math.max(0, sub - disc);
}

function updatePOSTotals() {
  const sub = calculatePosSubtotal();
  const tot = calculatePosTotal();
  const subEl = document.getElementById('pos-subtotal-val');
  const totEl = document.getElementById('pos-total-val');
  const discLbl = document.getElementById('pos-disc-curr-label');
  if (discLbl) discLbl.textContent = posPaymentCurrency;
  if (subEl) subEl.textContent = formatCurrency(sub, posPaymentCurrency);
  if (totEl) totEl.textContent = formatCurrency(tot, posPaymentCurrency);
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

  const curBranch = getActiveBranch();
  const customerName = document.getElementById('pos-customer-name')?.value || "زبون عام";
  const empSelect = document.getElementById('pos-employee-select');
  const employeeId = empSelect?.value || AppState.employees[0]?.id;
  const employeeObj = AppState.employees.find(e => e.id === employeeId);
  const employeeName = employeeObj ? employeeObj.name : "موظف SalonLove";

  const subtotal = calculatePosSubtotal();
  let discount = Number(document.getElementById('pos-discount-input')?.value || 0);
  if (posPaymentCurrency === 'USD') {
    discount = discount * (AppState.exchangeRateUSD || 15000);
  }
  const total = calculatePosTotal();

  const newReceiptId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();
  const nowStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;

  const receipt = {
    id: newReceiptId,
    branchId: curBranch.id,
    date: nowStr,
    customerName,
    employeeId,
    employeeName,
    items: [...posCart],
    subtotal,
    discount,
    total,
    paidCurrency: posPaymentCurrency,
    paymentMethod: selectedPaymentMethod
  };

  AppState.receipts.push(receipt);

  posCart.forEach(cartItem => {
    if (cartItem.type === 'products') {
      const invItem = AppState.inventory.find(i => i.id === cartItem.id);
      if (invItem && invItem.stocks[curBranch.id] !== undefined) {
        invItem.stocks[curBranch.id] = Math.max(0, invItem.stocks[curBranch.id] - cartItem.qty);
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
  const branchObj = AppState.branches.find(b => b.id === receipt.branchId) || AppState.branches[0];
  const holder = document.getElementById('modals-placeholder');
  const currencyUsed = receipt.paidCurrency || "SYP";

  holder.innerHTML = `
    <div id="modal-receipt-view" class="fixed inset-0 modal-overlay flex items-center justify-center p-3 z-50">
      <div class="glass-panel w-full max-w-sm max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl border border-slate-300 space-y-4 animate-fade-in shadow-2xl">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-800 text-sm">إيصال حراري - SalonLove (${branchObj.name})</h3>
          <button onclick="closeModalDirect('modal-receipt-view')" class="text-slate-400 hover:text-slate-700"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>

        <div id="printable-receipt-area" class="bg-white text-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 font-mono text-xs space-y-3">
          <div class="text-center border-b border-dashed border-slate-400 pb-2">
            <h2 class="font-black text-base text-amber-700">SalonLove</h2>
            <p class="text-[11px] font-bold text-slate-800">${branchObj.name}</p>
            <p class="text-[10px]">${branchObj.address}</p>
            <p class="text-[10px]">Tel: ${branchObj.phone}</p>
          </div>
          <div class="text-[11px] space-y-0.5">
            <div class="flex justify-between"><span>رقم الفاتورة:</span><span class="font-bold">${receipt.id}</span></div>
            <div class="flex justify-between"><span>التاريخ:</span><span>${receipt.date}</span></div>
            <div class="flex justify-between"><span>الزبون:</span><span>${receipt.customerName}</span></div>
            <div class="flex justify-between"><span>المسؤول:</span><span>${receipt.employeeName}</span></div>
            <div class="flex justify-between"><span>عملة السداد:</span><span class="font-bold text-amber-700">${currencyUsed === 'USD' ? 'دولار أمريكي (USD)' : 'ليرة سورية (SYP)'}</span></div>
            <div class="flex justify-between"><span>طريقة الدفع:</span><span class="font-bold">${receipt.paymentMethod === 'cash' ? 'نقدي (Cash)' : receipt.paymentMethod === 'epayment' ? 'سيريتل كاش' : 'تحويل بنكي'}</span></div>
          </div>
          <table class="w-full border-t border-b border-dashed border-slate-400 py-1 text-right text-[11px]">
            <thead>
              <tr class="text-[10px] text-slate-600 border-b border-slate-200">
                <th>البند</th><th class="text-center">الكمية</th><th class="text-left">السعر</th>
              </tr>
            </thead>
            <tbody>
              ${receipt.items.map(i => `<tr><td>${i.name}</td><td class="text-center">${i.qty}</td><td class="text-left">${formatCurrency(i.price * i.qty, currencyUsed)}</td></tr>`).join('')}
            </tbody>
          </table>
          <div class="space-y-0.5 text-[11px]">
            <div class="flex justify-between text-slate-600"><span>المجموع:</span><span>${formatCurrency(receipt.subtotal, currencyUsed)}</span></div>
            <div class="flex justify-between text-slate-600"><span>الخصم / الرعبون:</span><span>${formatCurrency(receipt.discount, currencyUsed)}</span></div>
            <div class="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-300"><span>الصافي المدفوع:</span><span>${formatCurrency(receipt.total, currencyUsed)}</span></div>
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

  if (AppState.activeBranchId !== apt.branchId) {
    AppState.activeBranchId = apt.branchId;
    updateBranchHeaderUI();
  }

  // Set the POS payment currency to the deposit currency by default
  posPaymentCurrency = apt.depositCurrency || AppState.globalCurrency;

  switchView('pos');
  setTimeout(() => {
    const custInput = document.getElementById('pos-customer-name');
    if (custInput) custInput.value = apt.customerName;
    const empSelect = document.getElementById('pos-employee-select');
    if (empSelect && apt.employeeId) empSelect.value = apt.employeeId;
    
    const discInput = document.getElementById('pos-discount-input');
    if (discInput && apt.deposit) {
      if (posPaymentCurrency === 'USD') {
        discInput.value = (apt.deposit / (AppState.exchangeRateUSD || 15000)).toFixed(2);
      } else {
        discInput.value = apt.deposit;
      }
    }
    setPOSCheckoutCurrency(posPaymentCurrency);
    refreshCartUI();
  }, 50);
}

function bindPOSEvents() {}

// --- 3. APPOINTMENTS WITH CURRENCY SELECTION ---
function renderAppointmentsHTML() {
  const today = getTodayDateString();
  const curBranch = getActiveBranch();
  return `
    <div class="space-y-4 md:space-y-6 animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 class="text-xl md:text-2xl font-black text-slate-800">نظام الحجوزات والمواعيد</h2>
          <p class="text-xs text-slate-500">حجوزات <span class="font-bold text-amber-700">${curBranch.name}</span></p>
        </div>
        <div class="flex items-center gap-2 sm:gap-3">
          <input type="date" id="appt-date-filter" value="${today}" onchange="filterAppointments()" class="bg-white border border-slate-300 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-700 flex-1 sm:flex-none">
          <button onclick="openNewAppointmentModal()" class="gold-gradient-btn px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap">
            <i data-lucide="plus" class="w-4 h-4"></i><span>حجز موعد</span>
          </button>
        </div>
      </div>

      <div class="glass-panel p-3 md:p-4 overflow-x-auto">
        <table class="w-full text-right text-xs text-slate-700 min-w-[550px]">
          <thead class="bg-slate-50 text-amber-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-2 sm:p-3">الزبون / الهاتف</th>
              <th class="p-2 sm:p-3">الوقت والتاريخ</th>
              <th class="p-2 sm:p-3">الخدمة</th>
              <th class="p-2 sm:p-3">المسؤول</th>
              <th class="p-2 sm:p-3">السعر الإجمالي</th>
              <th class="p-2 sm:p-3">الرعبون المدفوع</th>
              <th class="p-2 sm:p-3">الحالة</th>
              <th class="p-2 sm:p-3 text-center">إجراءات</th>
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
  let list = filterByBranch(AppState.appointments);
  if (dateFilter) list = list.filter(a => a.date === dateFilter);
  if (list.length === 0) {
    return `<tr><td colspan="8" class="p-6 text-center text-slate-400">لا توجد مواعيد مسجلة</td></tr>`;
  }
  return list.map(apt => {
    const depositVal = Number(apt.deposit || 0);
    const depCurr = apt.depositCurrency || "SYP";
    const remainingVal = Math.max(0, apt.price - depositVal);
    return `
      <tr class="hover:bg-slate-50">
        <td class="p-2 sm:p-3 font-bold text-slate-800">${apt.customerName} <br><span class="text-[10px] text-slate-500 font-normal">${apt.phone}</span></td>
        <td class="p-2 sm:p-3">${apt.date} <br><span class="text-amber-600 font-bold">${apt.time}</span></td>
        <td class="p-2 sm:p-3">${apt.serviceName}</td>
        <td class="p-2 sm:p-3">${apt.employeeName}</td>
        <td class="p-2 sm:p-3 font-bold text-slate-800">${formatCurrency(apt.price)}</td>
        <td class="p-2 sm:p-3">
          ${depositVal > 0 
            ? `<span class="font-bold text-emerald-600">${formatCurrency(depositVal, depCurr)}</span> <span class="text-[10px] font-semibold text-slate-500">(${depCurr})</span><br><span class="text-[10px] text-rose-500 font-semibold">باقي: ${formatCurrency(remainingVal, depCurr)}</span>` 
            : `<span class="text-slate-400">بدون رعبون</span>`}
        </td>
        <td class="p-2 sm:p-3"><span class="px-2 py-0.5 rounded text-[10px] font-semibold badge-${apt.status}">${apt.status}</span></td>
        <td class="p-2 sm:p-3 text-center flex items-center justify-center gap-1">
          <button onclick="convertApptToPOS('${apt.id}')" title="تحويل لـ POS وتطبيق الرعبون" class="p-1.5 bg-amber-50 text-amber-600 rounded border border-amber-200"><i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i></button>
          <button onclick="updateAppointmentStatus('${apt.id}', 'completed')" title="إنجاز" class="p-1.5 bg-emerald-50 text-emerald-600 rounded border border-emerald-200"><i data-lucide="check" class="w-3.5 h-3.5"></i></button>
          <button onclick="deleteAppointment('${apt.id}')" title="حذف" class="p-1.5 bg-rose-50 text-rose-600 rounded border border-rose-200"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterAppointments() {
  const d = document.getElementById('appt-date-filter')?.value;
  const tbody = document.getElementById('appointments-table-body');
  if (tbody) {
    tbody.innerHTML = renderAppointmentsRows(d);
    if (window.lucide) window.lucide.createIcons();
  }
}

// Checkpoint 2: Appointment Modal with Currency Selection
function openNewAppointmentModal() {
  const curBranch = getActiveBranch();
  const servicesOpt = AppState.services.map(s => `<option value="${s.id}" data-price="${s.price}">${s.name} (${formatCurrency(s.price)})</option>`).join('');
  const branchEmployees = AppState.employees.filter(e => e.branchId === curBranch.id);
  const empOpt = branchEmployees.map(e => `<option value="${e.id}">${e.name}</option>`).join('');

  const holder = document.getElementById('modals-placeholder');
  holder.innerHTML = `
    <div id="modal-appointment" class="fixed inset-0 modal-overlay flex items-center justify-center p-3 sm:p-4 z-50">
      <div class="glass-panel w-full max-w-md max-h-[92vh] overflow-y-auto p-4 sm:p-6 rounded-2xl border border-slate-300 animate-fade-in space-y-4 shadow-xl">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-800 text-base">حجز موعد (${curBranch.name})</h3>
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
          
          <!-- Deposit Amount & Currency Selector -->
          <div class="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-2">
            <label class="block text-slate-700 font-bold">تسجيل الرعبون (الدفعة المسبقة):</label>
            <div class="grid grid-cols-12 gap-2">
              <div class="col-span-7">
                <input type="number" id="appt-deposit-input" min="0" value="0" step="any" placeholder="0" class="w-full bg-white border border-amber-300 rounded-lg p-2 font-bold text-amber-700">
              </div>
              <div class="col-span-5">
                <select id="appt-deposit-currency" class="w-full bg-white border border-amber-300 rounded-lg p-2 font-bold text-amber-800">
                  <option value="SYP" ${AppState.globalCurrency === 'SYP' ? 'selected' : ''}>ل.س (SYP)</option>
                  <option value="USD" ${AppState.globalCurrency === 'USD' ? 'selected' : ''}>$ (USD)</option>
                </select>
              </div>
            </div>
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
  const branchId = AppState.activeBranchId;
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
  
  const depCurr = document.getElementById('appt-deposit-currency').value;
  let depositInput = Number(document.getElementById('appt-deposit-input')?.value || 0);
  
  // Store deposit normalized to base SYP
  let depositBaseSYP = depositInput;
  if (depCurr === 'USD') {
    depositBaseSYP = depositInput * (AppState.exchangeRateUSD || 15000);
  }

  AppState.appointments.push({
    id: `apt-${Date.now()}`,
    branchId,
    customerName,
    phone,
    date,
    time,
    serviceId,
    serviceName,
    employeeId,
    employeeName,
    price: servicePrice,
    deposit: depositBaseSYP,
    depositCurrency: depCurr,
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

// --- 4. RECEIPTS ---
function renderReceiptsHTML() {
  return `
    <div class="space-y-4 md:space-y-6 animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 class="text-xl md:text-2xl font-black text-slate-800">سجل الإيصالات والمعاملات</h2>
          <p class="text-xs text-slate-500">أرشيف الفواتير الصادرة وطرق السداد</p>
        </div>
        <div class="flex items-center gap-2 sm:gap-3">
          <select id="receipt-filter-payment" onchange="filterReceiptsTable()" class="bg-white border border-slate-300 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-700">
            <option value="all">جميع الطرق</option>
            <option value="cash">نقدي (Cash)</option>
            <option value="epayment">دفع إلكتروني</option>
            <option value="transfer">تحويل بنكي</option>
          </select>
          <input type="text" id="receipt-search-input" oninput="filterReceiptsTable()" placeholder="بحث برقم الفاتورة..." class="bg-white border border-slate-300 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs text-slate-700 flex-1 sm:flex-none">
        </div>
      </div>

      <div class="glass-panel p-3 md:p-4 overflow-x-auto">
        <table class="w-full text-right text-xs text-slate-700 min-w-[500px]">
          <thead class="bg-slate-50 text-amber-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-2 sm:p-3">رقم الفاتورة</th>
              <th class="p-2 sm:p-3">التاريخ والوقت</th>
              <th class="p-2 sm:p-3">الزبون</th>
              <th class="p-2 sm:p-3">العملة المسددة</th>
              <th class="p-2 sm:p-3">طريقة الدفع</th>
              <th class="p-2 sm:p-3">المبلغ</th>
              <th class="p-2 sm:p-3 text-center">طباعة</th>
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
  let list = [...filterByBranch(AppState.receipts)].reverse();
  if (methodFilter !== "all") list = list.filter(r => r.paymentMethod === methodFilter);
  if (searchQ) {
    const q = searchQ.toLowerCase();
    list = list.filter(r => r.id.toLowerCase().includes(q) || r.customerName.toLowerCase().includes(q));
  }
  if (list.length === 0) return `<tr><td colspan="7" class="p-6 text-center text-slate-400">لا توجد إيصالات</td></tr>`;

  return list.map(r => `
    <tr class="hover:bg-slate-50">
      <td class="p-2 sm:p-3 font-bold text-amber-600">${r.id}</td>
      <td class="p-2 sm:p-3">${r.date}</td>
      <td class="p-2 sm:p-3 font-semibold text-slate-800">${r.customerName}</td>
      <td class="p-2 sm:p-3 font-bold text-amber-700">${r.paidCurrency || 'SYP'}</td>
      <td class="p-2 sm:p-3">${r.paymentMethod}</td>
      <td class="p-2 sm:p-3 font-black text-emerald-600">${formatCurrency(r.total, r.paidCurrency)}</td>
      <td class="p-2 sm:p-3 text-center">
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

// --- 5. BILLS & EXPENSES WITH CURRENCY SELECTION ---
function renderBillsHTML() {
  const bills = filterByBranch(AppState.bills);
  const totalBills = bills.reduce((sum, b) => sum + b.amount, 0);
  const unpaidCount = bills.filter(b => b.status === 'غير مدفوعة').length;

  return `
    <div class="space-y-4 md:space-y-6 animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 class="text-xl md:text-2xl font-black text-slate-800">المصاريف التشغيلية</h2>
          <p class="text-xs text-slate-500">فواتير الكهرباء والمحروقات والإيجارات</p>
        </div>
        <button onclick="openNewBillModal()" class="gold-gradient-btn px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i><span>تسجيل مصروف جديد</span>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div class="glass-panel p-4 flex items-center justify-between border-rose-200">
          <div>
            <p class="text-xs text-slate-500">إجمالي المصاريف</p>
            <h3 class="text-lg md:text-xl font-bold text-rose-600 mt-1">${formatCurrency(totalBills)}</h3>
          </div>
          <i data-lucide="calculator" class="w-7 h-7 md:w-8 md:h-8 text-rose-500/50"></i>
        </div>
        <div class="glass-panel p-4 flex items-center justify-between border-amber-200">
          <div>
            <p class="text-xs text-slate-500">فواتير غير مدفوعة</p>
            <h3 class="text-lg md:text-xl font-bold text-amber-600 mt-1">${unpaidCount}</h3>
          </div>
          <i data-lucide="clock" class="w-7 h-7 md:w-8 md:h-8 text-amber-500/50"></i>
        </div>
        <div class="glass-panel p-4 flex items-center justify-between border-emerald-200">
          <div>
            <p class="text-xs text-slate-500">القسم التشغيلي</p>
            <h3 class="text-sm md:text-base font-bold text-slate-800 mt-1">طاقة ومحروقات وإيجار</h3>
          </div>
          <i data-lucide="flame" class="w-7 h-7 md:w-8 md:h-8 text-amber-500/50"></i>
        </div>
      </div>

      <div class="glass-panel p-3 md:p-4 overflow-x-auto">
        <table class="w-full text-right text-xs text-slate-700 min-w-[500px]">
          <thead class="bg-slate-50 text-amber-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-2 sm:p-3">عنوان الفاتورة</th>
              <th class="p-2 sm:p-3">الفئة</th>
              <th class="p-2 sm:p-3">المبلغ المسجل</th>
              <th class="p-2 sm:p-3">التاريخ</th>
              <th class="p-2 sm:p-3">الحالة</th>
              <th class="p-2 sm:p-3 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${bills.map(b => `
              <tr class="hover:bg-slate-50">
                <td class="p-2 sm:p-3 font-bold text-slate-800">${b.title}</td>
                <td class="p-2 sm:p-3">${b.category}</td>
                <td class="p-2 sm:p-3 font-bold text-rose-600">${formatCurrency(b.amount, b.currency)} <span class="text-[10px] text-slate-400">(${b.currency || 'SYP'})</span></td>
                <td class="p-2 sm:p-3">${b.date}</td>
                <td class="p-2 sm:p-3"><span class="px-2 py-0.5 rounded text-[10px] font-semibold ${b.status === 'مدفوعة' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">${b.status}</span></td>
                <td class="p-2 sm:p-3 text-center flex items-center justify-center gap-1">
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

// Checkpoint 3: Bill Recording Modal with Currency Selection
function openNewBillModal() {
  const holder = document.getElementById('modals-placeholder');
  holder.innerHTML = `
    <div id="modal-bill" class="fixed inset-0 modal-overlay flex items-center justify-center p-3 sm:p-4 z-50">
      <div class="glass-panel w-full max-w-md max-h-[92vh] overflow-y-auto p-4 sm:p-6 rounded-2xl border border-slate-300 animate-fade-in space-y-4 shadow-xl">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-800 text-base">تسجيل مصروف جديد</h3>
          <button onclick="closeModalDirect('modal-bill')" class="text-slate-400 hover:text-slate-700"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <form onsubmit="saveNewBill(event)" class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-600 mb-1">اسم الفاتورة *</label>
            <input type="text" id="bill-title" required placeholder="مثال: فاتورة كهرباء" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800">
          </div>
          <div>
            <label class="block text-slate-600 mb-1">الفئة *</label>
            <select id="bill-category" required class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800">
              <option value="كهرباء">كهرباء</option>
              <option value="مازوت/محروقات">مازوت ومحروقات</option>
              <option value="إيجار">إيجار</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-7">
              <label class="block text-slate-600 mb-1">المبلغ *</label>
              <input type="number" id="bill-amount" min="1" step="any" required placeholder="0" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800 font-bold">
            </div>
            <div class="col-span-5">
              <label class="block text-slate-600 mb-1">العملة *</label>
              <select id="bill-currency" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-amber-800">
                <option value="SYP" ${AppState.globalCurrency === 'SYP' ? 'selected' : ''}>ل.س (SYP)</option>
                <option value="USD" ${AppState.globalCurrency === 'USD' ? 'selected' : ''}>$ (USD)</option>
              </select>
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
  const branchId = AppState.activeBranchId;
  const title = document.getElementById('bill-title').value;
  const category = document.getElementById('bill-category').value;
  const currency = document.getElementById('bill-currency').value;
  let amountInput = Number(document.getElementById('bill-amount').value);
  
  // Store base as SYP
  let amountBaseSYP = amountInput;
  if (currency === 'USD') {
    amountBaseSYP = amountInput * (AppState.exchangeRateUSD || 15000);
  }
  const date = getTodayDateString();
  const status = "مدفوعة";

  AppState.bills.push({ id: `bill-${Date.now()}`, branchId, title, category, amount: amountBaseSYP, currency, date, status });
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

// --- 6. INVENTORY ---
function renderInventoryHTML() {
  const curBranch = getActiveBranch();

  return `
    <div class="space-y-4 md:space-y-6 animate-fade-in">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 class="text-xl md:text-2xl font-black text-slate-800">مخزون المستحضرات والتجهيزات</h2>
          <p class="text-xs text-slate-500">الكميات الحالية المتوفرة في مستودعات الفروع</p>
        </div>
      </div>

      <div class="glass-panel p-3 md:p-4 overflow-x-auto">
        <table class="w-full text-right text-xs text-slate-700 min-w-[500px]">
          <thead class="bg-slate-50 text-amber-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-2 sm:p-3">المنتج</th>
              <th class="p-2 sm:p-3 text-center">فرع حمص</th>
              <th class="p-2 sm:p-3 text-center">فرع الوادي</th>
              <th class="p-2 sm:p-3">الحد الأدنى</th>
              <th class="p-2 sm:p-3">سعر البيع</th>
              <th class="p-2 sm:p-3 text-center">تعديل المخزون (${curBranch.name})</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${AppState.inventory.map(item => `
              <tr class="hover:bg-slate-50 ${(item.stocks[curBranch.id] || 0) <= item.minStock ? 'bg-rose-50' : ''}">
                <td class="p-2 sm:p-3 font-bold text-slate-800">${item.name}</td>
                <td class="p-2 sm:p-3 text-center font-bold text-slate-700">${item.stocks['br-1'] || 0}</td>
                <td class="p-2 sm:p-3 text-center font-bold text-slate-700">${item.stocks['br-2'] || 0}</td>
                <td class="p-2 sm:p-3">${item.minStock}</td>
                <td class="p-2 sm:p-3 font-bold text-amber-600">${formatCurrency(item.sellPrice)}</td>
                <td class="p-2 sm:p-3 text-center flex items-center justify-center gap-1">
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
  const branchKey = AppState.activeBranchId;
  const item = AppState.inventory.find(i => i.id === id);
  if (item && item.stocks[branchKey] !== undefined) {
    item.stocks[branchKey] = Math.max(0, item.stocks[branchKey] + delta);
    saveState();
    updateBadges();
    if (currentView === 'inventory') switchView('inventory');
  }
}

function bindInventoryEvents() {}

// --- 7. EMPLOYEES & SALARIES ---
function renderEmployeesHTML() {
  const employees = filterByBranch(AppState.employees);
  const employeeRows = employees.map(emp => {
    const branchName = AppState.branches.find(b => b.id === emp.branchId)?.name || "فرع";
    const empReceipts = AppState.receipts.filter(r => r.employeeId === emp.id);
    const empSales = empReceipts.reduce((sum, r) => sum + r.total, 0);
    const commissionEarned = emp.payType !== 'salary' ? (empSales * (emp.commissionRate / 100)) : 0;
    const fixed = emp.payType !== 'commission' ? emp.fixedSalary : 0;
    const grandTotal = fixed + commissionEarned;

    return `
      <tr class="hover:bg-slate-50">
        <td class="p-2 sm:p-3 font-semibold text-slate-500">${branchName}</td>
        <td class="p-2 sm:p-3 font-bold text-slate-800">${emp.name} <br><span class="text-[10px] text-slate-500 font-normal">${emp.phone}</span></td>
        <td class="p-2 sm:p-3">${emp.role}</td>
        <td class="p-2 sm:p-3"><span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-700">${emp.payType}</span></td>
        <td class="p-2 sm:p-3">${formatCurrency(fixed)}</td>
        <td class="p-2 sm:p-3 font-bold text-amber-600">${emp.payType !== 'salary' ? emp.commissionRate + '%' : '-'}</td>
        <td class="p-2 sm:p-3">${formatCurrency(empSales)}</td>
        <td class="p-2 sm:p-3 font-bold text-emerald-600">${formatCurrency(commissionEarned)}</td>
        <td class="p-2 sm:p-3 font-black text-purple-700">${formatCurrency(grandTotal)}</td>
      </tr>
    `;
  }).join('');

  return `
    <div class="space-y-4 md:space-y-6 animate-fade-in">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl md:text-2xl font-black text-slate-800">إدارة الموظفين والرواتب والعمولات</h2>
          <p class="text-xs text-slate-500">حساب الرواتب الثابتة، نسب العمولات ومستحقات الكادر</p>
        </div>
      </div>
      <div class="glass-panel p-3 md:p-4 overflow-x-auto">
        <table class="w-full text-right text-xs text-slate-700 min-w-[600px]">
          <thead class="bg-slate-50 text-amber-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-2 sm:p-3">الفرع</th>
              <th class="p-2 sm:p-3">الموظف</th>
              <th class="p-2 sm:p-3">المسمى</th>
              <th class="p-2 sm:p-3">النظام</th>
              <th class="p-2 sm:p-3">الراتب الثابت</th>
              <th class="p-2 sm:p-3">النسبة</th>
              <th class="p-2 sm:p-3">المبيعات</th>
              <th class="p-2 sm:p-3">العمولة</th>
              <th class="p-2 sm:p-3">الإجمالي المستحق</th>
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

// --- 8. REPORTS ---
function renderReportsHTML() {
  const getBranchStats = (bId) => {
    const receipts = AppState.receipts.filter(r => r.branchId === bId);
    const bills = AppState.bills.filter(b => b.branchId === bId);
    const rev = receipts.reduce((s, r) => s + r.total, 0);
    const exp = bills.reduce((s, b) => s + b.amount, 0);
    return { rev, exp, net: rev - exp, count: receipts.length };
  };

  const homs = getBranchStats('br-1');
  const wadi = getBranchStats('br-2');
  const totalRev = homs.rev + wadi.rev;
  const totalExp = homs.exp + wadi.exp;
  const totalNet = totalRev - totalExp;

  return `
    <div class="space-y-4 md:space-y-6 animate-fade-in">
      <div>
        <h2 class="text-xl md:text-2xl font-black text-slate-800">التقارير المالية ومقارنة الفروع</h2>
        <p class="text-xs text-slate-500">تحليل الأداء المالي، المبيعات والمصاريف لكل فرع</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div class="glass-panel p-4 border-emerald-200">
          <p class="text-xs text-slate-500">إجمالي إيرادات الصالون</p>
          <h3 class="text-lg md:text-xl font-extrabold text-emerald-600 mt-1">${formatCurrency(totalRev)}</h3>
        </div>
        <div class="glass-panel p-4 border-rose-200">
          <p class="text-xs text-slate-500">إجمالي المصاريف المجمعة</p>
          <h3 class="text-lg md:text-xl font-extrabold text-rose-600 mt-1">${formatCurrency(totalExp)}</h3>
        </div>
        <div class="glass-panel p-4 border-amber-200">
          <p class="text-xs text-slate-500">صافي أرباح الفروع معاً</p>
          <h3 class="text-lg md:text-xl font-extrabold text-amber-600 mt-1">${formatCurrency(totalNet)}</h3>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div class="glass-panel p-4 md:p-5 space-y-3 md:space-y-4 border-t-4 border-amber-500">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 class="font-black text-base text-slate-800">📍 فرع حمص</h3>
            <span class="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">${homs.count} فواتير</span>
          </div>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between p-2 bg-slate-50 rounded"><span>الإيرادات:</span><b class="text-emerald-600">${formatCurrency(homs.rev)}</b></div>
            <div class="flex justify-between p-2 bg-slate-50 rounded"><span>المصاريف:</span><b class="text-rose-600">${formatCurrency(homs.exp)}</b></div>
            <div class="flex justify-between p-2.5 bg-amber-50 rounded font-bold text-sm"><span>صافي الربح:</span><b class="text-amber-700">${formatCurrency(homs.net)}</b></div>
          </div>
        </div>

        <div class="glass-panel p-4 md:p-5 space-y-3 md:space-y-4 border-t-4 border-blue-500">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 class="font-black text-base text-slate-800">📍 فرع الوادي</h3>
            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">${wadi.count} فواتير</span>
          </div>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between p-2 bg-slate-50 rounded"><span>الإيرادات:</span><b class="text-emerald-600">${formatCurrency(wadi.rev)}</b></div>
            <div class="flex justify-between p-2 bg-slate-50 rounded"><span>المصاريف:</span><b class="text-rose-600">${formatCurrency(wadi.exp)}</b></div>
            <div class="flex justify-between p-2.5 bg-blue-50 rounded font-bold text-sm"><span>صافي الربح:</span><b class="text-blue-700">${formatCurrency(wadi.net)}</b></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});