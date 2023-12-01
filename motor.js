const loading = async() => {
    const url = "https://musicbrainz.org/ws/2/artist?fmt=json&query=BANDA";
    const fetching = await fetch(url);
    const jsoned = await fetching.json();

    for (let i = 0; i < jsoned.artists.length; i++) {
        document.getElementById("qtBandas").textContent = "BANDAS REGISTRADAS: "+jsoned.artists.length; // qt bandas
        const diving = document.createElement("div");
        diving.classList.add("inserted");
        document.getElementById("listTable").appendChild(diving);

        const nmH2 = document.createElement("h2"); // nm da Banda
        nmH2.id = i;
        nmH2.classList.add("txtFont");
        nmH2.classList.add("nmDsgn");
        if (jsoned.artists[i].name != null){
            nmH2.textContent = jsoned.artists[i].name;
        }
        else{
            nmH2.textContent = "Banda Desconhecida";
        }
        diving.appendChild(nmH2);

        const labelArea = document.createElement("label"); // local de Origem
        labelArea.classList.add("txtFont");
        labelArea.classList.add("halfed");
        if (jsoned.artists[i].area != null){
            labelArea.textContent = "Local Origem: "+jsoned.artists[i].area.name;
        }
        else{
            labelArea.textContent = "Local Origem: desconhecido";
        }
        diving.appendChild(labelArea);

        const labelVD = document.createElement("label"); // Estado de vida
        labelVD.classList.add("txtFont");
        labelVD.classList.add("halfed");
        if (jsoned.artists[i]["life-span"] != null && jsoned.artists[i]["life-span"].ended != null){
            labelVD.textContent = " | Vida Útil: Não";
        }
        else{
            labelVD.textContent = " | Vida Útil: Sim";
        }
        diving.appendChild(labelVD);

        const h3ID = document.createElement("h4"); // id do Artista
        h3ID.classList.add("txtFont");
        if (jsoned.artists[i].id != null){
            h3ID.textContent = "ID: "+jsoned.artists[i].id
            /*const urlWork = "https://musicbrainz.org/ws/2/release-group?fmt=json&artist="+jsoned.artists[i].id; // Tentativa de trabalhos do artista via ID 
            const fetchingExtra = await fetch(urlWork);
            const jsonedExtra = await fetchingExtra.json();
            console.log(jsonedExtra)*/
        }
        else{
            h3ID.textContent = "ID: desconhecido";
        }
        diving.appendChild(h3ID);


    }

    document.getElementById("nmArtist").addEventListener('keyup', searching);
};

const searching = () => {
    let stringing = document.getElementById("nmArtist").value;
    let getChildren = document.getElementById("listTable").children;
    let counting = 0;
    for (var i = 0; i < getChildren.length; i++) {
        var otherChild = getChildren[i].children;
        const ilusion = document.createAttribute("hidden");
        getChildren[i].setAttributeNode(ilusion);
        if (otherChild[0].textContent.substring(0,6) == "Banda " || stringing.length <= 0){
            if (otherChild[0].textContent.substring(6,6+stringing.length).toUpperCase() == stringing.toUpperCase()){
                getChildren[i].removeAttribute("hidden");
                counting++;
            }
        }
    }
    document.getElementById("resultQt").textContent = "Quantidade de resultados encontrados: "+counting
};
document.addEventListener('DOMContentLoaded', loading);