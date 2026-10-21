const {
  Plugin,
  Modal,
  Notice,
  requestUrl,
  PluginSettingTab,
  Setting
} = require("obsidian");

const SURAHS = [
  { id: 1, name: "الفاتحة", fa: "حمد", count: 7 },
  { id: 2, name: "البقرة", fa: "بقره", count: 286 },
  { id: 3, name: "آل عمران", fa: "آل عمران", count: 200 },
  { id: 4, name: "النساء", fa: "نساء", count: 176 },
  { id: 5, name: "المائدة", fa: "مائده", count: 120 },
  { id: 6, name: "الأنعام", fa: "انعام", count: 165 },
  { id: 7, name: "الأعراف", fa: "اعراف", count: 206 },
  { id: 8, name: "الأنفال", fa: "انفال", count: 75 },
  { id: 9, name: "التوبة", fa: "توبه", count: 129 },
  { id: 10, name: "يونس", fa: "یونس", count: 109 },
  { id: 11, name: "هود", fa: "هود", count: 123 },
  { id: 12, name: "يوسف", fa: "یوسف", count: 111 },
  { id: 13, name: "الرعد", fa: "رعد", count: 43 },
  { id: 14, name: "إبراهيم", fa: "ابراهیم", count: 52 },
  { id: 15, name: "الحجر", fa: "حجر", count: 99 },
  { id: 16, name: "النحل", fa: "نحل", count: 128 },
  { id: 17, name: "الإسراء", fa: "اسراء", count: 111 },
  { id: 18, name: "الكهف", fa: "کهف", count: 110 },
  { id: 19, name: "مريم", fa: "مریم", count: 98 },
  { id: 20, name: "طه", fa: "طه", count: 135 },
  { id: 21, name: "الأنبياء", fa: "انبیاء", count: 112 },
  { id: 22, name: "الحج", fa: "حج", count: 78 },
  { id: 23, name: "المؤمنون", fa: "مؤمنون", count: 118 },
  { id: 24, name: "النور", fa: "نور", count: 64 },
  { id: 25, name: "الفرقان", fa: "فرقان", count: 77 },
  { id: 26, name: "الشعراء", fa: "شعراء", count: 227 },
  { id: 27, name: "النمل", fa: "نمل", count: 93 },
  { id: 28, name: "القصص", fa: "قصص", count: 88 },
  { id: 29, name: "العنكبوت", fa: "عنکبوت", count: 69 },
  { id: 30, name: "الروم", fa: "روم", count: 60 },
  { id: 31, name: "لقمان", fa: "لقمان", count: 34 },
  { id: 32, name: "السجدة", fa: "سجده", count: 30 },
  { id: 33, name: "الأحزاب", fa: "احزاب", count: 73 },
  { id: 34, name: "سبأ", fa: "سبأ", count: 54 },
  { id: 35, name: "فاطر", fa: "فاطر", count: 45 },
  { id: 36, name: "يس", fa: "یس", count: 83 },
  { id: 37, name: "الصافات", fa: "صافات", count: 182 },
  { id: 38, name: "ص", fa: "ص", count: 88 },
  { id: 39, name: "الزمر", fa: "زمر", count: 75 },
  { id: 40, name: "غافر", fa: "غافر", count: 85 },
  { id: 41, name: "فصلت", fa: "فصلت", count: 54 },
  { id: 42, name: "الشورى", fa: "شوری", count: 53 },
  { id: 43, name: "الزخرف", fa: "زخرف", count: 89 },
  { id: 44, name: "الدخان", fa: "دخان", count: 59 },
  { id: 45, name: "الجاثية", fa: "جاثیه", count: 37 },
  { id: 46, name: "الأحقاف", fa: "احقاف", count: 35 },
  { id: 47, name: "محمد", fa: "محمد", count: 38 },
  { id: 48, name: "الفتح", fa: "فتح", count: 29 },
  { id: 49, name: "الحجرات", fa: "حجرات", count: 18 },
  { id: 50, name: "ق", fa: "ق", count: 45 },
  { id: 51, name: "الذاريات", fa: "ذاریات", count: 60 },
  { id: 52, name: "الطور", fa: "طور", count: 49 },
  { id: 53, name: "النجم", fa: "نجم", count: 62 },
  { id: 54, name: "القمر", fa: "قمر", count: 55 },
  { id: 55, name: "الرحمن", fa: "الرحمن", count: 78 },
  { id: 56, name: "الواقعة", fa: "واقعه", count: 96 },
  { id: 57, name: "الحديد", fa: "حدید", count: 29 },
  { id: 58, name: "المجادلة", fa: "مجادله", count: 22 },
  { id: 59, name: "الحشر", fa: "حشر", count: 24 },
  { id: 60, name: "الممتحنة", fa: "ممتحنه", count: 13 },
  { id: 61, name: "الصف", fa: "صف", count: 14 },
  { id: 62, name: "الجمعة", fa: "جمعه", count: 11 },
  { id: 63, name: "المنافقون", fa: "منافقون", count: 11 },
  { id: 64, name: "التغابن", fa: "تغابن", count: 18 },
  { id: 65, name: "الطلاق", fa: "طلاق", count: 12 },
  { id: 66, name: "التحريم", fa: "تحریم", count: 12 },
  { id: 67, name: "الملك", fa: "ملک", count: 30 },
  { id: 68, name: "القلم", fa: "قلم", count: 52 },
  { id: 69, name: "الحاقة", fa: "حاقه", count: 52 },
  { id: 70, name: "المعارج", fa: "معارج", count: 44 },
  { id: 71, name: "نوح", fa: "نوح", count: 28 },
  { id: 72, name: "الجن", fa: "جن", count: 28 },
  { id: 73, name: "المزمل", fa: "مزمل", count: 20 },
  { id: 74, name: "المدثر", fa: "مدثر", count: 56 },
  { id: 75, name: "القيامة", fa: "قیامت", count: 40 },
  { id: 76, name: "الإنسان", fa: "انسان", count: 31 },
  { id: 77, name: "المرسلات", fa: "مرسلات", count: 50 },
  { id: 78, name: "النبأ", fa: "نبأ", count: 40 },
  { id: 79, name: "النازعات", fa: "نازعات", count: 46 },
  { id: 80, name: "عبس", fa: "عبس", count: 42 },
  { id: 81, name: "التكوير", fa: "تکویر", count: 29 },
  { id: 82, name: "الانفطار", fa: "انفطار", count: 19 },
  { id: 83, name: "المطففين", fa: "مطففین", count: 36 },
  { id: 84, name: "الانشقاق", fa: "انشقاق", count: 25 },
  { id: 85, name: "البروج", fa: "بروج", count: 22 },
  { id: 86, name: "الطارق", fa: "طارق", count: 17 },
  { id: 87, name: "الأعلى", fa: "اعلی", count: 19 },
  { id: 88, name: "الغاشية", fa: "غاشیه", count: 26 },
  { id: 89, name: "الفجر", fa: "فجر", count: 30 },
  { id: 90, name: "البلد", fa: "بلد", count: 20 },
  { id: 91, name: "الشمس", fa: "شمس", count: 15 },
  { id: 92, name: "الليل", fa: "لیل", count: 21 },
  { id: 93, name: "الضحى", fa: "ضحی", count: 11 },
  { id: 94, name: "الشرح", fa: "شرح", count: 8 },
  { id: 95, name: "التين", fa: "تین", count: 8 },
  { id: 96, name: "العلق", fa: "علق", count: 19 },
  { id: 97, name: "القدر", fa: "قدر", count: 5 },
  { id: 98, name: "البينة", fa: "بینه", count: 8 },
  { id: 99, name: "الزلزلة", fa: "زلزله", count: 8 },
  { id: 100, name: "العاديات", fa: "عادیات", count: 11 },
  { id: 101, name: "القارعة", fa: "قارعه", count: 11 },
  { id: 102, name: "التكاثر", fa: "تکاثر", count: 8 },
  { id: 103, name: "العصر", fa: "عصر", count: 3 },
  { id: 104, name: "الهمزة", fa: "همزه", count: 9 },
  { id: 105, name: "الفيل", fa: "فیل", count: 5 },
  { id: 106, name: "قريش", fa: "قریش", count: 4 },
  { id: 107, name: "الماعون", fa: "ماعون", count: 7 },
  { id: 108, name: "الکوثر", fa: "کوثر", count: 3 },
  { id: 109, name: "الكافرون", fa: "کافرون", count: 6 },
  { id: 110, name: "النصر", fa: "نصر", count: 3 },
  { id: 111, name: "المسد", fa: "مسد", count: 5 },
  { id: 112, name: "الإخلاص", fa: "توحید", count: 4 },
  { id: 113, name: "الفلق", fa: "فلق", count: 5 },
  { id: 114, name: "الناس", fa: "ناس", count: 6 }
];

