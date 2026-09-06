import React from "react";

export default function FlexibleFrame({img, alt="img"}){
    return (
        <div style={{width: "100%", position: "relative", paddingTop:"133.33%"}}>
            <img style={{position:"absolute", width: "100%", height:"100%", objectFit:"cover", inset: 0}} src={img} alt={alt} />
        </div>
    )
}