import { FILTERS, ISFILTERUPDATE } from "./store"; 

export const mainStore = (state = {}, action) => {
	switch (action.type) {
		case FILTERS: {
			return { ...state, filters: action.payload }
		}
		case ISFILTERUPDATE: {
			return { ...state, isfilterUpdate: action.payload}
		}
		default: {
			return { ...state };
		}
	}
};
