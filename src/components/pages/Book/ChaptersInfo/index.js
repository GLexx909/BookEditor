import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ chapters }) => {
  return { chapters }
}

const ChaptersInfo = ({ chapters }) => {

  return (
    <div>
      {
        chapters.length > 0 && chapters.map((chapter, index) => (
          <p key={index}>
            {chapter.text + '    имеет '}
            <b>{chapter.sections.length + ' подразделов'}</b>
          </p>
        ))
      }
    </div>
  )
}

export default connect(mapStateToProps)(ChaptersInfo)
