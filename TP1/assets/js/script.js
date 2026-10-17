
const carouselSeries = document.getElementById('series'); 
const carouselSugestoes = document.getElementById('sugestoes');
const mobile = window.matchMedia('(max-width: 767px)');
function renderSeries(qnt){
    var slideAtual = null;
    carouselSeries.innerHTML=``;
    dados.series.forEach(s => {
        if ((s.id-1) % qnt == 0) {
            const item = document.createElement('div');
            item.classList.add('carousel-item');
            if ((s.id-1) == 0) item.classList.add('active'); 
            slideAtual = document.createElement('div');
            slideAtual.classList.add('series');
            item.appendChild(slideAtual);
            carouselSeries.appendChild(item);
        }

        const card = document.createElement('div');
        const link = document.createElement('container');
        link.innerHTML = `<a href=detalhe.html?id=${s.id}><img src="${s.poster}" referrerpolicy="no-referrer"></img></a>`;
        card.appendChild(link);
        const nome = document.createElement('p');
        nome.textContent = s.nome;
        card.appendChild(nome);
        slideAtual.appendChild(card);
    });

    carouselSugestoes.innerHTML=``;
    const filtro = dados.series.filter(s => s.nota_imdb>=8.7);
    filtro.forEach((f,i) => {
        if (i % qnt == 0) {
            const item = document.createElement('div');
            item.classList.add('carousel-item');
            if (i == 0) item.classList.add('active'); 
            slideAtual = document.createElement('div');
            slideAtual.classList.add('sugestoes');
            item.appendChild(slideAtual);
            carouselSugestoes.appendChild(item);
        }

        const card = document.createElement('div');
        const link = document.createElement('container');
        link.innerHTML = `<a href=detalhe.html?id=${f.id}><img src="${f.poster}" referrerpolicy="no-referrer"></img></a>`;
        card.appendChild(link);
        const nome = document.createElement('p');
        nome.textContent = f.nome;
        card.appendChild(nome);
        slideAtual.appendChild(card);
    });
}
function atualizar(){
    renderSeries(mobile.matches ? 4 : 5);
}
atualizar();                               
mobile.addEventListener('change', atualizar); 
