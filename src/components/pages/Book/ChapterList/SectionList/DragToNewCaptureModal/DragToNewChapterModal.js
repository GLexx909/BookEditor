import React from 'react'
import ReactDOM from 'react-dom'
import styles from './DragToNewChapterModal.module.css'
import {connect} from "react-redux";
import {
  moveSection
} from "../../../../../../redux/slices/chapters";

class DragToNewChapterModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }

  }

  toggleModal(){
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  dropSection(index){
    this.toggleModal()
    this.props.moveSection({ oldChapterIndex: this.props.chapterIndex, newChapterIndex: index, sectionIndex: this.props.sectionIndex })
  }

  render() {
    return (
      <div className={styles.drag}>
        <button onClick={() => this.toggleModal()}>Перемести в другую главу</button>
        {
          this.state.isModalOpen && ReactDOM.createPortal(
            <div className={styles.overlay}>
              <div className={styles.body}>

                { this.props.chapters.present.entries.map((chapter, index) => (
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
  moveSection
}

export default connect(mapStateToProps, mapDispatchToProps)(DragToNewChapterModal)
