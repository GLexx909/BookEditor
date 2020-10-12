import React from 'react'
import store from "../../../../redux/store";

const ChaptersInfo = () => {
  const { chapters } = store.getState()

  store.subscribe(() => {
    console.log(store.getState())
  })

  return (
    <div>
      {
        chapters.length && chapters.map((chapter) => (
          <p>
            {chapter.text + '    имеет'}
            <b>{chapter.sections.length + ' подразделов'}</b>
          </p>
        ))
      }
    </div>
  )
}

export default ChaptersInfo
