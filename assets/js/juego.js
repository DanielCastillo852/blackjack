
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJug = 0;
let puntosPc = 0;

//Elementos html
const puntosHTML = document.querySelectorAll('small');
const divCartasJug = document.querySelector('#jugador-cartas');
const divCartasPc = document.querySelector('#computadora-cartas');
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

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
}
crearDeck();

const pedirCarta = () => {
    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
    (valor === 'A') ? 11:10
    : valor *1;
}
//turno de la computadora
const turnoPC = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosPc = puntosPc + valorCarta(carta);
        puntosHTML[1].innerText = puntosPc;    

        const imgCarta = document.createElement('img');
        imgCarta.src = `cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasPc.append( imgCarta );
        if(puntosMinimos > 21){
            break;
        }
    } while ( (puntosPc < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if(puntosPc === puntosMinimos){
            alert('Nadie gana');
        }else if( puntosMinimos > 21){
            alert('La pc gana');
        }else if( puntosPc > 21){
            alert('El usuario gana');
        }else{
            alert('PC gana');
        }
    }, 100);
    
}

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJug = puntosJug + valorCarta(carta);
    puntosHTML[0].innerText = puntosJug;    

    const imgCarta = document.createElement('img');
    imgCarta.src = `cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJug.append( imgCarta );
    if (puntosJug > 21){
        console.warn('PERDISTE');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoPC(puntosJug);
    } else if( puntosJug === 21){
        console.warn('Genial, ganaste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
})
btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoPC(puntosJug);
})
btnNuevo.addEventListener('click', ()=>{
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJug = 0;
    puntosPc = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divCartasJug.innerHTML = '';
    divCartasPc.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;


})
