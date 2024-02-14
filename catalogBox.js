const catalogEl = document.querySelector('#catalog-box');
let catalogArr = [];

const buttons = document.querySelectorAll('button[data-country]');
buttons.forEach(n => n.addEventListener('click', onClick));

function onClick({ target: t }) {
  buttons.forEach(n => n.classList.toggle('active', n === t));
  renderCatalog(t.dataset.country);
}

function renderCatalog(country) {
  const toRender = country
    ? catalogArr.filter(n => n.tag === country)
    : catalogArr;

  catalogEl.innerHTML = toRender
    .map(n => `
      <div class="catalog__card" id="${n.id}" data-counter="${n.counter}"
      data-name="${n.name}" data-price="${n.price}">
        <img src="${n.img}" alt="${n.alt}" class="catalog__card_img">
        <p class="catalog__card_author">${n.author}</p>
        <p class="catalog__card_name">${n.name}</p>
        <p class="catalog__card_note">${n.note}</p>
        <p class="catalog__card_price">${n.price}</p>
        <button class="catalog__card_btn">${n.btn}</button>
      </div>`)
    .join('');
}

fetch('catalogBox.json')
  .then(r => r.json())
  .then(r => {
    catalogArr = r;
    buttons[0].click();
});