import React from 'react'

function Input(props) {
    const { eventFunction, id, classname, placeholder } = props;
    return (
        <input type="text" id={id} onChange={eventFunction} autoComplete="off" className={classname} placeholder={placeholder}/>
    )
}
export default Input