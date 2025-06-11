class MILL_BIT {
    constructor(r = 1,b = 1,desc = "Frez") {
        this._radius = r;
        this._bottom_len = b;
        this._desc = desc;
    }

    get radius() {
        return this._radius;
    }
    get bottom_len() {
        return this._bottom_len;
    }
    get desc() {
        return this._desc;
    }
    set radius(r) {
        this._radius = r;
    }
    set bottom_len(b) {
        this._bottom_len = b;
    }
    set desc(desc) {
        this._desc = desc;
    }
    diameter() {
        return this.radius*2 + this.bottom_len;
    }

}
class PATTERN {
    constructor(id="",l=0, t=0, d=0, dist=0, off=0, qp=0, gl=0, mb=null) {
        if (mb == null) {
            mb = new MILL_BIT();
        }
        this._id = id;
        this._length = l;
        this._thickness = t;
        this._depth = d;
        this._distance = dist;
        this._offset = off; 
        this._qt_passes = qp;   
        this._groove_len = gl;
        this._mill_bit = mb;

    }
    get id() {
        return this._id;
    }
    get length() {
        return this._length;
    }
    get thickness() {
        return this._thickness;
    }
    get depth() {
        return this._depth;
    }
    get distance() {
        return this._distance;
    }
    get offset() {
        return this._offset;
    }
    get qt_passes() {
        return this._qt_passes;
    }
    get groove_len() {
        return this._groove_len;
    }
    get mill_bit() {
        return this._mill_bit;
    }
    set id(id) {
        this._id = id;
    }
    set length(l) {
        this._length = l;
    }
    set thickness(t) {
        this._thickness = t;
    }
    set depth(d) {
        this._depth = d;
    }
    set distance(dist) {
        this._distance = dist;
    }
    set offset(off) {
        this._offset = off;
    }
    set qt_passes(qp) {
        this._qt_passes = qp;
    }
    set groove_len(gl) {
        this._groove_len = gl;
    }
    set mill_bit(mb) {
        this._mill_bit = mb;
    }
}
const MILL_BITS = new Map([
    ["convex-6mm", new MILL_BIT(6,2,"Frez zaokrąglający r-6mm")]
]);

