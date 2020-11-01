import React from 'react'
import styles from './index.module.css'
import * as chapterActions from '../../../../../redux/actionTypes/chapters'
import DragToNewChapterModal from "./DragToNewCaptureModal/DragToNewChapterModal";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const SectionList = ({ sections, addNewSection, chapterIndex, toggleSectionReady, filterSections, sortSections }) => {

  const showAll = () => filterSections(chapterIndex, chapterActions.FILTER_ALL_SECTIONS)
  const showCompleted = () => filterSections(chapterIndex, chapterActions.FILTER_COMPLETED_SECTIONS)
  const showNotCompleted = () => filterSections(chapterIndex, chapterActions.FILTER_NOT_COMPLETED_SECTIONS)

  const onSortEnd = ({oldIndex, newIndex}) => {
    sortSections(chapterIndex, oldIndex, newIndex)
  };

  const SortableChapter = SortableElement(({ section, sectionIndex }) => (
    <div key={sectionIndex} className={styles.sectionBlock} >
      <input type="checkbox" checked={section.completed} onChange={() => toggleSectionReady(chapterIndex, sectionIndex)}/>
      <p>{section.text}</p>
      <DragToNewChapterModal chapterIndex={chapterIndex} isModalOpen={section.modalOpen} sectionIndex={sectionIndex}/>
    </div>
  ))

  const SortableList = SortableContainer(() => {
    return (
      <div>
        {
          sections.length > 0 && sections.map((section, index) => (
            <SortableChapter key={index} section={section} index={index} sectionIndex={index}/>
          ))
        }
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <button onClick={() => showAll()}>All</button>
      <button onClick={() => showCompleted()}>Checked</button>
      <button onClick={() => showNotCompleted()}>Not Checked</button>

      <SortableList onSortEnd={onSortEnd} />

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
