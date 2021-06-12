import axios from 'axios';
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Button, Form, Image } from 'react-bootstrap';
import './style.css';
export class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myMovies: [],
      slug: '',
      title: '',
      headline: '',
      showForm: false

    }
  }
  componentDidMount = async () => {
    const getRequest = await axios.get(`http://localhost:8080/main/movie`);
    this.setState({
      myMovies: getRequest.data
    })
  }
  deleteItem = async (slug) => {
    const deleteRequest = await axios.delete(`http://localhost:8080/main/movie/${slug}`)
    this.setState({
      myMovies: deleteRequest.data
    })
  }
  updateSlug = async (slug) => { this.setState({ slug: slug, showForm: true }) }
  updateTitle = async (e) => { this.setState({ title: e.target.value }) }
  updateHeadline = async (e) => { this.setState({ headline: e.target.value }) }
  updateItems = async (e) => {
    e.preventDefault();
    const body = {
      title: this.state.title,
      headline: this.state.headline
    }
    const updateRequest = await axios.put(`http://localhost:8080/main/movie/${this.state.slug}`, body);
    console.log('req', updateRequest);
    this.setState({
      myMovies: updateRequest.data,
      showForm: false
    })
  }
  render() {
    const styling = {
      width: '20%',
      hight: '50%',
      borderRadius: '20px'
    }
    let showImage = this.state.myMovies.length > 0;
    const rendring = this.state.myMovies.map((data, idx) => {
      return (
        <div key={idx}>
          <Row>
            <Col>
              <Card className="bg-dark text-white">
                <Card.Img variant="top" src={data.img} style={styling} />
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>
                  {data.summery}
                </Card.Text>
                <Card.Text>{data.headline}</Card.Text>
                <Card.Link href={data.article}>{data.suggested_link_text}  </Card.Link>
                <Button onClick={() => { this.deleteItem(data.slug) }} variant="danger">Delete This </Button>
                <Button onClick={() => { this.updateSlug(data.slug) }} variant="primary">Update This </Button>

              </Card>
            </Col>
          </Row>
        </div>
      )
    })
    const updateform = <Form onSubmit={(e) => this.updateItems(e)} >

      <Form.Control type="text" name='title' placeholder='Title' onChange={this.updateTitle} />


      <Form.Control type="text" name='headline' placeholder='Headline' onChange={this.updateHeadline} />
      <Button variant="primary" type='submit' value='Update' >Update</Button>
    </Form>
    return (
      <div>

        {!showImage &&
          <Image src='https://www.internationalshowtimes.com/img/International_Showtimes_API_Movie_Guide_Data_Grid.jpg' alt='' />

        }
        {
          this.state.showForm &&
          updateform
        }
        {rendring}
      </div>
    )
  }
}

export default Movies
