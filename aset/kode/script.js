  // ---------------------------------------- Seksi Header ----------------------------------------
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.site-navbar ul');
const navLinks = document.querySelectorAll('.site-navbar a');

allEventListners();

function allEventListners() {
  navToggler.addEventListener('click', togglerClick);
  navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
}
function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}
function navLinkClick() {
  if(navMenu.classList.contains('open')) {
    navToggler.click();
  }
}
// ---------------------------------------- Seksi Bg Hero ----------------------------------------
var slideIndex = 1;
function showSlides() {
	var slides = document.getElementsByClassName("mySlides");
	if (slideIndex > slides.length) {slideIndex = 1;}
	if (slideIndex < 1) {slideIndex = slides.length;}
	for (var i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex-1].style.display = "block";
 }
function heroControl(n) {
	slideIndex += n;
	showSlides();
}
function currentSlide(n) {
	slideIndex = n;
	showSlides();
}
window.onload = showSlides;
setInterval(onclick="heroControl(1)", 5000);

/*------------------------------------------- Artikel Menarik Lainnya -------------------------------------------*/
(function () {
	var tabs_menu = document.getElementsByClassName("tabs-menu");
	for (var k = 0; k < tabs_menu.length; k++) {
		tabs_menu[k].onclick = js_tabs;
	}
	function js_tabs() {
		var tab_id = this.getAttribute("data-target");
		var tabs_panel = document.getElementsByClassName("tabs-panel");

		for (var i = 0; i < tabs_panel.length; i++) {
			tabs_panel[i].style.display = "none";
		}
		for (var j = 0; j < tabs_menu.length; j++) {
			tabs_menu[j].className = tabs_menu[j].className.replace(" tabs-menu-active", "");
		}
		this.className += " tabs-menu-active";
		document.getElementById(tab_id).style.display = "block";
		return false;
	}
})();

// ---------------------------------------- Seksi Pagination ----------------------------------------
window.DT_LOCALES = {},
	window.DT_LOCALES.en = {
		SEARCH: "Kolom Pencarian",
		PER_PAGE: "Baris / Halaman",
		SHOWING_TO: "No. {FROM} - {TO} dari {SIZE}",
		GOTO_FIRST: "go to page 1",
		GOTO_PREV: "go to previous page",
		GOTO_PAGE: "go to page {NUM}",
		GOTO_NEXT: "go to next page",
		GOTO_LAST: "go to last page",
		ASC_ACTIVE: "ascending order active",
		DESC_ACTIVE: "descending order active",
		NOT_ACTIVE: "not active",
		NO_RESULT: "Tidak ada hasil"
	};
const DT_LOCALES = window.DT_LOCALES,
	DT_PREFIX = "jtable",
	DT_TRIGGER = `[data-replace='${DT_PREFIX}']`;
