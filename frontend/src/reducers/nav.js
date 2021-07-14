const navReducer = (state=false, action) => {
    switch(action.type){
        case "nav/HIDE":
            return {
                active:false
            }
        case "nav/SHOW":
            return {
                active:true
            }
        default:
            return state
    }
}

export default navReducer;