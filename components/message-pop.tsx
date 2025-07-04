
export function MessagePop({type,message}:{type:"good"|"warning"|"error",message:string}){
    let bgcolor = ""
    let txtcolor = ""
    switch (type) {
        case "good":
            bgcolor = "#e4ffe5"
            txtcolor = "rgb(36, 225, 36)"
            break;
        case "error":
            bgcolor = "#ffe4e4"
            txtcolor = "rgb(255, 40, 40)"
            break;
        case "warning":
            bgcolor = "#fff5e4"
            txtcolor = "rgb(255, 160, 35)"
            break;
        default:
            break;
    }
    return(
        
        <div style={{backgroundColor:bgcolor,borderLeft:`2px solid ${txtcolor}`}} className="pop-down" >
            <p style={{color:txtcolor}} >{message}</p>
        </div>
    )
}

