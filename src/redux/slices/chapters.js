import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from '../../helpers/httpClient'
import arrayMove from "array-move";
const BOOK = '5f9fae4bee7ecf5f00002310'

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  entries: []
}

export const fetchChapters = createAsyncThunk(
  'chapters/fetchAll',
  async () => {
    const response = await axiosClient.get('')
    return response.data[0].data
  }
)

export const postChapter = async (state) => {
  await axiosClient.put(
    BOOK,
    { data: JSON.stringify(state) }
  )
}

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
      state.entries = state.entries.concat({ text: action.payload, completed: false, sections: [], sectionFilter: 'FILTER_ALL_SECTIONS' })
      postChapter(state.entries)
    },

    addSection(state, action) {
      state.entries.map((chapter, index) => {
        if (index === action.payload.chapterIndex) {
          chapter.sections = chapter.sections.concat({text: action.payload.text, completed: false, modalOpen: false})
        }
      })
      postChapter(state.entries)
    },

    toggleSection(state, action) {
      const theChapter = state.entries[action.payload.chapterIndex]
      const theUncompletedSections =  theChapter.sections.filter((sec) => !sec.completed)
      const isSectionAlone = theUncompletedSections.length === 1
      const isChapterCompleted = isSectionAlone && theChapter.sections.indexOf(theUncompletedSections[0]) === action.payload.sectionIndex

      state.entries.map((chapter, index) => {
        if (index === action.payload.chapterIndex) {
          chapter.sections = mapSectionToggle(chapter, action.payload.sectionIndex)
          chapter.completed = isChapterCompleted
        }
      })
      postChapter(state.entries)
    },

    sortChapters(state, action) {
      state.entries = arrayMove(state.entries, action.payload.oldIndex, action.payload.newIndex)
      postChapter(state.entries)
    },

    sortSections(state, action) {
      state.entries.map((chapter, index) => {
        if (index === action.payload.chapterIndex) {
          chapter.sections = arrayMove(chapter.sections, action.payload.oldIndex, action.payload.newIndex)
        }
      })
      postChapter(state.entries)
    },

    moveSection(state, action) {
      const sectionObject = state.entries[action.payload.oldChapterIndex].sections[action.payload.sectionIndex]

      state.entries.map((chapter, index) => {
        if (index === action.payload.oldChapterIndex) {
          chapter.sections = chapter.sections.filter((_, index) => index !== action.payload.sectionIndex)
        } else if (index === action.payload.newChapterIndex) {
          chapter.sections = chapter.sections.concat(sectionObject)
        }
      })

      state.entries.map((chapter, index) => {
        if (index === action.payload.oldChapterIndex) {
          chapter.completed = isAnyUncompletedSectionPresent(chapter)
        } else if (index === action.payload.newChapterIndex) {
          chapter.completed =  isAnyUncompletedSectionPresent(chapter)
        }
      })

      postChapter(state.entries)
    },

    filterCompletedSections(state, action) {
      state.entries.map((chapter, index) => {
        if (index === action.payload.chapterIndex) {
          chapter.sectionFilter = 'FILTER_COMPLETED_SECTIONS'
        }
      })
    },

    filterNotCompletedSections(state, action) {
      state.entries.map((chapter, index) => {
        if (index === action.payload.chapterIndex) {
          chapter.sectionFilter = 'FILTER_NOT_COMPLETED_SECTIONS'
        }
      })
    },

    filterAllSections(state, action) {
      state.entries.map((chapter, index) => {
        if (index === action.payload.chapterIndex) {
          chapter.sectionFilter = 'FILTER_ALL_SECTIONS'
        }
      })
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
