import React, { useState, useEffect } from "react";
import { set } from "mongoose";

export default function Hooks() {
    const [count, setcount] = useState(10);

    useEffect(()=>{
        document.title = `you clicked ${count} times`;
    })

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>setcount(count + 10)}>
                click me
            </button>
        </div>
        )
}