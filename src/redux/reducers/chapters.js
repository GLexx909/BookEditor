const initialState = []

const mapSectionToggle = (chapter, sectionIndex) => {
  return chapter.sections.map((section, index) => (
    index === sectionIndex
      ? { ...section, completed: !section.completed }
      : section
  ))
}

export const chapters = function (state = initialState, action) {

  switch (action.type) {

    case 'ADD_CHAPTER':
      return state.concat({ text: action.text, completed: false, sections: [] })
    case 'ADD_SECTION':
      return state.map((chapter, index) => (
        index === action.payload.chapterIndex
          ? {...chapter, sections: chapter.sections.concat({text: action.payload.text, completed: false})}
          : chapter
      ))

    case 'TOGGLE_SECTION':
      const theChapter = state[action.payload.chapterIndex]
      const theUncompletedSections =  theChapter.sections.filter((sec, index) => !sec.completed)
      const isSectionAlone = theUncompletedSections.length === 1

      const isChapterCompleted = isSectionAlone && theChapter.sections.indexOf(theUncompletedSections[0]) === action.payload.sectionIndex

      console.log(isSectionAlone)
      console.log(theChapter.sections.indexOf(theUncompletedSections[0]) === action.payload.sectionIndex)

      return state.map((chapter, index) => (
        index === action.payload.chapterIndex
          ? {...chapter, sections: mapSectionToggle(chapter, action.payload.sectionIndex), completed: isChapterCompleted }
          : chapter
      ))

    default:
      return state
  }
}
