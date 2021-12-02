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

function LoopForm({ submitLoop, onCancelLoop }) {
  const [title, setTitle] = useState();
  const [colour, setColour] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {

    if(validateName()){
      submitLoop(title, colour, startTime, endTime);
    }
    e.preventDefault();
  };

  const handleCancelLoop = () => {
    onCancelLoop();
  };

  const validateName = () => {
    let invalidSubstrings = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "+",
    ];
    if (title === "") {
      setErrorMsg("Please provide a non-empty loop name");
      return false;
    } else if (invalidSubstrings.some(str => title.includes(str))){
      setErrorMsg("Invalid character included");
      return false;
    } else {
      setErrorMsg("")
      return true;
    }
  };

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
        <Toast show={errorMsg !== ""}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{errorMsg}</Toast.Body>
        </Toast>
      </Row>
    </Form>
  );
}
export default LoopForm;
