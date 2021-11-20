import { useState, useEffect} from 'react'
import Loop from './Loop'
import {Button, Container, Stack, Row, Col, CloseButton, Text, Form} from 'react-bootstrap';


function LoopForm({submitLoop, onCancelLoop}){

  const [title, setTitle] = useState();
  const [colour, setColour] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const handleSubmit= (e) => {
    submitLoop(title, colour, startTime, endTime)
    e.preventDefault();

  }

  const handleCancelLoop = () => {
    onCancelLoop();
}


  return(
        <Form onSubmit={e => { handleSubmit(e) }}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Rift, Solo..."
              name='title'
              type='text'
              value={title} 
              onChange={ e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                name='startTime'
                type='text'
                value={startTime} 
                onChange={ e => setStartTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                name='endTime'
                type='text'
                value={endTime} 
                onChange={ e => setEndTime(e.target.value)}
              />
            </Form.Group>
            <Button type='submit'>Submit Loop</Button>
            <Button onClick={handleCancelLoop}>Cancel</Button>
          </Row>
        </Form>
  );
}
export default LoopForm;
       
       
