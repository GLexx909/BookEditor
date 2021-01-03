import ChapterList from "../../../../../src/components/pages/Book/index";
import { Playground } from "docz";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import chaptersMock from "../../../../../src/mocks/chapters";
import reducer from "../../../../../src/redux/reducers/index";
import * as React from 'react';
export default {
  ChapterList,
  Playground,
  createStore,
  Provider,
  chaptersMock,
  reducer,
  React
};