const TRANSLATORS = [
  { id: "fa.ansarian", name: "استاد حسین انصاریان" },
  { id: "fa.makarem", name: "آیت‌الله مکارم شیرازی" },
  { id: "fa.fooladvand", name: "دکتر محمد مهدی فولادوند" },
  { id: "fa.ghomshei", name: "مهدی الهی قمشه‌ای" },
  { id: "fa.khorramdel", name: "تفسیر و ترجمه نور (خرمدل)" }
];

const memoryCache = new Map();

function toPersianDigits(num) {
  const p = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/[0-9]/g, (w) => p[+w]);
}

function cleanQuranText(str) {
  if (!str) return "";
  return str
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED\u0640]/g, "")
    .replace(/[إأآٱآ]/g, "ا")
    .replace(/[\u064A\u0649\u06CC\u06D0\u06D1\u0626]/g, "ی")
    .replace(/[\u0643\u06A9]/g, "ک")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ء/g, "")
    .replace(/[\u200C\u200B\uFEFF]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function prepareArabicApiQuery(str) {
  if (!str) return "";
  return str
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ی/g, "ي")
    .replace(/ک/g, "ك")
    .trim();
}

class KalamNoorGlassModal extends Modal {
  constructor(app, plugin, initialSurah = 22, initialAyah = 2) {
    super(app);
    this.plugin = plugin;
    this.surahId = initialSurah;
    this.ayahNumber = initialAyah;
    this.translatorKey = plugin.settings.defaultTranslator;
    this.currentData = null;
    this.searchTimeout = null;
  }

