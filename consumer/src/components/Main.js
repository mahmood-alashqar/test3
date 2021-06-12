import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Button } from 'react-bootstrap';
import './style.css';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Movies: [],
      API: process.env.REACT_APP_SERVER_URL,
    }
  }
  componentDidMount = async () => {
    const getRequest = await axios.get(`${this.state.API}/main`);
    console.log(process.env.REACT_APP_TEST);
    this.setState({
      Movies: getRequest.data
    })
  }
  storeItem = async (item) => {
    await axios.post(`${this.state.API}/main/movie`, item);
  }
  render() {
    const styling = {
      width: '20%',
      hight: '50%',
      borderRadius: '20px'
    }
    return (
      this.state.Movies.map((data, idx) => {
        return (<div key={idx}>
          <Row>
            <Col>
              <Card className="bg-dark text-white">
                <Card.Img variant="top" src={data.img} style={styling} />
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>
                  {data.summery}
                </Card.Text>
                <Card.Text>{data.headline}</Card.Text>
                <Card.Link href={data.article}>{data.suggested_link_text}</Card.Link>
                <Button onClick={() => { this.storeItem(data) }} variant="primary">Add To Your List </Button>
              </Card>
            </Col>
          </Row>
        </div>)
      })
    )
  }
}

export default Main
