import React from "react";

const Tag = (props) => { 

    
    return (
        <div style={backgroundColor="pink"}>
            <p>{props.tag}</p>
            <button>X</button>
        </div>
    );
} 

export default Tag;