  onOpen() {
    const { contentEl, modalEl } = this;
    contentEl.empty();
    contentEl.addClass("quran-modal-overlay");
    modalEl.addClass("quran-modal-box");

    const header = contentEl.createDiv({ cls: "quran-header" });
    const title = header.createDiv({ cls: "quran-header-title" });
    title.innerHTML = `<span>📖</span> کلام نور`;

    const rightGroup = header.createDiv({ cls: "quran-header-right" });

    this.statusBadge = rightGroup.createEl("span", { cls: "quran-status-badge" });
    this.updateStatusBadge();

    const noorLink = rightGroup.createEl("button", {
      cls: "quran-btn quran-btn-glass",
      text: "🌐 مطالعه در پایگاه نور"
    });
    noorLink.onclick = () => {
      window.open(`https://quran.inoor.ir/fa/ayah/${this.surahId}/${this.ayahNumber}`, "_blank");
    };

    const searchWrapper = contentEl.createDiv({ cls: "quran-search-wrapper" });
    this.searchInput = searchWrapper.createEl("input", {
      cls: "quran-search-input",
      type: "text",
      attr: { placeholder: "🔍 جستجوی آنی در آیات یا ترجمه (بدون اعراب)..." }
    });

    this.searchResults = searchWrapper.createDiv({ cls: "quran-search-results" });
    this.searchResults.style.display = "none";

    this.searchInput.oninput = () => {
      clearTimeout(this.searchTimeout);
      const q = this.searchInput.value.trim();
      if (q.length < 2) {
        this.searchResults.empty();
        this.searchResults.style.display = "none";
        return;
      }

      this.searchTimeout = setTimeout(async () => {
        this.searchResults.innerHTML = `<div style="text-align:center; padding:12px; opacity:0.6;">⏳ در حال جستجو...</div>`;
        this.searchResults.style.display = "flex";

        let matches = [];
        let searchSource = "offline";

        if (this.plugin.isOffline) {
          matches = this.plugin.searchOffline(q, this.translatorKey);
        }

        if (matches.length === 0) {
          this.searchResults.innerHTML = `<div style="text-align:center; padding:12px; color:#0284c7; font-size:0.85rem;">🌐 در حافظه آفلاین یافت نشد؛ در حال سوییچ خودکار به پایگاه آنلاین...</div>`;
          matches = await this.plugin.searchOnline(q, this.translatorKey);
          searchSource = "online";
        }

        this.searchResults.empty();
        if (matches.length === 0) {
          const emptyItem = this.searchResults.createDiv({ cls: "quran-search-item" });
          emptyItem.setText("موردی در پایگاه آفلاین و آنلاین یافت نشد.");
          return;
        }

        const countHeader = this.searchResults.createDiv({
          cls: `quran-search-switch-banner ${searchSource === "online" ? "is-online" : "is-offline"}`
        });

        if (searchSource === "online") {
          countHeader.setText(`🌐 سوییچ به سرچ آنلاین انجام شد (${toPersianDigits(matches.length)} آیه یافت شد)`);
        } else {
          countHeader.setText(`🟢 نتایج پایگاه آفلاین (${toPersianDigits(matches.length)} آیه یافت شد)`);
        }

        matches.forEach((m) => {
          const item = this.searchResults.createDiv({ cls: "quran-search-item" });
          const sInfo = SURAHS.find((s) => s.id === m.surah.number) || { fa: m.surah.name };
          const badge = `<span class="quran-search-item-badge">سوره ${sInfo.fa} ﴿${toPersianDigits(m.numberInSurah)}﴾:</span>`;
          item.innerHTML = `${badge} ${m.text}`;

          item.onclick = () => {
            this.surahId = m.surah.number;
            this.ayahNumber = m.numberInSurah;
            this.surahSelect.value = String(this.surahId);
            this.ayahInput.value = String(this.ayahNumber);
            this.searchResults.style.display = "none";
            this.searchInput.value = "";
            this.loadAyahData();
          };
        });
      }, 350);
    };

    const inputsRow = contentEl.createDiv({ cls: "quran-grid-inputs" });

    this.surahSelect = inputsRow.createEl("select", { cls: "quran-input-field quran-input-surah" });
    SURAHS.forEach((s) => {
      const opt = this.surahSelect.createEl("option", {
        value: s.id,
        text: `${s.id}. سوره ${s.fa} (${s.name})`
      });
      if (s.id === this.surahId) opt.selected = true;
    });

    this.ayahInput = inputsRow.createEl("input", {
      cls: "quran-input-field quran-input-ayah",
      type: "number",
      value: String(this.ayahNumber),
      attr: { min: "1", max: "286" }
    });

    this.transSelect = inputsRow.createEl("select", { cls: "quran-input-field quran-input-trans" });
    TRANSLATORS.forEach((t) => {
      const opt = this.transSelect.createEl("option", { value: t.id, text: t.name });
      if (t.id === this.translatorKey) opt.selected = true;
    });

    this.previewCard = contentEl.createDiv({ cls: "quran-preview-card" });

    const bottomBar = contentEl.createDiv({ cls: "quran-bottom-bar" });

    const navRow = bottomBar.createDiv({ cls: "quran-nav-row" });
    const prevBtn = navRow.createEl("button", { cls: "quran-btn quran-btn-nav", text: "آیه قبل ►" });
    this.navInfoEl = navRow.createDiv({ cls: "quran-nav-info", text: "" });
    const nextBtn = navRow.createEl("button", { cls: "quran-btn quran-btn-nav", text: "◄ آیه بعد" });

    prevBtn.onclick = () => this.navigateAyah(-1);
    nextBtn.onclick = () => this.navigateAyah(1);

    const actionsRow = bottomBar.createDiv({ cls: "quran-actions-row" });
    const insertGroup = actionsRow.createDiv({ cls: "quran-btn-group" });

    const plainInsertBtn = insertGroup.createEl("button", {
      cls: "quran-btn quran-btn-plain",
      text: "📝 درج ساده"
    });
    plainInsertBtn.title = "درج ساده متن عربی و ترجمه همراه با پرانتز گل‌دار شماره آیه";
    plainInsertBtn.onclick = () => this.insertPlainToActiveNote();

    const insertBtn = insertGroup.createEl("button", {
      cls: "quran-btn quran-btn-primary",
      text: "📥 درج شیشه‌ای"
    });
    insertBtn.title = "درج در قالب کارت کال‌اوت شیشه‌ای";
    insertBtn.onclick = () => this.insertCalloutToActiveNote();

    const copyGroup = actionsRow.createDiv({ cls: "quran-btn-group" });

    const copyAllBtn = copyGroup.createEl("button", {
      cls: "quran-btn quran-btn-glass",
      text: "💎 کپی کامل"
    });
    copyAllBtn.title = "کپی متن عربی همراه ترجمه";
    copyAllBtn.onclick = () => this.copyFullPackage();

    const copyTransBtn = copyGroup.createEl("button", {
      cls: "quran-btn quran-btn-glass",
      text: "📝 کپی ترجمه"
    });
    copyTransBtn.title = "کپی متن ترجمه فارسی";
    copyTransBtn.onclick = () => this.copyPureTranslation();

    const copyArabBtn = copyGroup.createEl("button", {
      cls: "quran-btn quran-btn-glass",
      text: "📋 کپی آیه"
    });
    copyArabBtn.title = "کپی متن عربی آیه";
    copyArabBtn.onclick = () => this.copyPureArabic();

    const triggerUpdate = () => {
      this.surahId = parseInt(this.surahSelect.value, 10);
      this.ayahNumber = parseInt(this.ayahInput.value, 10) || 1;
      this.translatorKey = this.transSelect.value;
      this.loadAyahData();
    };

    this.surahSelect.onchange = triggerUpdate;
    this.ayahInput.onchange = triggerUpdate;
    this.transSelect.onchange = triggerUpdate;

    modalEl.addEventListener("click", (e) => {
      if (!searchWrapper.contains(e.target)) {
        this.searchResults.style.display = "none";
      }
    });

    this.loadAyahData();
  }

