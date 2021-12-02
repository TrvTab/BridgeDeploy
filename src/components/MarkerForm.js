import { useState, useEffect} from 'react'
import Marker from './Marker'
import {Button, Container, Stack, Row, Col, CloseButton, Text, Form, Toast} from 'react-bootstrap';


function MarkerForm({submitMarker, onCancelMarker, errorMessage}){

  const [title, setTitle] = useState();
  const [colour, setColour] = useState();
  const [time, setTime] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit= (e) => {
    if(errorMessage){
      setShowErrorMessage(true);
    }
    submitMarker(title, colour, time)
    e.preventDefault();

  }

    const handleCancelMarker = () => {
        onCancelMarker();
    }

    useEffect(() => {
      if(errorMessage){
        setShowErrorMessage(true);
      }
    }, [errorMessage]);
    
  return(
        <Form onSubmit={e => { handleSubmit(e) }}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Guitar, Drop..."
              name='title'
              type='text'
              value={title} 
              onChange={ e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Time</Form.Label>
              <Form.Control
                name='time'
                type='text'
                value={time} 
                onChange={ e => setTime(e.target.value)}
              />
            </Form.Group>  
                <Button className="custom-btn" type='submit'>Submit Marker</Button>
                <Button className="custom-btn" onClick={handleCancelMarker}>Cancel </Button>
          </Row>
          <Toast onClose={() => setShowErrorMessage(false)} show={showErrorMessage} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error Message</strong>
          </Toast.Header>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
        </Form>
  );
}
export default MarkerForm;
       
       
