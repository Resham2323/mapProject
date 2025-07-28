const myMap = L.map('map').setView([22.9074872, 79.07306671], 5);
const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution ='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'


const tileLayer = L.tileLayer(tileURL, {attribution});
tileLayer.addTo(myMap);


function generateList() {
const ul = document.querySelector(".list");
storeList.forEach((shop) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const a = document.createElement("a");
    const p = document.createElement("p");

    div.classList.add("store-items");
    a.addEventListener("click", () => {
        flyToStore(shop);
    })
    a.innerText = shop.properties.name;
    a.href = "#";
    p.innerText = shop.properties.address;

    div.appendChild(a);
    div.appendChild(p);
    li.appendChild(div);
    ul.appendChild(li);
})

}

generateList();

function popupContent(shop) {
    return ` 
    <div >
       <h4> ${shop.properties.name} </h4>
       <p>${shop.properties.address}</p>
       <div class="phone-number">
         <a href ="tel:${shop.properties.phone}"> ${shop.properties.phone} </a>
       </div>
    </div>`
}

function onEachFeature(feature, layer) {
    layer.bindPopup(popupContent(feature), {closeButton:false, offset: L.point(0, -8)});
}

const myIcon = L.icon({
    iconUrl: "marker.png",
    iconSize: [30, 40],
})

const shopLayer = L.geoJSON(storeList, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: myIcon});
        
    }
});

shopLayer.addTo(myMap);

function flyToStore(store) {
    const lng =  store.geometry.coordinates[0];
    const lat = store.geometry.coordinates[1];
    myMap.flyTo([lat, lng], 14, {
        duration: 2,
    });

    setTimeout(() => {
        L.popup({closeButton:false, offset: L.point(0, -8)})
        .setLatLng([lat, lng])
        .setContent(popupContent(store))
        .openOn(myMap)
        }, 2000);
}