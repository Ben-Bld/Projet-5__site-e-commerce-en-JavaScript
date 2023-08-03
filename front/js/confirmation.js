const getID = new URL(window.location.href).searchParams.get("orderId");

document.getElementById("orderId").innerHTML = getID;
