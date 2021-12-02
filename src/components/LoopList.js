import { useState, useEffect} from 'react'
import Loop from './Loop'
import LoopForm from './LoopForm'
import {Button, Container, Stack, Row, Col, CloseButton, Text, Form, Toast} from 'react-bootstrap';
import {convertToMinutes, convertToSeconds, between, validateName } from "../Utils"
import testUtils from 'react-dom/test-utils';

function LoopList(props){
    const [loopItems, setLoopItems] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [goToLoopDest, setGoToLoopDest] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

   

    const handleRemove = (key) => {
        console.log("TEEEEST", key)
        setLoopItems(loopItems => loopItems.filter((item) => item.key !== key))
    }
    
    const submitLoop = (title, colour, startTime, endTime) => {
        let returnedErrorMessage = validateName(title, loopItems);
        setErrorMessage(returnedErrorMessage)
        if(!returnedErrorMessage){
          setShowForm(false)
          setLoopItems(loopItems => [...loopItems,
          <li list-style="none" key={title}>
              <Row>
                  <Loop title={title} colour={colour} startTime={startTime} endTime={endTime} onLoopClicked={(key) => handleLoopClicked(key)}></Loop>
                  <CloseButton onClick={() => handleRemove(title)}></CloseButton>
              </Row>
          </li>])
        }

    }

  

    const handleLoopClicked = (key) => {
      // console.log("LOOP??")
      // setLoopItems(loopItems => loopItems.map(item => {
      //   if(item.key!== key)
      //     console.log("HELLO")
      // }));
      setGoToLoopDest(key);
    }


    const handleCancelLoop = () => {
      setErrorMessage("");
      setShowForm(false);
  }

    const handleGoToLoop = (key,request) => {
      let foundItem = loopItems.find(item => item.key === key).props.children.props.children[0].props
      let startTimeSeconds = convertToSeconds(foundItem.startTime)
      let endTimeSeconds = convertToSeconds(foundItem.endTime)
      
      let foundItemCopy =  Object.assign({request: request}, foundItem)
      foundItemCopy.startTime = startTimeSeconds
      foundItemCopy.endTime = endTimeSeconds
      props.onFoundTimeElement(foundItemCopy);
    }

    useEffect(() => {
      if(goToLoopDest){
        handleGoToLoop(goToLoopDest, "goToLoop");
      }
    }, [goToLoopDest])

    const validateAddLoop = (commandData) => {
      if (!between(commandData.firstTimeStamp, 0, commandData.duration)
        || !between(commandData.secondTimeStamp, 0, commandData.duration)) {
        setErrorMessage("Loop exceeds video limits")
        return false
      }
      let duplicate = loopItems.find(element => commandData.name === element.key)
      if (duplicate) {
        return false
      }
      return true
    }

    const validateLoopPresent = (commandData) => {
      let found = loopItems.find(element => commandData.name === element.key)
      if (!found){
        setErrorMessage(`Loop with name ${commandData.name} does not exist`)
      }
      return found
    }

    useEffect(() => {
      if (props.commandInformation.request.includes("marker")){
        return;
      } 
      else if (props.commandInformation.request === "addLoop"){
        if (validateAddLoop(props.commandInformation)) {
          submitLoop(props.commandInformation.name, "colour",  convertToMinutes(props.commandInformation.firstTimeStamp),  convertToMinutes(props.commandInformation.secondTimeStamp))
        }
      }
       else if (props.commandInformation.request === "delLoop"){
        if (validateLoopPresent(props.commandInformation)){
          handleRemove(props.commandInformation.name)
        }
      }
      else if (props.commandInformation.request === "goToLoop") {
        if (validateLoopPresent(props.commandInformation)){
          handleGoToLoop(props.commandInformation.name, props.commandInformation.request)
        }

      }
      return () => {
      }
    }, [props.commandInformation])

    

    const addLoop = () => {
        setShowForm(true)
    }

    return (
      <div style={{height: 80, width:300, float:'left'}}>
      <Container>
        {!showForm && (
          <ul>
            {loopItems}
            <Button onClick={addLoop}>Add Loop</Button>
          </ul>
        )}
        {showForm && (
            <div>
                <LoopForm errorMessage={errorMessage} submitLoop={submitLoop} onCancelLoop={handleCancelLoop}></LoopForm>
            </div>
        )}
        
      </Container>
      </div>
    );
}
export default LoopList;