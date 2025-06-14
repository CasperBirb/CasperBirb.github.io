class Order {
    constructor(id, name, email, phone, list) {
        this._id = id || Math.floor(Math.random()* (100 - 0) + 0);
        this._date = new Date().toISOString().split('T')[0]; 
        this._name = name || null;
        this._email = email || null;
        this._phone = phone || null;
        this._list = list || [];
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get phone() {
        return this._phone;
    }
    get list() {
        return this._list;
    }
    set id(id) {
        this._id = id;
    }
    set name(name) {
        this._name = name;
    }
    set email(email) {
        this._email = email;
    }
    set phone(phone) {
        this._phone = phone;
    }
    set list(list) {
        this._list = list;
    }
    totalArea() {
        let total = 0;
        for (let item of this.list) {
            total += item.Area() * item.quantity;
        }
        return total;
    }
}
class Order_Item {
    constructor(h,e_t,e_b,w,e_l,e_r,qt,d_s,clr,mat,fin,desc) {
        this._height = h || 0;
        this._edge_top = e_t || 0;
        this._edge_bottom = e_b || 0;
        this._width = w || 0;
        this._edge_left = e_l || 0;
        this._edge_right = e_r || 0;
        this._quantity = qt || 1;
        this._double_sided = d_s || false;
        this._color = clr || null;
        this._material = mat || null;
        this._finish = fin || null;
        this._desc = desc || "";
    }
    get height() {
        return this._height;
    }
    get edge_top() {
        return this._edge_top;
    }
    get edge_bottom() {
        return this._edge_bottom;
    }
    get width() {
        return this._width;
    }
    get edge_left() {
        return this._edge_left;
    }
    get edge_right() {
        return this._edge_right;
    }
    get quantity() {
        return this._quantity;
    }

    get double_sided() {
        return this._double_sided;
    }
    get color() {
        return this._color;
    }
    get material() {
        return this._material;
    }
    get finish() {
        return this._finish;
    }
    get desc() {
        return this._desc;
    }
    set height(h) {
        this._height = h;
    }
    set edge_top(e_t) {
        this._edge_top = e_t;
    }
    set edge_bottom(e_b) {
        this._edge_bottom = e_b;
    }
    set width(w) {
        this._width = w;
    }
    set edge_left(e_l) {
        this._edge_left = e_l;
    }
    set edge_right(e_r) {
        this._edge_right = e_r;
    }
    set quantity(qt) {
        this._quantity = qt;
    }
    set double_sided(d_s) {
        this._double_sided = d_s;
    }
    set color(clr) {
        this._color = clr;
    }
    set material(mat) {
        this._material = mat;
    }
    set finish(fin) {
        this._finish = fin;
    }
    set desc(desc) {
        this._desc = desc;
    }
    Area() {
        return (this.height/1000) * (this.width/1000);
    }
}
const EDGE_TYPES = new Map([
    ["-", "-"],
    ["F", "Uchwyt"],
    ["+L","lewa kr. +Xmm"],
    ["F45st", "Uchwyt 45°"],
]);
const FINISHES = new Map([
    ["fornir", "Fornir"],
    ["fornir-bejca", "Fornir bejca"],
    ["mat", "Mat"],
    ["polish", "Połysk"],
    ["raw", "Surowe"]
]);
const MATERIALS = new Map([
    ["mdf-4", "MDF 4mm"],
    ["mdf-12", "MDF 12mm"],
    ["mdf-18", "MDF 18mm"],
    ["mdf-19", "MDF 19mm"],
    ["mdf-22", "MDF 22mm"],
    ["mdf-36", "MDF 36mm"],
    ["mdf-38", "MDF 38mm"],
    ["chipboard-16", "Wiórówka 16mm"],
    ["fornir-19", "Fornir 19mm"],
]);
const TEMP_LIST = new Array();
window.onload = function() {
    handleOrderDisplay();
    refreshOrderList();
}
function saveOrder() {
    console.log("Saving order...");
    let email = document.getElementById("input__email").value;
    let phone = document.getElementById("input__phone").value;
    let fullName = document.getElementById("input__full-name").value;
    
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        alert("Podaj poprawny adres email.");
        return false;
    }
    if (!(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+(\s+[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+)+$/.test(fullName.trim()))) {
        alert("Podaj imię i nazwisko (co najmniej dwa wyrazy).");
        return false;
    }
    if (!(/^[\d\s\-]{9,}$/.test(phone.trim()))) {
        alert("Podaj poprawny numer telefonu (co najmniej 9 cyfr).");
        return false;
    }
    if (TEMP_LIST.length == 0) {
        alert("Nie dodano żadnych elementów do zamówienia.");
        return false;
    }
    let order = null;
    let selectedId = document.getElementById("input__orders").value;
    if (selectedId !== "all" && selectedId !== "0") {
        console.log("Updating existing order with ID: " + selectedId);
        order = getOrder(selectedId);
        console.log(order);
        if (order) {
            order.name = fullName;
            order.email = email;
            order.phone = phone;
            order.list = TEMP_LIST; // Update the list with the temporary items
            
        } else {
            alert("error: Nie znaleziono zamówienia o podanym ID.");
            return false;
        }
    }else {
        console.log("Creating new order");
        order = new Order(
            Math.floor(Math.random()* (100 - 0) + 0),
            fullName,
            email,
            phone,
            TEMP_LIST
        );
        document.querySelector('option[value="0"]').remove();
        alert("Wysłano zlecenie o ID: "+ order.id);
    }
    console.log(order);
    // console.log("Handling it!" + document.querySelector('option[value="0"]'));
    const inputSelect = document.getElementById("input__orders");
    inputSelect.options.add(new Option(order.id, order.id));
     
    
    inputSelect.value = "all"; 
    inputSelect.disabled = false;
    handleOrderDisplay();     
    sendOrder(order);
    refreshOrderList();
    TEMP_LIST.length = 0; // Clear the temporary list
    return true;
}
function cancelOrder() {
    const inputSelect = document.getElementById("input__orders");
    document.querySelector('option[value="0"]').remove(); 
    inputSelect.value = "all"; 
    inputSelect.disabled = false;
    handleOrderDisplay(); 
    TEMP_LIST.length = 0; // Clear the temporary list
}
function sendOrder(order) {
    const orders = getOrderArray();
    let thereExists = false;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i]._id == order.id || orders[i]._id == order._id) {
            thereExists = true;
            // Update the existing order
            orders[i] = order;
            break;
        }
    }
    if (!thereExists) {
        orders.push(order);
    }
    sessionStorage.setItem(`orders`, JSON.stringify(orders));
}

