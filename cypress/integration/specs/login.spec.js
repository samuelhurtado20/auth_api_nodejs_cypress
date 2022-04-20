const Guid = require('guid')
var dynamicEmail = Guid.raw() + '@forDelete.com'

describe('/user/register', () => {
  const registerEndpoint = 'http://localhost:3030/api/user/login'

  it('returns 200 when we hit /login with valid body', () => {
    let validBody = {
      email: 'samuelhurtado200@gmail.com',
      password: 'password2022',
    }
    cy.request('POST', registerEndpoint, validBody).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('returns 400 when we hit /login without body', () => {
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('returns 401 when we hit /login with invalid email', () => {
    let badbody = {
      email: dynamicEmail,
      password: 'password2022',
    }
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      body: badbody,
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response)
      expect(response.status).to.eq(401)
    })
  })

  it('returns 401 when we hit /login with invalid password', () => {
    let badbody = {
      email: 'samuelhurtado20@gmail.com',
      password: 'password#2022',
    }
    cy.request({
      method: 'POST',
      url: registerEndpoint,
      body: badbody,
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response)
      expect(response.status).to.eq(401)
    })
  })
})
