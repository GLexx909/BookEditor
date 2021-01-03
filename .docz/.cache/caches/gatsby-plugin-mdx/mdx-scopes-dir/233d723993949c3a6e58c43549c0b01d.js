import { Provider } from 'react-redux';
import ChapterList from "../../../../../src/components/pages/Book/index";
import { Playground } from "docz";
import { createStore } from 'redux';
import chaptersMock from "../../../../../src/mocks/chapters";
import reducer from "../../../../../src/redux/reducers/index";
import * as React from 'react';
export default {
  Provider,
  ChapterList,
  Playground,
  createStore,
  chaptersMock,
  reducer,
  React
};