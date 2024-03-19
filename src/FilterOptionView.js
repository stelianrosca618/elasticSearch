import React, { useEffect, useState } from "react";
import Select from 'react-select'

export const FilterOptionView = ({ className, label, onChange, onRemove, options, values }) =>  {
    console.log('options', options, values, label);
    const [showOptions, setShowOptions] = useState([]);
    const [selectedVal, setSelectedVal] = useState(null);
    const [showLabel, setShowLabel] = useState('');

    useEffect(() => {
      // label.replace("_", " ").toUpperCase();
      switch(label){
        case 'applications':
          setShowLabel('Application');
          break;
        case 'technologies':
          setShowLabel('Technology');
          break;
        case 'item_type':
          setShowLabel('Type');
          break;
        case 'organisation_name':
          setShowLabel('Organisation');
          break;
        case 'country':
          setShowLabel('Country');
          break;
        case 'filter_date':
          setShowLabel('date');
          break;
      }
      // setShowLabel(label.replace("_", " ").toUpperCase());
    }, [label])

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
          <Select placeholder={showLabel} isClearable={true} value={selectedVal} options={showOptions} onChange={onSelectChanged} />
        </>
      )
    }