  updateStatusBadge() {
    if (this.plugin.isOffline) {
      this.statusBadge.className = "quran-status-badge is-offline";
      this.statusBadge.setText("🟢 دیتابیس آفلاین (فعال)");
      this.statusBadge.title = "تمامی ۶۲۳۶ آیه و ۵ ترجمه روی حافظه ذخیره است و نیازی به اینترنت نیست.";
      this.statusBadge.onclick = null;
    } else {
      this.statusBadge.className = "quran-status-badge is-online";
      this.statusBadge.setText("📥 دانلود پایگاه آفلاین");
      this.statusBadge.title = "کلیک کنید تا کل قرآن و ۵ ترجمه برای استفاده آفلاین دانلود شود.";
      this.statusBadge.onclick = async () => {
        await this.plugin.downloadOfflineDatabase();
        this.updateStatusBadge();
        this.loadAyahData();
      };
    }
  }

  navigateAyah(delta) {
    const curSurah = SURAHS.find((s) => s.id === this.surahId) || SURAHS[0];
    let newAyah = this.ayahNumber + delta;
    let newSurah = this.surahId;

    if (newAyah > curSurah.count) {
      if (newSurah < 114) {
        newSurah++;
        newAyah = 1;
      } else {
        newAyah = curSurah.count;
      }
    } else if (newAyah < 1) {
      if (newSurah > 1) {
        newSurah--;
        const prevSurah = SURAHS.find((s) => s.id === newSurah);
        newAyah = prevSurah ? prevSurah.count : 1;
      } else {
        newAyah = 1;
      }
    }

    this.surahId = newSurah;
    this.ayahNumber = newAyah;
    this.surahSelect.value = String(newSurah);
    this.ayahInput.value = String(newAyah);
    this.loadAyahData();
  }

