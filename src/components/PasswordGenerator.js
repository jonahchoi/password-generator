import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { lowercaseLetters, numbers, symbols, uppercaseLetters } from '../characters';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(15);
  const [isLowercaseLettersOn, setIsLowercaseLettersOn ] = useState(true);
  const [isUppercaseLettersOn, setIsUppercaseLettersOn ] = useState(false);
  const [isNumbersOn, setIsNumbersOn ] = useState(false);
  const [isSymbolsOn, setIsSymbolsOn ] = useState(false);

  const generatePassword = () => {
    let characterPool = '';
    let result = '';

    if(isLowercaseLettersOn){
      characterPool += lowercaseLetters
    }
    if(isUppercaseLettersOn){
      characterPool += uppercaseLetters
    }
    if(isNumbersOn){
      characterPool += numbers
    }
    if(isSymbolsOn){
      characterPool += symbols
    }
    if(characterPool === ''){
      //return error; 
    }
    console.log(characterPool);
    for(let i = 0; i < passwordLength; i++){
      let randomIndex = Math.floor(Math.random() * characterPool.length);
      result += characterPool[randomIndex];
    }
    setPassword(result);
  }

  const handleSubmit = () => {
    generatePassword();
  }

  return (
    <div>
      <div>{password}</div>
      <Form>
        <Form.Group as={Row}>
          <Col xs='9'>
            <Form.Range 
              id='lengthRange'
              min='8'
              max='40'
              value={passwordLength} 
              onChange={(e)=> {setPasswordLength(e.target.value)}}
            />
          </Col>
          <Col xs='3'>
            <Form.Control 
              value={passwordLength} 
              readOnly
            />
          </Col>
          
        </Form.Group>
        
        <Form.Switch
          id="lowercaseLettersSwitch"
          label='Include Lowercase Letters (a-z)'  
          checked={isLowercaseLettersOn}
          onChange={()=>{setIsLowercaseLettersOn(!isLowercaseLettersOn)}}
        />
        <Form.Switch
          id='uppercaseLettersSwitch'
          label='Include Uppercase Letters (A-Z)' 
          checked={isUppercaseLettersOn}
          onChange={()=>{setIsUppercaseLettersOn(!isUppercaseLettersOn)}} 
        />
        <Form.Switch
          id='numbersSwitch'
          label='Include Numbers (0-9)'
          checked={isNumbersOn}
          onChange={()=>{setIsNumbersOn(!isNumbersOn)}}  
        />
        <Form.Switch
          id='symbolsSwitch'
          label='Include Symbols (!@#$%^&*_-+=)'  
          checked={isSymbolsOn}
          onChange={()=>{setIsSymbolsOn(!isSymbolsOn)}}
        />
        <Button onClick={handleSubmit}>Generate</Button>
      </Form>
    </div>
  )
}

export default PasswordGenerator
