import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col } from 'react-bootstrap';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Movies: [],
      API: process.env.REACT_APP_SERVER_URL,

    }
  }
  componentDidMount = async () => {
    const getRequest = await axios.get(`http://localhost:8080/main`);
    console.log(this.state.API);
    this.setState({
      Movies: getRequest.data
    })
  }
  render() {
    const styling = {
      width: '20%',
      hight: '50%',
      borderRadius: '20px'
    }
    console.log(this.state.Movies);
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

              </Card>
            </Col>
          </Row>
        </div>)
      })
    )
  }
}

export default Main
