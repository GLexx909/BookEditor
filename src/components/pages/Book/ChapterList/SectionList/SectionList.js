import React from 'react'
import styles from './index.module.css'
import * as chapterActions from '../../../../../redux/actionTypes/chapters'

const SectionList = ({ sections, addNewSection, chapterIndex, toggleSectionReady, filterSections }) => {

  return (
    <div className={styles.container}>
      <button onClick={() => filterSections(chapterIndex, chapterActions.FILTER_ALL_SECTIONS)}>All</button>
      <button onClick={() => filterSections(chapterIndex, chapterActions.FILTER_COMPLETED_SECTIONS)}>Checked</button>
      <button onClick={() => filterSections(chapterIndex, chapterActions.FILTER_NOT_COMPLETED_SECTIONS)}>Not Checked</button>
      {
        sections && sections.map((section, index) => (
          <div key={index} className={styles.sectionBlock} >
            <input type="checkbox" defaultChecked={section.completed} onClick={() => toggleSectionReady(chapterIndex, index)}/>
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
