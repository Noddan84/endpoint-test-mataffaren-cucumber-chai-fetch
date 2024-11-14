
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Then('the products are sorted in order from {string} {string}', async function (a, b) {
  // TODO: implement step
  // Hämta responsdata
  let responseData = this.response.body;

  // Bestäm vilken sorteringskod som ska användas baserat på värdet av 'a'
  let sortOrder = a === "lowest" ? "price-asc" : "price-desc";

  // Kontrollera att rätt sorteringsalternativ är valt i responsen
  let priceSort = responseData.sorts.find(sort => sort.code === sortOrder);
  expect(priceSort).to.have.property("selected", true);

  // Extrahera priser från produktlistan och rensa bort " kr" och komma
  let productPrices = responseData.results.map(item =>
    parseFloat(item.price.replace(" kr", "").replace(",", "."))
  );

  // Sortera jämförpriser i den ordning som specificeras av 'a'
  let sortedPrices;
  if (a === "lowest") {
    // Stigande ordning
    sortedPrices = [...productPrices].sort((x, y) => x - y);
  } else if (a === "highest") {
    // Fallande ordning
    sortedPrices = [...productPrices].sort((x, y) => y - x);
  }

  // Jämför den ursprungliga listan med den sorterade listan
  let isPriceOrdered = JSON.stringify(productPrices) === JSON.stringify(sortedPrices);

  // Testa om priserna är sorterade korrekt
  expect(isPriceOrdered).to.be.true;

  // Använd 'b' för att verifiera om rätt sorteringsalternativ är vald i responsen
  // 'b' är alltid 'price' i detta fall
  if (b === "price") {
    // Kontrollera att rätt sorteringsalternativ är markerat
    let selectedSort = responseData.sorts.find(sort => sort.code === sortOrder);
    expect(selectedSort).to.have.property("selected", true);
  }
});