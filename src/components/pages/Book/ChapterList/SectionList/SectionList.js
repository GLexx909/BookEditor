import React from 'react'
import styles from './index.module.css'
import * as chapterActions from '../../../../../redux/actionTypes/chapters'

const SectionList = ({ sections, addNewSection, chapterIndex, toggleSectionReady, filterSections }) => {

  const showAll = () => filterSections(chapterIndex, chapterActions.FILTER_ALL_SECTIONS)
  const showCompleted = () => filterSections(chapterIndex, chapterActions.FILTER_COMPLETED_SECTIONS)
  const showNotCompleted = () => filterSections(chapterIndex, chapterActions.FILTER_NOT_COMPLETED_SECTIONS)

  return (
    <div className={styles.container}>
      <button onClick={() => showAll()}>All</button>
      <button onClick={() => showCompleted()}>Checked</button>
      <button onClick={() => showNotCompleted()}>Not Checked</button>
      {
        sections.length > 0 && sections.map((section, index) => (
          <div key={index} className={styles.sectionBlock} >
            <input type="checkbox" checked={section.completed} onChange={() => toggleSectionReady(chapterIndex, index)}/>
            <p>{section.text}</p>
          </div>
        ))
      }

      <form
        onSubmit={(e) => addNewSection(e, chapterIndex)}
      >
        <input className={styles.input} type="text" name="text"/>
        <button>Add section</button>
      </form>

    </div>
  )
}

export default SectionList
