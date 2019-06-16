import React from 'react';
import axios from 'axios'
import config from './config'
import { Form,Button } from 'semantic-ui-react'
 

var defaultcity = config.city
var units = config.units
var key = config.appid

class App extends React.Component{


  constructor(props){
    super(props)
    this.state = {
      weatherdata :{},
      city:'',
    }


    this.onUpdateCity = this.onUpdateCity.bind(this)
    this.submit = this.submit.bind(this)
    this.getWeather = this.getWeather.bind(this)
  }

  getWeather(city, unit){
    var self = this
    var cityName = city || 'chengdu'
    var unitType = unit || 'metric'

    axios({
      method:'get',
      url:'https://api.openweathermap.org/data/2.5/forecast',
      params: {
        appid: '062eab511772b39daa9f75b9371e5946',
        units : unitType,
        q: cityName,
      }
    })
      .then(function(response) {
      var data = response.data
      self.setState({weatherdata: data})
      console.log(data)
    })
      .catch(function(err) {
      console.log(err)
    });
  }

  onUpdateCity(ev){
    var self = this
    console.log(ev.target.value)
    self.setState({city : ev.target.value})
  }

  componentDidMount(){
    this.getWeather('chengdu','metric')
  }

  submit(){
    this.getWeather(this.state.city)
  }

  render(){
    return <div>
      <Form>
        <Form.Input onChange={this.onUpdateCity} lable='city' placeholder='Name your city...'/>
        <Button onClick={this.submit}>Get Weather</Button>
      </Form>
    </div>
  }
}

export default App;
