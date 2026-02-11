let map;
let directionsService;
let directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.238949, lng: 76.889709 }, // Алматы
        zoom: 12,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

function createOrder() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const distance = document.getElementById("distance").value;

    if(!name || !address || !distance) {
        alert("Барлық өрістерді толтырыңыз!");
        return;
    }

    const price = distance * 500;
    const id = Date.now();

    const travelTime = ((distance / 40) * 60).toFixed(0); // минут

    database.ref("orders/" + id).set({
        name: name,
        address: address,
        distance: distance,
        price: price,
        status: "Күтілуде",
        paymentStatus: "Төленбеген",
        eta: travelTime + " мин"
    });

    document.getElementById("result").innerHTML = `
        <b>Тапсырыс ID:</b> ${id} <br>
        <b>Баға:</b> ${price} тг <br>
        <b>From:</b> Сіздің мекенжайыңыз <br>
        <b>To:</b> ${address} <br>
        <b>Шамамен уақыт:</b> ${travelTime} мин <br>
        <a href="payment.html?id=${id}&price=${price}">
            <button>Онлайн төлеу</button>
        </a>
    `;

    const origin = "Сіздің мекенжайыңыз";
    const destination = address;

    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
    }, function(result, status){
        if(status === 'OK') {
            directionsRenderer.setDirections(result);
        }
    });

    // Автоматты статус жаңарту
    setTimeout(()=> database.ref("orders/" + id).update({status: "Жолда"}), 5000);
    setTimeout(()=> database.ref("orders/" + id).update({status: "Жеткізілді"}), 15000);
}
