// SafarNama — vanilla JS only. All tour data is SAMPLE data for a portfolio demo.
// No network requests, no real bookings, no payment is processed anywhere.
"use strict";

var TOURS = [
  {
    name: "Hunza Explorer", region: "North", days: 5, price: 65000,
    art: "tour-art-north",
    desc: "Valleys, lakes and mountain viewpoints around Hunza, with relaxed sightseeing days.",
    meta: "5 days · Group tour · Sample itinerary"
  },
  {
    name: "Skardu Adventure", region: "North", days: 6, price: 78000,
    art: "tour-art-north",
    desc: "High-altitude lakes, desert dunes and mountain passes around Skardu.",
    meta: "6 days · Adventure pace · Sample itinerary"
  },
  {
    name: "Naran & Shogran Escape", region: "North", days: 3, price: 38000,
    art: "tour-art-north",
    desc: "A short mountain break: lakes, meadows and cool summer air.",
    meta: "3 days · Short break · Sample itinerary"
  },
  {
    name: "Lahore Heritage Tour", region: "Punjab", days: 2, price: 22000,
    art: "tour-art-punjab",
    desc: "Old-city streets, historic forts and gardens, plus Lahore's famous food streets.",
    meta: "2 days · City tour · Sample itinerary"
  },
  {
    name: "Murree Hills Weekend", region: "Punjab", days: 2, price: 18500,
    art: "tour-art-punjab",
    desc: "A relaxed hill weekend with viewpoints, walks and cool evening weather.",
    meta: "2 days · Weekend trip · Sample itinerary"
  },
  {
    name: "Mohenjo-daro Heritage", region: "Sindh", days: 3, price: 29000,
    art: "tour-art-sindh",
    desc: "Ancient history, museums and Indus Valley sites around Larkana and Sukkur.",
    meta: "3 days · Heritage tour · Sample itinerary"
  },
  {
    name: "Thatta & Keenjhar Trip", region: "Sindh", days: 2, price: 19000,
    art: "tour-art-sindh",
    desc: "Historic mosques and tombs in Thatta, plus a calm day by Keenjhar Lake.",
    meta: "2 days · Day-trip style · Sample itinerary"
  },
  {
    name: "Karachi Coast Getaway", region: "Coast", days: 3, price: 32000,
    art: "tour-art-coast",
    desc: "Beaches, seaside food and city sights in and around Karachi.",
    meta: "3 days · Coastal trip · Sample itinerary"
  },
  {
    name: "Gwadar Beach Expedition", region: "Coast", days: 4, price: 48000,
    art: "tour-art-coast",
    desc: "Golden beaches, coastal viewpoints and a slower seaside pace in Gwadar.",
    meta: "4 days · Coastal trip · Sample itinerary"
  }
];

