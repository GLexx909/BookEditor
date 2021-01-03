import '@testing-library/cypress/add-commands';

describe('Main page', () => {
  it('open', function () {
    cy.visit('http://localhost:9000')
    cy.contains('Главная страница')
  });

  it('add new Chapter', () => {
    cy.get('input[name=text]').type('Chapter Three').should('have.value', 'Chapter Three')
    cy.contains('Add chapter').click()
    cy.get('input[name=text]').should('have.value', '')
    cy.contains('Chapter Three')
  })

  it('add new Section', () => {
    cy.findByText('Chapter One').parent().within((el) => {
      cy.get('input[name=section]').type('Section Three').should('have.value', 'Section Three')
      cy.contains('Add section').click()
    })

    cy.findByText('Chapter One').parent().within((el) => {
      cy.get('input[name=section]').should('have.value', '')
      cy.contains('Section Three')
    })
  })

  it('check all section', () => {
    cy.findByText('Section One').parent().within((el) => {
      cy.get('input[type=checkbox]').click()
    })

    cy.findByText('Section Three').parent().within((el) => {
      cy.get('input[type=checkbox]').click()
    })

    cy.findByText('Chapter One').parent().contains('ЗАВЕРШЕНО')
  })
})
