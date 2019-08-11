import React from "react";
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import './serve.css'
const menus=[{name:'概况',path:'/'},{name:'历史订单',path:'/history'},{name:'详情',path:'/detail2'}]
function App() {
  return (
    <Router>
      
      <div className="panel">
        <div className="menu">
         {menus.map(item => <div className="menu-item" key={item.path} >
         <Link to={item.path}>{item.name}</Link>
            </div>)}
        </div>
        <div className="content">
        <Route exact path="/" component={Home} />
        <Route exact path="/history" component={Home} />
        <Route exact path="/detail2" component={Home} />
         </div>
      </div>
    
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
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