import { expect } from '@playwright/test';
class ApiUtil{

    constructor(apiContext) {
        this.apiContext = apiContext;
        this.token = null;
    }
    
    /**
     * Login via API and set the token in constructor variable to use in the test
     * @param {string} email 
     * @param {string} password 
     * @returns loginResponse
     */
    async loginViaApi(email, password) {
        const loginResponse = await this.apiContext.post('https://api.realworld.show/api/users/login',
                {
                    data: {
                        user:
                        {
                            email:email,
                            password:password
                        }
                    },
                    headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
                    },
                    ignoreHTTPSErrors: true
                }
                
            )
            // check if the response is successful
            expect(await loginResponse.ok()).toBeTruthy();
            // get the token from the response body
            const loginResponseBody = await loginResponse.json();
            // store the token in a variable to use in the test
            this.token = loginResponseBody.user.token;
            console.log("Token is: ", this.token);
            return loginResponse;
             
    }
}

module.exports = {ApiUtil};