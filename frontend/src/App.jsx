import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import SalesOT from "./Components/salesOverTime.jsx";
import SalesGrowth from "./Components/salesGrowthRate.jsx";
import NewCustomer from "./Components/newCustomers.jsx";
import RepeatCustomers from "./Components/repeatCustomers.jsx";
import GeoDistribution from "./Components/geographicalDistribution.jsx";
import CustomerLTV from "./Components/cltv.jsx";
import { useNavigate } from "react-router-dom";


function App() {
  return <RecoilRoot>
    <div style={{
      height: "100vh",
    }}>
      <Router>
        <Appbar />
        <Routes>
          <Route path="/salesgrowth" element={<SalesGrowth />} />
          <Route path="/newcustomers" element={<NewCustomer />} />
          <Route path="/repeatcustomers" element={<RepeatCustomers />} />
          <Route path="/geographicaldistribution" element={<GeoDistribution />} />
          <Route path="/customerlifetimevalue" element={<CustomerLTV/>} />
          <Route path="/" element={<SalesOT />} />
        </Routes>
      </Router>
    </div>
  </RecoilRoot>
}

function Appbar(){
  const navigate = useNavigate()
  return <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",padding:'1em'}}>
    <button style={{backgroundColor:"lightblue",padding:'1em',border:"none",boxShadow:"0px 0px 10px",borderRadius:"50px"}}
          onClick={() => {
            navigate("/")
          }}>Sales Over Time</button>
    <button style={{backgroundColor:"lightblue",padding:'1em',border:"none",boxShadow:"0px 0px 10px",borderRadius:"50px"}}
          onClick={() => {
            navigate("/salesgrowth")}}
    >Sales Growth Rate</button>
    <button style={{backgroundColor:"lightblue",padding:'1em',border:"none",boxShadow:"0px 0px 10px",borderRadius:"50px"}}
          onClick={() => {
            navigate("/newcustomers")}}

    >New Customers Over Time</button>
    <button style={{backgroundColor:"lightblue",padding:'1em',border:"none",boxShadow:"0px 0px 10px",borderRadius:"50px"}}
          onClick={() => {
            navigate("/repeatcustomers")}}
    >Repeated Customers Over Time</button>
    <button style={{backgroundColor:"lightblue",padding:'1em',border:"none",boxShadow:"0px 0px 10px",borderRadius:"50px"}}
          onClick={() => {
            navigate("/geographicaldistribution")}}
    >Geographical Distribution of Customers</button>
    <button style={{backgroundColor:"lightblue",padding:'1em',border:"none",boxShadow:"0px 0px 10px",borderRadius:"50px"}}
          onClick={() => {
            navigate("/customerlifetimevalue")}}
    >Customer Lifetime Value by Cohort</button>
  </div>
}
export default App;
