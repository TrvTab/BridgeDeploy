import { useState, useEffect} from 'react'
import Marker from './Marker'
import MarkerForm from './MarkerForm'
import {Button, Container, Stack, Row, Col, CloseButton, Text, Form} from 'react-bootstrap';


function MarkerList(props){
    const [markerItems, setMarkerItems] = useState([])
    const [showForm, setShowForm] = useState(false)

    const handleCancelMarker = () => {
        setShowForm(false);
    }


    const handleRemove = (key) => {
        setMarkerItems(markerItems => markerItems.filter((item) => item.key !== key))
    }

    const submitMarker = (title, colour, time) => {
        setShowForm(false)
        setMarkerItems(markerItems => [...markerItems,
        <li list-style="none" key={title}>
            <Row>
                <Marker title={title} colour={colour} time={time}></Marker>
                <CloseButton onClick={() => handleRemove(title)}></CloseButton>
            </Row>
        </li>])
    }

    const handleGoToMarker = (key,request) => {
      let foundItem = markerItems.find(item => item.key === key).props.children.props.children[0].props
      let foundItemCopy =  Object.assign({request: request}, foundItem)
      props.onFoundTimeElement(foundItemCopy);
    }

    useEffect(() => {
      if (props.commandInformation.request.includes("loop")) return;
      else if (props.commandInformation.request === "addMarker"){
       submitMarker(props.commandInformation.name, "colour", props.commandInformation.firstTimeStamp);
      } else if (props.commandInformation.request === "delMarker"){
        handleRemove(props.commandInformation.name)
      } else if (props.commandInformation.request === "goToMarker"){
          handleGoToMarker(props.commandInformation.name, props.commandInformation.request);       
      } 
    }, [props.commandInformation])

    const addMarker = () => {
        setShowForm(true)
    }
    

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