import loadingSvg from "../../assets/Loading.svg"
import runningSonic from "../../assets/runninSonic.gif"

export default function Loading (){
    return(
        <div>
            <img src={loadingSvg} alt="" />
            <img src={runningSonic} alt="" />
        </div>
    )
}
