import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Clipboard2 } from 'react-bootstrap-icons';
import { lowercaseLetters, numbers, symbols, uppercaseLetters } from '../characters';
import Banner from './Banner';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(15);
  const [isLowercaseLettersOn, setIsLowercaseLettersOn ] = useState(true);
  const [isUppercaseLettersOn, setIsUppercaseLettersOn ] = useState(false);
  const [isNumbersOn, setIsNumbersOn ] = useState(false);
  const [isSymbolsOn, setIsSymbolsOn ] = useState(false);

  const [showBanner, setShowBanner] = useState(false);
  const [bannerPhrase, setBannerPhrase] = useState('');

  const generatePassword = () => {
    let characterPool = '';
    let result = '';

    //Add selected characters to Pool of characters
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
    //If no option is selected, show an error banner
    if(characterPool === ''){
      setPassword('')
      setShowBanner(true)
      setBannerPhrase('Please select at least one option.') 
      return;
    }
    //Get randomized characters 
    for(let i = 0; i < passwordLength; i++){
      let randomIndex = Math.floor(Math.random() * characterPool.length);
      result += characterPool[randomIndex];
    }
    setPassword(result);
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(password)
      .then(()=>{
        setShowBanner(true);
        setBannerPhrase('Password copied successfully!');
      })
      .catch(()=> {
        console.log('Error: Could not copy')
      })
    
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{height: '100vh'}}>
      <Banner 
        showBanner={showBanner} 
        setShowBanner={setShowBanner} 
        bannerPhrase={bannerPhrase} 
      />
      <div className='border border-dark rounded p-4'>
        <h1 className='text-center'>Password Generator</h1>
        <Button 
          className='d-flex align-items-center my-3' 
          style={{minWidth: '435px', minHeight: '40px'}} 
          variant='outline-primary' 
          onClick={handleCopy}
        >
          <span className='flex-grow-1'>{password}</span>
          <Clipboard2 className='ms-2'/>
        </Button>
        
        <Form>
          <Form.Group>
            <Form.Label className='m-0'>Password Length</Form.Label>
            <Row className='align-items-center'>
              <Col xs='10'>
                <Form.Range 
                  id='lengthRange'
                  min='8'
                  max='40'
                  value={passwordLength} 
                  onChange={(e)=> {setPasswordLength(e.target.value)}}
                />
              </Col>
              <Col xs='2'>
                <Form.Control 
                  className='text-center'
                  value={passwordLength} 
                  readOnly
                />
              </Col>
            </Row>
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
          <Form.Group className='text-center mt-3'>
            <Button onClick={generatePassword} >Generate</Button>
          </Form.Group>
          
        </Form>
      </div>
    </div>
    
  )
}

export default PasswordGenerator
