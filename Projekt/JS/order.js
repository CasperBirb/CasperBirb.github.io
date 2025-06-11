function saveOrder(order) {
    const orders = JSON.parse(sessionStorage.getItem(`orders`)) || new Array();
    const id = order.id || orders.size +1;    
    order.id = id;


    let thereExists = false;
    for (let i = 0; i < orders.length; i++) {
        if(orders[i]._id == order.id) {
            thereExists = true;
            orders[i] = order; 
            break;
        };
    }
    if(!thereExists) {
        orders.push(order);
    }
    
    sessionStorage.setItem(`orders`, JSON.stringify(orders));
}

function deleteOrder(id) {
    const orders = JSON.parse(sessionStorage.getItem(`orders`)) || new Array();
    for (let i = 0; i < orders.length; i++) {
        if(orders[i]._id == id) {
            orders.splice(i,1); 
            sessionStorage.setItem(`orders`, JSON.stringify(orders));
            break;
        };
    }
}

function getOrder(id) { 
    const orders = JSON.parse(sessionStorage.getItem(`orders`)) || new Array();
    
    for (let i = 0; i < orders.length; i++) {
        if(orders[i]._id == id) {
            return orders[i] || null;  
        };
    }
} 

function getOrderMap() {
    const orders = JSON.parse(sessionStorage.getItem(`orders`)) || new Array();
    return orders;  // Return the entire array of orders
}

function getPatternMap() {
    const patterns = JSON.parse(sessionStorage.getItem(`patterns`)) || new Array();
    return patterns;  // Return the entire array of patterns
}