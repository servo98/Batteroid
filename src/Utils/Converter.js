export function car2iso(x, y){
    return {
        x: x + (2*y),
        y: (2*y) - x
    };
}

export function iso2car(x, y) {
    return {
        x: (x - y)/2,
        y: (x + y) / 4
    };
}

export function rad2deg(rad) {
    return rad*180/Math.PI
}

export function deg2rad(deg) {
    return deg*Math.PI/180
}