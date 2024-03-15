import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import {
  BooleanFacet,
  SingleSelectFacet,
  SingleLinksFacet,
  SelectFacet,
  Facets,
  Autocomplete
} from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";

import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields
} from "./config/config-helper";

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new AppSearchAPIConnector({
  searchKey,
  engineName,
  hostIdentifier,
  endpointBase
});
const config = {
  searchQuery: {
    facets: buildFacetConfigFromConfig(),
    ...buildSearchOptionsFromConfig()
  },
  autocompleteQuery: buildAutocompleteQueryConfig(),
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true
};
console.log(buildSearchOptionsFromConfig(), buildFacetConfigFromConfig(), buildAutocompleteQueryConfig());
export default function App() {
  const filterOptionView = ({ className, label, onChange, onRemove, options }) => {
    console.log('options', options);
    const setFilterFact = (e) => {
      console.log(e.target.value); 
      if(e.target.value != 'Empty'){
        onChange(parseFloat(e.target.value))
      }else{
        onRemove(options[0].value);
      }
      
    }
    return (
      <select className="form-control" onChange={(e) => {setFilterFact(e)}}>
        <option style={{color: "gray"}}>Empty</option>
        {options.map((opItem, key) => (
          <option key={key} value={opItem.value} selected={opItem.selected}>{opItem.value}</option>
        ))}
      </select>
    )
  }
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched})}>
        {({ wasSearched }) => {
          // console.log(wasSearched, Results);
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={<SearchBox autocompleteSuggestions={true} />}
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting
                          label={"Sort by"}
                          sortOptions={buildSortOptionsFromConfig()}
                        />
                      )}
                      {getFacetFields().map((field, key) => (
                        <div key={key} className="form-group">
                          <label>{field}</label>
                          <Facet key={field} field={field} label={field} view={filterOptionView}/>
                        </div>
                        
                      ))}
                    </div>
                  }
                  bodyContent={
                    <>
                    
                    <Results
                      titleField={getConfig().titleField}
                      urlField={getConfig().urlField}
                      thumbnailField={getConfig().thumbnailField}
                      shouldTrackClickThrough={true}
                    />
                    </>
                    
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                    
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
