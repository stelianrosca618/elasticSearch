import React, { useEffect, useState } from "react"; 
import axios from "axios";

import indexJson from './config/index.json';

export const PageInfoView = (props) => {
  console.log('pageInfor Pages', props);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    loadTotalVal()
  }, [props])
  const loadTotalVal = async () => {
    if(props.totalResults < 1000){
      setTotalItems(props.totalResults);
      
    }else{
      let payload = indexJson.request;
      if(props.searchTerm !== ""){
        payload = {...indexJson.request, query: {query_string: {
          query: props.searchTerm 
         }}}
      }
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
