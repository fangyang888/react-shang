
// import http from "helper/http";
// import microservice from 'helper/microservice';
// const host = microservice.javaAdmin;
import {dataList} from './data2';
const getCity = async(params)=>{
    // const result = await http.get(`${host}/admin/store/area/search`,{params});
    // if (result && result.data.errcode === 0) {
    //     return result.data.data;
    // }
}
const getStore = (params)=>{
  //  const result = await http.get(`${host}/admin/store/stores/search`, {
  //       params
  //   })
    console.log('iiiiiiiiiiiiiiiii')
    if (dataList && dataList.errcode === 0) {
       const list = dataList.data;
       const { area_stores } = list;
       console.log('==================')
       console.log(area_stores)
       if(area_stores && area_stores.length > 0){
         return getStoreTypeList(area_stores)
       }else{
         return [];
       }
    }else {
      return [];  
    }
}
const getStoreTypeList = list => {
    return list.map(({city,city_zip,stores}) =>{
       let obj = {title:city,key:city_zip,value:city_zip,label:city,children:[]};
       if(stores && stores.length > 0 ){
         stores.map(({abbr_name,code})=>{
            let store = {title:abbr_name,key:code,value:code,label:abbr_name};
            return obj.children.push(store);
         })
       }
       return obj;
    })
} 
const SELECT_TYPE_ALL = 20;
const SELECT_TYPE_CITY = 10;
const SELECT_TYPE_STORE = 0;
const STORE_TYPE_ALL = -1;
const STORE_TYPE_NORMAL = 0;
const STORE_TYPE_DC = 1;

export {
  getCity,
  getStore,
  SELECT_TYPE_ALL,
  SELECT_TYPE_CITY,
  SELECT_TYPE_STORE,
  STORE_TYPE_ALL,
  STORE_TYPE_NORMAL,
  STORE_TYPE_DC
}