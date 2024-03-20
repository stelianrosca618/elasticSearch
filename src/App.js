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

import configureStore from './store';
import { mainData } from "./store/store";
import {FilterOptionView} from './FilterOptionView';
import { PageInfoView } from "./PageInfoView";
import { ResultsPerPageView } from "./ResultPerPageView";
import {ResultsView} from "./ResultsView";
import { Provider } from "react-redux";
window.filters = {};
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
    ...buildSearchOptionsFromConfig(),
  },
  autocompleteQuery: buildAutocompleteQueryConfig(),
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
};
const InitialData = {
  mainData: mainData
}
// console.log(buildSearchOptionsFromConfig(), buildFacetConfigFromConfig(), buildAutocompleteQueryConfig());
export default function App() {
  
  return (
    <Provider store={configureStore(InitialData)} >
<SearchProvider config={config}>
      <WithSearch  mapContextToProps={({ wasSearched }) => ({ wasSearched})}>
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <>
                      <div className="real-sui-layout-header">
                        <SearchBox className="sui-layout-body__inner" autocompleteSuggestions={true} />
                      </div>
                      <div className="sui-layout-body__inner d-flex justify-content-between align-items-center p-4">
                        {wasSearched && <PagingInfo view={PageInfoView} />}
                        {wasSearched && <ResultsPerPage label="Items per Page"/>}
                      </div>
                    </>
                  }
                  
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting
                          className="pb-2"
                          label={"Sort by"}
                          sortOptions={buildSortOptionsFromConfig()}
                        />
                      )}
                      {getFacetFields().map((field, key) => (
                        <div key={key} className="form-group py-2">
                          {/* <label>{field}</label> */}
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
                        resultView={ResultsView}
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
    </Provider>
    
  );
}
