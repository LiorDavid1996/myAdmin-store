import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Admin from './componnent/BarOrders/BarOrders';
import PieProduct from './componnent/pieProduct/PieProduct';
import DeleteOrder from './componnent/DeleteOrder/DeleteOrder';
import AvgOrder from './componnent/sum/AvgOrder/AvgOrder';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataManager from '@syncfusion/ej2-data'
import { useContext } from "react";
import  StateContext  from '../src/Context/Context';

function App() {
 
const data=StateContext(useContext)
console.log(data);

  return (
    
    <>
      <Container >
      <Row>
        <Col xs={12} md={4}>
        <Admin />
        </Col>
        <Col xs={12} md={4}>
    <PieProduct/>
    </Col>
    <Col xs={12} md={4}>
      <DeleteOrder/>
    </Col>
    <AvgOrder/>
    
      </Row>
    </Container>
    
    <h1>sds</h1>
    </>
  );
}

export default App;
