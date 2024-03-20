import React, { useEffect, useState } from "react"; 
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

import indexJson from './config/index.json';

export const PageInfoView = (props) => {
  const storeData = useSelector((store) => store);
  const filters = useSelector((store) => store.mainData.filters );
  const isfilterUpdate = useSelector((store) => store.mainData.isfilterUpdate);
  console.log('pageInfor Pages', props, filters, storeData);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    loadTotalVal();
  }, [props])
  useEffect(() => {
    loadTotalVal();
  }, [filters, isfilterUpdate])
  const loadTotalVal = async () => {
    if(props.totalResults < 1000){
      setTotalItems(props.totalResults);
      
    }else{
      let payload = indexJson.request;
      let queryBool = {}
      if(props.searchTerm){
        queryBool = {...queryBool, must: {
          query_string: {
           query: props.searchTerm
          }
        }}
      }
      if(filters){
        let filterQuery = [];
        const filterKeys = Object.keys(filters);
        filterKeys.map(keyItem => {
          if(filters[keyItem]){
            filterQuery.push({term:{[`${keyItem}.keyword`]:filters[keyItem]}}) 
          }
        });
        if(filterQuery.length > 0){
          queryBool = {...queryBool, filter: filterQuery}
        }
      }
      console.log(payload);
      payload.query.bool = queryBool;
      // payload.query.query_string.query = props.searchTerm;
      const loadedData = await axios.post(indexJson.url, payload, {headers: {'Authorization': `ApiKey ${indexJson.apiKey}` }});
      console.log(loadedData);
      if(loadedData.status == 200){
        setTotalItems(loadedData.data.hits.total.value);
      }else{
        setTotalItems(props.totalResults);
      };
    }
  }
  return (
    <>
      <div>
        <span className="fw-bold">Total Items:</span>
        <span className="px-2">{totalItems} </span>
      </div>
    </>
  )
}
