import { connect } from 'react-redux'

import ChapterList from './ChapterList'
import { addChapter, addSection, toggleSection, filterSections } from '../../../../redux/actions/chapters'

const filters = {
  FILTER_ALL_SECTIONS: () => true,
  FILTER_COMPLETED_SECTIONS: (sec) => sec.completed,
  FILTER_NOT_COMPLETED_SECTIONS: (sec) => !sec.completed
}

const mapStateToProps = ({ chapters }) => (
  {
    chapters: chapters.map((chapter) => (
      { ...chapter, sections: chapter.sections.filter(filters[chapter.sectionFilter]) }
    ))
  }
)

const mapDispatchToProps = {
  addChapter,
  addSection,
  toggleSection,
  filterSections
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList)
