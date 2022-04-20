const Guid = require('guid')
var dynamicEmail = Guid.raw() + '@forDelete.com'

describe('/user/register', () => {
  const registerEndpoint = 'http://localhost:3030/api/user/register'
  //let randomString = (Math.random() + 1).toString(36).substring(12)
  // const uuid = () => Cypress._.random(0, 1e6)
  // const id = uuid()
  //
  // const uniqueSeed = Date.now().toString()
  // const getUniidqueId = () => Cypress._.uniqueId(uniqueSeed)
  // const id = getUniidqueId()

  it('returns 200 when we hit /register with valid body', () => {
    let body = {
      name: 'Samuel',
      email: dynamicEmail,
      password: 'password2022',
    }
    cy.request('POST', registerEndpoint, body).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq(body.name)
      expect(response.body.email).to.eq(body.email)
      expect(response.body.password).to.not.eq(body.password)
    })
  })

  it('returns 400 when we hit /register without body', () => {
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('returns 400 when we hit /register with bad user body (invalid name)', () => {
    let badbody = {
      name: '1',
      email: 'samuelhurtado20@gmail.com',
      password: 'password2022',
    }
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      body: badbody,
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response)
      expect(response.status).to.eq(400)
    })
  })

  it('returns 400 when we hit /register with bad user body (invalid email)', () => {
    let badbody = {
      name: 'Samuel',
      email: 'samuelhurtado20gmail.com',
      password: 'password2022',
    }
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      body: badbody,
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response)
      expect(response.status).to.eq(400)
    })
  })

  it('does not allow user creation with invalid password', () => {
    let badbody = {
      name: 'Samuel',
      email: 'samuelhurtado20@gmail.com',
      password: '123',
    }
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      body: badbody,
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response)
      expect(response.status).to.eq(400)
    })
  })

  it('does not allow user creation with email existed', () => {
    let badbody = {
      name: 'Samuel',
      email: dynamicEmail,
      password: '1234567',
    }
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      body: badbody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })
})
