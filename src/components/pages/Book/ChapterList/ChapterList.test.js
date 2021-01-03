import React from 'react'
import { render, userEvent, screen } from '../../../../helpers/test-utils'

import ChapterList from "./index";
import chaptersMock from '../../../../mocks/chapters'

beforeAll(() => {
  render(<ChapterList />, { initialState: { chapters: chaptersMock } } )
})

test('render book chapter', () => {
  const chapterTitle = screen.getByText('Chapter One')
  expect(chapterTitle).toBeTruthy()

  const sectionOneTitle = screen.getByText('Section One')
  expect(sectionOneTitle).toBeTruthy()

  const sectionTwoTitle = screen.getByText('Section Two')
  expect(sectionTwoTitle).toBeTruthy()
})

test('click on filter buttons', () => {
  const checkedFilterButton = screen.getByRole('button', { name: 'Checked' })
  userEvent.click(checkedFilterButton)

  expect(screen.queryByText(/Section One/i)).toBeInTheDocument()
  expect(screen.queryByText(/Section Two/i)).not.toBeInTheDocument()

  const notCheckedFilterButton = screen.getByRole('button', { name: 'Not Checked' })
  userEvent.click(notCheckedFilterButton)

  expect(screen.queryByText(/Section One/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Section Two/i)).toBeInTheDocument()

  const allFilterButton = screen.getByRole('button', { name: 'All' })
  userEvent.click(allFilterButton)

  expect(screen.queryByText(/Section One/i)).toBeInTheDocument()
  expect(screen.queryByText(/Section Two/i)).toBeInTheDocument()
})

test('add new chapter', async () => {
  const addChapterButton = screen.getByRole('button', { name: 'Add chapter' })

  userEvent.type(screen.getByPlaceholderText('add new chapter name'), 'Chapter New')
  // Вот я кликаю на добавление Chapter. А вот в каком месте я застабил, что у меня не идёт реального запроса на restdb.io? Не пойму.
  userEvent.click(addChapterButton)

  expect(screen.getByText(/Chapter New/i)).toBeInTheDocument()
})

test('add new section', async () => {
  const addSectionButton = screen.getByRole('button', { name: 'Add section' })

  userEvent.type(screen.getByPlaceholderText('add new section name'), 'Section New')
  userEvent.click(addSectionButton)

  expect(screen.getByText(/Section New/i)).toBeInTheDocument()
})
