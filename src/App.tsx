import React, { Component } from 'react';
import logo from './logo.jpg';
import axios from 'axios';
import './App.css';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {IoMdDownload} from 'react-icons/io';
import {IoIosCopy} from 'react-icons/io';
import  CopyToClipboard from 'react-copy-to-clipboard';

//ToDo: put somewhere else?
enum ArraySortType { SortedAscending, Shuffled, SortedDescending }

const PORT = '44334'; //IMPORTANT! This will need to be updated with whatever port the ArrayGenerator backend uses when you run it
const SHUFFLEDARRAY_ROOT_URL = `https://localhost:${PORT}/api/ShuffledArray/`;
const SORTEDARRAY_ROOT_URL = `https://localhost:${PORT}/api/SortedArray/`;
const defaultMinimumNumber = 1;
const defaultMaximumNumber = 10000;
const defaultArraySortType = ArraySortType.Shuffled;

//Need to set these because Copy Text to Clipboard package does not work with ranges that are too large
const minimumAllowableNumber = -15000;
const maximumAllowableNumber = 15000;

interface IMyState {
  array: string[],
  minimumNumber: number,
  maximumNumber: number,
  arraySortType: ArraySortType,
  commaDelimited: boolean,
  newlineDelimited: boolean,
  spaceDelimited: boolean
}

class App extends Component<{}, IMyState> {
  constructor(props: any){
    super(props);

    this.state = {
      array: [],
      minimumNumber: defaultMinimumNumber,
      maximumNumber: defaultMaximumNumber,
      arraySortType: defaultArraySortType,
      commaDelimited: true,
      newlineDelimited: false,
      spaceDelimited: true
    };

    this.getArray();
  }

  public getArray(){
    if(this.state.maximumNumber < this.state.minimumNumber)
    {
      this.setState({ array:  ["Minimum Number can not be greater than Maximum Number."]});
      return;
    }
    if(this.state.minimumNumber < minimumAllowableNumber)
    {
      this.setState({ array:  [`Minimum Number can not be less than ${minimumAllowableNumber}.`]});
      return;
    }
    if(this.state.maximumNumber > maximumAllowableNumber)
    {
      this.setState({ array:  [`Minimum Number can not be less than ${maximumAllowableNumber}.`]});
      return;
    }
    if(this.state.arraySortType == ArraySortType.Shuffled){
      this.getShuffledArray();
    }
    else if(this.state.arraySortType == ArraySortType.SortedAscending){
      this.getSortedAscendingArray();
    }
    else if(this.state.arraySortType == ArraySortType.SortedDescending){
      this.getSortedDescendingArray();
    }
    else{
      throw new TypeError(`No implementation for Array of Sort Type ${this.state.arraySortType}`);
    }
  }

  public getShuffledArray(){
    var self=this;
    axios.get(`${SHUFFLEDARRAY_ROOT_URL}/?minimumNumber=${this.state.minimumNumber}&maximumNumber=${this.state.maximumNumber}`)
    .then(function (response: any) {
      self.setState({
        array: response.data
      });
    });
  }

  public getSortedAscendingArray(){
    var self=this;
    axios.get(`${SORTEDARRAY_ROOT_URL}/?minimumNumber=${this.state.minimumNumber}&maximumNumber=${this.state.maximumNumber}`)
    .then(function (response: any) {
      self.setState({
        array: response.data
      });
    });
  }

  public getSortedDescendingArray(){
    var self=this;
    axios.get(`${SORTEDARRAY_ROOT_URL}/?minimumNumber=${this.state.minimumNumber}&maximumNumber=${this.state.maximumNumber}`)
    .then(function (response: any) {
      self.setState({
        array: response.data.reverse()
      });
    });
  }

  public getDelimiter(){
    var delimiter = "";

    if(this.state.commaDelimited)
    {
      delimiter += ",";
    }
    if(this.state.spaceDelimited)
    {
      delimiter += " ";
    }
    if(this.state.newlineDelimited)
    {
      delimiter += "\r\n";
    }
    return delimiter;
  }

  private onMinimumNumberChange(event: any) {
    var newValue = event.currentTarget.value;
    if(newValue === '')
    {
      return;
    }
    this.setState({ minimumNumber: Number(newValue)}, () =>
      this.getArray()
    );
  }

