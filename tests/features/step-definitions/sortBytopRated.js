
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Then('the test should show that the {string} has property {string}', async function(a, b){
  // TODO: implement step
  // Hämta responsdata från API:et
  let responseData = this.response.body;

  // Hitta objektet i sorteringsalternativen som har den angivna "code"
  let sortOption = responseData.sorts.find(sort => sort.code === a);

  // Kontrollera att objektet finns och att det har egenskapen 'selected'
  if (sortOption) {
    // Om 'b' är "selected", kontrollera att den är true
    if (b === "selected") {
      expect(sortOption).to.have.property("selected", true);
    } else {
      // Om det är någon annan egenskap, kontrollera att den finns
      expect(sortOption).to.have.property(b);
    }
  } else {
    // Om inget sorteringsalternativ hittades, kasta ett fel
    throw new Error(`Sort option with code "${a}" not found in response.`);
  }
});