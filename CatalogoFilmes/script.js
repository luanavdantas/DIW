//Definição dos dados (JSON)
const catalogo = [
    {id: 1, titulo: "Stranger Things", tipo: "serie", ano: 2025, generos:["ficção"], nota: 7, assistido: true},
    {id: 2, titulo: "Diário de uma paixão", tipo: "filme", ano: 2004, generos:["romance"], nota: 10, assistido: true},
    {id: 3, titulo: "Corra", tipo: "filme", ano: 2017, generos:["terror", "misterio"], nota: 8, assistido: true},
    {id: 4, titulo: "Gilmore Girls", tipo: "serie", ano: 2000, generos:["drama"], nota: 5, assistido: false},
    {id: 5, titulo: "O Convite", tipo: "filme", ano: 2026, generos:["comedia"], nota: 6.5, assistido: false},
    {id: 6, titulo: "The Good Place", tipo: "serie", ano: 2016, generos:["sitcom"], nota: 9, assistido: true}
];
//Acesso e leitura dos dados
console.log(catalogo);
console.log("Titulo do primeiro item: " + catalogo[0].titulo);
console.log("Ano do último item: " + catalogo[5].ano);
console.log("Segundo gênero do terceiro item: " + catalogo[2].generos[1]);
//Iterações com iterators
catalogo.forEach((item) => {
    console.log("["+item.generos+"] "+item.titulo+" ("+item.ano+")");
});
 
const titulosEmCaixaAlta = catalogo.map(item=>item.titulo.toUpperCase());
console.log(titulosEmCaixaAlta);

const naoAssistidos = catalogo.filter(item=> item.assistido==false);
console.log(naoAssistidos);

const busca = catalogo.find(item=>item.nota>=9);
if(busca) console.log(busca.titulo + " " + busca.nota);
else console.log("Item não encontrado");

const somaNotas = catalogo.reduce((count, item)=>{
    return count + item.nota;
}, 0);
const media = somaNotas/catalogo.length;
console.log("Media das notas de todos os filmes: "+media.toFixed(2));

const assistidos = catalogo.filter(item=> item.assistido==true);
const somaNotasAssistidos = assistidos.reduce((count, item)=>{
    return count + item.nota;
}, 0);
const mediaAssistidos = somaNotasAssistidos/assistidos.length;
console.log("Media das notas dos filmes assistidos: "+mediaAssistidos.toFixed(2));

const existe = catalogo.some(item=>item.ano<2000);
if(existe) console.log("Existe um item lançado antes dos anos 2000");
else console.log("Nenhum item foi lançado antes dos anos 2000");

const todos = catalogo.every(item=>item.generos.length>=1);
if(todos) console.log("Todos os itens tem pelo menos um gênero");
else console.log("Algum item não possui gênero cadastrado");

//Saída na tela
const tela = document.getElementById("output");
const quantidadeItens = catalogo.length;
const quantidadeFilme = catalogo.reduce((count, item)=>{
    if(item.tipo=="filme") return count+1;
    return count;
},0);
const quantidadeSerie = catalogo.reduce((count, item)=>{
    if(item.tipo=="serie") return count+1;
    return count;
},0);
const quantidadeAssistidos = assistidos.length;
const melhores = [...catalogo].sort((a,b)=>b.nota-a.nota).slice(0,3);
tela.innerHTML = `<p>Quantidade de itens no catálogo: ${quantidadeItens}</p>
<p>Quantidade de filme: ${quantidadeFilme}</p>
<p>Quantidade de série: ${quantidadeSerie}</p>
<p>Quantidade de itens assistidos: ${quantidadeAssistidos}</p>
<p>Media das notas de todos os filmes: ${media.toFixed(2)}</p>
<p>3 melhores notas:</p>
<p>1º lugar (Nota ${melhores[0].nota}): ${melhores[0].titulo}</p>
<p>2º lugar (Nota ${melhores[1].nota}): ${melhores[1].titulo}</p>
<p>3º lugar (Nota ${melhores[2].nota}): ${melhores[2].titulo}</p>`;