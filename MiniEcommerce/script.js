const data = {
  produtos: [
    {
      id: 1,
      nome: "Base Líquida Boca Rosa Beauty",
      preco: 59.90,
      categoria: "Rosto",
      imagem: "images/bocarosa.webp",
      descricao: "Base líquida de alta cobertura, acabamento mate e longa duração. Resistente à água.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Corretivo Liquido BT Multicover",
      preco: 42.90,
      categoria: "Rosto",
      imagem: "images/bt.jpg",
      descricao: "Corretivo líquido de média a alta cobertura, enriquecido com ácido hialurônico.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Pó Compacto Translucido Rare Beauty",
      preco: 189.00,
      categoria: "Rosto",
      imagem: "images/rarebeauty.jpg",
      descricao: "Pó solto ultrafino que matifica a pele e disfarça poros sem pesar o visual.",
      emEstoque: false
    },
    {
      id: 4,
      nome: "Paleta de Sombras Naked Urban Decay",
      preco: 329.00,
      categoria: "Olhos",
      imagem: "images/naked.webp",
      descricao: "Paleta com 12 tons neutros versáteis, entre acabamentos mate, acetinado e cintilante.",
      emEstoque: true
    },
    {
      id: 5,
      nome: "Máscara de Cílios Lash Sensational Maybelline",
      preco: 69.90,
      categoria: "Olhos",
      imagem: "images/lash.jpg",
      descricao: "Proporciona efeito leque, definindo e alongando os cílios sem empelotar.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Delineador em Caneta Toque de Natureza",
      preco: 29.90,
      categoria: "Olhos",
      imagem: "images/delineador.jpg",
      descricao: "Ponta fina de alta precisão com pigmentação preta intensa e secagem rápida.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "Batom Matte M·A·C Ruby Woo",
      preco: 119.00,
      categoria: "Lábios",
      imagem: "images/ruby.jpg",
      descricao: "Ícone da maquiagem, batom vermelho icônico com acabamento retro matte e alta fixação.",
      emEstoque: true
    },
    {
      id: 8,
      nome: "Gloss Labial Lifter Gloss Maybelline",
      preco: 54.90,
      categoria: "Lábios",
      imagem: "images/lifter.webp",
      descricao: "Gloss hidratante com ácido hialurônico que proporciona brilho intenso e lábios visivelmente mais cheios.",
      emEstoque: false
    }
  ]
};

function formatPrice(preco) { return `R$ ${preco.toFixed(2)}`; }
function createProductCard(produto) {
  const card = document.createElement(`div`);
  card.classList.add(`card`);
  card.setAttribute(`data-id`, produto.id);
  card.style.backgroundColor = 'pink';

  const title = document.createElement(`h1`);
  title.textContent = produto.nome;
  card.appendChild(title);

  const img = document.createElement(`img`);
  img.src = produto.imagem;
  card.appendChild(img);

  const preco = document.createElement(`p`);
  preco.textContent = formatPrice(produto.preco);
  card.appendChild(preco);

  const categ = document.createElement(`p`);
  categ.textContent = `Categoria: ${produto.categoria}`;
  card.appendChild(categ);

  const detalhes = document.createElement(`button`);
  detalhes.classList.add(`btn`);
  detalhes.textContent = 'Ver detalhes';
  detalhes.addEventListener('click', () => { showProductDetails(produto); });
  card.appendChild(detalhes);

  const destacar = document.createElement(`button`);
  destacar.textContent = 'Destacar';
  destacar.classList.add(`btn`);
  destacar.addEventListener('click', () => { card.classList.toggle(`highlight`); });

  const btnCard = document.createElement(`div`);
  btnCard.appendChild(detalhes);
  btnCard.appendChild(destacar);
  card.appendChild(btnCard);
  return card;
}
const container = document.getElementById(`product-details`);
function showProductDetails(produto) {
  const details = document.createElement(`div`);
  details.classList.add(`detalhes`);

  const title = document.createElement(`h1`);
  title.textContent = produto.nome;
  details.appendChild(title);

  const descricao = document.createElement(`p`);
  descricao.textContent = produto.descricao;
  details.appendChild(descricao);

  const preco = document.createElement(`p`);
  preco.textContent = formatPrice(produto.preco);
  details.appendChild(preco);

  const categ = document.createElement(`p`);
  categ.textContent = `Categoria: ${produto.categoria}`;
  details.appendChild(categ);

  const estoque = document.createElement(`p`);
  if (produto.emEstoque == true) estoque.textContent = 'Em estoque';
  else estoque.textContent = 'Fora do estoque';
  details.appendChild(estoque);

  container.innerHTML = ``;
  container.appendChild(details);
}
const lista = document.getElementById(`product-list`);
function renderProducts(produtos) {
  lista.innerHTML = ``;
  produtos.forEach((item) => {
    lista.appendChild(createProductCard(item));
  });
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    console.log(`ID: ${card.getAttribute(`data-id`)}`);
  });
}
function renderCategories() {
  const seletor = document.querySelector(`#category`);
  const categorias = [...new Set(data.produtos.map((item) => item.categoria))];
  categorias.forEach((item) => {
    const op = document.createElement(`option`);
    op.textContent = item;
    op.value = item;
    seletor.appendChild(op);
  });
}
function filterProducts() {
  const busca = document.querySelector(`#search`).value.toLowerCase();
  const categ = document.querySelector(`#category`).value;
  const filtraCategoria = data.produtos.filter((item) => { return (categ == `todas` || item.categoria == categ) && item.nome.toLowerCase().includes(busca); });
  renderProducts(filtraCategoria);
}
const btn = document.querySelector(`#btnRender`);
btn.addEventListener('click', () => {
  document.querySelector(`#search`).value = ``;
  document.querySelector(`#category`).value = 'todas';
  container.innerHTML=``;
  filterProducts();
});
const campoBusca = document.querySelector(`#search`);
campoBusca.addEventListener('input', filterProducts);
const campoCateg = document.querySelector(`#category`);
campoCateg.addEventListener('change', filterProducts);
renderProducts(data.produtos);
renderCategories();

