describe('First API Test', ()=> {
    it('API Get Call', ()=> {
        cy.request({
            method: 'GET',
            url: 'https://dogapi.dog/api/v2/breeds'
        }).then((response)=> {
            expect(response.status).to.eq(200)
        }).its('body');
    });
});