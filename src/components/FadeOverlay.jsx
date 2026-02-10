import React from 'react'

const FadeOverlay = ({active}) => {
  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        pointerEvents: 'none',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        zIndex: 9999
    }}/>
  )
}

export default FadeOverlay