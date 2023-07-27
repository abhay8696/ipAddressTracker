const body = Array.from(document.getElementsByTagName("body"))[0];
const form = document.getElementById("form");

let ownIP;

//0. initialized map object 
let map = L.map('map', {
center: [39.76838, -86.15804],
zoom: 13
});

// 4. Create Map
const createMap = (lat, lng)=>{
    map.remove();   // 4.1 Delete existing map bject
    map = L.map('map', {
    center: [lat, lng],
    zoom: 13
    }); // 4.2 initialized map object again
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attrbution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by abhay8696 with❤`;
    const tiles = L.tileLayer(tileUrl, { attrbution });
    const marker = L.circleMarker([lat, lng]).addTo(map);

    tiles.addTo(map);
    marker.addTo(map);
}

const getOwnIP = async ()=> {
    const response = await fetch("https://api.ipify.org?format=json");
    return await response.json();
}

const fetchData = async address=> {
    // console.log("address: ", address);
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_L0YPzgaZai10bAHk48JdbUxGQE0VO&ipAddress=${address}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
}


// 1. when app loads
addEventListener("DOMContentLoaded", async event => {
    ownIP = await getOwnIP();   //2. fetch own ip address initially
    const data = await fetchData(ownIP?.ip);    // 3. Fetch ip address data(on app load / user input)
    let { lat, lng } = data?.location;
    createMap(lat, lng);  // 4. Creat Map with fetched coordinates
});

// 3.1 Event Listener for User Input
form.addEventListener("submit", async e=> {
    e.preventDefault();
    const address = document.getElementById("input").value;
    const data = await fetchData(address);
    let { lat, lng } = data?.location;
    createMap(lat, lng);    // 4. Creat Map with fetched coordinates
})



// 0. Initialized map object 
// 1. When App Loads call addEventListener
// 2. fetch own ip address initially
// 3. Fetch ip address data(on app load / user input)
    // 3.1 Event Listener for User Input
// 4. Creat Map with fetched coordinates
    // 4.1 Delete existing map bject
    // 4.2 initialized map object again