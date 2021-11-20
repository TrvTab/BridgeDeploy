/*
The MIT License
Copyright © Pete Cook http://cookpete.com
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Dictaphone from '../dictaphone'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './player.css'

import { updateAndNotify } from 'react'



import { version } from '../../../package.json'
import ReactPlayer from 'react-player/lazy'
import Duration from './duration'

class Player extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    dictaphoneData: [],
    inLoop: false
  }

  vocalSkipForward(time){
    this.player.seekTo(this.player.getCurrentTime() + time, "seconds")
  }
  vocalSkipBackwards(time){
    this.player.seekTo(this.player.getCurrentTime() - time, "seconds")
  }

  vocalPassInfoToApp(commandData) {
    this.props.onCommandChange(commandData)
  }

  vocalRestart(){
    this.player.seekTo(0, "seconds")
  }

  vocalExitLoop() {
    this.setState({inLoop: false})
  }

  // add if statements for 
  handleDictaphoneData = (childData) => {
    this.setState(() => {
      return {
        dictaphoneData: childData
      }
    })
    if (childData.request === "skipFwd") this.vocalSkipForward(15);
    else if (childData.request === "skipBwd") this.vocalSkipBackwards(15);
    else if (childData.request === "restart") this.vocalRestart();
    else if (childData.request === "exitLoop") this.vocalExitLoop();
    else if (childData.request === "addMarker") this.vocalPassInfoToApp(childData);
    else if (childData.request === "addLoop") this.vocalPassInfoToApp(childData)
    else if (childData.request === 'delMarker') this.vocalPassInfoToApp(childData)
    else if (childData.request === "delLoop") this.vocalPassInfoToApp(childData);
    else if (childData.request === "restart") this.vocalPassInfoToApp(childData);
    else if (childData.request === "goToMarker") this.vocalPassInfoToApp(childData)
    else if (childData.request === "goToLoop") this.vocalPassInfoToApp(childData)
    
  }
  

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleToggleLight = () => {
    this.setState({ light: !this.state.light })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleOnPlaybackRateChange = (speed) => {
    this.setState({ playbackRate: parseFloat(speed) })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handleEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleSkipForwardClick= e => {
    this.player.seekTo(this.player.getCurrentTime() + parseInt(e.target.value), "seconds")
  }

  handleSkipBackwardClick = e => {
    console.log(e)
    this.player.seekTo(this.player.getCurrentTime() - parseInt(e.target.value), "seconds")
  }

  handleProgress = state => {
   // console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  convertToSeconds(time) {
    let arr = time.split(":")
    var [minutes, seconds] = arr;
    var totalSeconds = parseInt(minutes) * 60
    totalSeconds += parseInt(seconds)
    return totalSeconds
  }

  

  ref = player => {
    this.player = player
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reply !== this.props.reply) {
      if (this.props.reply.request === "goToMarker"){
        this.player.seekTo(this.convertToSeconds(this.props.reply.time), "seconds")
      }
      else if (this.props.reply.request === "goToLoop") {
        this.setState({inLoop: true})
        console.log(this.state.inLoop)
        this.player.seekTo(this.convertToSeconds(this.props.reply.startTime), "seconds")
        
        while (this.state.inLoop) {
          console.log("inloop")
          if (this.player.getCurrentTime() >= this.convertToSeconds(this.props.reply.endTime)){
            this.player.seekTo(this.convertToSeconds(this.props.reply.startTime), "seconds")
          }
        }
      }
    }

  }

  render () {
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip, dictaphoneData, inLoop } = this.state
    const SEPARATOR = ' · '

    return (
      
      <div className='app'>
        <section className='section'>
          <h1>Bridge</h1>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.handlePlay}
              onEnablePIP={this.handleEnablePIP}
              onDisablePIP={this.handleDisablePIP}
              onPause={this.handlePause}
              onBuffer={() => console.log('onBuffer')}
              onPlaybackRateChange={this.handleOnPlaybackRateChange}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.handleEnded}
              onError={e => console.log('onError', e)}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
          </div>
          
          

          <Container>
            <Row >
              <Col lg={true} md={8}><input
                      type='range' min={0} max={0.999999} step='any' style={{width: "700px"}}
                      value={played}
                      onMouseDown={this.handleSeekMouseDown}
                      onChange={this.handleSeekChange}
                      onMouseUp={this.handleSeekMouseUp}
                    />
              </Col>
            </Row>
            <Row>
              <Col>
              <button className="controlButton" onClick={this.vocalRestart} value={15}>Restart</button>
              <button className="controlButton"  onClick={this.handleSkipBackwardClick} value={15}>Rewind 15s</button>
              <button className="controlButton"  onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
              <button className="controlButton"  onClick={this.handleSkipForwardClick} value={15}>Skip 15s</button>
              <select className="controlButton"  onChange={this.handleSetPlaybackRate} name="playback speed" id="playbackSpeed" >
                <option value={0.25}>0.25x</option>
                <option value={0.50}>0.50x</option>
                <option value={0.75}>0.75x</option>
                <option selected="selected" value={1.00}>1.00x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.50}>1.50x</option>
                <option value={1.75}>1.75x</option>
              </select>
              
              <div style={{marginTop: 15}}>
              <input id="volume" name="volume" type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange}  />
              <label for="volume">Volume</label>
              </div>

              </Col>
            </Row>
          </Container>
         
                
                  <label style={{marginRight: 10}}for="customUrl"> New Url </label>
                  <input id="customUrl" ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
                  <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
               

          <Dictaphone sendToPlayer={this.handleDictaphoneData}/>

          
        </section>
        <footer className='footer'>
         
        </footer>
      </div>
    )
  }
}

export default Player;