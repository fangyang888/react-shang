
import http from "helper/http";
import microservice from 'helper/microservice';
const host = microservice.javaAdmin;

const getCity = async(params)=>{
    const result = await http.get(`${host}/admin/store/area/search`,{params});
    if (result && result.data.errcode === 0) {
        return result.data.data;
    }
}
const getStore = async(params)=>{
   const result = await http.get(`${host}/admin/store/stores/search`, {
        params
    })
    if (result && result.data.errcode === 0) {
        return result.data.data;
    }
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