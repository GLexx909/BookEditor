import React from 'react'
import styles from './index.module.css'

const SectionList = ({ sections, addNewSection, chapterIndex, toggleSectionReady }) => {

  return (
    <div className={styles.container}>
      {
        sections && sections.map((section, index) => (
          <div key={index}>
            <p>{section.text}</p>
            <input type="checkbox" onClick={() => toggleSectionReady(chapterIndex, index)}/>
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
