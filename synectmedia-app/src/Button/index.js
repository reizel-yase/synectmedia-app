import React from 'react'
import './Button.css'

const Button = ({
  isPaused,
  onClick
}) => <button className={`playPauseBtn ${!isPaused && 'played'}`} onClick={onClick}>{isPaused ? "Play" : "Pause"}</button>

export default Button