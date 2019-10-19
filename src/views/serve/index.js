
import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import './serve.css'

const menus=[{name:'概况',path:'/'},{name:'历史订单',path:'/history'},{name:'详情',path:'/detail2'}]
function App() {
  const [params,setParams] = useState({count:0})
  const onChange = v => {
    console.log(v)
  }
  const  setWatch = (key,method) => {

  }
  useEffect(()=>{
    
  },[])
  
  return (   
    <Router>
      
      <div className="panel" style={{backgroundColor:'white'}}>
        <div className="menu">
         {menus.map(item => <div className="menu-item" key={item.path} >
         <Link to={item.path}>{item.name}</Link>
            </div>)}
        </div>
        {params.count}
       
        <div className="content">
        <Route exact path="/" component={Home} />
        <Route exact path="/history" component={Home} />
        <Route exact path="/detail2" component={Home} />
         </div>
      </div>
    
    </Router>
  );
}
function Child({ callback }) {
  console.log('----------')
  console.log(callback())
  const [count, setCount] = useState(() => callback());
  useEffect(() => {
    console.log('-----233-----')
      setCount(callback());
  }, [callback]);
  return <div>
      {count}
  </div>
}
function Home() {
  const [count, setCount] = useState(1);
    const [val, setVal] = useState('');
 
    const callback = useCallback(() => {
        console.log('---aaaa---')
        return count;
    }, [count]);
    return <div>
        <h4>{count}</h4>
        <Child callback={callback}/>
        <div>
            <button onClick={() => setCount(count + 1)}>+</button>
            <input value={val} onChange={event => setVal(event.target.value)}/>
        </div>
    </div>;

}



function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}

export default App;