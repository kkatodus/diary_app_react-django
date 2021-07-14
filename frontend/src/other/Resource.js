import {AiOutlineHome} from "react-icons/ai"
import {BsBook} from "react-icons/bs"

export const mapState2Props = state => ({
    nav_active:state.nav_active,
})

export const navData = [
    {
        title:"HOME",
        link:"/",
        icon:<AiOutlineHome className="nav-icon"/>

    },
    {
        title:"DIARIES",
        link:"/diaries",
        icon:<BsBook className="nav-icon"/>
    }
]