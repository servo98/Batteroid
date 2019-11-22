export function car2iso(){
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