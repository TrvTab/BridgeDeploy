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
      command: 'add marker (called) :name at :min minute(s) (and) :sec second(s)',
      callback: (name, min, sec) => setMessage({request: 'addMarker', name: name.toLowerCase(), firstTimeStamp: 60 * parseInt(min) + parseInt(sec)})
    },
    {
      command: 'add loop (called) :name from :firstMin minute(s) (and) :firstSec second(s) until :secondMin minute(s) and :secondSec second(s)',
      callback: (name, firstMin, firstSec, secondMin, secondSec) => 
          setMessage({request: 'addLoop', name: name.toLowerCase(), firstTimeStamp: 60 * parseInt(firstMin) + parseInt(firstSec), secondTimeStamp: 60 * parseInt(secondMin) + parseInt(secondSec)})
    },
    {
      command: 'create marker (called) :name at :min minute(s) (and) :sec second(s)',
      callback: (name, min, sec) => setMessage({request: 'addMarker', name: name.toLowerCase(), firstTimeStamp: 60 * parseInt(min) + parseInt(sec)})
    },
    {
      command: 'create loop (called) :name from :firstMin minute(s) (and) :firstSec second(s) until :secondMin minute(s) (and) :secondSec second(s)',
      callback: (name, firstMin, firstSec, secondMin, secondSec) => 
          setMessage({request: 'addLoop', name: name.toLowerCase(), firstTimeStamp: 60 * parseInt(firstMin)+ parseInt(firstSec), secondTimeStamp: 60 * parseInt(secondMin) + parseInt(secondSec)})
    },
    //Delete marker and loop 
    {
      command: 'delete marker (called) :name',
      callback: (name) => 
          setMessage({request: 'delMarker', name: name.toLowerCase()})
    },
    {
      command: 'delete loop (called) :name',
      callback: (name) => 
          setMessage({request: 'delLoop', name: name.toLowerCase()})
    },
    {
      command: 'remove marker (called) :name',
      callback: (name) => 
          setMessage({request: 'delMarker', name: name.toLowerCase()})
    },
    {
      command: 'remove loop (called) :name',
      callback: (name) => 
          setMessage({request: 'delLoop', name: name.toLowerCase()})
    },
    {
      command: 'skip forward(s)',
      callback: () =>
          setMessage({request: 'skipFwd'})
    },
    {
      command: 'skip backward(s)',
      callback: () =>
          setMessage({request: 'skipBwd'})
    },
    {
      command: 'restart',
      callback: () =>
          setMessage({request: 'restart'})
    },
    {
      command: 'go to marker (called) :name',
      callback:(name) => setMessage({request: 'goToMarker', name: name.toLowerCase()})
    },
    {
      command: 'go to loop (called) :name',
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
    console.log("SJDSJDJJDJSDJS")
    console.log(message)
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
      <button onClick={SpeechRecognition.startListening}>Start Mic Rec.</button>
      <button onClick={SpeechRecognition.stopListening}>Stop Mic</button>
      <button onClick={resetTranscript}>Reset Mic Text</button>
      <p>{transcript}</p>
       
    
    </div>

  );
};
export default Dictaphone;