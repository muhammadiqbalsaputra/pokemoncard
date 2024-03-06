function submitForm() {
    var firstName = document.getElementById('isiNama').value; 

    if(firstName){
        alert('Selamat datang ' + firstName + ' di Pokedex');
        alert('  Berikut adalah beberapa list Pokemon')
        window.location = "index.html"
    }else{  
        alert('mohon isi Nama terlebih dahulu');
    }
}

const pokedex = document.getElementById('listPokemon')
let template = document.getElementById('data')

fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
.then(response => {
    if(!response.ok){
        throw new Error ('error fetch api pertama')
    }
        return response.json()
    })
    
    .then(data =>{
    const dataPokemon = data.results;

    for(let i = 0 ; i < 40 ; i++){
        const daftarPokemon = dataPokemon[i];
    
        fetch(daftarPokemon.url)
        .then(res => {
            if(!res.ok){
                throw new Error ('error fetch api ke-dua')
            }
            return res.json()
        })
            
        .then(pokeman =>{
            const getData = document.importNode(template.content, true);
                     
            getData.querySelector('img').src = pokeman.sprites.other.dream_world.front_default;
            getData.querySelector('img').alt = pokeman.name;
            getData.querySelector('h3').textContent = pokeman.name;
            getData.getElementById('tipe').textContent = "type : " + pokeman.types.map(type => type.type.name);
            getData.getElementById('kekuatan').textContent = "abilities : " + pokeman.abilities.map(ability => ability.ability.name);
            pokedex.appendChild(getData);

        }).catch(error => {
            console.error('Ada kesalahan saat mengambil data pokeman:', error);
        });   
    }    
})
