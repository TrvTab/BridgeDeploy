import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Dictaphone from '../dictaphone'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { updateAndNotify } from 'react'


// import { hot } from 'react-hot-loader'
//full from 'screenfull'

// import './reset.css'
// import './defaults.css'
// import './range.css'
// import './App.css'

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
            <Row>
              <Col><input
                      type='range' min={0} max={0.999999} step='any'
                      value={played}
                      onMouseDown={this.handleSeekMouseDown}
                      onChange={this.handleSeekChange}
                      onMouseUp={this.handleSeekMouseUp}
                    />
              </Col>
            </Row>
            <Row>
              <Col>
              <button onClick={this.handleSkipBackwardClick} value={15}>Rewind 15s</button>
              <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
              <button onClick={this.handleSkipForwardClick} value={15}>Skip 15s</button>

              <select onChange={this.handleSetPlaybackRate} name="playback speed" id="playbackSpeed" >
                <option value={0.25}>0.25x</option>
                <option value={0.50}>0.50x</option>
                <option value={0.75}>0.75x</option>
                <option selected="selected" value={1.00}>1.00x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.50}>1.50x</option>
                <option value={1.75}>1.75x</option>
              </select>
              <input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />

              </Col>
            </Row>
          </Container>
          <table>
            <tbody>
              <tr>
                <th>Controls</th>
                <td>
                  <button onClick={this.handleStop}>Stop</button>
                  <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
                  {light &&
                    <button onClick={() => this.player.showPreview()}>Show preview</button>}
                  {ReactPlayer.canEnablePIP(url) &&
                    <button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>}
                </td>
              </tr>
              <tr>
                <th>Speed</th>
                <td>
                  <button onClick={this.handleSetPlaybackRate} value={.25}>.25x</button>
                  <button onClick={this.handleSetPlaybackRate} value={.5}>.5x</button>
                  <button onClick={this.handleSetPlaybackRate} value={.75}>.75x</button>
                  <button onClick={this.handleSetPlaybackRate} value={1}>1x</button>
                  <button onClick={this.handleSetPlaybackRate} value={1.5}>1.5x</button>
                  <button onClick={this.handleSetPlaybackRate} value={2}>2x</button>
                </td>
              </tr>
              <tr>
                <th> Skip </th>
                <td>
                  <button onClick={this.handleSkipBackwardClick} value={15}>Rewind 15</button>
                  <button onClick={this.handleSkipForwardClick} value={15}>Skip 15</button>
                </td>
              </tr>
              <tr>
                <th>Seek</th>
                <td>
                  <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
                </td>
              </tr>
              <tr>
                <th>Volume</th>
                <td>
                  <input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='controls'>Controls</label>
                </th>
                <td>
                  <input id='controls' type='checkbox' checked={controls} onChange={this.handleToggleControls} />
                  <em>&nbsp; Requires player reload</em>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='muted'>Muted</label>
                </th>
                <td>
                  <input id='muted' type='checkbox' checked={muted} onChange={this.handleToggleMuted} />
                </td>
                <td>
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='loop'>Loop</label>
                </th>
                <td>
                  <input id='loop' type='checkbox' checked={loop} onChange={this.handleToggleLoop} />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='light'>Light mode</label>
                </th>
                <td>
                  <input id='light' type='checkbox' checked={light} onChange={this.handleToggleLight} />
                </td>
              </tr>
              <tr>
                <th>Played</th>
                <td><progress max={1} value={played} /></td>
              </tr>
              <tr>
                <th>Loaded</th>
                <td><progress max={1} value={loaded} /></td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className='section'>
          <table>
            <tbody>
              <tr>
                <th>YouTube</th>
                <td>
                  {this.renderLoadButton('https://www.youtube.com/watch?v=oUFJJNQGwhk', 'Test A')}
                  {this.renderLoadButton('https://www.youtube.com/watch?v=jNgP6d9HraI', 'Test B')}
                  {this.renderLoadButton('https://www.youtube.com/playlist?list=PLogRWNZ498ETeQNYrOlqikEML3bKJcdcx', 'Playlist')}
                </td>
              </tr>
              <tr>
                <th>Custom URL</th>
                <td>
                  <input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
                  <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
                </td>
              </tr>
            </tbody>
          </table>

          <Dictaphone sendToPlayer={this.handleDictaphoneData}/>

          
        </section>
        <footer className='footer'>
         
        </footer>
      </div>
    )
  }
}

export default Player;