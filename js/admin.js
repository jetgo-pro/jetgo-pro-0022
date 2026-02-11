database.ref("orders").on("value", function(snapshot){
    const data = snapshot.val();
    const ordersDiv = document.getElementById("orders");
    ordersDiv.innerHTML = "";

    for(let id in data){
        const order = data[id];
        ordersDiv.innerHTML += `
            <div class="order-card">
                <p><b>ID:</b> ${id}</p>
                <p><b>Аты:</b> ${order.name}</p>
                <p><b>Мекенжай:</b> ${order.address}</p>
                <p><b>Баға:</b> ${order.price} тг</p>
                <p><b>ETA:</b> ${order.eta}</p>
                <p><b>Статус:</b> ${order.status}</p>
                <p><b>Төлем:</b> ${order.paymentStatus}</p>
            </div>
        `;
    }
});
