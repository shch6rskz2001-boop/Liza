(function () {
  var CATS = [
    ["all", "Усе"], ["yarn", "Пряжа"], ["fabric", "Тканини"], ["beads", "Бісер"],
    ["parts", "Фурнітура"], ["tools", "Інструменти"], ["floss", "Мулине"], ["kit", "Набори"]
  ];
  var KIND = { yarn: "Пряжа", fabric: "Тканини", beads: "Бісер", parts: "Фурнітура", tools: "Інструменти", floss: "Мулине", kit: "Набори" };

  // Щоб замінити малюнок на фото, додайте до товару поле img, наприклад: img: "photos/merino.jpg"
  var P = [
    { id: 1, c: "yarn", n: "Мериносова пряжа", s: "50 г · 125 м · 100% вовна", p: 148, h: 345 },
    { id: 2, c: "yarn", n: "Бавовна мерсеризована", s: "50 г · 170 м · для амігурумі", p: 96, h: 12 },
    { id: 3, c: "yarn", n: "М'який акрил", s: "100 г · 300 м · для пледів", p: 79, h: 200 },
    { id: 4, c: "yarn", n: "Мохер із шовком", s: "25 г · 210 м · легкий і пухнастий", p: 164, h: 285 },
    { id: 5, c: "fabric", n: "Льон натуральний", s: "відріз 50×70 см · 180 г/м²", p: 185, h: 38 },
    { id: 6, c: "fabric", n: "Бавовна для печворку", s: "набір 10 відрізів · 25×25 см", p: 420, h: 330 },
    { id: 7, c: "fabric", n: "Канва Aida 14", s: "50×50 см · для вишивки хрестиком", p: 135, h: 50 },
    { id: 8, c: "fabric", n: "Фетр м'який", s: "10 аркушів · товщина 1 мм", p: 160, h: 170 },
    { id: 9, c: "beads", n: "Бісер чеський №10", s: "10 г · кришталевий блиск", p: 38, h: 215 },
    { id: 10, c: "beads", n: "Бісер японський 11/0", s: "5 г · рівний за розміром", p: 55, h: 160 },
    { id: 11, c: "beads", n: "Скляні намистини мікс", s: "100 г · різні форми", p: 90, h: 295 },
    { id: 12, c: "beads", n: "Бугельки", s: "10 г · довжина 7 мм", p: 45, h: 350 },
    { id: 13, c: "parts", n: "Ґудзики дерев'яні", s: "30 шт · діаметр 15 мм", p: 60, h: 30 },
    { id: 14, c: "parts", n: "Блискавки потайні", s: "5 шт · довжина 18 см", p: 75, h: 190 },
    { id: 15, c: "parts", n: "Кільця й карабіни для сумок", s: "комплект · метал", p: 110, h: 45 },
    { id: 16, c: "tools", n: "Спиці бамбукові", s: "4 мм · довжина 35 см", p: 120, h: 38 },
    { id: 17, c: "tools", n: "Гачок з ергономічною ручкою", s: "3 мм · сталь", p: 85, h: 350 },
    { id: 18, c: "tools", n: "Голки для вишивки", s: "12 шт · №5–10", p: 45, h: 215 },
    { id: 19, c: "tools", n: "П'яльці букові", s: "діаметр 20 см", p: 130, h: 30 },
    { id: 20, c: "tools", n: "Ножиці кравецькі", s: "21 см · загартована сталь", p: 290, h: 235 },
    { id: 21, c: "floss", n: "Мулине бавовняне", s: "моток 8 м · 6 ниток", p: 12, h: 355 },
    { id: 22, c: "floss", n: "Набір мулине", s: "50 кольорів · по 8 м", p: 520, h: 280 },
    { id: 23, c: "kit", n: "Набір для вишивки «Соняхи»", s: "канва, мулине, голка · 20×25 см", p: 360, h: 48 },
    { id: 24, c: "kit", n: "Набір для в'язання шапки", s: "пряжа 100 г, спиці, схема", p: 450, h: 20 }
  ];

  var cat = "all", query = "", cart = {};
  var $ = function (id) { return document.getElementById(id); };
  var money = function (v) { return v.toLocaleString("uk-UA") + " ₴"; };

  function chips() {
    var box = $("chips"); box.innerHTML = "";
    CATS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.textContent = c[1];
      b.setAttribute("aria-pressed", String(cat === c[0]));
      b.addEventListener("click", function () { cat = c[0]; chips(); grid(); });
      box.appendChild(b);
    });
  }
  function grid() {
    var g = $("grid"); g.innerHTML = "";
    var q = query.trim().toLowerCase();
    var list = P.filter(function (x) {
      return (cat === "all" || x.c === cat) && (!q || (x.n + " " + x.s + " " + KIND[x.c]).toLowerCase().indexOf(q) > -1);
    });
    $("empty").hidden = list.length > 0;
    list.forEach(function (x) {
      var el = document.createElement("article"); el.className = "card";
      var pic = x.img ? '<img src="' + x.img + '" alt="' + x.n + '">' : '<i></i>';
      el.innerHTML = '<div class="sw ' + x.c + '" style="--h:' + x.h + '">' + pic + '</div>' +
        '<div class="info"><span class="k">' + KIND[x.c] + '</span><h3>' + x.n + '</h3><span class="spec">' + x.s + '</span>' +
        '<div class="buy"><span class="price">' + money(x.p) + '</span><button type="button" class="add" data-id="' + x.id + '">У кошик</button></div></div>';
      g.appendChild(el);
    });
  }
  function drawCart() {
    var ids = Object.keys(cart), n = 0, sum = 0, box = $("lines"); box.innerHTML = "";
    ids.forEach(function (id) {
      var x = P.filter(function (p) { return p.id == id; })[0], q = cart[id];
      n += q; sum += q * x.p;
      var row = document.createElement("div"); row.className = "line";
      row.innerHTML = '<div><div class="t">' + x.n + '</div><div class="s">' + x.s + '</div>' +
        '<div class="qty"><button type="button" data-d="-1" data-id="' + id + '" aria-label="Менше">−</button><span>' + q + '</span><button type="button" data-d="1" data-id="' + id + '" aria-label="Більше">+</button></div></div>' +
        '<div class="p">' + money(q * x.p) + '</div>';
      box.appendChild(row);
    });
    if (!ids.length) box.innerHTML = '<p class="s" style="color:var(--muted)">У кошику поки порожньо. Додайте товари з каталогу.</p>';
    $("cartN").textContent = n; $("total").textContent = money(sum);
  }
  function open(v) { $("drawer").hidden = !v; $("veil").hidden = !v; if (v) $("note").textContent = ""; }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.classList.contains("add")) { var id = t.getAttribute("data-id"); cart[id] = (cart[id] || 0) + 1; drawCart(); t.textContent = "Додано ✓"; setTimeout(function () { t.textContent = "У кошик"; }, 900); }
    if (t.hasAttribute("data-d")) { var i = t.getAttribute("data-id"); cart[i] += +t.getAttribute("data-d"); if (cart[i] <= 0) delete cart[i]; drawCart(); }
    var go = t.closest && t.closest("[data-go]"); if (go) { cat = go.getAttribute("data-go"); chips(); grid(); }
  });
  $("openCart").addEventListener("click", function () { open(true); });
  $("closeCart").addEventListener("click", function () { open(false); });
  $("veil").addEventListener("click", function () { open(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") open(false); });
  $("q").addEventListener("input", function (e) { query = e.target.value; grid(); });
  $("checkout").addEventListener("click", function () {
    $("note").textContent = Object.keys(cart).length ? "Це вітрина без підключеної оплати: замовлення поки не відправляється." : "Спочатку додайте товари до кошика.";
  });

  chips(); grid(); drawCart();
})();
