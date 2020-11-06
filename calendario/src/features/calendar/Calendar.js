import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { events_map, doneEvents_map, find_events, find_doneEvents, register_event, delete_event, edit_event, setActive_event } from './calendarSlice';
import { Button, Jumbotron, Table, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


function setChartAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substring(0,index) + chr + str.substring(index+1);
}

function validateTime(sTime, eTime) {
  if (eTime <= sTime) {
    return(
      toast.error('Error! The start time must be before end time.', { position: toast.POSITION.BOTTOM_RIGHT })
    )
  } else {
    return false;
  }
}


function formatDate(date) {
  var str = date.toString();
  var aux, aux2;
  if(str[10] === 'T') {
    aux = str[0];
    aux2 = str[6];
    str = setChartAt(str, 6, aux);
    str = setChartAt(str, 4, aux2);
    aux2 = str[5];
    str = setChartAt(str, 5, '/');
    aux = str[3];
    str = setChartAt(str, 3, aux2);
    aux2 = str[9];
    str = setChartAt(str, 9, aux)
    aux = str[1];
    str = setChartAt(str, 1, aux2);;
    aux2 = str[7];
    str = setChartAt(str, 7, aux);
    aux = str[2];
    str = setChartAt(str, 2, '/');
    aux2 = str[8];
    str = setChartAt(str, 8, aux);
    aux = str[0];
    str = setChartAt(str, 0, aux2);
  }
  const [strToReturn, ] = str.split('T');
  return strToReturn
}


