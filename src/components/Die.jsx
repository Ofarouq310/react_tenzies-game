import React from 'react'

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white',
    }

  return (
    <div style={styles} className='dice' onClick={props.holdDice}>
        <h3>{props.value}</h3>
    </div>
  )
}
