import { useState, useEffect} from 'react'
import {Button, Container, Stack, Row, Col, CloseButton} from 'react-bootstrap';
import Circle from 'react-color'
import { CirclePicker } from 'react-color'

function Loop(props){
    const [title, setTitle] = useState(props.title);
    const [colour, setColour] = useState(props.colour);
    const [startTime, setStartTime] = useState(props.startTime);
    const [endTime, setEndTime] = useState(props.endTime);

    return (

        <Container >
                <Row>
                    <span>{colour}</span>
                    <Col>
                    <span>{title}</span>
                    <span> {startTime} {endTime}</span>
                    </Col>

                </Row>

        </Container>
    );
}
export default Loop;