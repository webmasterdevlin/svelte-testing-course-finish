/// <reference types="cypress"/>

const HEROES = [
  {
    id: 'HeroAslaug',
    name: 'Aslaug',
    description: 'warrior queen',
  },
  {
    id: 'HeroIvar',
    name: 'Ivar the Boneless',
    description: 'commander of the Great Heathen Army',
  },
];

describe('Heroes Page', () => {
  beforeEach(() => {
    cy.getCommand('/api/heroes', HEROES);
    cy.deleteCommand('/api/heroes/*');
    cy.visit('/');
  });

  it('should land on the heroes page', () => {
    cy.location('pathname').should('equal', '/heroes');
  });

  it('should render heroes', () => {
    cy.get('[data-testid=card]').should('have.length', 2);
  });

  it('should delete a hero when delete button is click', () => {
    const index = 1;
    cy.get('[data-testid=button]')
      .filter(':contains("Delete")')
      .eq(index)
      .click();
    cy.get('[data-testid=yes-button]').click();

    cy.get('[data-testid=card]').should('have.length', 1);
  });
});
