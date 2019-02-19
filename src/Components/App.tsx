import React, { Component } from 'react';
import logo from '../logo.jpg';
import axios from 'axios';
import './App.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {IoMdDownload} from 'react-icons/io';
import {IoIosCopy} from 'react-icons/io';
import CopyToClipboard from 'react-copy-to-clipboard';
import ArraySortType from '../Enums/ArraySortType';
import { Globals }  from '../globals';

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
      minimumNumber: Globals.defaultMinimumNumber,
      maximumNumber: Globals.defaultMaximumNumber,
      arraySortType: Globals.defaultArraySortType,
      commaDelimited: Globals.defaultCommaDelimited,
      newlineDelimited: Globals.defaultNewlineDelimited,
      spaceDelimited: Globals.defaultSpaceDelimited
    };

    this.getArray();
  }

  public getArray(){
    if(!this.validateArray())
    {
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

  private validateArray(){
      if(this.state.maximumNumber < this.state.minimumNumber)
    {
      this.setState({ array:  [Globals.MinGreaterThanMaxError]});
      return false;
    }
    if(this.state.minimumNumber < Globals.minimumAllowableNumber)
    {
      this.setState({ array:  [Globals.MinLessThanAllowed]});
      return false;
    }
    if(this.state.maximumNumber > Globals.maximumAllowableNumber)
    {
      this.setState({ array:  [Globals.MaxGreaterThanAllowed]});
      return false;
    }
    return true;
  }

  public getShuffledArray(){
    var self=this;
    axios.get(`${Globals.SHUFFLEDARRAY_ROOT_URL}/?minimumNumber=${this.state.minimumNumber}&maximumNumber=${this.state.maximumNumber}`)
    .then(function (response: any) {
      self.setState({
        array: response.data
      });
    });
  }

  public getSortedAscendingArray(){
    var self=this;
    axios.get(`${Globals.SORTEDARRAY_ROOT_URL}/?minimumNumber=${this.state.minimumNumber}&maximumNumber=${this.state.maximumNumber}`)
    .then(function (response: any) {
      self.setState({
        array: response.data
      });
    });
  }

  public getSortedDescendingArray(){
    var self=this;
    axios.get(`${Globals.SORTEDARRAY_ROOT_URL}/?minimumNumber=${this.state.minimumNumber}&maximumNumber=${this.state.maximumNumber}`)
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

  private onMinimumNumberChange(event: React.FormEvent<HTMLInputElement>) {
    var newValue = event.currentTarget.value;
    if(newValue === '')
    {
      return;
    }
    this.setState({ minimumNumber: Number(newValue)}, () =>
      this.getArray()
    );
  }

  private onMaximumNumberChange(event: React.FormEvent<HTMLInputElement>) {
    var newValue = event.currentTarget.value;
    if(newValue === '')
    {
      return;
    }
    this.setState({ maximumNumber: Number(newValue) }, () =>
      this.getArray()
    );
  }

private selectArrayType(arraySortType: ArraySortType){
  this.setState({  arraySortType: arraySortType }, () =>
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

 private download(content: string, fileName: string, contentType: string) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

private getNumbersToDisplay(){
  return this.state.array.join(this.getDelimiter());
}

  public render() {
    return (
      <div className="App container">
      <Container>
      <img className="logo" src={logo}/>
        <Row>
          <Col>
            <InputGroup>
              <InputGroup.Text>Minimum Number</InputGroup.Text>
              <FormControl type="number" pattern="[0-9]" defaultValue={this.state.minimumNumber.toString()} onChange={(e: any) => this.onMinimumNumberChange(e)} />
              <InputGroup.Text>Maximum Number</InputGroup.Text>
              <FormControl type="number" pattern="[0-9]" defaultValue={this.state.maximumNumber.toString()} onChange={(e: any) => this.onMaximumNumberChange(e)} />
            </InputGroup>    
          </Col>
        </Row>
        <Row>
          <Col>
          <div className="numbers">
            <p className={this.state.newlineDelimited ? 'newline' : 'notnewline'}>
            {this.getNumbersToDisplay()}
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
                  <Dropdown.Item active={this.state.arraySortType == ArraySortType.Shuffled} onClick={() => this.selectArrayType(ArraySortType.Shuffled)}>Shuffled ↻</Dropdown.Item>
                  <Dropdown.Item active={this.state.arraySortType == ArraySortType.SortedAscending} onClick={() => this.selectArrayType(ArraySortType.SortedAscending)}>Ascending &darr;</Dropdown.Item>
                  <Dropdown.Item active={this.state.arraySortType == ArraySortType.SortedDescending} onClick={() => this.selectArrayType(ArraySortType.SortedDescending)}>Descending &uarr;</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant={this.state.newlineDelimited ? "primary":"light"} onClick={() => this.toggleNewlineDelimited()}>Newline</Button>
              <Button variant={this.state.commaDelimited ? "primary":"light"} onClick={() => this.toggleCommaDelimited()}>Comma</Button>
              <Button variant={this.state.spaceDelimited ? "primary":"light"} onClick={() => this.toggleSpaceDelimited()}>Space</Button>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
            <CopyToClipboard text={this.state.array.join(this.getDelimiter())}>
              <Button variant="info">Copy Text To Clipboard <IoIosCopy /></Button>
            </CopyToClipboard>
              <Button variant="success"  onClick={() => this.download(this.state.array.join('\r\n'), 'file.csv', 'text/plain')}>Download .csv <IoMdDownload /></Button>
              <Button variant="success"  onClick={() => this.download(this.getNumbersToDisplay(), 'file.txt', 'text/plain')}>Download .txt <IoMdDownload /></Button>
            </InputGroup>
          </Col>
        </Row>
        </Container>
      </div>
    );
  }  
}

export default App;