function deleteOrder(id) {
    const orders = getOrderArray();
    for (let i = 0; i < orders.length; i++) {
        if(orders[i]._id == id) {
            orders.splice(i,1); 
            sessionStorage.setItem(`orders`, JSON.stringify(orders));
            break;
        };
    }
}

function getOrder(id) { 
    const orders = JSON.parse(sessionStorage.getItem(`orders`)) || [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i]._id == id) {
            // Recreate Order and its items
            const orderObj = orders[i];
            const order = new Order(
                orderObj._id,
                orderObj._name,
                orderObj._email,
                orderObj._phone,
                (orderObj._list || []).map(item =>
                    new Order_Item(
                        item._height, item._edge_top, item._edge_bottom, item._width,
                        item._edge_left, item._edge_right, item._quantity, item._double_sided,
                        item._color, item._material, item._finish, item._desc
                    )
                )
            );
            return order;
        }
    }
    return false;
} 

function getOrderArray() {
    const orders = JSON.parse(sessionStorage.getItem(`orders`)) || new Array();
    return orders;  // Return the entire array of orders
}

function getPatternArray() {
    const patterns = JSON.parse(sessionStorage.getItem(`patterns`)) || new Array();
    return patterns;  // Return the entire array of patterns
}

function addOrderItem() {

    let h = Number(document.getElementById("input__height").value);
    let e_t = document.getElementById("input__edge-top").value;
    let e_b = document.getElementById("input__edge-bot").value;
    let w = Number(document.getElementById("input__width").value);
    let e_l = document.getElementById("input__edge-left").value;
    let e_r = document.getElementById("input__edge-right").value;
    let qt = Number(document.getElementById("input__quantity").value);
    let d_s = document.getElementById("input__double-sided").checked;
    let clr = document.getElementById("input__color").value;
    let mat = document.getElementById("input__material").value;
    let fin = document.getElementById("input__finish").value;
    let desc = document.getElementById("input__desc").value;

    const item = new Order_Item(h, e_t, e_b, w, e_l, e_r, qt, d_s, clr, mat, fin, desc);
    TEMP_LIST.push(item);

    const itemTable = document.getElementById("items__list");
     // Clear existing list
    

        const html_tr = document.createElement("tr");
        let html_td = document.createElement("td");
        html_td.textContent = itemTable.childElementCount + 1; // Item number
        html_tr.appendChild(html_td);
        for (const [key, value] of Object.entries(item)) {
            html_td = document.createElement("td");
            html_td.textContent = value;
            html_tr.appendChild(html_td);
        }
        html_td = document.createElement("td");
        html_td.textContent = item.Area().toFixed(2) + " m²"; // Area
        html_tr.appendChild(html_td);
        
        itemTable.appendChild(html_tr);


    
}

