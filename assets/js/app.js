const pokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const geradorPokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(pokemonUrl(index + 1)).then(response => response.json()))


const geradorHTML = pokemons => {

    return pokemons.reduce((acumulador, { name, id, types }) => {
        const tipos = types.map(tp => tp.type.name);
        const nome = name[0].toUpperCase() + name.slice(1)

        acumulador += `
        <li class="cards ${tipos[0]}">
        <div class="fundoimg">
        <img class="imagemPoke" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"> </div>
            <div class="idPoke"><small>#${id.toString().padStart(3, '0')}</small></div>
            <h3 class="card-title">${nome}</h3>
            <p class="card-text">Type: <br> <small>${tipos.join(' | ')}</small></p>
        <li>`

        return acumulador;
    }, '')
}

const criarCardPokemons = pokemons => {
    const classe = document.querySelector('[data-js="pokedex"]');
    classe.innerHTML = pokemons;
}


const pokemonPromises = geradorPokemonPromises();
Promise.all(pokemonPromises)
    .then(geradorHTML)
    .then(criarCardPokemons)