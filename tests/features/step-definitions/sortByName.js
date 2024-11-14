
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Then('the products sorted in order from {string}', async function(a){
  // TODO: implement step
  // Hämta responsdata
  let responseData = this.response.body;

  // Extrahera produktnamn från responseData
  let productNames = responseData.results.map(item => item.name);
  console.log("Product names:", productNames);

  // Skapa en sorterad version av produktnamnen
  let sortedProductNames = [...productNames].sort();

  // Kontrollera om produktlistan är sorterad i den ordning som specificeras av 'a'
  let isOrdered;
  if (a === "A-Ö") {
    // Kontrollera om produkterna är sorterade i stigande ordning (A-Ö)
    isOrdered = JSON.stringify(productNames) === JSON.stringify(sortedProductNames);
  } else if (a === "Ö-A") {
    // Kontrollera om produkterna är sorterade i fallande ordning (Ö-A)
    isOrdered = JSON.stringify(productNames) === JSON.stringify(sortedProductNames.reverse());
  }

  // Skriv ut den sorterade listan för felsökning
  console.log("Sorted product names:", sortedProductNames);

  // Testa om produkterna är i rätt ordning
  if (isOrdered) {
    // Om de är korrekt sorterade
    expect(isOrdered).to.be.true;
  } else {
    // Om de inte är korrekt sorterade
    expect(isOrdered).to.be.false;
  }

  // **Kontrollera att rätt sorteringsalternativ är valt i responsen**
  let expectedSortCode = (a === "A-Ö") ? "name-asc" : "name-desc";
  let selectedSort = responseData.sorts.find(sort => sort.code === expectedSortCode);

  // Kontrollera att det valda sorteringsalternativet är korrekt markerat som "selected"
  expect(selectedSort).to.have.property("selected", true);
});
