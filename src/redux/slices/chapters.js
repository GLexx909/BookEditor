import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import arrayMove from "array-move";

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  entries: []
}

export const fetchChapters = createAsyncThunk(
  'chapters/fetchAll',
  async () => {
    const response = await axios({
      method: 'GET',
      url: 'https://chapters-5dc5.restdb.io/rest/chapters?key=d124f06e3d67b525dcb881b81052eebf4c499',
      headers: {
        'x-apikey': '5f9fbf8e231ba42851b4a072'
      }
    })

    return response.data[0].data
  }
)

const mapSectionToggle = (chapter, sectionIndex) => {
  return chapter.sections.map((section, index) => (
    index === sectionIndex
      ? { ...section, completed: !section.completed }
      : section
  ))
}

const isAnyUncompletedSectionPresent = (chapter) => {
  const sections = chapter.sections
  const isAnyNotCompletedSection = sections.filter(section => !section.completed).length > 0

  return sections.length > 0 && !isAnyNotCompletedSection
}

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    addChapter(state, action) {
      return {
        ...state,
        entries: state.entries.concat({ text: action.payload, completed: false, sections: [], sectionFilter: 'FILTER_ALL_SECTIONS' })
      }
    },

    addSection(state, action) {
      return {
        ...state,
        entries: state.entries.map((chapter, index) => {
          return index === action.payload.chapterIndex
            ? {
              ...chapter,
              sections: chapter.sections.concat({text: action.payload.text, completed: false, modalOpen: false})
            }
            : chapter
        })
      }
    },

    toggleSection(state, action) {
      const theChapter = state.entries[action.payload.chapterIndex]
      const theUncompletedSections =  theChapter.sections.filter((sec) => !sec.completed)
      const isSectionAlone = theUncompletedSections.length === 1
      const isChapterCompleted = isSectionAlone && theChapter.sections.indexOf(theUncompletedSections[0]) === action.payload.sectionIndex

      return {
        ...state,
        entries: state.entries.map((chapter, index) => (
          index === action.payload.chapterIndex
            ? {...chapter, sections: mapSectionToggle(chapter, action.payload.sectionIndex), completed: isChapterCompleted }
            : chapter
        ))
      }
    },

    sortChapters(state, action) {
      return {
        ...state,
        entries: arrayMove(state.entries, action.payload.oldIndex, action.payload.newIndex)
      }
    },

    sortSections(state, action) {
      return {
        ...state,
        entries: state.entries.map((chapter, index) => (
          index === action.payload.chapterIndex
            ? {...chapter, sections: arrayMove(chapter.sections, action.payload.oldIndex, action.payload.newIndex) }
            : chapter
        ))
      }
    },

    moveSection(state, action) {
      const sectionObject = state.entries[action.payload.oldChapterIndex].sections[action.payload.sectionIndex]

      const newState = state.entries.map((chapter, index) => {
        if (index === action.payload.oldChapterIndex) {
          return {
            ...chapter,
            sections: chapter.sections.filter((_, index) => index !== action.payload.sectionIndex)
          }
        } else if (index === action.payload.newChapterIndex) {
          return {
            ...chapter,
            sections: chapter.sections.concat(sectionObject)
          }
        } else {
          return chapter
        }
      })

      return {
        ...newState,
        entries: newState.map((chapter, index) => {
          if (index === action.payload.oldChapterIndex) {
            return {
              ...chapter,
              completed: isAnyUncompletedSectionPresent(chapter)
            }
          } else if (index === action.payload.newChapterIndex) {
            return {
              ...chapter,
              completed: isAnyUncompletedSectionPresent(chapter)
            }
          } else {
            return chapter
          }
        })
      }
    },

    filterCompletedSections(state, action) {
      return {
        ...state,
        entries: state.entries.map((chapter, index) => (
          index === action.payload.chapterIndex
            ? {...chapter, sectionFilter: 'FILTER_COMPLETED_SECTIONS'}
            : chapter
        ))
      }
    },

    filterNotCompletedSections(state, action) {
      return {
        ...state,
        entries: state.entries.map((chapter, index) => (
          index === action.payload.chapterIndex
            ? {...chapter, sectionFilter: 'FILTER_NOT_COMPLETED_SECTIONS'}
            : chapter
        ))
      }
    },

    filterAllSections(state, action) {
      return {
        ...state,
        entries: state.entries.map((chapter, index) => (
          index === action.payload.chapterIndex
            ? {...chapter, sectionFilter: 'FILTER_ALL_SECTIONS'}
            : chapter
        ))
      }
    }

  },

  extraReducers: {
    [fetchChapters.pending]: (state, action) => ({
      ...state,
      isLoading: true
    }),
    [fetchChapters.fulfilled]: (state, action) => ({
      ...initialState,
      entries: action.payload
    })
  }
})

export const {
  addChapter,
  addSection,
  toggleSection,
  sortChapters,
  sortSections,
  moveSection,
  filterCompletedSections,
  filterNotCompletedSections,
  filterAllSections
} = chaptersSlice.actions

export default chaptersSlice.reducer
