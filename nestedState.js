const redux = require('redux')
const produce = require('immer').produce /// for managing large nested states
const UPDATE_STREET = 'UPDATE_STREET'

const userState = {
    name:"Mayank",
    address:{
        street:"121/B-23",
        lane:"Civil,LA"
    }
}

function updateStreet(street){
    return{
        type:UPDATE_STREET,
        payload:street
    }
}

function userReducer(state=userState,action){
    switch(action.type){
        case UPDATE_STREET:
        //     return{
        //     ...userState,
        //     address:{
        //         ...userState.address,
        //         street:action.payload
        //     }
        //  }
        return produce(state,(draft)=>{
            draft.address.street = action.payload
        })
        default:return state
    }
}

const store = redux.createStore(userReducer)
console.log("Initial state",store.getState());
const unsubscribe = store.subscribe(()=>{console.log(" state",store.getState())});

store.dispatch(updateStreet("C/20,SHIV CHOWK"));
unsubscribe();
