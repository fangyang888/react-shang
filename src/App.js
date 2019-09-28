import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import { Button } from "antd";
import {Link,Route,Switch} from 'react-router-dom'
import Loadable from 'react-loadable'
import RouterGuard from './components/public/RouterGuard'
const { SubMenu } = Menu;
const  menuList =[
  {key:'1',title:'个人中心',path:'/',component:'user'},
  {key:'2',title:'房源管理',path:'/listing',component:'listing',children:[
    {key:'2-1',title:'集中式',path:'/listing/focus',children:[
      {key:'2-1-1',title:'待发布房源',path:'/listing/focus/release'},
      {key:'2-2-2',title:'待完善房源',path:'/listing/focus/perfect'},
    ]},
    {key:'2-2',title:'分散式',path:'/listing/disperse'},
  ]},
  {key:'3',title:'销售管理',path:'/sale',component:'sale',children:[
    {key:'3-1',title:'预约单',path:'/sale/book'}
  ]},
  {key:'4',title:'服务管理',path:'/serve',component:'serve'},
]

const routerRender = routers=>{
   return  routers.map((router,index)=>{
      return  <Route exact  key={index} path={router.path} render={props => (
           <RouterGuard key={index} {...props} {...router}></RouterGuard>
          
       )}
       />
     
  })
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'inline',
      theme: 'light',
    };
  }
  componentDidMount(){
    const obj = {}
   const sym = Symbol('a');
   obj[sym] = 'syj';
   console.log(obj)
  }
  onTitleClick = (e) =>{
    console.log('click ', e);
  }
  onClickMenu=e=>{
    console.log(e)
  }
  getMenuList(list){
    return(
      list.map(({key,title,children,path},index)=>{
        if(children){
          return(
            <SubMenu onTitleClick={this.onTitleClick.bind(this,title)}  key={key} title={title}>
              {this.getMenuList(children)} 
            </SubMenu>
          )
        }else{
          return( <Menu.Item   key={key} > 
            <Link to={path}>{title}</Link>
          </Menu.Item>)
        }
      })
    )
  }
 render() {
   
    return (
      <div className="app-menu">
         <Menu
          style={{ width: 256,height:'100%' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme={this.state.theme}
          onClick={this.onClickMenu}
        >
         {this.getMenuList(menuList)}
        </Menu>
        <div className="content" style={{width:'100%'}}>
          hello react
          {/* {routerRender(menuList)} */}
          <Switch>
          
            {routerRender(menuList)}
          </Switch>
        </div>
      </div>
      
   
    );
  }
}
export default App;
