import * as mockUserData from '../../fixtures/userData.json';
import * as mockOrderData from '../../fixtures/newOrder.json';

describe('Проверка страницы конструктора бургера', () => {

  const ingredients = '[data-cy=ingredients]';
  const modal = '[data-cy=modal]';
  const topBun = '[data-cy=topBurgerBun]';
  const burgerIngredients = '[data-cy=burgerConstructorIngredients]';
  const bottomBun = '[data-cy=bottomBurgerBun]'

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' });
    cy.setCookie('accessToken', mockUserData.accessToken);
    cy.window().then(win => win.localStorage.setItem('refreshToken', mockUserData.refreshToken))
    cy.visit('');    
   });

it('Добавление ингредиентов в бургер', () => {
  cy.get(ingredients).as('ingredients')
  cy.get('@ingredients').get('ul>li').eq(0).find('button')
  .click();
  cy.get('@ingredients').get('ul>li').eq(2).find('button')
  .click();
  cy.get(topBun).find('.constructor-element__text')
    .should('have.text', 'Краторная булка N-200i (верх)');
  cy.get(burgerIngredients).find('.constructor-element__text')
    .should('have.text', 'Биокотлета из марсианской Магнолии');
  cy.get(bottomBun).find('.constructor-element__text')
    .should('have.text', 'Краторная булка N-200i (низ)');
});

  it('Проверка работы модального окна', () => {
    cy.get(ingredients).as('ingredients')
    cy.get('@ingredients').get('ul>li').eq(0).click(); 
    cy.get(modal).as('modal')  
    cy.get('@modal').should('exist');
    cy.get('@modal').contains('Краторная булка N-200i');
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('not.exist') 
  })

  it('Создание заказа', () => {
    cy.get(ingredients).as('ingredients')
    cy.get('@ingredients')
    .get('ul>li').eq(0).find('button')
    .click();
    cy.get('@ingredients')
    .get('ul>li').eq(2).find('button')
    .click();
    cy.get('[data-cy=constructor]').as('constructor');
    cy.get('[data-cy=burgerConstructor]').as('burgerConstructor')
    cy.get('@constructor').find('button').click().intercept('POST', 'api/orders', { fixture: 'newOrder.json' });    
    cy.get(topBun).contains(mockOrderData.order.ingredients[0].name);
    cy.get(bottomBun).contains(mockOrderData.order.ingredients[0].name);
    cy.get(burgerIngredients).contains(mockOrderData.order.ingredients[1].name);
    cy.get(modal).as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').contains(mockOrderData.order.number);    
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('not.exist');
    cy.get('@burgerConstructor').contains('Выберите булки');
    cy.get('@burgerConstructor').contains('Выберите начинку');
});

afterEach(() => {
  cy.clearCookies();
  cy.window().then(win => win.localStorage.clear())
});
});


