import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { chapterPath } from '../../../../helpers/routes'

const mapStateToProps = ({ chapters }) => {
  return { chapters: chapters.present.entries }
}

const ChaptersInfo = ({ chapters }) => {

  return (
    <div>
      {
        chapters.length > 0 && chapters.map((chapter, index) => (
          <div key={index}>
            <Link  to={chapterPath(index)}>
              <p >
                {chapter.text + '    имеет '}
              </p>
            </Link>
            <b>{chapter.sections.length} подразделов</b>
          </div>
        ))
      }
    </div>
  )
}

export default connect(mapStateToProps)(ChaptersInfo)