function Home() {
  const events = useSelector(events_map);
  const doneEvents = useSelector(doneEvents_map);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [idEdit, setIdEdit] = useState('');
  const [nameEdit, setNameEdit] = useState('');
  const [dateEdit, setDateEdit] = useState('');
  const [startTimeEdit, setStartTimeEdit] = useState('');
  const [endTimeEdit, setEndTimeEdit] = useState('');
  const [descriptionEdit, setDescriptionEdit] = useState('');
  const [toggleForm, setToggleForm] = useState(false);


    function handleToggleForm() {
        setName('');
        setDate('');
        setStartTime('');
        setEndTime('');
        setDescription('');
        toggleForm ? setToggleForm(false) : setToggleForm(true);
    }

    function validateRegisterFields() {
      if (name === '') {
        return(
          toast.error('Error! The field name is required.', { position: toast.POSITION.BOTTOM_RIGHT })
        )
      } 
      if (date === ''){
        return(
          toast.error('Error! The field date is required.', { position: toast.POSITION.BOTTOM_RIGHT })
        )
      }
      if (startTime === '') {
        return(
          toast.error('Error! The field start time is required.', { position: toast.POSITION.BOTTOM_RIGHT })
        )
      }
      if (endTime === '') {
        return(
          toast.error('Error! The field end time is required.', { position: toast.POSITION.BOTTOM_RIGHT })
        )
      }
      if (description === '') {
        return(
          toast.error('Error! The field description is required', { position: toast.POSITION.BOTTOM_RIGHT })
        )
      }
      return false;
    }

    function saveEvent() {
      if(!validateRegisterFields()) {
        if(!validateTime(startTime, endTime)) {
          dispatch(register_event(name, date, startTime, endTime, description))
        }
      }
    }

    function saveEditEvent() {
      
      if(!validateTime(startTimeEdit, endTimeEdit)) {
        dispatch(edit_event(idEdit, nameEdit, dateEdit, startTimeEdit, endTimeEdit, descriptionEdit));
        handleToggleForm()
      }

    }

  useEffect(() => {
    dispatch(find_events());
    dispatch(find_doneEvents());
  }, [dispatch]);

    return (
      <div>
        <h1 style={{fontSize: 64, color: 'white', fontFamily: "fantasy"}}>Calendar i/o</h1>
        <Jumbotron style={{ backgroundColor: "#c6b6d5"}}>
        <div style={{marginTop: -40}}>
          <Form>
            <Row>
              <Col>
              <Form.Group controlId="formBasicName">
                  <Form.Label style={{ color: "#FFFFFF"}}>Event name</Form.Label>
                  <Form.Control placeholder="Enter event name" onChange={(ev) => setName(ev.target.value)}/>
              </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formDate">
                  <Form.Label style={{ color: "#FFFFFF"}}>Event date</Form.Label>
                  <Form.Control type="date" placeholder="Enter date of event" onChange={(ev) => setDate(ev.target.value)}/>
              </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formTime">
                  <Form.Label style={{ color: "#FFFFFF"}}>Start time</Form.Label>
                  <Form.Control type="time" placeholder="Start time" onChange={(ev) => setStartTime(ev.target.value)}/>
              </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formTime">
                  <Form.Label style={{ color: "#FFFFFF"}}>End time</Form.Label>
                  <Form.Control type="time" placeholder="End time" onChange={(ev) => setEndTime(ev.target.value)}/>
              </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formText">
                  <Form.Label style={{ color: "#FFFFFF"}}>Description</Form.Label>
                  <Form.Control type="text" placeholder="Enter event description" onChange={(ev) => setDescription(ev.target.value)}/>
              </Form.Group>
              </Col>
              </Row>
          </Form>
          <Button style={{marginBottom: 15}} variant="outline-success" size="lg" onClick={() => {saveEvent()}}>New event +</Button>
        </div>
            <p>Coming up events</p>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Description</th>
                  <th>#</th>
                </tr>
              </thead>
                <tbody>
                  {events.map((event, index) => {
                    var dateFormatted = formatDate(event.date)
                    return (
                      <tr key={index}>
                      <td>{event.name}</td>
                      <td>{dateFormatted}</td>
                      <td>{event.startTime}</td>
                      <td>{event.endTime}</td>
                      <td>{event.description}</td>
                      {
                        toggleForm ?
                          <td>
                          <Button variant="outline-warning" disabled>Edit</Button>
                          <Button variant="outline-danger" style={{marginLeft: 15}} disabled>Delete</Button>
                          <Button variant="outline-success" style={{marginLeft: 15}} disabled>Done</Button>
                          </td>
                        :
                          <td><Button variant="outline-warning" onClick={() => {
                            handleToggleForm();
                            const [dateFormattedToEdit, ] = event.date.split('T');
                            setIdEdit(event._id);
                            setNameEdit(event.name);
                            setDateEdit(dateFormattedToEdit);
                            setStartTimeEdit(event.startTime);
                            setEndTimeEdit(event.endTime);
                            setDescriptionEdit(event.description);
                          }}>Edit</Button>
                          <Button variant="outline-danger" style={{marginLeft: 15}} onClick={() => dispatch(delete_event(event._id))}>Delete</Button>
                          <Button variant="outline-success" style={{marginLeft: 15}} onClick={() => dispatch(setActive_event(event._id))}>Done</Button>
                          </td>
                      }

                      </tr>            
                    );
                  })}
                </tbody>
            </Table>
            <p>Done events</p>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Description</th>
                  <th>#</th>
                </tr>
              </thead>
                <tbody>
                  {doneEvents.map((devent, index) => {
                    var doneDateFormatted = formatDate(devent.date)
                    return (
                      <tr key={index}>
                      <td>{devent.name}</td>
                      <td>{doneDateFormatted}</td>
                      <td>{devent.startTime}</td>
                      <td>{devent.endTime}</td>
                      <td>{devent.description}</td>
                      {
                        toggleForm ?
                          <td>
                          <Button variant="outline-danger" disabled>Undone</Button>
                          </td>
                        :
                          <td>
                          <Button variant="outline-danger" onClick={() => dispatch(setActive_event(devent._id))}>Undone</Button>
                          </td>
                      }

                      </tr>            
                    );
                  })}
                </tbody>
            </Table>
        </Jumbotron>
        {
          toggleForm ? (
            <div>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="formBasicName">
                        <Form.Label style={{ color: "#FFFFFF"}}>Event name</Form.Label>
                        <Form.Control type="text" placeholder="Enter event name" value={nameEdit} onChange={(ev) => setNameEdit(ev.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formDate">
                        <Form.Label style={{ color: "#FFFFFF"}}>Event date</Form.Label>
                        <Form.Control type="date" placeholder="Enter date of event" value={dateEdit} onChange={(ev) => setDateEdit(ev.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formTime">
                        <Form.Label style={{ color: "#FFFFFF"}}>Start time</Form.Label>
                        <Form.Control type="time" placeholder="Start time" value={startTimeEdit} onChange={(ev) => setStartTimeEdit(ev.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formTime">
                        <Form.Label style={{ color: "#FFFFFF"}}>End time</Form.Label>
                        <Form.Control type="time" placeholder="End time" value={endTimeEdit} onChange={(ev) => setEndTimeEdit(ev.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formText">
                        <Form.Label style={{ color: "#FFFFFF"}}>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter event description" value={descriptionEdit} onChange={(ev) => setDescriptionEdit(ev.target.value)}/>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              <Button variant="outline-danger" onClick={() => handleToggleForm()}>Cancel</Button>
              <Button variant="outline-success" style={{marginLeft: 15}} onClick={() => saveEditEvent()}>Save</Button>
            </div>)
            :
            null
        }
        <footer>
        <Button variant="link" onClick={() => {localStorage.clear(); window.location.reload(false);}}>
          Logout
        </Button>
        </footer>
        
      </div>
    )
  }

export default Home;