  async loadAyahData() {
    if (!this.plugin.isOffline) {
      this.previewCard.innerHTML = `<div style="text-align:center; padding:35px; opacity:0.6;">⏳ در حال بارگذاری سریع آیه...</div>`;
    }

    try {
      this.currentData = await this.plugin.getAyah(this.surahId, this.ayahNumber, this.translatorKey);
      this.navInfoEl.setText(`سوره ${this.currentData.surahFa} (${this.currentData.ayahNumber} از ${this.currentData.totalAyahs})`);
      this.renderCurrentView();
    } catch (e) {
      this.previewCard.innerHTML = `<div style="color:#ef4444; text-align:center; padding:25px;">❌ خطا در دریافت آیه. اتصال اینترنت را بررسی کنید.</div>`;
    }
  }

  renderCurrentView() {
    if (!this.currentData) return;
    this.previewCard.empty();

    const arabEl = this.previewCard.createDiv({ cls: "quran-arabic-text" });
    arabEl.setText(this.currentData.arabic);

    const transEl = this.previewCard.createDiv({ cls: "quran-translation-text" });
    transEl.setText(this.currentData.translation);
  }

  copyPureArabic() {
    if (!this.currentData) return;
    navigator.clipboard.writeText(this.currentData.arabic.trim());
    new Notice("متن عربی آیه کپی شد");
  }

  copyPureTranslation() {
    if (!this.currentData) return;
    navigator.clipboard.writeText(this.currentData.translation.trim());
    new Notice("ترجمه آیه کپی شد");
  }

  copyFullPackage() {
    if (!this.currentData) return;
    const txt = `${this.currentData.arabic}\n\n${this.currentData.translation}\n(سوره ${this.currentData.surahFa}، آیه ${this.currentData.ayahNumber})`;
    navigator.clipboard.writeText(txt);
    new Notice("پکیج کامل آیه کپی شد");
  }

  insertPlainToActiveNote() {
    if (!this.currentData) return;
    const ayahBadge = `﴿${toPersianDigits(this.currentData.ayahNumber)}﴾`;
    const plainText = `${this.currentData.arabic.trim()}\n${this.currentData.translation.trim()} ${ayahBadge}\n\n`;

    const activeView = this.app.workspace.getActiveViewOfType(require("obsidian").MarkdownView);
    if (activeView && activeView.editor) {
      activeView.editor.replaceSelection(plainText);
      new Notice("آیه به‌صورت ساده در یادداشت درج شد");
      this.close();
    } else {
      new Notice("لطفاً ابتدا داخل یک یادداشت کلیک کنید.");
    }
  }

  insertCalloutToActiveNote() {
    if (!this.currentData) return;
    const callout = `> [!quran] سوره ${this.currentData.surahFa} (آیه ${this.currentData.ayahNumber})\n> <div class="quran-arabic-text">${this.currentData.arabic}</div>\n> \n> **ترجمه (${this.currentData.translatorName}):**\n> ${this.currentData.translation}\n\n`;

    const activeView = this.app.workspace.getActiveViewOfType(require("obsidian").MarkdownView);
    if (activeView && activeView.editor) {
      activeView.editor.replaceSelection(callout);
      new Notice("کارت شیشه‌ای آیه در یادداشت درج شد");
      this.close();
    } else {
      new Notice("لطفاً ابتدا داخل یک یادداشت کلیک کنید.");
    }
  }
}

