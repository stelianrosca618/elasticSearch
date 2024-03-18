import React, { useEffect, useState } from "react";
import Select from 'react-select'

export const FilterOptionView = ({ className, label, onChange, onRemove, options, values }) =>  {
    console.log('options', options, values);
    const [showOptions, setShowOptions] = useState([]);
    const [selectedVal, setSelectedVal] = useState(null);
    useEffect(()=> {
      let tmpOpList = [];
      options.map(opItem =>{
        if(opItem.selected){
          setSelectedVal({ value: opItem.value, label: opItem.value })
        }
        tmpOpList.push({ value: opItem.value, label: opItem.value })
      });
      setShowOptions(tmpOpList);
    }, [options])
    const setFilterFact = (e) => {
      console.log(e.target.value); 
      if(e.target.value != 'Empty'){
        onChange(parseFloat(e.target.value))
      }else{
        onRemove(options[0].value);
      }
      
    }
    const onSelectChanged = (e) => {
        console.log(e);
        setSelectedVal(e);
        if(e){
            onChange(e.value)
        }else{
            onRemove(options[0].value)
        }
        
    }
    
    return (
        <>
          <Select placeholder={label} isClearable={true} value={selectedVal} options={showOptions} onChange={onSelectChanged} />
        </>
      )
    }