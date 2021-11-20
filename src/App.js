import logo from './logo.svg';
import './App.css';
import Dictaphone from './components/dictaphone';
import Player from './components/players/player';
import LoopList from './components/LoopList.js'
import MarkerList from './components/MarkerList.js'
import {Row, Col, Modal, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react'
import InfoModal from './components/InfoModal.js'

function App() {
  
  const [command, setCommandState] = useState({
    request: '',
    name: '',
    firstTimeStamp: '',
    secondTimeStamp: ''
  })

  const [reply, setReplyState] = useState({
    request: '',
    name: '',
    firstTimeStamp: '',
    secondTimeStamp: ''
  })

  const [infoModalShow, setInfoModalShow] = useState(false);
  const handleInfoModalClose = () => setInfoModalShow(false);
  const handleInfoModalShow = () => setInfoModalShow(true);

  function handleFoundTimeElement(reply){
    setReplyState(reply);
  }

  function handleCommandChange(message){
    setCommandState(command => message)
  }
  return (
    <div className="App">
      
      <Button variant="primary" onClick={() => setInfoModalShow(true)}>
        Info
      </Button>
      <InfoModal
        show={infoModalShow}
        onHide={() => setInfoModalShow(false)}
      />
      <Row>
        <Col>
          <LoopList
            commandInformation={command}
            onFoundTimeElement={handleFoundTimeElement}
          ></LoopList>
        </Col>
        <Col>
          <MarkerList
            commandInformation={command}
            onFoundTimeElement={handleFoundTimeElement}
          ></MarkerList>
        </Col>
      </Row>
      <Player onCommandChange={handleCommandChange} reply={reply} />
    </div>
  );
}

export default App;
