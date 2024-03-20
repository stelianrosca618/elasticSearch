import { FILTERS, ISFILTERUPDATE } from "./store";

export const filtersChange_Store = (params) => {
	return (dispatch) =>
		dispatch({ type: FILTERS, payload: params, });
}

export const filterUpdate_store = (params) => {
	return (dispatch) => 
		dispatch({type: ISFILTERUPDATE, payload: params });
}