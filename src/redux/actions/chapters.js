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

export const sortChapters = (oldIndex, newIndex) => ({
  type: chaptersActions.SORT_CHAPTERS,
  payload: { oldIndex, newIndex }
})

export const sortSections = (chapterIndex, oldIndex, newIndex) => ({
  type: chaptersActions.SORT_SECTIONS,
  payload: { chapterIndex, oldIndex, newIndex }
})

export const moveSection = (oldChapterIndex, newChapterIndex, sectionIndex) => ({
  type: chaptersActions.MOVE_SECTION,
  payload: { oldChapterIndex, newChapterIndex, sectionIndex }
})
