import { mainStore } from './mainReducer';


function rootReducer(state = {}, action) {
	return {
		mainData: mainStore(state.mainData, action),
	};
}
export default rootReducer;
