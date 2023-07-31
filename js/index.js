const body = Array.from(document.getElementsByTagName("body"))[0];
const form = document.getElementById("form");
// const icon_location = import("")

let ownIP;

//0. initialized map object 
let map = L.map('map', {
center: [39.76838, -86.15804],
zoom: 13
});

const loactionIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/abhay8696/ipAddressTracker/master/images/placeholder.png',
    iconSize: [48,48],
    iconAnchor: [24, 47],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});



const createResultSection = data=> {
    const resultSection = document.getElementById("resultSection");
    resultSection.textContent = '';
    const resultObject = {
        ip_address: data?.ip,
        location : `${data?.location?.city}, ${data?.location?.region}, ${data?.location?.postalCode}`,
        timezone: `UTC ${data?.location?.timezone}`,
        isp: data?.isp
    }
    
    Object.entries(resultObject).forEach((i, index)=> {
        console.log(i)
        const div = document.createElement("div");
        const span0 = document.createElement("span");
        const span1 = document.createElement("span");

        const wall = document.createElement("div");
        wall.className = "wall";

        div.className = "resultPart";
        if(index === 0) div.id = "firstResultPart";
        span0.className = "resultName";
        span1.className = "resultValue";
        
        span0.textContent = i[0];
        span1.textContent = i[1]

        div.append(span0,span1);
        resultSection.append(div);
        if(index < 3) resultSection.append(wall);
    })
}
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
    const marker2 = L.circleMarker([lat, lng], {radius: 5, color:'#666666'}).addTo(map);
    const marker = L.marker([lat, lng], {icon: loactionIcon});

    tiles.addTo(map);
    marker.addTo(map);
    marker2.addTo(map);
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
    console.log(data);
    return data;
}


// 1. when app loads
addEventListener("DOMContentLoaded", async event => {
    ownIP = await getOwnIP();   //2. fetch own ip address initially
    const data = await fetchData(ownIP?.ip);    // 3. Fetch ip address data(on app load / user input)
    let { lat, lng } = data?.location;
    createResultSection(data);
    createMap(lat, lng);  // 4. Creat Map with fetched coordinates
});

// 3.1 Event Listener for User Input
form.addEventListener("submit", async e=> {
    e.preventDefault();
    const address = document.getElementById("input").value;
    const data = await fetchData(address);
    let { lat, lng } = data?.location;
    createResultSection(data);
    createMap(lat, lng);    // 4. Creat Map with fetched coordinates
    document.getElementById("input").value = '';
})



// 0. Initialized map object 
// 1. When App Loads call addEventListener
// 2. fetch own ip address initially
// 3. Fetch ip address data(on app load / user input)
    // 3.1 Event Listener for User Input
// 4. Creat Map with fetched coordinates
    // 4.1 Delete existing map bject
    // 4.2 initialized map object again