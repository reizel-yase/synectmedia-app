import React from 'react';
import './App.css';
import { API, fetchInterval } from "./config"


const PausePlayButton = ({
  isPaused,
  onClick
}) => <button className={`playPauseBtn ${!isPaused && 'played'}`} onClick={onClick}>{isPaused ? "Play" : "Pause"}</button>

const Counter = ({
  counter,
  label
}) => <div className="counter">{label && `${label}: `}{counter}</div>

const ImgContainer = ({
  alt,
  url
}) => <img width="640" height="400" src={url} alt={alt} />

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url: undefined,
      isBtnPaused: true,
      counter: 0,
      duplicateCounter: 0,
      fetchIntervalId: null
    }

    this.fetchData = this.fetchData.bind(this)
    this.toggleImageDisplay = this.toggleImageDisplay.bind(this)
    this.callApi = this.callApi.bind(this)
  }

  componentDidUpdate() {
    const { isBtnPaused, fetchIntervalId } = this.state

    if (!isBtnPaused) {
      this.fetchData()
    } else {
      if (fetchIntervalId) {
        clearInterval(fetchIntervalId)

        this.setState({
          fetchIntervalId: null
        })
      }
    }
  }

  componentWillUnmount() {
    if (this.state.fetchIntervalId) {
      clearInterval(this.state.fetchIntervalId)
    }
  }

  async callApi() {
    const { counter, duplicateCounter, url, isBtnPaused, fetchIntervalId } = this.state

    if (!isBtnPaused) {
      try {
        const res = await fetch(API)
    
        if (res && res.ok && res.status === 200 && res.url) {
          this.setState({
            duplicateCounter: res.url === url ? duplicateCounter + 1 : 0,
            counter: counter + 1,
            url: res.url
          })
        }
      } catch(error) {
        console.log({error})

        if (fetchIntervalId) {
          clearInterval(fetchIntervalId)
        }
      }
    }
  }

  fetchData() {
    if (!this.state.fetchIntervalId) {
      const fetchIntervalId = setInterval(this.callApi, fetchInterval)

      if (!this.state.fetchIntervalId) {
        this.setState({
          fetchIntervalId
        })
      }
    }
  }

  toggleImageDisplay() {
   this.setState({
     isBtnPaused: !this.state.isBtnPaused
   }) 
  }

  render() {
    const { url, isBtnPaused, counter, duplicateCounter } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <div className="imgContainer">
            { url ? <ImgContainer url={url} alt="" /> : "URL is undefined" }
          </div>
          <PausePlayButton onClick={this.toggleImageDisplay} isPaused={isBtnPaused} />
          <Counter counter={counter} label="Image changed" />
          <Counter counter={duplicateCounter} label="Duplicate" />
        </header>
      </div>
    )
  }
}

