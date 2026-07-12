
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

const crearDeck = () => {
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push( i + tipo)
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck);
    console.log(deck);
}
crearDeck();

const pedirCarta = () => {
    const carta = deck.pop();
    console.log(deck);
    return carta;
}

//pedirCarta();
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
    (valor === 'A') ? 11:10
    : valor *1;
}
const valor = valorCarta( pedirCarta());
console.log(valor);