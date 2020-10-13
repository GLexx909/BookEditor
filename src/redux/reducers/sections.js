// const initialState = []
//
// export const filteredSections = function (state = initialState, action) {
//
//   switch (action.type) {
//
//     case 'FILTER_COMPLETED_SECTIONS':
//       return state.map((chapter, index) => (
//         index === action.payload.chapterIndex
//           ? {...chapter, sections: chapter.sections.filter(sec => sec.completed)}
//           : chapter
//       ))
//
//     case 'FILTER_NOT_COMPLETED_SECTIONS':
//       return state.map((chapter, index) => (
//         index === action.payload.chapterIndex
//           ? {...chapter, sections: chapter.sections.filter(sec => !sec.completed)}
//           : chapter
//       ))
//
//     case 'FILTER_ALL_SECTIONS':
//       return state.map((chapter, index) => (
//         index === action.payload.chapterIndex
//           ? {...chapter, sections: chapter.sections}
//           : chapter
//       ))
//
//     default:
//       return state
//   }
// }
