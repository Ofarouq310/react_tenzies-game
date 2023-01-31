import React from 'react'

export default function Counter(props) {
  return (
      <div className='game--counter'>
          {
          props.count > 0 && props.count} {props.count === 0 
          ? <span>No rolls yet</span>
          : <span>Roll{props.count > 1 && 's'}</span>
          }
      </div>
      )
    }
