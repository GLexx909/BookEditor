import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import {chapterPath} from "../../../helpers/routes";

const Chapter = ({ chapter, isLoading }) => (
  isLoading
  ? <div>LOADING...</div>
  : <div>
      <Link  to={'/'}>BACK</Link>
      <p>НАЗВАНИЕ ГЛАВЫ:</p>
      {chapter.text}
    </div>
)

const ChapterContainer = connect(
  (state, ownProps) => ({
    isLoading: state.chapters.present.isLoading,
    chapter: state.chapters.present.entries[ownProps.match.params.id]
  })
)(Chapter)

export default ChapterContainer
