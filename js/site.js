(function () {
  "use strict";

  var root = document.documentElement;
  var stored = null;
  try {
    stored = localStorage.getItem("gsl-theme");
  } catch (e) {
    stored = null;
  }
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var initial = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("gsl-theme", next);
    } catch (e) {
      /* ignore */
    }
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
      btn.textContent = next === "dark" ? "Light" : "Dark";
    });
  }
  setTheme(initial);

  document.addEventListener("click", function (e) {
    var themeBtn = e.target.closest("[data-theme-toggle]");
    if (themeBtn) {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      return;
    }
    var navBtn = e.target.closest(".nav-toggle");
    if (navBtn) {
      var open = document.body.classList.toggle("nav-open");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }
  });

  document.querySelectorAll(".site-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      var btn = document.querySelector(".nav-toggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  });

  var cadEl = document.getElementById("btc-cad");
  var usdEl = document.getElementById("btc-usd");

  function formatMoney(value, locale, currency) {
    return Number(value).toLocaleString(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0
    });
  }

  async function fetchPrice() {
    if (!cadEl && !usdEl) return;
    try {
      var res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad,usd");
      if (!res.ok) throw new Error("price request failed");
      var data = await res.json();
      if (cadEl) cadEl.textContent = formatMoney(data.bitcoin.cad, "en-CA", "CAD");
      if (usdEl) usdEl.textContent = formatMoney(data.bitcoin.usd, "en-US", "USD");
    } catch (err) {
      if (cadEl) cadEl.textContent = "Unavailable";
      if (usdEl) usdEl.textContent = "Unavailable";
    }
  }

  fetchPrice();
  setInterval(fetchPrice, 60000);

  var refresh = document.getElementById("btc-refresh");
  if (refresh) refresh.addEventListener("click", fetchPrice);
})();
