import {Button, Row, Col, Modal} from 'react-bootstrap'

function InfoModal(props) {
    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Command Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <h4>Commands that should be done using voice (voice commands must be issued exactly like the following to work)</h4>
          <h6> <b>Note that the words with colons in front of them represent values that you will choose.
                  In addition, all of the following commands (except for jumping to loops/markers) can be done without voice input</b></h6> 
          <p>
            Add marker at a specific time = <em>'add marker called :name at :min minutes and :sec seconds'</em><br/>
            Add a loop that from one time stamp to another =<em> 'Add loop called :name from :firstMin minutes and :firstSec seconds until :secondMin minutes and :secondSec seconds'</em><br/>
            Delete a marker by its name = <em>'Delete marker called :name'</em><br/>
            Delete a loop by its name = <em> 'Delete loop called :name'</em><br/>
            Skip 15 seconds ahead = <em>'skip forward'</em> <br/>
            Rewind 15 seconds = <em>'skip backwards'</em> <br/>
            Restart the song = <em>'restart' </em><br/>
            Jump to marker timestamp = <em>'go to marker :name'</em> <br/>
            Jump to loop and repeatedly perform desired loop : <em>'go to loop :name'</em> <br/>
            Exit loop = <em>'exit loop' </em><br/>
            Pause = <em>'pause'</em>
            Play = <em>'play'</em>
          </p>
          <h4>Commands that should be done without voice commands</h4>
          <p>
          Change Volume <br/>
          Change Playback Rate <br/>
          Change Song URL <br/>

          </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}
export default InfoModal;