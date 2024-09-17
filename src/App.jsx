/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import recycle from './assets/recycle.png';
import signs from './assets/signs.png';

// In order using ngrok, please recheck to add headers to skip
const endPoint = 'https://3ed3-103-136-25-38.ngrok-free.app/req'


const Table = ({ data, color }) => {
  return (
    <table border="3" width={'100%'}>
      <thead>
        <tr>
          {data[0].map((header, index) => (
            <th key={index} colSpan={index === 0 ? data.length +1 : 1} className='th-1' style={{'backgroundColor': color}} >{header}</th>
          ))}
        </tr>
        <tr>
          {data[1].map((header, index) => (
            <th key={index} className='th-2' style={header == 'TUJUAN' ? {'width':'100px'} : {'width':'auto'}}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(2).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Time = () => {

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const timer = setInterval(() => setTime(new Date()));
  }, []);

  const [time, setTime] = useState(new Date());
  const formattedTime = time.toLocaleTimeString("en-US");
  return(
    <>{formattedTime}</>
  )
}

const Banner = ({title, flex, color}) => {
  return(
    <h2 className='banner' style={{'flex':flex, 'backgroundColor':color}}>{title}</h2>
  )
}

const ShowDate = () => {
  const today = new Date();
  return(
    <>
    {today.toLocaleDateString('en-GB')}
    </>
  )
}

const Footer = ({data}) => {
  return (
    <div className="footer-container">
      <div className="id-column footer-column"><ShowDate /></div>
      <div className="marquee-column footer-column" style={{'color' : 'yellow', 'fontSize': '30PX'}}><Marquee data={data} /></div>
      <div className="time-column footer-column"><Time /></div>
    </div>
  );

  
}

const Signs = () => {
  return (
    <div className="container padding-zero">
        <div className="padding-zero" >
          <img src={recycle} className="img-recycle"/>
        </div>
        {/* <div className="column signs-text padding-zero">
          <div>PT WIRASWASTA GEMILANG INDONESIA CABANG SIDOARJO</div>
          <div>JL. RAYA TROPODO NO. 20 DESA TROPODO KRIAN SURABAYA</div>
          <div>WA : 0881022295933, email : wgisby@ptwgi.com</div>
        </div> */}
        <div className="pr-20" >
          <div><img src={signs} className="img-signs"/></div>
        </div>
      </div>
  );

  
}

const Header = () => {
  return(
    <>
      {/* <div className='container'>
        <div className='left-column'>
          <img src={mainlogo} style={{'maxWidth': '500px'}}></img>
        </div>
        <div className='right-column'>
          <img src={logo2} style={{'maxWidth': '200px'}}></img>
        </div>
      </div> */}
      <div>
        <Banner title={'LOG BOOK LIMBAH B3'} flex={'100%'} color={'green'}/>
      </div>
    </>
  )
}

const Marquee = ({data}) => {
  return (
      <marquee behavior="scroll" direction="left" scrollamount="3">
        <span>{data}</span>
      </marquee>
  );
};

const Tables = ({data}) => {
  return(
    <>
      <div className='container'>
        {/* Upper Table */}
        <div className='column' style={{'flex':'60%'}}>
        {data.length > 0 ? <Table data={data[0]} color={'dodgerblue'} /> : <p>Loading...</p>}
        </div>
        <div className='column' style={{paddingRight:'5vh'}}>
        {data.length > 0 ? <Table data={data[1]} color={'green'} /> : <p>Loading...</p>}
        </div>
      </div>
      {/* Bottom Table */}
      <div className='container'>
        <div className='column row full-width' style={{'flex': '60%', }}>
          <Banner title={'STOK LIMBAH B3'} style={{'display' : 'flex'}} color={'green'}/>
            <div style={{'display':'flex', 'width':'100%'}}>
              <div style={{'width':'50%'}}>
              {data.length > 0 ? <Table data={data[2]} color={'blue'} /> : <p>Loading...</p>}
              </div>
              {/* stok limbah B3 */}
              <div style={{'paddingLeft':'8vh', 'width':'50%'}}>
              {data.length > 0 ? <Table data={data[3]} color={'green'} /> : <p>Loading...</p>}
              </div>
            </div>
        </div>
        <div className='row'>
        </div>
        <div className='column' style={{'paddingRight' : '30px'}}>
          <Banner title={'SIMBOL LIMBAH B3'} color={'royalblue'} style={{'paddingRight' : '5vh'}} />
          <Signs />
        </div>
      </div>
    </>
  )
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  },[])
  
  const getData = async () => {
    const response = await axios.get(endPoint,  {headers: {
      "ngrok-skip-browser-warning":"any"
    },}     
    );
    setData(response.data)
  }

  return (
    <>
      <Header />
      <Tables data={data} />
      {/* <Signs /> */}
      <Footer data={data[4]} />
    </>
  )
}

export default App
