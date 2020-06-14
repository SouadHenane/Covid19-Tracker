import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CardImg from 'react-bootstrap/CardImg'
import Columns from "react-columns";
import Form from "react-bootstrap/Form";


function App() {

  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] =useState("");
  useEffect(() => {
    axios
    .all([
      axios.get("https://corona.lmao.ninja/v2/all"),
      axios.get("https://corona.lmao.ninja/v2/countries")  
  ])
    .then(responseArr =>{
      setLatest(responseArr[0].data);
      setResults(responseArr[1].data);
    })
    .catch(err =>{
      console.log(err);
    });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const filterCountries = results.filter(item =>{
    return searchCountries !== "" ? item.country.includes(searchCountries) : item;
  });

  const countries = filterCountries.map((data, i) => {
  return(
    <Card key={i} bg="light" text={"dark"} className="text-center" style={{margin:"10px"}}>
      <CardImg variant="top" src={data.countryInfo.flag}/>
     <Card.Body>
      <Card.Title>{data.country}</Card.Title>
      <Card.Text>Cases {data.cases}</Card.Text>
      <Card.Text>Deaths {data.deaths}</Card.Text>
      <Card.Text>Recovered {data.recovered}</Card.Text>
      <Card.Text>Today's cases {data.todayCases}</Card.Text>
      <Card.Text>TodayDeaths {data.todayDeaths}</Card.Text>
      <Card.Text>Active {data.active}</Card.Text>
      <Card.Text>Critical {data.critical}</Card.Text>
    </Card.Body>
    </Card>
  );
});


var queries=[{
  columns:2,
  query:'min-width:500px'
  }, {
  columns:3,
  query:'min-width: 1000px'
  
  }];

  return (
    <div>
     <br />
     <h2 style={{textAlign: "center"}}>COVID19 statistics</h2>
     
     <CardDeck>
     <Card bg="info" text={"white"} className="text-center" style={{margin:"10px"}}>
     <Card.Body>
      <Card.Title>Cases</Card.Title>
      <Card.Text>{latest.cases}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  
  <Card bg="danger" text={"white"} className="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Deaths</Card.Title>
      <Card.Text>{latest.deaths}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card bg="success" text={"white"} className="text-center" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Recovered</Card.Title>
      <Card.Text>{latest.recovered}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
</CardDeck>
<br />
<Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Label>Search</Form.Label>
    <Form.Control type="text" placeholder="Search a country" onChange={e =>setSearchCountries(e.target.value)}/>
  </Form.Group>
</Form>
 <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