function displayOrders() {
    orders = getOrderArray();
    const orderTable = document.getElementById("orders__list");

    orderTable.innerHTML = ""; // Clear existing list

    orders.forEach(orderObj => {
        const html_tr = document.createElement("tr");
        order = new Order(
                orderObj._id,
                orderObj._name,
                orderObj._email,
                orderObj._phone,
                (orderObj._list || []).map(item =>
                    new Order_Item(
                        item._height, item._edge_top, item._edge_bottom, item._width,
                        item._edge_left, item._edge_right, item._quantity, item._double_sided,
                        item._color, item._material, item._finish, item._desc
                    )
                )
            );

        let html_td = document.createElement("td");
        html_td.textContent = order._id; 
        html_tr.appendChild(html_td);
        html_td = document.createElement("td");
        html_td.textContent = order._date; 
        html_tr.appendChild(html_td);
        html_td = document.createElement("td");
        html_td.textContent = order._name; 
        html_tr.appendChild(html_td);
        html_td = document.createElement("td");
        html_td.textContent = order._email; 
        html_tr.appendChild(html_td);
        html_td = document.createElement("td");
        html_td.textContent = order._phone; 
        html_tr.appendChild(html_td);
        html_td = document.createElement("td");
        html_td.textContent = order.totalArea().toFixed(2) + " m²"; // Total Area
        html_tr.appendChild(html_td);
        
        orderTable.appendChild(html_tr);
    });
}
function displayOrder(id) {
    if (!getOrder(id)){
        return;
    }
    order = getOrder(id);
    const itemTable = document.getElementById("items__list");
     // Clear existing list
    itemTable.innerHTML = "";
    document.getElementById("input__date").value = order._date;
    document.getElementById("input__full-name").value = order._name;
    document.getElementById("input__email").value = order._email;
    document.getElementById("input__phone").value = order._phone;
    for (let i = 0; i < order.list.length; i++) {
        TEMP_LIST.push(order.list[i]);
        const html_tr = document.createElement("tr");
        let html_td = document.createElement("td");
        html_td.textContent = i + 1; // Item number
        html_tr.appendChild(html_td);
        for (const [key, value] of Object.entries(order.list[i])) {
            html_td = document.createElement("td");
            html_td.textContent = value;
            html_tr.appendChild(html_td);
        }
        html_td = document.createElement("td");
        html_td.textContent = order.list[i].Area().toFixed(2) + " m²"; // Area
        html_tr.appendChild(html_td);
        
        itemTable.appendChild(html_tr);
    }
}
function handleOrderDisplay() {
    const selected = document.getElementById("input__orders").value;
    console.log("Selected order: " + selected);
    if (selected == "all") {
        document.getElementById("orders__display").style = "display: inline-block";
        document.getElementById("items__display").style = "display: none";
        document.getElementById("order__edit").style = "display: none";
        document.getElementById("btn__add").style = "display: inline-block";
        document.getElementById("btn__delete").style = "display: none";
        document.getElementById("order__btns2").style = "display: none";
        displayOrders();
    } else if (selected == "0") {
        document.getElementById("orders__display").style = "display: none";
        document.getElementById("items__display").style = "display: inline-block";
        document.getElementById("order__edit").style = "display: inline-block";
        document.getElementById("btn__add").style = "display: none";
        document.getElementById("btn__delete").style = "display: none";
        document.getElementById("order__btns2").style = "display: inline-block";
    } else {
        document.getElementById("orders__display").style= "display: none";
        document.getElementById("items__display").style = "display: inline-block";
        document.getElementById("order__edit").style = "display: inline-block";
        document.getElementById("btn__add").style = "display: none";
        document.getElementById("btn__delete").style = "display: inline-block";
        document.getElementById("order__btns2").style = "display: inline-block";
        displayOrder(selected);
    }
}
function handleNewOrder() {
    // console.log("Handling it!" + document.querySelector('option[value="0"]'));
    const inputSelect = document.getElementById("input__orders");
    if (document.querySelector('option[value="0"]') == null) {
        // console.log("Creating new order");
        inputSelect.options.add(new Option("0X", "0"));
        inputSelect.value = "0"; 
        inputSelect.disabled = "true";
        handleOrderDisplay();
        document.getElementById("items__list").innerHTML = "";
        document.getElementById("input__date").value = new Date().toISOString().split('T')[0];
        //disable order selection
        // save the order or cancel
    }
}
function handleDeleteOrder() {
    const selected = document.getElementById("input__orders").value;
    if (selected == "all") {
        // alert("Nie można usunąć wszystkich zamówień");
        return;
    }
    if (confirm(`Czy na pewno chcesz usunąć zamówienie ${selected}?`)) {
        document.getElementById("input__orders").remove(document.getElementById("input__orders").selectedIndex);
        document.getElementById("input__orders").disabled = false;
        deleteOrder(selected);
        handleOrderDisplay();
    }
}
function handleItemNew() {
    document.getElementById("item__edit").style = "display: inline-block";
    document.getElementById("form-orders").classList.add("disabled");
}
function handleItemNext() {
    if (!validateItems()) {
        return;
    }
    addOrderItem();
    document.getElementById("item__edit").reset();
}
function handleItemLast() {
    if (!validateItems()) {
        return;
    }
    addOrderItem();

    document.getElementById("item__edit").reset();
    document.getElementById("item__edit").style = "display: none";
    document.getElementById("form-orders").classList.remove("disabled");
}
function handleItemCancel() {
    document.getElementById("item__edit").style = "display: none";
    document.getElementById("item__edit").reset();
    document.getElementById("form-orders").classList.remove("disabled");
}
function validateItems() {
    let temp = Number(document.getElementById("input__height").value);
    if (temp <= 0 || temp > 2700) {
        alert("Wysokość musi być większa od 0 i mniejsza niż 2700mm");
        return false;
    }
    temp = document.getElementById("input__edge-top").value;
    if (!EDGE_TYPES.has(temp)) {
        alert("Nieprawidłowy typ krawędzi górnej");
        return false;
    }
    temp = document.getElementById("input__edge-bot").value;
    if (!EDGE_TYPES.has(temp)) {
        alert("Nieprawidłowy typ krawędzi dolnej");
        return false;
    }
    temp = Number(document.getElementById("input__width").value);
    if (temp <= 0 || temp > 2070) {
        alert("Szerokość musi być większa od 0 i mniejsza niż 2700mm");
        return false;
    }
    temp = document.getElementById("input__edge-left").value;
    if (!EDGE_TYPES.has(temp)) {
        alert("Nieprawidłowy typ krawędzi lewej");
        return false;
    }
    temp = document.getElementById("input__edge-right").value;
    if (!EDGE_TYPES.has(temp)) {
        alert("Nieprawidłowy typ krawędzi prawej");
        return false;
    }
    temp = Number(document.getElementById("input__quantity").value);
    if (temp <= 0 || temp > 999) {
        alert("Ilość musi być większa od 0 i mniejsza niż 1000");
        return false;
    }
    temp = document.getElementById("input__color").value;
    if (temp == "") {
        alert("Kolor nie może być pusty");
        return false;
    }
    temp = document.getElementById("input__material").value;
    if (!MATERIALS.has(temp)) {
        alert("Nieprawidłowy materiał");
        return false;
    }
    temp = document.getElementById("input__finish").value;
    if (!FINISHES.has(temp)) {
        alert("Nieprawidłowe wykończenie");
        return false;
    }
    return true;
}
function refreshOrderList() {
    const inputSelect = document.getElementById("input__orders");
    // Remove all options except the first one (value="all")
    while (inputSelect.options.length > 1) {
        inputSelect.remove(1);
    }

    const orders = getOrderArray();
    orders.forEach(orderObj => {
        // Use order id and name for display

        const option = new Option(orderObj._id, orderObj._id);
        inputSelect.add(option);
    });
}