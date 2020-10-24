import arrayMove from 'array-move';

const initialState = []

const mapSectionToggle = (chapter, sectionIndex) => {
  return chapter.sections.map((section, index) => (
    index === sectionIndex
      ? { ...section, completed: !section.completed }
      : section
  ))
}

const mapSectionModalToggle = (chapter, sectionIndex) => {
  return chapter.sections.map((section, index) => (
    index === sectionIndex
      ? { ...section, modalOpen: !section.modalOpen }
      : section
  ))
}

const isAnyUncompletedSectionPresent = (chapter) => {
  const sections = chapter.sections
  const isAnyNotCompletedSection = sections.filter(section => !section.completed).length > 0

  return sections.length > 0 && !isAnyNotCompletedSection
}


export const chapters = function (state = initialState, action) {

  switch (action.type) {

    case 'ADD_CHAPTER':
      return state.concat({ text: action.text, completed: false, sections: [], sectionFilter: 'FILTER_ALL_SECTIONS' })
    case 'ADD_SECTION':
      return state.map((chapter, index) => (
        index === action.payload.chapterIndex
          ? {...chapter, sections: chapter.sections.concat({text: action.payload.text, completed: false, modalOpen: false})}
          : chapter
      ))

    case 'TOGGLE_SECTION':
      const theChapter = state[action.payload.chapterIndex]
      const theUncompletedSections =  theChapter.sections.filter((sec) => !sec.completed)
      const isSectionAlone = theUncompletedSections.length === 1

      const isChapterCompleted = isSectionAlone && theChapter.sections.indexOf(theUncompletedSections[0]) === action.payload.sectionIndex

      return state.map((chapter, index) => (
        index === action.payload.chapterIndex
          ? {...chapter, sections: mapSectionToggle(chapter, action.payload.sectionIndex), completed: isChapterCompleted }
          : chapter
      ))

    case 'FILTER_COMPLETED_SECTIONS':
      return state.map((chapter, index) => (
        index === action.payload.chapterIndex
          ? {...chapter, sectionFilter: 'FILTER_COMPLETED_SECTIONS'}
          : chapter
      ))

    case 'FILTER_NOT_COMPLETED_SECTIONS':
      return state.map((chapter, index) => (
        index === action.payload.chapterIndex
          ? {...chapter, sectionFilter: 'FILTER_NOT_COMPLETED_SECTIONS'}
          : chapter
      ))

    case 'FILTER_ALL_SECTIONS':
      return state.map((chapter, index) => (
        index === action.payload.chapterIndex
          ? {...chapter, sectionFilter: 'FILTER_ALL_SECTIONS'}
          : chapter
      ))

    case 'SORT_CHAPTERS':
      return (
        arrayMove(state, action.payload.oldIndex, action.payload.newIndex)
      )

    case 'SORT_SECTIONS':
      return state.map((chapter, index) => (
        index === action.payload.chapterIndex
          ? {...chapter, sections: arrayMove(chapter.sections, action.payload.oldIndex, action.payload.newIndex) }
          : chapter
      ))

    case 'ON_DROP_SECTION':
      const sectionObject = state[action.payload.oldChapterIndex].sections[action.payload.sectionIndex]

      return state.map((chapter, index) => {
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

    case 'RECALCULATE_CHAPTER_COMPLETED':
      return state.map((chapter, index) => {
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

    default:
      return state
  }
}
