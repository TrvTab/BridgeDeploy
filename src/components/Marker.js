import { useState, useEffect} from 'react'
import {Button, Container, Stack, Row, Col, CloseButton} from 'react-bootstrap';
import Circle from 'react-color'
import { CirclePicker } from 'react-color'

function Marker(props){
    const [title, setTitle] = useState(props.title);
    const [colour, setColour] = useState(props.colour);
    const [time, setTime] = useState(props.time);

    return (

        <Container >
                <Row onClick={() => props.onMarkerClicked(title)}>
                    <span>{colour}</span>
                    <Col>
                    <span>{title}</span>
                    <span> {time}</span>
                    </Col>

                </Row>

        </Container>
    );
}
export default Marker;