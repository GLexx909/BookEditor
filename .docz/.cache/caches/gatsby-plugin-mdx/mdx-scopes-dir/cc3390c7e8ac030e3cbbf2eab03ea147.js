import { Provider } from 'react-redux';
import { Playground } from "docz";
import { createStore } from 'redux';
import chaptersMock from "../../../../../src/mocks/chapters";
import reducer from "../../../../../src/redux/reducers/index";
import ChapterList from "../../../../../src/components/pages/Book/index";
import * as React from 'react';
export default {
  Provider,
  Playground,
  createStore,
  chaptersMock,
  reducer,
  ChapterList,
  React
};