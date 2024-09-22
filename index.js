const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const combineReducers = redux.combineReducers

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

//ordering_cake
function orderCake(){
    return {
        type:CAKE_ORDERED,
        quantity:1
    }
}

//restocking_cake
function restockCake(qty = 1){
    return {
        type:CAKE_RESTOCKED,
        quantity:qty

    }
}

//
function orderIceCream(){
    return {
        type:ICECREAM_ORDERED,
        quantity:1
    }
}
function restockIceCream(qty = 1){
    return {
        type:ICECREAM_RESTOCKED,
        quantity:qty
    }
}


//reducer = (previousState,action)=>newState


// const initialState = {
//     numberOfCakes : 10,
//     numberOfIceCreams : 25,
//     anotherProperty :1
// }


const cakeState = {
    numberOfCakes :10
}

const iceCreamState = {
    numberOfIceCreams:25
}

function cakeReducer(state = cakeState,action){
    switch(action.type){
        case CAKE_ORDERED: return { 
            //in a case where state object might have more properties, make a copy of it
            ...state,
            numberOfCakes:state.numberOfCakes -1
        }
        case CAKE_RESTOCKED:return{
            //in a case vendor restocks the cake
            ...state,
            numberOfCakes:state.numberOfCakes + action.quantity
        }
        default : return state
    }
}


function iceCreamReducer(state = iceCreamState,action){
    switch(action.type){
        case ICECREAM_ORDERED:return{
            ...state,
            numberOfIceCreams:state.numberOfIceCreams-1
        }
        case ICECREAM_RESTOCKED:return{
            ...state,
            numberOfIceCreams:state.numberOfIceCreams+action.quantity
        }
        default : return state
    }
}


const reducer = combineReducers({cake:cakeReducer,iceCream:iceCreamReducer})


const store = createStore(reducer) // first principle
console.log("initial state",store.getState());

const unsubscribe = store.subscribe(()=>{console.log("Current state",store.getState())});

// store.dispatch(orderCake()); 
// store.dispatch(orderCake()); 
// store.dispatch(orderCake()); 
// store.dispatch(orderCake()); 

// store.dispatch(restockCake(5));


//other way to do this is to use helper func -> bindActionCreators

const actions = bindActionCreators({orderCake,restockCake,orderIceCream,restockIceCream},store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(5);

actions.orderIceCream();
actions.restockIceCream(56);

unsubscribe();