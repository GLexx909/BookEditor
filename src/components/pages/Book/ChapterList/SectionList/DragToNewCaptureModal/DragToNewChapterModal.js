import React from 'react'
import ReactDOM from 'react-dom'
import styles from './DragToNewChapterModal.module.css'
import {connect} from "react-redux";
import {
  changeModalOpen,
  onDropSection
} from "../../../../../../redux/actions/chapters";

class DragToNewChapterModal extends React.Component {
  constructor(props) {
    super(props);
    this.isModalOpen = this.props.isModalOpen
  }

  toggleModal(){
    this.props.changeModalOpen(this.props.chapterIndex, this.props.sectionIndex)
  }

  dropSection(index){
    this.toggleModal()
    this.props.onDropSection(this.props.chapterIndex, index, this.props.sectionIndex)
  }

  render() {
    return (
      <div className={styles.drag}>
        <button onClick={() => this.toggleModal()}>Перемести в другую главу</button>
        {
          this.isModalOpen && ReactDOM.createPortal(
            <div className={styles.overlay}>
              <div className={styles.body}>

                { this.props.chapters.map((chapter, index) => (
                  <div  key={index} className={styles.modalChapterContainer}>
                    <p>{chapter.text}</p>
                    <button onClick={() => this.dropSection(index)}>Перенести сюда</button>
                  </div>
                ))}

              </div>
              <button className={styles.buttonClose} onClick={() => this.toggleModal()}>Закрыть</button>
            </div>,
            document.getElementById('modal-root')
          )
        }
      </div>
    )
  }
}

const mapStateToProps = ({ chapters }) => {
  return { chapters }
}

const mapDispatchToProps = {
  changeModalOpen,
  onDropSection
}

export default connect(mapStateToProps, mapDispatchToProps)(DragToNewChapterModal)
