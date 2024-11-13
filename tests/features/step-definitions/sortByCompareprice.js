
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Then('the products sorted in order from {string} {string}', async function (expectedOrder, valueToTest) {
  // TODO: implement step
  let data = this.json.children.children.valueToTest;
  for (let i = 0; i < data.length - 1; i++) {
    if (expectedOrder === "highest") {
      if (data[i].valueToTest > data[i + 1].valueToTest) {
        //return false;  // If an item is greater than the next one, it's not sorted
      }
    }
    if (expectedOrder === "lowest") {
      if (data[i].valueToTest < data[i + 1].valueToTest) {
        //return false;  // If an item is less than the next one, it's not sorted
      }
    }
  }
});