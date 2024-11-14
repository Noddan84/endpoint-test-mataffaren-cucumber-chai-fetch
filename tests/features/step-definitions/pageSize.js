
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Then('there should be at least {float} main categories', async function(numberOfCategories){
  // TODO: implement step
  expect(this.json.children.length).to.be.at.least(numberOfCategories);
  // store the category url parts for the next scenario (see usage in feature file)!
  this.categoryUrlParts = this.json.children.map(x => x.url);
});

Then('the test should show that the {string} is at most {string}', async function (a, b) {
  // Hämta URL-parameter 'size' och omvandla till int
  let urlParams = new URLSearchParams(this.request.url.split('?')[1]);
  let sizeFromUrl = parseInt(urlParams.get('size'));

  // Hämta pageSize från responsens data
  let responseData = this.response.body;
  let pageSizeFromResponse = responseData[a].pagination[b]; // Använd 'a' och 'b' som nycklar

  // Jämför att pageSizeFromResponse är som mest lika med sizeFromUrl
  expect(pageSizeFromResponse).to.be.at.most(sizeFromUrl);
});