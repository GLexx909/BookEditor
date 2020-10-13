import React from 'react'
import styles from './index.module.css'
import SectionList from "./SectionList/SectionList";

const ChapterList = ({ chapters, addChapter, addSection, toggleSection, filterSections }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    addChapter(e.target.text.value)
    e.target.text.value = ''
  }

  const addNewSection = (e, chapterIndex) => {
    e.preventDefault()
    addSection(e.target.text.value, chapterIndex)
    e.target.text.value = ''
  }

  const toggleSectionReady = (chapterIndex, sectionIndex) => {
    toggleSection(chapterIndex, sectionIndex)
  }

  const filters = {
    FILTER_ALL_SECTIONS: () => true,
    FILTER_COMPLETED_SECTIONS: (sec) => sec.completed,
    FILTER_NOT_COMPLETED_SECTIONS: (sec) => !sec.completed
  }

  const filteredSections = (chapter) => (
    chapter.sections.filter(filters[chapter.sectionFilter])
  )

  return (
    <div className={styles.container}>
      {
        chapters && chapters.map((chapter, index) => (
          <div key={index}>
            <p className={styles.chapterTitle}>
              {chapter.text}
              {chapter.completed && <b>_________________ЗАВЕРШЕНО</b>}
            </p>
            <SectionList
              sections={filteredSections(chapter)}
              addNewSection={addNewSection}
              toggleSectionReady={toggleSectionReady}
              filterSections={filterSections}
              chapterIndex={index}/>
          </div>
        ))
      }

      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles.form}
      >
        <input type="text" name="text"/>
        <button>Add chapter</button>
      </form>

    </div>
  )
}

export default ChapterList
