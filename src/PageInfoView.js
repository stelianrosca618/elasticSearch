import React, { useEffect, useState } from "react"; 
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

import indexJson from './config/index.json';

export const PageInfoView = (props) => {
  const storeData = useSelector((store) => store);
  const filters = useSelector((store) => store.mainData.filters );
  const isfilterUpdate = useSelector((store) => store.mainData.isfilterUpdate);
  const [filterData, setFilterData] = useState({});
  const [filterIds, setFilterIds] = useState([])

  console.log('pageInfor Pages', props, filters, storeData);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    setFilterData(filters)
    setFilterIds(Object.keys(filters));
    loadTotalVal();
  }, [props])
  useEffect(() => {
    setFilterData(filters)
    setFilterIds(Object.keys(filters));
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
            filters[keyItem].map(fItem => {
              filterQuery.push({term:{[`${keyItem}.keyword`]:fItem}}) 
            })
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
    <div className="text-start">
      <div>
        <span className="fw-bold">Total Items:</span>
        <span className="px-2">{totalItems} </span>
      </div>
      <div>
        <span className="fw-bold">Filters:</span>
       {filterIds.map((idItem, key) => (
        filterData[idItem] &&
          <span className="px-1">[ {filterData[idItem].join(' OR ').toString()} ] {key < (filterIds.length - 1) && 'AND' }</span>
        ))}
        
      </div>
    </div>
      
    </>
  )
}