function calc() {
    // ( L + x ) / ( 2*r + (d/2)) = N
    
    let bit = MILL_BITS.get("convex-6mm"); // .get(document.getElementById("input__mill-bit").value);
    let thickness = Number(document.getElementById("input__thickness").value);
    
    let depth = Number(document.getElementById("input__depth").value);
    
    let length = Number(document.getElementById("input__length").value);
    
    let distance = Number(document.getElementById("input__distance").value);
    
    let offset = Number(document.getElementById("input__offset").value);
    let ridges = Number(document.getElementById("input__qt-ridges").value);
    
    let groove_len = Number(document.getElementById("input__groove-len").value);
    if (thickness <= 0 || thickness >40) {
       return false; 
    }
    if (depth <= 0 || depth >= thickness) {
        return false;
    }
    if (length <= 0 || length >=2700) {
        return false;
    }
    if (distance <= 0 || distance >= length) {
        return false;
    }
    if (offset < -7 || offset > 1) {
        return false;
    }
    if (groove_len < bit.bottom_len || groove_len >= length) {
        return false;
    }

    document.getElementById("plate-outline").setAttribute("width", length);
    document.getElementById("plate-outline").setAttribute("height", thickness);
    document.getElementById("whiteout--right").setAttribute("x", length+1)

    ridges = Math.round(( length ) / (distance));
    
    distance = (length - offset*2) / ridges;
    distance = distance.toFixed(3);
    // distance -= offset;
    document.getElementById("input__distance").value = distance;
    document.getElementById("input__qt-ridges").value = ridges;
    let path_element = document.getElementById("mill-path");

    let path = new String();
     if (bit.diameter() > distance) {
        let x = ( distance / 2 ) - (bit.bottom_len / 2);
        x=bit.radius - x;
        let y = Math.sqrt(((bit.radius**2) - (x**2)));
        x=bit.radius - x;
        path = `M${offset-x-(bit.bottom_len / 2)},-60 L${offset-x-(bit.bottom_len / 2)}, ${depth-bit.radius}  `;
        
        //  if (y<(bit.radius/2)) {
        //         y = bit.radius-y;
        //     }
        console.log("x: "+ x +", y:"+ y + ",bit_radius^2: " + bit.radius**2 + ", x^2: "+ x**2 + " dalej: "+ ((bit.radius**2) - (x**2))+", depth-y: "+ (depth-y) );
        path += "l0, "+ (depth - y);
     }else {
        path = `M${offset-(bit.diameter()/2)},-60 L${offset-(bit.diameter()/2)}, ${depth-bit.radius}  `;
     }
    
     
    for (let i = 0; i < ridges+1; i++) {        
        if (bit.diameter() > distance) {

            let x = ( distance / 2 ) - (bit.bottom_len / 2);
            x=bit.radius - x;
            let y = Math.sqrt(((bit.radius**2) - (x**2)));
            x=bit.radius - x;
            // if (y<(bit.radius/2)) {
            //     y = bit.radius-y;
            // }
            path += "a" + bit.radius+ ", " + bit.radius + " 0 0,1 " + x + ", " + y + " ";
            path += "l" + bit.bottom_len + ", 0";
            path += "a" + bit.radius+ ", " + bit.radius + " 0 0,1 " + x + ", -" + y + " ";
        } else {
            path += "a" + bit.radius+ ", " + bit.radius + " 0 0,1 " + bit.radius + ", " + bit.radius + " ";
            path += "l" + bit.bottom_len + ", 0";
            path += "a" + bit.radius+ ", " + bit.radius + " 0 0,1 " + bit.radius + ", -" + bit.radius + " ";
            let leftover_dist = distance - bit.diameter();
            if (depth > bit.radius) {
                if (leftover_dist != 0 ) {
                    path += "l0, " + -50 + " ";
                    path += "l" + leftover_dist + ", 0 ";
                    path += "l0, " + 50+  " ";
                } else { 
                    path += "l" + leftover_dist + ", 0 ";
                }
            }
            else {
                path += "l" + leftover_dist + ", 0 ";
                
            }
            
        }
    }
    
    path += "l0,-60";
    console.log("path: " , path);
    path_element.setAttribute("d", path)
    // console.log("L+x: " , length + offset);
    
    console.log("N: ",ridges);
    //l=0, t=0, d=0, dist=0, off=0, qr=0, qp=0, gl=0, mb=null)
    console.log("odstęp: ",distance);
}
function saveData() {
    let bit = MILL_BITS.get("convex-6mm"); // .get(document.getElementById("input__mill-bit").value);
    let thickness = Number(document.getElementById("input__thickness").value);
    let depth = Number(document.getElementById("input__depth").value);
    let length = Number(document.getElementById("input__length").value);
    let distance = Number(document.getElementById("input__distance").value);
    let offset = Number(document.getElementById("input__offset").value);
    let groove_len = Number(document.getElementById("input__groove-len").value);
    let passes = Number(document.getElementById("input__qt-ridges").value) + 1;
    let saveName = document.getElementById("input__save").value;
    if (saveName == "") {
        alert("Podaj nazwę profilu!");
        return;        
    }
    const pattern = new PATTERN(saveName, length, thickness, depth, distance, offset, passes, groove_len, bit)

    savePattern(pattern);
}
function savePattern(pattern) {
    const patterns = JSON.parse(sessionStorage.getItem(`patterns`)) || new Array();
    let thereExists = false;
    for (let i = 0; i < patterns.length; i++) {
        if(patterns[i]._id == pattern.id) {
            thereExists = true;
            patterns[i] = pattern; 
            break;
        };
    }
    if(!thereExists) {
        patterns.push(pattern);
    }

    sessionStorage.setItem("patterns", JSON.stringify(patterns));
}