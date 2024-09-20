import * as mockUserData from '../../fixtures/userData.json'

describe('Проверка конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

it('Добавление ингредиентов в бургер', () => {
  cy.get('[data-cy=ingredients]')
  .get('ul>li').eq(0).find('button')
  .click();
    cy.get('[data-cy=ingredients]')
    .get('ul>li').eq(2).find('button')
    .click();
  cy.get('[data-cy=topBurgerBun]')
    .find('.constructor-element__text')
    .should('have.text', 'Краторная булка N-200i (верх)');
  cy.get('[data-cy=burgerConstructorIngredients]')
    .find('.constructor-element__text')
    .should('have.text', 'Биокотлета из марсианской Магнолии');
  cy.get('[data-cy=bottomBurgerBun]')
    .find('.constructor-element__text')
    .should('have.text', 'Краторная булка N-200i (низ)');
});
});

describe('Проверка работы модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });
  it('Открытие и закрытие модального окна', () => {
    cy.get('[data-cy=ingredients]')
    .get('ul>li').eq(0).click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]').contains('Краторная булка N-200i');
    cy.get('[data-cy=modal]').find('button').click();
    cy.get('[data-cy=modal]').should('not.exist') 
  })
});

describe('Cоздание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'newOrder.json' });
    cy.setCookie('accessToken', mockUserData.accessToken);
    cy.window().then(win => win.localStorage.setItem('refreshToken', mockUserData.refreshToken))
    cy.visit('http://localhost:4000');
  });
  it('Сборка бургера', () => {
    cy.get('[data-cy=ingredients]')
    .get('ul>li').eq(0).find('button')
    .click();
    cy.get('[data-cy=ingredients]')
    .get('ul>li').eq(2).find('button')
    .click();
    cy.get('[data-cy=constructor]').find('button').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]').contains('53388');
    cy.get('[data-cy=modal]').find('button').click();
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=burgerConstructor]').contains('Выберите булки');
    cy.get('[data-cy=burgerConstructor]').contains('Выберите начинку');
});

afterEach(() => {
  cy.clearCookies();
  cy.window().then(win => win.localStorage.clear())
});
})

