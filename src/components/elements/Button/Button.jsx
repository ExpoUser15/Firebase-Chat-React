import React from 'react'

function Button(props) {
    const { eventFunction, classname, children } = props;
  return (
    <button className={classname} onClick={eventFunction}>
        { children }
    </button>
  )
}

export default Button