  private onMaximumNumberChange(event: any) {
    var newValue = event.currentTarget.value;
    if(newValue === '')
    {
      return;
    }
    this.setState({ maximumNumber: Number(newValue) }, () =>
      this.getArray()
    );
  }

 private selectShuffled()
 {
    this.setState({  arraySortType: ArraySortType.Shuffled }, () =>
    this.getArray()
  );
 }

 private selectSortedAscending()
 {
    this.setState({ arraySortType: ArraySortType.SortedAscending }, () =>
    this.getArray()
  );
 }

 private selectSortedDescending()
 {
    this.setState({ arraySortType: ArraySortType.SortedDescending }, () =>
    this.getArray()
  );
 }

 private toggleCommaDelimited()
 {
    this.setState({ commaDelimited: !this.state.commaDelimited});
 }

 private toggleNewlineDelimited()
 {
    this.setState({ newlineDelimited: !this.state.newlineDelimited});
 }

 private toggleSpaceDelimited()
 {
    this.setState({ spaceDelimited: !this.state.spaceDelimited});
 }

 private download(content: any, fileName: string, contentType: any) {
   console.log(content);
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

  public render() {
    const numbers = this.state.array.join(this.getDelimiter());
    return (
      <div className="App container">
      <Container>
      <img src={logo} style={{ width:'600px' }}/>
        <Row>
          <Col>
            <InputGroup>
              <InputGroup.Text>Minimum Number</InputGroup.Text>
              <FormControl type="number" pattern="[0-9]{-100000,100000}" defaultValue={this.state.minimumNumber.toString()} onChange={(e: any) => this.onMinimumNumberChange(e)} style={{ width:'20px'}} />
              <InputGroup.Text>Maximum Number</InputGroup.Text>
              <FormControl type="number" pattern="[0-9]{-100000,100000}" defaultValue={this.state.maximumNumber.toString()} onChange={(e: any) => this.onMaximumNumberChange(e)} style={{ width:'20px'}} />
            </InputGroup>    
          </Col>
        </Row>
        <Row>
          <Col>
          <div  style={{ height:'400px', overflowY : 'auto'}}>
            <p className={this.state.newlineDelimited ? 'newline' : 'notnewline'}>
            {numbers}
            </p>
          </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Array Sort Type
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item active={this.state.arraySortType == ArraySortType.Shuffled} onClick={(e: any) => this.selectShuffled()}>Shuffled ↻</Dropdown.Item>
                  <Dropdown.Item active={this.state.arraySortType == ArraySortType.SortedAscending} onClick={(e: any) => this.selectSortedAscending()}>Ascending &darr;</Dropdown.Item>
                  <Dropdown.Item active={this.state.arraySortType == ArraySortType.SortedDescending} onClick={(e: any) => this.selectSortedDescending()}>Descending &uarr;</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant={this.state.newlineDelimited ? "primary":"light"} onClick={() => this.toggleNewlineDelimited()}>Newline</Button>
              <Button variant={this.state.commaDelimited ? "primary":"light"} onClick={() => this.toggleCommaDelimited()}>Comma</Button>
              <Button variant={this.state.spaceDelimited ? "primary":"light"} onClick={() => this.toggleSpaceDelimited()}>Space</Button>
            </InputGroup>
          </Col>
          <Col >
            <InputGroup className="float-right"  style={{width: "502px"}}> {/* Width must be set for float-right to work -->*/}
            <CopyToClipboard text={this.state.array.join(this.getDelimiter())}>
              <Button variant="info">Copy Text To Clipboard <IoIosCopy /></Button>
              </CopyToClipboard>
              <Button variant="success"  onClick={() => this.download(this.state.array.join('\n'), 'file.csv', 'text/plain')}>Download .csv <IoMdDownload /></Button>
              <Button variant="success"  onClick={() => this.download(this.state.array.join(this.getDelimiter()), 'file.txt', 'text/plain')}>Download .txt <IoMdDownload /></Button>
            </InputGroup>
          </Col>
        </Row>
        </Container>
      </div>
    );
  }  
}

export default App;
