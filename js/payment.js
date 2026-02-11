const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");
const price = params.get("price");

document.getElementById("orderInfo").innerText =
    `ID: ${orderId} | Сома: ${price} тг`;

function pay(method) {
    document.getElementById("paymentStatus").innerText = "Төлем өңделуде...";

    setTimeout(() => {
        database.ref("orders/" + orderId).update({
            paymentStatus: "Төленді",
            paymentMethod: method
        });

        document.getElementById("paymentStatus").innerText =
            "Төлем сәтті аяқталды (" + method.toUpperCase() + ")";
    }, 2000);
}
