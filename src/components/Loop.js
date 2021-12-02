import { useState, useEffect} from 'react'
import {Button, Container, Stack, Row, Col, CloseButton, ToggleButton} from 'react-bootstrap';
import Circle from 'react-color'
import { CirclePicker } from 'react-color'

function Loop(props){
    const [title, setTitle] = useState(props.title);
    const [colour, setColour] = useState(props.colour);
    const [startTime, setStartTime] = useState(props.startTime);
    const [endTime, setEndTime] = useState(props.endTime);
    const [inUse, setInUse] = useState(false)

    return (

        <Container >
                <ToggleButton checked={inUse} type="checkbox" variant="outline-primary" onClick={() => {
                        if (!inUse){
                            setInUse(true)
                            props.onLoopClicked(title)
                        } else {
                            console.log("EXIT LOOP HERE USING CONTEXTAPI OR SOME SHIT")
                            setInUse(false)
                        }}}>
                    <span>{colour}</span>
                    <Col>
                    <span>{title}</span>
                    <span> {startTime} {endTime}</span>
                    </Col>

                </ToggleButton>

        </Container>
    );
}
export default Loop;