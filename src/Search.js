import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Form from 'react-bootstrap/Form'


const API_URL = 'http://localhost:8080/api/address/'

class Search extends Component {
  state = {
    query: '',
    radius: 2,
    results: [],
    latitude: '',
    longitude: '',
    hasLocation: false,
  }

  getInfo = () => {  
    if(this.state.query !== '') {
      axios.get(`${API_URL}address=${this.state.query}&radius=${this.state.radius}`)
        .then(({ data }) => {
            console.log(data)
            this.setState({
            results: data
            })
        })
    }
  }

  getLocation = () => {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position){
            // this.setState({
            //     latitude: position.coords.latitude,
            //     longitude: position.coords.longitude
            // })
        }, function(error) {
            console.log(error.message)
        })
    }
    console.log(this.state)
    
  }

  handleInputChange = (event) => {
    this.setState({
      query: event.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          //this.getInfo()
        }
      } 
    })
  }

  handleSelectChange = (event) => {
    this.setState({
      radius: event.target.value
    }, () => {
        if (this.state.query !== '') {
            this.getInfo();
        }
    })
  }

  onClick = (event) => {
    event.preventDefault();
    this.getInfo();
  }

  goToMaps = (url) => {
    window.open(url, '_blank');
  }

  render() {
    this.getLocation()
    return (
        <div style={{ width: '40rem' }}>
            <Form>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Endereço</Form.Label>
            <Form.Control placeholder="Por favor, informe um endereço válido" onChange={this.handleInputChange}/>
            <Form.Text className="warning">
                Apenas para a cidade de Porto Alegre
            </Form.Text>
            </Form.Group>

            <Form.Group controlId="formGridState">
            <Form.Label>Raio (Km)</Form.Label>
            <Form.Control as="select" onChange={this.handleSelectChange}>
                <option>2</option>
                <option>5</option>
                <option>8</option>
                <option>10</option>
            </Form.Control>
            </Form.Group>
        
            
            <Button variant="primary" syze="lg" type="submit" onClick={this.onClick} block>
            Pesquisar..
            </Button>
            <div style={{'padding-top': '2px'}}>
                {this.state.results.map((location) =>
                    <div style={{padding: '2px'}}>
                        <Card bg="dark" text="white" style={{ width: '40rem' }}>
                            <Card.Img variant="top" src="https://scontent.fpoa8-1.fna.fbcdn.net/v/t1.0-9/40131348_295233007727227_2499128709471010816_o.jpg?_nc_cat=109&_nc_oc=AQnPS66jLc5lrv5u4kIXCC4ZQC4SOaSM23hbRh80F2O7I4YqDK1ns1FFr3qHlog2cao&_nc_ht=scontent.fpoa8-1.fna&oh=da1cb524ce7336393a5f202caa466832&oe=5E342593" />
                            <Card.Body>
                                <Card.Title>{location.title}</Card.Title>
                                <Card.Text>{location.body}</Card.Text>
                                <Button variant="primary" onClick={(e) => this.goToMaps('https://google.com')}>Ir para o Google Maps</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </div>
        </Form>
      </div>
    )
  }
}

export default Search
