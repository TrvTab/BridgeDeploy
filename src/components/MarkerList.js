import { useState, useEffect} from 'react'
import Marker from './Marker'
import MarkerForm from './MarkerForm'
import {Button, Container, Stack, Row, Col, CloseButton, Text, Form} from 'react-bootstrap';


function MarkerList(props){
    const [markerItems, setMarkerItems] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [goToMarkerDest, setGoToMarkerDest] = useState("")

    const handleCancelMarker = () => {
        setShowForm(false);
    }

    const convertToMinutes = time => {
      let minutes = parseInt(time/60)
      let seconds = (Math.round(60*((time/60) - minutes))).toString()
      if (seconds.length === 1) {
        seconds = "0" + seconds
      }
      return minutes + ":" + seconds
    }
    
    const convertToSeconds = (time) => {
      let arr = time.split(":")
      var [minutes, seconds] = arr;
      var totalSeconds = parseInt(minutes) * 60
      totalSeconds += parseInt(seconds)
      return totalSeconds
    }

    const handleRemove = (key) => {
        setMarkerItems(markerItems => markerItems.filter((item) => item.key !== key))
    }

    const submitMarker = (title, colour, time) => {
        setShowForm(false)
        setMarkerItems(markerItems => [...markerItems,
        <li list-style="none" key={title}>
            <Row>
                <Marker title={title} colour={colour} time={time} onMarkerClicked={(key) => handleMarkerClicked(key)}></Marker>
                <CloseButton onClick={() => handleRemove(title)}></CloseButton>
            </Row>
        </li>])
    }

    const handleMarkerClicked = (key) => {
      setGoToMarkerDest(key)
    }

    const handleGoToMarker = (key,request) => {
      console.log(markerItems);
      let foundItem = markerItems.find(item => item.key === key).props.children.props.children[0].props
      let timeSeconds = convertToSeconds(foundItem.time)
      let foundItemCopy =  Object.assign({request: request}, foundItem)
      foundItemCopy.time = timeSeconds
      props.onFoundTimeElement(foundItemCopy);
    }

    useEffect(()=> {
      if(goToMarkerDest)
      handleGoToMarker(goToMarkerDest, "goToMarker");
    }, [goToMarkerDest])


    useEffect(() => {
      if (props.commandInformation.request.includes("loop")) return;
      else if (props.commandInformation.request === "addMarker"){
       submitMarker(props.commandInformation.name, "colour", convertToMinutes(props.commandInformation.firstTimeStamp));
      } else if (props.commandInformation.request === "delMarker"){
        handleRemove(props.commandInformation.name)
      } else if (props.commandInformation.request === "goToMarker"){
          handleGoToMarker(props.commandInformation.name, props.commandInformation.request);       
      } 
    }, [props.commandInformation])

    const addMarker = () => {
        setShowForm(true)
    }
    
    console.log("test")
    return (
      <div style={{height: 70, width: 300, float:'right'}}>
      <Container>
        {!showForm && (
          <ul>
            {markerItems}
            <Button onClick={addMarker}>Add Marker</Button>
          </ul>
        )}
        {showForm && (
            <div style={{marginTop: 20}}>
                <MarkerForm submitMarker={submitMarker} onCancelMarker={handleCancelMarker}></MarkerForm>
            </div>
        )}

      </Container>
      </div>
    );
}
export default MarkerList;