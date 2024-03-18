import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import Select from 'react-select'
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
  MultiCheckboxFacet,
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

import {FilterOptionView} from './FilterOptionView';
import { PageInfoView } from "./PageInfoView";
import { ResultsPerPageView } from "./ResultPerPageView";

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
  
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched})}>
        {({ wasSearched }) => {
          // console.log(wasSearched, Results);
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <>
                    <div className="real-sui-layout-header">
                      <SearchBox autocompleteSuggestions={true} />
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-4">
                      {wasSearched && <PagingInfo view={PageInfoView} />}
                      {wasSearched && <ResultsPerPage label="Items per Page"/>}
                    </div>
                    
                      
                    </>
                  }
                  
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
                          <Facet key={field} isFilterable={true} field={field} show={100} label={field} view={FilterOptionView}/>
                        </div>
                      ))}
                    </div>
                  }
                  bodyContent={
                    <>
                      <Results
                        titleField="title"
                        urlField="nps_link"
                        thumbnailField="image_url"
                        shouldTrackClickThrough
                      />
                    </>
                    
                  }
                  bodyHeader={
                    <>
                      <React.Fragment>
                      </React.Fragment>
                    </>
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
