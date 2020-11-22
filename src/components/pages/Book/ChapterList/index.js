import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo'

import ChapterList from './ChapterList'
import {
  addChapter,
  addSection,
  toggleSection,
  filterCompletedSections,
  filterNotCompletedSections,
  filterAllSections,
  sortChapters,
  sortSections
} from '../../../../redux/slices/chapters'

const filters = {
  FILTER_ALL_SECTIONS: () => true,
  FILTER_COMPLETED_SECTIONS: (sec) => sec.completed,
  FILTER_NOT_COMPLETED_SECTIONS: (sec) => !sec.completed
}

const mapStateToProps = ({ chapters }) => {
  return {
    chapters: chapters.present.entries.map((chapter) => (
      {...chapter, sections: chapter.sections.filter(filters[chapter.sectionFilter])}
    ))
  }
}

const mapDispatchToProps = {
  addChapter,
  addSection,
  toggleSection,
  filterCompletedSections,
  filterNotCompletedSections,
  filterAllSections,
  sortChapters,
  sortSections,
  undo: () => ActionCreators.undo()
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList)
