//import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState, useEffect } from 'react'


function Dictaphone(props) {

  const [message, setMessage] = useState({
    request: '',
    name: '',
    firstTimeStamp: '',
    secondTimeStamp: ''
  })

  const commands = [

    //Add marker and loop with name
    {
      command: 'add marker called :name at :min minutes and :sec seconds',
      callback: (name, min, sec) => setMessage({request: 'addMarker', name: name.toLowerCase(), firstTimeStamp: (min + ":" + (sec.length===1 ? "0" + sec : sec))})
    },
    {
      command: 'Add loop called :name from :firstMin minutes and :firstSec seconds until :secondMin minutes and :secondSec seconds',
      callback: (name, firstMin, firstSec, secondMin, secondSec) => 
          setMessage({request: 'addLoop', name: name.toLowerCase(), firstTimeStamp: (firstMin + ":" + (firstSec.length===1 ? "0" + firstSec : firstSec)), secondTimeStamp: (secondMin + ":" + (secondSec.length===1 ? "0" + secondSec : secondSec))})
    },
    //Delete marker and loop 
    {
      command: 'Delete marker called :name',
      callback: (name) => 
          setMessage({request: 'delMarker', name: name.toLowerCase()})
    },
    {
      command: 'Delete loop called :name',
      callback: (name) => 
          setMessage({request: 'delLoop', name: name.toLowerCase()})
    },
    {
      command: 'skip forward',
      callback: () =>
          setMessage({request: 'skipFwd'})
    },
    {
      command: 'skip backwards',
      callback: () =>
          setMessage({request: 'skipBwd'})
    },
    {
      command: 'restart',
      callback: () =>
          setMessage({request: 'restart'})
    },
    {
      command: 'go to marker :name',
      callback:(name) => setMessage({request: 'goToMarker', name: name.toLowerCase()})
    },
    {
      command: 'go to loop :name',
      callback:(name) => setMessage({request: 'goToLoop', name: name.toLowerCase()})
    },
    {
      command: 'exit loop',
      callback: () => setMessage({request: "exitLoop"})
    },
    {
      command: 'pause',
      callback: () => setMessage({request: 'pause'})
    },
    {
      command: 'play',
      callback: () => setMessage({request: 'play'})
    }

  ]

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});
  
  
  function handleTranscriptChange(event){
    console.log(event.target.value)
  }

  // Everytime message is updated, reset it and send data to parent
  useEffect(() => {
    props.sendToPlayer(message)
    resetTranscript()

    return () => {
      resetTranscript()
    }
  }, [message])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;