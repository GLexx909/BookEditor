import { connect } from 'react-redux'

import ChapterList from './ChapterList'
import { addChapter, addSection, toggleSection, filterSections } from '../../../../redux/actions/chapters'

const mapStateToProps = ({ chapters }) => {
  return { chapters }
}

const mapDispatchToProps = {
  addChapter,
  addSection,
  toggleSection,
  filterSections
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList)
