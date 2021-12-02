import { useState, useEffect } from "react";
import Loop from "./Loop";
import {
  Button,
  Container,
  Stack,
  Row,
  Col,
  CloseButton,
  Text,
  Form,
  Toast,
} from "react-bootstrap";

function LoopForm({submitLoop, onCancelLoop, errorMessage}) {
  const [title, setTitle] = useState();
  const [colour, setColour] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const handleSubmit = (e) => {
    if(errorMessage){
      setShowErrorMessage(true);
    }
    submitLoop(title, colour, startTime, endTime);
    e.preventDefault();
  };

  const handleCancelLoop = () => {
    onCancelLoop();
  };

  useEffect(() => {
    if(errorMessage){
      setShowErrorMessage(true);
    }
  }, [errorMessage]);
  
  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="Rift, Solo..."
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            name="startTime"
            type="text"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            name="endTime"
            type="text"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Submit Loop</Button>
        <Button onClick={handleCancelLoop}>Cancel</Button>
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
      </Row>
    </Form>
  );
}
export default LoopForm;
