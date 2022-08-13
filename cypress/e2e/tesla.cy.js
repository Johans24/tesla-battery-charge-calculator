describe('Tesla', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	describe('Temperature button', () => {
		it('Temperature less than or equal to 10 degrees should show the heat button', () => {
			// Check that the temperature is -10 and check the heat button is visible
			cy.get('#temp').invoke('val').should('be.equal', '-10');
			cy.get('#tesla-fan').should('have.class', 'tesla-heat');
			cy.get('#ac-label').should('be.visible').and('have.text', 'heat off');

			// Click on the arrow button and check that the temperature is 0
			cy.get('.arrow-controls > [control="up"]').eq(1).click();
			cy.get('#temp').invoke('val').should('be.equal', '0');
			// Check the heat button is visible
			cy.get('#tesla-fan').should('have.class', 'tesla-heat');
			cy.get('#ac-label').should('be.visible').and('have.text', 'heat off');

			// Click on the arrow button and check that the temperature is 10
			cy.get('.arrow-controls > [control="up"]').eq(1).click();
			cy.get('#temp').invoke('val').should('be.equal', '10');
			// Check the heat button is visible
			cy.get('#tesla-fan').should('have.class', 'tesla-heat');
			cy.get('#ac-label').should('be.visible').and('have.text', 'heat off');
		});

		it('Temperature greater than or equal to 20 degrees should show the AC button', () => {
			cy.get('.arrow-controls > [control="up"]').eq(1).click().click().click();

			// Check that the Outside Temperature is 20 and check the ac button is visible
			cy.get('#temp').invoke('val').should('be.equal', '20');
			cy.get('#ac-label').should('be.visible').and('have.text', 'ac off');

			// Click on the arrow button and check that the temperature is 30
			cy.get('.arrow-controls > [control="up"]').eq(1).click();
			cy.get('#temp').invoke('val').should('be.equal', '30');
			// Check the ac button is visible
			cy.get('#ac-label').should('be.visible').and('have.text', 'ac off');

			// Click on the arrow button and check that the temperature is 40
			cy.get('.arrow-controls > [control="up"]').eq(1).click();
			cy.get('#temp').invoke('val').should('be.equal', '40');
			// Check the ac button is visible
			cy.get('#ac-label').should('be.visible').and('have.text', 'ac off');
		});
	});

	describe('KM by Speed, Outside temperature, Wheels size and heat button', () => {
		it('Should update correctly the mileage when user clicks on the Speed button ', () => {
			// Check the KMH input and the KM number of 100D and P100D
			cy.get('#kmh').invoke('val').should('be.equal', '70');
			cy.get('#100D-km').should('have.text', '798');
			cy.get('#P100D-km').should('have.text', '760');

			// Change the KMH input to 80 KMH and check the KM number of 100D and P100D
			cy.get('.arrow-controls > [control="up"]').eq(0).click();
			cy.get('#kmh').invoke('val').should('be.equal', '80');
			cy.get('#100D-km').should('have.text', '710');
			cy.get('#P100D-km').should('have.text', '678');
		});

		it('Should update correctly the mileage when user clicks on the Outside Temperature button', () => {
			// Check the Outside Temperature input and the KM number of 100D and P100D
			cy.get('#temp').invoke('val').should('be.equal', '-10');
			cy.get('#100D-km').should('have.text', '798');
			cy.get('#P100D-km').should('have.text', '760');

			// Change the Outside Temperature input to 0 and check the KM number of 100D and P100D
			cy.get('.arrow-controls > [control="up"]').eq(1).click();
			cy.get('#100D-km').should('have.text', '818');
			cy.get('#P100D-km').should('have.text', '783');
		});

		it('Should update correctly the mileage when user selects the Wheel size 21', () => {
			// Check the KM number of 100D and P100D
			cy.get('#100D-km').should('have.text', '798');
			cy.get('#P100D-km').should('have.text', '760');

			// Change the wheel size to 21 and check the KM number of 100D and P100D
			cy.get('#wheel-21').click();
			cy.get('#100D-km').should('have.text', '788');
			cy.get('#P100D-km').should('have.text', '717');
		});

		it('Should update correctly the mileage when user click on the heat button', () => {
			// Check the KM number of 100D and P100D
			cy.get('#100D-km').should('have.text', '798');
			cy.get('#P100D-km').should('have.text', '760');

			// Click on the heat button
			cy.get('#ac-label').click();

			// Check the KM number of 100D and P100D
			cy.get('#100D-km').should('have.text', '618');
			cy.get('#P100D-km').should('have.text', '592');
		});
	});
});
