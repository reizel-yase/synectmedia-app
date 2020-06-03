import React from 'react'
import './Counter.css'

const Counter = ({
  counter,
  label
}) => <div className="counter">{label && `${label}: `}{counter}</div>

export default Counter