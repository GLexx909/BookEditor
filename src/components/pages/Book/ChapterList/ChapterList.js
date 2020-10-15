import React from 'react'
import styles from './index.module.css'
import SectionList from "./SectionList/SectionList";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const ChapterList = ({ chapters, addChapter, addSection, toggleSection, filterSections, sortChapters, sortSections }) => {

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

  const onSortEnd = ({oldIndex, newIndex}) => {
    sortChapters(oldIndex, newIndex)
  };

  const SortableChapter = SortableElement(({ chapter, chapterIndex }) => (
      <li>
        <p className={styles.chapterTitle}>
          {chapter.text}
          {chapter.completed && <b>_________________ЗАВЕРШЕНО</b>}
        </p>
        <SectionList
          sections={chapter.sections}
          addNewSection={addNewSection}
          toggleSectionReady={toggleSectionReady}
          filterSections={filterSections}
          sortSections={sortSections}
          chapterIndex={chapterIndex}/>
      </li>
  ))

  const SortableList = SortableContainer(() => {
    return (
      <ul>
        { chapters && chapters.map((chapter, index) => (
          <SortableChapter key={index} chapter={chapter} index={index} chapterIndex={index}/>
        ))}
      </ul>
    );
  });

  return (
    <div className={styles.container}>
      <SortableList onSortEnd={onSortEnd} />

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