function formatPKR(n) {
  return "PKR " + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function findTour(name) {
  for (var i = 0; i < TOURS.length; i++) {
    if (TOURS[i].name === name) { return TOURS[i]; }
  }
  return null;
}

function tourIcon(region) {
  if (region === "Coast") {
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 30q6-6 12 0t12 0 12 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="10" r="6" fill="#ffd166"/><path d="M4 38h40" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>';
  }
  return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 38 16 14l8 14 6-8 14 18H4z" fill="#fff"/></svg>';
}

// ---------- Tour cards: search + region filter ----------
var grid = document.getElementById("packageGrid");
var searchInput = document.getElementById("searchInput");
var resultCount = document.getElementById("resultCount");
var noResults = document.getElementById("noResults");
var activeRegion = "All";

function renderTours() {
  var q = searchInput.value.trim().toLowerCase();
  var shown = 0;
  var html = "";
  for (var i = 0; i < TOURS.length; i++) {
    var t = TOURS[i];
    var matchesRegion = (activeRegion === "All" || t.region === activeRegion);
    var haystack = (t.name + " " + t.region + " " + t.desc).toLowerCase();
    var matchesSearch = (q === "" || haystack.indexOf(q) !== -1);
    if (!matchesRegion || !matchesSearch) { continue; }
    shown++;
    html += '<article class="tour-card">' +
      '<div class="tour-art ' + t.art + '">' + tourIcon(t.region) +
      '<span class="region-tag">' + t.region + '</span></div>' +
      '<div class="tour-body">' +
      '<h3>' + t.name + '</h3>' +
      '<p>' + t.desc + '</p>' +
      '<p class="tour-meta"><span>' + t.meta + '</span></p>' +
      '<div class="tour-foot"><p class="price">' + formatPKR(t.price) + '<small>per person · sample price</small></p>' +
      '<button class="btn btn-small" type="button" data-book="' + t.name + '">Book This Tour</button></div>' +
      '</div></article>';
  }
  grid.innerHTML = html;
  resultCount.textContent = shown + " of " + TOURS.length + " sample tours shown.";
  if (noResults) { noResults.classList.toggle("hidden", shown !== 0); }
}

var filterButtons = document.querySelectorAll(".filter-btn");
for (var f = 0; f < filterButtons.length; f++) {
  filterButtons[f].addEventListener("click", function (event) {
    var btn = event.currentTarget;
    activeRegion = btn.getAttribute("data-region");
    for (var j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.toggle("active", filterButtons[j] === btn);
    }
    renderTours();
  });
}
searchInput.addEventListener("input", renderTours);

// ---------- Shared: fill package dropdowns + "Book This Tour" buttons ----------
function fillSelect(select) {
  select.innerHTML = "";
  for (var i = 0; i < TOURS.length; i++) {
    var opt = document.createElement("option");
    opt.value = TOURS[i].name;
    opt.textContent = TOURS[i].name + " — " + formatPKR(TOURS[i].price) + " / person";
    select.appendChild(opt);
  }
}

var estPackage = document.getElementById("estPackage");
var bookPackage = document.getElementById("bookPackage");
fillSelect(estPackage);
fillSelect(bookPackage);

function selectBookingTour(name) {
  var tour = findTour(name);
  if (!tour) { return; }
  bookPackage.value = name;
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  document.getElementById("bookName").focus();
}

document.addEventListener("click", function (event) {
  var btn = event.target.closest ? event.target.closest("[data-book]") : null;
  if (btn) { selectBookingTour(btn.getAttribute("data-book")); }
});

// ---------- Trip-cost estimator: daily rate x days x travellers ----------
var estDays = document.getElementById("estDays");
var estTravellers = document.getElementById("estTravellers");
var estTotal = document.getElementById("estTotal");
var estDetail = document.getElementById("estDetail");
var estError = document.getElementById("estError");

function updateEstimate() {
  var tour = findTour(estPackage.value);
  var days = parseInt(estDays.value, 10);
  var travellers = parseInt(estTravellers.value, 10);
  if (!tour || isNaN(days) || isNaN(travellers) || days < 1 || days > 30 || travellers < 1 || travellers > 30) {
    estError.textContent = "Please enter days between 1 and 30, and travellers between 1 and 30.";
    estError.classList.remove("hidden");
    estTotal.textContent = "PKR 0";
    estDetail.textContent = "";
    return;
  }
  estError.classList.add("hidden");
  var dailyRate = Math.round(tour.price / tour.days);
  var total = dailyRate * days * travellers;
  estTotal.textContent = formatPKR(total);
  estDetail.textContent = formatPKR(dailyRate) + " / person / day (from " + tour.name + ") × " +
    days + " days × " + travellers + " travellers = " + formatPKR(total) + ". Sample estimate only.";
}

estPackage.addEventListener("change", updateEstimate);
estDays.addEventListener("input", updateEstimate);
estTravellers.addEventListener("input", updateEstimate);

// ---------- Demo booking form: validation + reference ----------
var bookingForm = document.getElementById("bookingForm");
var bookDate = document.getElementById("bookDate");
var bookTravellers = document.getElementById("bookTravellers");
var bookName = document.getElementById("bookName");
var bookError = document.getElementById("bookError");

function todayISO() {
  var d = new Date();
  var m = ("0" + (d.getMonth() + 1)).slice(-2);
  var day = ("0" + d.getDate()).slice(-2);
  return d.getFullYear() + "-" + m + "-" + day;
}
bookDate.min = todayISO();

function makeReference() {
  var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  var out = "";
  for (var i = 0; i < 6; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return "SF-" + out;
}

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var name = bookName.value.trim();
  var tour = findTour(bookPackage.value);
  var travellers = parseInt(bookTravellers.value, 10);
  var dateVal = bookDate.value;

  if (!name) {
    bookError.textContent = "Please enter your name.";
    bookError.classList.remove("hidden");
    bookName.focus();
    return;
  }
  if (!tour) {
    bookError.textContent = "Please choose a tour.";
    bookError.classList.remove("hidden");
    return;
  }
  if (!dateVal || dateVal < todayISO()) {
    bookError.textContent = "Please choose a travel date that is today or in the future.";
    bookError.classList.remove("hidden");
    bookDate.focus();
    return;
  }
  if (isNaN(travellers) || travellers < 1 || travellers > 20) {
    bookError.textContent = "Travellers must be between 1 and 20.";
    bookError.classList.remove("hidden");
    bookTravellers.focus();
    return;
  }

  bookError.classList.add("hidden");
  document.getElementById("confRef").textContent = makeReference();
  document.getElementById("confName").textContent = name;
  document.getElementById("confTour").textContent = tour.name + " (" + tour.days + " days, " + tour.region + ")";
  document.getElementById("confDate").textContent = dateVal;
  document.getElementById("confTravellers").textContent = String(travellers);
  document.getElementById("confTotal").textContent = formatPKR(tour.price * travellers) + " (sample)";
  document.getElementById("confirmation").scrollIntoView({ behavior: "smooth", block: "center" });
});

// ---------- Init ----------
renderTours();
updateEstimate();
