const initialState = []

export const sections = function (state = initialState, action) {

  switch (action.type) {
    case 'ADD_SECTION':
      return state.concat({ text: action.text, completed: false })
    default:
      return state
  }
}
