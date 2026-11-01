
const API_KEY = "8a17dd0443f3ab440632598c77c74e2a";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movieList = document.getElementById("movie-list");
const message = document.getElementById("message");
const searchInput = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");

async function fetchMovies(query = "") {
  let endpoint;
  if (query) {
    endpoint = "/search/movie";
  } else {
    endpoint = "/movie/popular";
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    language: "pt-BR",
    page: 1,
  });
  if (query) params.set("query", query);

  const response = await fetch(`${BASE_URL}${endpoint}?${params}`);
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar a API`);
  }

  const data = await response.json();
  return data.results;
}

function createMovieCard(movie) {
  const card = document.createElement("article");
  card.classList.add("card");

  // Poster (alguns filmes não têm imagem)
  if (movie.poster_path) {
    const img = document.createElement("img");
    img.classList.add("card-poster");
    img.src = IMG_URL + movie.poster_path;
    img.alt = `Pôster de ${movie.title}`;
    img.loading = "lazy";
    card.appendChild(img);
  } else {
    const semPoster = document.createElement("div");
    semPoster.classList.add("card-poster", "sem-poster");
    semPoster.textContent = "Sem pôster";
    card.appendChild(semPoster);
  }

  const info = document.createElement("div");
  info.classList.add("card-info");

  const titulo = document.createElement("h2");
  titulo.classList.add("card-title");
  titulo.textContent = movie.title;

  const ano = movie.release_date ? movie.release_date.slice(0, 4) : "Sem data";
  const nota = movie.vote_average ? movie.vote_average.toFixed(1) : "–";

  const meta = document.createElement("p");
  meta.classList.add("card-meta");
  meta.textContent = `${ano} • Nota ${nota}`;

  // Sinopse limitada a 150 caracteres
  let sinopse = movie.overview || "Sinopse indisponível.";
  if (sinopse.length > 150) {
    sinopse = sinopse.slice(0, 150).trim() + "...";
  }
  const resumo = document.createElement("p");
  resumo.classList.add("card-overview");
  resumo.textContent = sinopse;

  info.appendChild(titulo);
  info.appendChild(meta);
  info.appendChild(resumo);
  card.appendChild(info);

  return card;
}

// ===== Renderização =====
function renderMovies(movies) {
  movieList.innerHTML = "";

  if (movies.length === 0) {
    showMessage("Nenhum filme encontrado. Tente outro título.");
    return;
  }

  showMessage("");
  movies.forEach((movie) => {
    movieList.appendChild(createMovieCard(movie));
  });
}

function showMessage(text) {
  message.textContent = text;
}

// ===== Busca =====
async function searchMovies() {
  const query = searchInput.value.trim();

  showMessage("Carregando...");
  movieList.innerHTML = "";

  try {
    const movies = await fetchMovies(query);
    renderMovies(movies);
  } catch (error) {
    showMessage("Não foi possível carregar os filmes. Confira sua API key e a conexão.");
    console.error(error);
  }
}

btnSearch.addEventListener("click", searchMovies);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchMovies();
});

// ===== Início =====
function init() {
  searchMovies(); // campo vazio = filmes populares
}

init();
