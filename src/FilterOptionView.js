import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select'
import { filtersChange_Store, filterUpdate_store } from "./store/action";


export const FilterOptionView = ({ className, label, onChange, onRemove, options, values }) =>  {
    const [showOptions, setShowOptions] = useState([]);
    const [selectedVal, setSelectedVal] = useState(null);
    const [showLabel, setShowLabel] = useState('');
    const filters = useSelector((store) => store.mainData.filters );
    const isfilterUpdate = useSelector((store) => store.mainData.isfilterUpdate);
    const dispatch = useDispatch()
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
          let tempFilters = {};
          if(filters){
            tempFilters = Object.assign(filters, {[label]: opItem.value});
          }else{
            tempFilters = {[label]: opItem.value}
          }
          dispatch(filtersChange_Store(tempFilters))
          // dispatch(filterUpdate_store(!isfilterUpdate))
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
        console.log('checingFilter', filters);
        setSelectedVal(e);
        if(e){
          let tempFilters = {};
          if(filters){
            tempFilters = Object.assign(filters, {[label]: e.value});
          }else{
            tempFilters = {[label]: e.value}
          }
            dispatch(filtersChange_Store(tempFilters))
            dispatch(filterUpdate_store(!isfilterUpdate))
            filtersChange_Store()
            onChange(e.value)
            
        }else{
          let tempFilters = {};
          if(filters){
            tempFilters = Object.assign(filters, {[label]: ''});
          }else{
            tempFilters = {[label]: ''}
          }
            dispatch(filtersChange_Store(tempFilters))
            dispatch(filterUpdate_store(!isfilterUpdate))
            onRemove(options[0].value)
        }
        
    }
    
    return (
        <>
          <Select placeholder={showLabel} isClearable={true} value={selectedVal} options={showOptions} onChange={onSelectChanged} />
        </>
      )
    }