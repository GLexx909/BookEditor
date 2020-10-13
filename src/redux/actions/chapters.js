import * as chaptersActions from '../actionTypes/chapters'

export const addChapter = (text) => ({
  type: chaptersActions.ADD_CHAPTER,
  text
})

export const addSection = (text, chapterIndex) => ({
  type: chaptersActions.ADD_SECTION,
  payload: { text, chapterIndex }
})

export const toggleSection = (chapterIndex, sectionIndex) => ({
  type: chaptersActions.TOGGLE_SECTION,
  payload: { chapterIndex, sectionIndex }
})

export const filterSections = (chapterIndex, type) => ({
  type: type,
  payload: { chapterIndex }
})