class DataTable {
	constructor(e) {
		this.el = e, this.data = [], this.filtered = [], this.currPage = 1, this.perPage = 10, this.locale = {}
	}
	checkId() {
		this.el.hasAttribute("id") && 0 != this.el.id.length || (this.el.id = `${DT_PREFIX}-${+new Date}`)
	}
	getPgMessage() {
		let e = (this.currPage - 1) * this.perPage + 1,
			t = e + (this.el.querySelectorAll("tbody tr").length - 1);
		document.querySelector(`#${this.el.id}_pgdisplay`).innerHTML = this.locale.SHOWING_TO.replace("{FROM}", e).replace("{TO}", t).replace("{SIZE}", this.filtered.length)
	}
	getData() {
		let e = [],
			t = [];
		return this.el.querySelectorAll("thead th").forEach(e => t.push(e.innerHTML)), this.el.querySelectorAll("tbody > tr").forEach(i => {
			let a = {};
			i.querySelectorAll("td").forEach((e, i) => a[t[i]] = e.innerHTML), e.push(a)
		}), e
	}
	printData(e) {
		let t = this.el.querySelector("tbody");
		t.innerHTML = "", e.forEach(e => {
			let i = document.createElement("tr");
			Object.keys(e).forEach(t => {
				let a = document.createElement("td");
				a.innerHTML = e[t], i.appendChild(a)
			}), t.appendChild(i)
		})
	}
	changePage(e) {
		let t = this.perPage * (e - 1),
			i = t + this.perPage,
			a = this.filtered.slice(t, i);
		this.currPage = e, this.printData(a), this.getPgMessage(), this.pagination()
	}
	search(e) {
		if (e = e.toLowerCase().trim(), this.filtered = this.data.filter(t => {
				let i = !1;
				for (let a in t) i = i || t[a].toLowerCase().includes(e);
				return i
			}), this.currPage = 1, 0 == this.filtered.length) {
			let e = Object.keys(this.data[0]),
				t = document.createElement("tr"),
				i = document.createElement("td");
			i.setAttribute("aria-live", "polite"), i.innerHTML = this.locale.NO_RESULT, i.style.textAlign = "center", i.colSpan = e.length, t.appendChild(i), this.el.querySelector("tbody").innerHTML = "", this.el.querySelector("tbody").appendChild(t)
		} else this.printData(this.filtered.slice(0, this.perPage));
		this.pagination(), this.getPgMessage()
	}
	pagination() {
		let e = document.createElement("div");
		e.classList.add(`${DT_PREFIX}__pagination`);
		let t = Math.ceil(this.filtered.length / this.perPage);
		if (this.currPage > 1) {
			let t = document.createElement("button");
			t.setAttribute("aria-controls", this.el.id), t.setAttribute("aria-label", this.locale.GOTO_FIRST), t.innerHTML = "&#10094;&#10094;", t.classList.add("btn-char"), t.onclick = (() => this.changePage(1)), e.appendChild(t);
			let i = document.createElement("button");
			i.setAttribute("aria-controls", this.el.id), i.setAttribute("aria-label", this.locale.GOTO_PREV), i.innerHTML = "&#10094;", i.classList.add("btn-char"), i.onclick = (() => this.changePage(this.currPage - 1)), e.appendChild(i)
		}
		for (let i = this.currPage - 2; i < this.currPage + 2; i++) {
			if (i < 1 || i > t) continue;
			let a = document.createElement("button");
			a.setAttribute("aria-controls", this.el.id), a.setAttribute("aria-label", this.locale.GOTO_PAGE.replace("{NUM}", i)), a.classList.add("btn"), a.innerHTML = i, i == this.currPage ? a.setAttribute("aria-selected", !0) : a.onclick = (() => this.changePage(i)), e.appendChild(a)
		}
		if (this.currPage < t) {
			let i = document.createElement("button");
			i.setAttribute("aria-controls", this.el.id), i.setAttribute("aria-label", this.locale.GOTO_NEXT), i.innerHTML = "&#10095;", i.classList.add("btn-char"), i.onclick = (() => this.changePage(this.currPage + 1)), e.appendChild(i);
			let a = document.createElement("button");
			a.setAttribute("aria-controls", this.el.id), a.setAttribute("aria-label", this.locale.GOTO_LAST), a.innerHTML = "&#10095;&#10095;", a.classList.add("btn-char"), a.onclick = (() => this.changePage(t)), e.appendChild(a)
		}
		document.querySelector(`#${this.el.id}_pagination`).innerHTML = "", document.querySelector(`#${this.el.id}_pagination`).appendChild(e)
	}
	changeOrder(e, t) {
		let i = this.perPage * (this.currPage - 1),
			a = this.filtered.length > this.perPage ? i + this.perPage : this.filtered.length,
			l = this.filtered.sort((i, a) => i[e] > a[e] ? t : -t);
		this.printData(l.slice(i, a))
	}
	toggleHead(e, t) {
		let i = t.getAttribute("aria-sort") || "";
		e.forEach(e => {
			e.removeAttribute("aria-sort"), e.setAttribute("aria-label", `${e.innerText}: non attivo`)
		}), 0 == i.length || "d" == i[0] ? (t.setAttribute("aria-sort", "ascending"), t.setAttribute("aria-label", `${t.innerText}: ${this.locale.ASC_ACTIVE}`), this.changeOrder(t.innerText, 1)) : (t.setAttribute("aria-sort", "descending"), t.setAttribute("aria-label", `${t.innerText}: ${this.locale.DESC_ACTIVE}`), this.changeOrder(t.innerText, -1))
	}
	init() {
		this.data = this.getData(), this.filtered = this.data, this.hasSearch = this.el.dataset.search, this.locale = DT_LOCALES[this.el.dataset.locale], this.checkId(), this.printData(this.filtered.slice(0, this.perPage));
		let e = document.createElement("div");
		e.classList.add(DT_PREFIX);
		let t = document.createElement("div");
		t.classList.add(`${DT_PREFIX}__panel`);
		let i = document.createElement("div"),
			a = document.createElement("select");
		a.classList.add(`${DT_PREFIX}__select`);
		let l = document.createElement("span");
		l.innerHTML = this.locale.PER_PAGE;
		for (let e = 1; e <= 5; e++) a.innerHTML += `<option ${1==e?"selected":""} value='${10*e}'>\n                    ${10*e}\n                </option>`;
		if (a.onchange = (() => {
				this.perPage = parseInt(a.value), this.changePage(1)
			}), i.appendChild(a), i.appendChild(l), t.appendChild(i), this.hasSearch) {
			let e = document.createElement("div"),
				i = document.createElement("input");
			i.setAttribute("aria-controls", this.el.id), i.classList.add(`${DT_PREFIX}__search`), i.setAttribute("role", "searchbox"), i.placeholder = this.locale.SEARCH, i.classList.add("control"), i.type = "search", i.addEventListener("input", () => this.search(i.value)), e.appendChild(i), t.appendChild(e)
		}
		e.appendChild(t);
		let r = this.el.querySelectorAll("thead th");
		r.forEach(e => {
			e.setAttribute("tabindex", 0), e.setAttribute("scope", "col"), e.setAttribute("aria-controls", this.el.id), e.setAttribute("aria-label", `${e.innerText}: ${this.locale.NOT_ACTIVE}`), e.addEventListener("click", () => this.toggleHead(r, e)), e.addEventListener("keyup", t => {
				document.activeElement == e && "Enter" == t.key && this.toggleHead(r, e)
			})
		});
		let s = document.createElement("div");
		s.classList.add(`${DT_PREFIX}__table`), this.el.parentElement.insertBefore(e, this.el), e.appendChild(s), s.appendChild(this.el);
		let n = document.createElement("div");
		n.classList.add(`${DT_PREFIX}__panel`);
		let c = document.createElement("div");
		c.setAttribute("aria-live", "polite"), c.id = `${this.el.id}_pgdisplay`, n.appendChild(c);
		let d = document.createElement("div");
		d.id = `${this.el.id}_pagination`, n.appendChild(d), e.appendChild(n), this.pagination(), this.getPgMessage(), this.el.removeAttribute("data-search"), this.el.removeAttribute("data-locale"), this.el.removeAttribute("data-replace")
	}
}
document.querySelectorAll(DT_TRIGGER).forEach(e => new DataTable(e).init());

