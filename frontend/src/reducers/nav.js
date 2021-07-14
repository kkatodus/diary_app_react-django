const navReducer = (state=true, action) => {
    switch(action.type){
        case "nav/HIDE":
            return false
        case "nav/SHOW":
            return true
        default:
            return state
    }
}

export default navReducer;