module.exports = class KalamNoorPlugin extends Plugin {
  async onload() {
    await this.loadSettings();
    this.offlineDb = null;
    this.isOffline = false;
    this.dbFilePath = `${this.manifest.dir}/quran-offline-db.json`;

    await this.checkAndLoadOfflineDb();

    this.addRibbonIcon("book", "کلام نور - پایگاه قرآنی", () => {
      new KalamNoorGlassModal(this.app, this).open();
    });

    this.addCommand({
      id: "open-kalam-noor-modal",
      name: "باز کردن پنجره جستجو و درج آیه (کلام نور)",
      callback: () => {
        new KalamNoorGlassModal(this.app, this).open();
      }
    });

    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor) => {
        const selection = editor.getSelection().trim();
        const ref = this.parseRef(selection);

        if (ref) {
          menu.addItem((item) => {
            item
              .setTitle(`📖 باز کردن سوره ${ref.surahId} آیه ${ref.ayahNumber} (کلام نور)`)
              .setIcon("book-open")
              .onClick(() => {
                new KalamNoorGlassModal(this.app, this, ref.surahId, ref.ayahNumber).open();
              });
          });

          menu.addItem((item) => {
            item
              .setTitle("📋 کپی عربی آیه")
              .setIcon("copy")
              .onClick(async () => {
                try {
                  const data = await this.getAyah(ref.surahId, ref.ayahNumber, this.settings.defaultTranslator);
                  navigator.clipboard.writeText(data.arabic.trim());
                  new Notice("متن عربی آیه کپی شد");
                } catch (e) {
                  new Notice("خطا در دریافت آیه");
                }
              });
          });

          menu.addItem((item) => {
            item
              .setTitle("📝 کپی ترجمه آیه")
              .setIcon("file-text")
              .onClick(async () => {
                try {
                  const data = await this.getAyah(ref.surahId, ref.ayahNumber, this.settings.defaultTranslator);
                  navigator.clipboard.writeText(data.translation.trim());
                  new Notice("ترجمه آیه کپی شد");
                } catch (e) {
                  new Notice("خطا در دریافت آیه");
                }
              });
          });
        }
      })
    );

    this.addSettingTab(new KalamNoorSettingTab(this.app, this));
  }

  parseRef(text) {
    if (!text) return null;
    const cleaned = text.trim();
    const numMatch = cleaned.match(/^(\d{1,3})[:\/,\s]+(\d{1,3})$/);
    if (numMatch) {
      const sId = parseInt(numMatch[1], 10);
      const aId = parseInt(numMatch[2], 10);
      if (sId >= 1 && sId <= 114) return { surahId: sId, ayahNumber: aId };
    }
    for (const s of SURAHS) {
      if (cleaned.includes(s.fa) || cleaned.includes(s.name)) {
        const matchNumber = cleaned.match(/(\d+)/);
        if (matchNumber) {
          return { surahId: s.id, ayahNumber: parseInt(matchNumber[1], 10) };
        }
      }
    }
    return null;
  }

  async checkAndLoadOfflineDb() {
    try {
      const exists = await this.app.vault.adapter.exists(this.dbFilePath);
      if (exists) {
        const dataStr = await this.app.vault.adapter.read(this.dbFilePath);
        this.offlineDb = JSON.parse(dataStr);
        this.isOffline = true;
      } else {
        this.offlineDb = null;
        this.isOffline = false;
      }
    } catch (e) {
      this.isOffline = false;
    }
  }

  async getAyah(surahId, ayahNumber, translatorKey) {
    const sId = Number(surahId);
    const aId = Number(ayahNumber);
    const surahInfo = SURAHS.find((s) => s.id === sId) || { name: "", fa: "", count: 1 };
    const translatorName = TRANSLATORS.find((t) => t.id === translatorKey)?.name || "ترجمه";

    if (this.isOffline && this.offlineDb && this.offlineDb[sId] && this.offlineDb[sId][aId]) {
      const record = this.offlineDb[sId][aId];
      return {
        surahId: sId,
        ayahNumber: aId,
        surahName: surahInfo.name,
        surahFa: surahInfo.fa,
        totalAyahs: surahInfo.count,
        arabic: record.ar,
        translation: record.trans[translatorKey] || record.trans["fa.ansarian"] || "",
        translatorName
      };
    }

    const cacheKey = `${sId}:${aId}:${translatorKey}`;
    if (memoryCache.has(cacheKey)) {
      return memoryCache.get(cacheKey);
    }

    const url = `https://api.alquran.cloud/v1/ayah/${sId}:${aId}/editions/quran-uthmani,${translatorKey}`;
    const response = await requestUrl({ url, method: "GET", headers: { Accept: "application/json" } });

    if (response.status !== 200 || !response.json || response.json.code !== 200) {
      throw new Error("خطا در برقراری ارتباط");
    }

    const [arabicData, transData] = response.json.data;
    const result = {
      surahId: sId,
      ayahNumber: aId,
      surahName: surahInfo.name,
      surahFa: surahInfo.fa,
      totalAyahs: surahInfo.count,
      arabic: arabicData.text,
      translation: transData.text,
      translatorName
    };

    memoryCache.set(cacheKey, result);
    return result;
  }

  searchOffline(rawQuery, translatorKey) {
    const query = cleanQuranText(rawQuery);
    const tokens = query.split(/\s+/).filter(Boolean);
    const results = [];
    if (!this.offlineDb || tokens.length === 0) return results;

    for (const sId in this.offlineDb) {
      for (const aId in this.offlineDb[sId]) {
        const item = this.offlineDb[sId][aId];
        const arClean = item.clean || cleanQuranText(item.ar);
        const transClean = item.trans && item.trans[translatorKey] ? cleanQuranText(item.trans[translatorKey]) : "";

        const matchAr = tokens.every((t) => arClean.includes(t));
        const matchTrans = transClean && tokens.every((t) => transClean.includes(t));

        if (matchAr || matchTrans) {
          results.push({
            surah: { number: Number(sId) },
            numberInSurah: Number(aId),
            text: item.trans[translatorKey] || item.ar
          });
          if (results.length >= 100) return results;
        }
      }
    }
    return results;
  }

  async searchOnline(rawQuery, translatorKey) {
    if (!rawQuery || rawQuery.trim().length < 2) return [];

    const cleanQuery = cleanQuranText(rawQuery);
    const tokens = cleanQuery.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];

    const sortedTokens = [...tokens].sort((a, b) => b.length - a.length);
    const primaryWord = sortedTokens[0];
    const arabicPrimary = prepareArabicApiQuery(primaryWord);

    let rawMatches = [];

    try {
      const fullArabic = prepareArabicApiQuery(cleanQuery);
      const url = `https://api.alquran.cloud/v1/search/${encodeURIComponent(fullArabic)}/all/quran-simple-clean`;
      const res = await requestUrl({ url, method: "GET", headers: { Accept: "application/json" } });
      if (res.status === 200 && res.json && res.json.data && res.json.data.matches) {
        rawMatches = res.json.data.matches;
      }
    } catch (e) {}

    if (rawMatches.length === 0 && tokens.length > 1) {
      try {
        const url = `https://api.alquran.cloud/v1/search/${encodeURIComponent(arabicPrimary)}/all/quran-simple-clean`;
        const res = await requestUrl({ url, method: "GET", headers: { Accept: "application/json" } });
        if (res.status === 200 && res.json && res.json.data && res.json.data.matches) {
          rawMatches = res.json.data.matches;
        }
      } catch (e) {}
    }

    if (rawMatches.length === 0) {
      try {
        const transUrl = `https://api.alquran.cloud/v1/search/${encodeURIComponent(cleanQuery)}/all/${translatorKey}`;
        const res = await requestUrl({ url, method: "GET", headers: { Accept: "application/json" } });
        if (res.status === 200 && res.json && res.json.data && res.json.data.matches) {
          rawMatches = res.json.data.matches;
        }
      } catch (e) {}
    }

    const filtered = rawMatches.filter((m) => {
      const itemClean = cleanQuranText(m.text);
      return tokens.every((token) => itemClean.includes(token));
    });

    const finalMatches = filtered.length > 0 ? filtered : (tokens.length === 1 ? rawMatches : []);
    return finalMatches.slice(0, 100);
  }

  async downloadOfflineDatabase(onProgress) {
    const notice = new Notice("⏳ شروع دانلود پایگاه آفلاین قرآن و ۵ ترجمه...", 0);
    const editions = [
      { key: "quran-uthmani", name: "متن عربی قرآن (عثمان‌طه)" },
      { key: "fa.ansarian", name: "ترجمه استاد انصاریان" },
      { key: "fa.makarem", name: "ترجمه آیت‌الله مکارم شیرازی" },
      { key: "fa.fooladvand", name: "ترجمه دکتر فولادوند" },
      { key: "fa.ghomshei", name: "ترجمه الهی قمشه‌ای" },
      { key: "fa.khorramdel", name: "ترجمه و تفسیر نور (خرمدل)" }
    ];

    const db = {};

    try {
      for (let i = 0; i < editions.length; i++) {
        const ed = editions[i];
        notice.setMessage(`⏳ در حال دانلود (${i + 1} از ۶): ${ed.name}...`);
        if (onProgress) onProgress(i + 1, editions.length, ed.name);

        const resp = await requestUrl({
          url: `https://api.alquran.cloud/v1/quran/${ed.key}`,
          method: "GET",
          headers: { Accept: "application/json" }
        });

        if (resp.status !== 200 || !resp.json || !resp.json.data || !resp.json.data.surahs) {
          throw new Error(`خطا در دانلود ${ed.name}`);
        }

        const surahsData = resp.json.data.surahs;
        surahsData.forEach((s) => {
          const sId = s.number;
          if (!db[sId]) db[sId] = {};

          s.ayahs.forEach((a) => {
            const aId = a.numberInSurah;
            if (!db[sId][aId]) {
              db[sId][aId] = { ar: "", clean: "", trans: {} };
            }

            if (ed.key === "quran-uthmani") {
              db[sId][aId].ar = a.text;
              db[sId][aId].clean = cleanQuranText(a.text);
            } else {
              db[sId][aId].trans[ed.key] = a.text;
            }
          });
        });
      }

      notice.setMessage("💾 در حال ذخیره پایگاه داده روی حافظه...");
      await this.app.vault.adapter.write(this.dbFilePath, JSON.stringify(db));
      this.offlineDb = db;
      this.isOffline = true;
      notice.hide();
      new Notice("✅ پایگاه کامل قرآن و ۵ ترجمه با موفقیت دانلود شد. حالت آفلاین فعال است!", 6000);
    } catch (err) {
      notice.hide();
      new Notice(`❌ خطا در دانلود پایگاه داده آفلاین: ${err.message}`, 6000);
    }
  }

  async removeOfflineDatabase() {
    try {
      const exists = await this.app.vault.adapter.exists(this.dbFilePath);
      if (exists) {
        await this.app.vault.adapter.remove(this.dbFilePath);
      }
      this.offlineDb = null;
      this.isOffline = false;
      new Notice("🗑️ پایگاه داده آفلاین با موفقیت حذف شد. افزونه به حالت آنلاین برگشت.");
    } catch (e) {
      new Notice("خطا در حذف فایل دیتابیس.");
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, { defaultTranslator: "fa.ansarian" }, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
};

class KalamNoorSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.style.direction = "rtl";

    containerEl.createEl("h2", { text: "⚙️ تنظیمات کلام نور" });

    new Setting(containerEl)
      .setName("مترجم پیش‌فرض")
      .setDesc("ترجمه‌ای که در پنجره جستجو و کلیک‌راست استفاده می‌شود.")
      .addDropdown((drop) => {
        TRANSLATORS.forEach((t) => drop.addOption(t.id, t.name));
        drop.setValue(this.plugin.settings.defaultTranslator);
        drop.onChange(async (val) => {
          this.plugin.settings.defaultTranslator = val;
          await this.plugin.saveSettings();
        });
      });

    containerEl.createEl("h3", { text: "💾 پایگاه داده آفلاین (۶۲۳۶ آیه + ۵ ترجمه)" });

    const statusDesc = this.plugin.isOffline
      ? "وضعیت فعلی: 🟢 پایگاه داده آفلاین دانلود شده و فعال است (حجم حدود ۹.۵ مگابایت)."
      : "وضعیت فعلی: 🟡 پایگاه داده آفلاین دانلود نشده است (درخواست‌ها آنلاین ارسال می‌شوند).";

    const offlineSetting = new Setting(containerEl)
      .setName("وضعیت مخزن آفلاین")
      .setDesc(statusDesc);

    if (!this.plugin.isOffline) {
      offlineSetting.addButton((btn) =>
        btn
          .setButtonText("📥 دانلود کامل پایگاه آفلاین (۹.۵ MB)")
          .setCta()
          .onClick(async () => {
            btn.setDisabled(true);
            btn.setButtonText("در حال دانلود...");
            await this.plugin.downloadOfflineDatabase();
            this.display();
          })
      );
    } else {
      offlineSetting.addButton((btn) =>
        btn
          .setButtonText("🗑️ حذف مخزن آفلاین")
          .setWarning()
          .onClick(async () => {
            await this.plugin.removeOfflineDatabase();
            this.display();
          })
      );
    }

    // بخش اختصاصی دستیار استودیو و پیوند مستقیم وب‌سایت
    containerEl.createEl("hr", { attr: { style: "margin: 24px 0 16px; border-color: rgba(128,128,128,0.2);" } });

    new Setting(containerEl)
      .setName("🌐 دستیار استودیو (Dastyar Studio)")
      .setDesc("مشاهده ابزارهای هوشمند، قالب‌ها و آموزش‌های بیشتر در وب‌سایت رسمی")
      .addButton((btn) =>
        btn
          .setButtonText("ورود به وب‌سایت")
          .setCta()
          .onClick(() => {
            window.open("https://dastyarstudio.ir/", "_blank");
          })
      );
  }
}