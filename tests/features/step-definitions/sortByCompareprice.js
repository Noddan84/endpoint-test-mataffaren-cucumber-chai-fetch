
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Then('the products sorted in order from {string} {string}', async function(a, b){
  // TODO: implement step
  // Hämta responsdata
  let responseData = this.response.body;

  // Bestäm vilken sorteringskod som ska användas baserat på värdet av 'a'
  let sortOrder = a === "lowest" ? "compareprice-asc" : "compareprice-desc";

  // Kontrollera att rätt sorteringsalternativ är valt i responsen
  let comparePriceSort = responseData.sorts.find(sort => sort.code === sortOrder);
  expect(comparePriceSort).to.have.property("selected", true);

  // Extrahera jämförpriser från produktlistan och rensa bort " kr" och komma
  let productComparePrices = responseData.results.map(item =>
    parseFloat(item.comparePrice.replace(" kr", "").replace(",", "."))
  );

  // Sortera jämförpriser i den ordning som specificeras av 'a'
  let sortedComparePrices;
  if (a === "lowest") {
    // Stigande ordning
    sortedComparePrices = [...productComparePrices].sort((x, y) => x - y);
  } else if (a === "highest") {
    // Fallande ordning
    sortedComparePrices = [...productComparePrices].sort((x, y) => y - x);
  }

  // Jämför den ursprungliga listan med den sorterade listan
  let isComparePriceOrdered = JSON.stringify(productComparePrices) === JSON.stringify(sortedComparePrices);

  // Testa om jämförpriserna är sorterade korrekt
  expect(isComparePriceOrdered).to.be.true;

  // Använd 'b' för att verifiera om rätt sorteringsalternativ är vald i responsen
  // 'b' är alltid 'comparePrice' i detta fall
  if (b === "comparePrice") {
    // Kontrollera att rätt sorteringsalternativ är markerat
    let selectedSort = responseData.sorts.find(sort => sort.code === sortOrder);
    expect(selectedSort).to.have.property("selected", true);
  }  
});