/* ---------- halaman faq / Tanya Jawab ---------- */
const acc = document.querySelectorAll(".pertanyaan");
acc.forEach( a => {
    a.addEventListener('click', e => {
        e.target.classList.toggle("faqActive");
        const jawaban = e.target.nextElementSibling;
        if (jawaban.style.maxHeight) {
            jawaban.style.maxHeight = null;
        }
        else {
            jawaban.style.maxHeight = jawaban.scrollHeight + "px";
        }
    })
});

/*------------------------------------------- footer copyright -------------------------------------------*/
window.addEventListener('load', () => {
	const copyright = document.querySelector('.copyright');
	copyright.innerHTML = '<span><a href="https://google.com/search?q=jasa+jatim" target="_blank">Jasa Jatim</a></span> © Copyright <span class="tahun">2021</span>.<br>All Rights Reserved';
	const tahun = document.querySelector(".tahun");
	let date = new Date().getFullYear();
	tahun.innerHTML = date;
});

/*------------------------------------------- share post -------------------------------------------*/
let currentUrl = encodeURIComponent(window.location.href);
const shareProdukLinks = document.querySelectorAll('.share-produk a');

shareProdukLinks.forEach(function(link) {
  if (link.href.includes('facebook.com')) {
    link.href = 'https://www.facebook.com/sharer/sharer.php?u=' + currentUrl;
  } else if (link.href.includes('whatsapp.com')) {
    link.href = 'https://api.whatsapp.com/send/?phone&text=' + currentUrl;
  } else if (link.href.includes('twitter.com')) {
    link.href = 'https://twitter.com/intent/tweet?url=' + currentUrl;
  } else if (link.href.includes('pinterest.com')) {
    link.href = 'https://id.pinterest.com/pin/create/button/?url=' + currentUrl;
  }
});

