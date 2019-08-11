import React, { useState } from 'react'
import { Tabs,Spin} from 'antd';
const { TabPane } = Tabs;

let tabKey = '1';
const tabPaneList = [
    { tab: '全部', key: '1' },
    { tab: '全部1', key: '2' },
    { tab: '全部2', key: '3' },
    { tab: '全部3', key: '4' },
]
const User = () => {
    const [activeKey,setActiveKey] = useState('1');
  
    const a =()=>{
        console.log(123)
        return(
            <div>123</div>
        )
    }
    const changeTabs = key=>tabKey = key;
    const TabPanes = () => {
        console.log(tabKey)
        return tabPaneList.map(({ tab, key }) => {
            return( 
                tabKey === key ?
                <TabPane tab={tab} key={key}> {a()} </TabPane> : <div>123</div>
            )
           
        })
    }
    return (
        <Tabs activeKey={activeKey} onChange={e=>setActiveKey(e)} type="card">
           {tabPaneList.map(pane => <TabPane tab={pane.tab} key={pane.key}>
             { activeKey === pane.key ?  <Spin spinning={true} delay={500} key={pane.key} ></Spin> : <div key={pane.key}>123</div>}
            </TabPane>)}
        </Tabs>
    )
}

export default User;