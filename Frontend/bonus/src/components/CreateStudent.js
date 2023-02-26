import axios from 'axios'
import React, {useState}from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import{useNavigate} from "react-router-dom"



const CreateStudent = () => {
    const [name,setName] = useState("")
    const [subject,setSubject] = useState("")
    const [marks,setMarks] = useState("")
    const [subjectError,setSubjectError] = useState("")
    const [marksError,setMarksError] = useState("")
    const [nameError,setNameError] = useState("")

    const navigate = useNavigate()
    const validate = () => {
        let subjectError = '';
        let marksError = '';
        let nameError = '';
    
        const subjectRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const marksRegex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      const nameRegex = /^[a-z ,.'-]+$/
    
      if (!subjectRegex.test(subject)) {
        subjectError = 'Invalid subject';
      }

      if(!nameRegex.test(name)){
        nameError = "sahi naam dalo"
      }
    
      if (!marksRegex.test(marks)) {
        marksError = 'marks must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one number';
      }
        setNameError(nameError)
        setSubjectError(subjectError);
        setMarksError(marksError);
    
        return !(subjectError || marksError || nameError);
      };
      const onSubmit = (e)=>{
        e.preventDefault()
        const check = validate()
        if(check){
        axios.post("http://localhost:3001/createUser",{subject:subject,marks:marks})
        .then((r)=>{navigate("/login")})
        .catch((s)=>{setSubjectError(s.response.data.msg);})
        
      }}
      

  
      


  return (
    <Container >
      <Row className="my-4">
        <Col>
          <h1>Sign In</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>name</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control type="text" value={name} required={true} onChange={(event) => setName(event.target.value)} />
              <div style={{ color: 'red'}} className="error">{nameError}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicsubject">
     
              <Form.Label>subjects</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control type='subject' value={subject} required={true} onChange={(q)=>setSubject(q.target.value)}  />
              <div style={{ color: 'red'}} className="error">{subjectError}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicmarks">
              <Form.Label>marks</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control type="marks" value={marks} required={true} onChange={(event) => setmarks(event.target.value)} />
              <div style={{ color: 'red'}} className="error">{marksError}</div>
            </Form.Group>
            <Button variant="danger" type="submit">submit</Button>
            
            
          </Form>
        </Col>
      </Row>
    </Container>
  )
  
}

export default CreateStudent