/*------------------------------------------- ganti nomor -------------------------------------------*/
const chatWa = document.querySelector(".chat-wa");
const tombolJasa = document.querySelectorAll(".tombol-jasa > a");

window.addEventListener("DOMContentLoaded", () => {
    chatWa.href = "https://wa.me/6285133733744";
    if (tombolJasa.length > 0) {
        tombolJasa.forEach(e => {
            e.href = "https://wa.me/6285133733744";
        });
    }
});

/* ---------- notifikasi popup modal jasa jatim ---------- */
// function popupJasaJatim() {
//   const promo = document.createElement("div");
//   promo.setAttribute("class", "promo");
//   document.body.appendChild(promo);

//   const wadahGambar = document.createElement("div");
//   wadahGambar.setAttribute('class', 'wadah-gambar');
//   const gambar = document.createElement("img");
//   gambar.setAttribute('src', 'aset/gambar/utama/logo-situs-jasa-jatim.png');
//   gambar.setAttribute('alt', 'logo utama jasa jatim');
//   wadahGambar.appendChild(gambar);
//   promo.appendChild(wadahGambar);

//   const wadahPesan = document.createElement("div");
//   wadahPesan.setAttribute("class", "wadah-pesan");
//   promo.appendChild(wadahPesan);

//   const pesanTeks = document.createElement('h3');
//   pesanTeks.innerHTML = 'Apakah Anda ingin mengurus izin usaha lewat kami?';
//   wadahPesan.appendChild(pesanTeks);

//   const wadahTombol = document.createElement('div');
//   wadahTombol.setAttribute('class', 'wadah-tombol');
//   promo.appendChild(wadahTombol);

//   const iya = document.createElement('a');
//   iya.setAttribute('href', 'https://wa.me/6282232458800');
//   iya.setAttribute('target', '_blank');
//   iya.setAttribute('class', 'iya');
//   iya.innerText = 'Iya';
//   wadahTombol.appendChild(iya);

//   const tidak = document.createElement('a');
//   tidak.setAttribute('href', 'javascript:void(0)');
//   tidak.setAttribute('class', 'tidak');
//   tidak.innerText = 'Tidak';
//   wadahTombol.appendChild(tidak);

//   wadahTombol.addEventListener('click', e => {
//       if( e.target.classList.contains('iya') || e.target.classList.contains('tidak') ) {
//           e.target.parentElement.parentElement.style.display = 'none';
//       }
//   });
// };
// setTimeout(popupJasaJatim, 5000);
// setTimeout(()=>{
//     open("https://wa.me/6282232458800");
// }, 10000