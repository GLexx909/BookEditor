import * as sectionsActions from '../actionTypes/sections'

export const addSection = (text) => ({
  type: sectionsActions.ADD_SECTION,
  text
})
