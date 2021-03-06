import React, {Component} from 'react';
import { Button,Form,Col, Row } from 'react-bootstrap';
import ShowCard from './ShowCard';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-158033292-2');
ReactGA.pageview(window.location.pathname + window.location.search);
const Formstyle = {
  padding: '10px',
  background: '#eee',
  border: '2px solid black',
  width: '99%',
  marginLeft: '2px'
}
class  App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: 'facebook',
      data: [],
      page: 2
    };
    this.search = this.search.bind(this);
    this.getUserReops = this.getUserReops.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  getUserReops(user, page=1){
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${user}/repos?page=${page}&per_page=5`;
    var self = this;
    xhr.open('GET', url, true);
    //solve 403 forbidden problem. 
   // xhr.setRequestHeader('Authorization', 'token f6060d8a6bfe3bc0a4e3f7ffcbe2e3bb7082dbe0');
    
    xhr.onload = function(){
      // console.log(JSON.parse(this.response));
      self.setState({
        data : [...self.state.data, ...JSON.parse(this.response)]
      })
    }
    xhr.send();
  }
  search(){
    this.setState({data: [], page: 2});
    console.log('search user id is : ', this.state.userid);
    this.getUserReops(this.state.userid);
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll(event){
    let threshold = 5;
    if(Math.abs(window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight) <= threshold){
      console.log('page: ',  this.state.page);
      this.setState({page: this.state.page + 1});
      this.getUserReops(this.state.userid, this.state.page);
    }
  }
  render(){
    return (
         <div>
            <h1>Get github repos: </h1>
            <Form style={Formstyle}>  
            <Form.Group>
          <Row> 
              <Form.Label column sm>User ID:</Form.Label>
            </Row> 
            <Row> 
              <Col sm={5}>
                   <Form.Control onChange={event => this.setState({ userid: event.target.value})}  placeholder ="type user ID" />
              </Col>
              <Col>
                   <Button  variant="warning" onClick={this.search} size="sm">Search</Button>
              </Col>
              </Row>
            </Form.Group>
            </Form>
           <div id="allCard" style={{marginLeft: '2px', width: '99%'}}>
                {
                  this.state.data.map(
                    (card, i) => {
                      let props = [card.name, card.description, card.html_url];
                      return <ShowCard key={i} data={props}></ShowCard>;
                    })
                }
           </div>
          </div>
    );
  }
}

export default App;
