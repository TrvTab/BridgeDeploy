import {Button, Row, Col, Modal} from 'react-bootstrap'

function LandingPage(props) {
    return (
      <Modal
        {...props}
        fullscreen="true"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            LANDING PAGE


            
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}
export default LandingPage;