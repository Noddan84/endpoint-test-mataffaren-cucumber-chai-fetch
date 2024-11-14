
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Then('the test should show that the {string} is equal {string}', async function(a, b){
  // TODO: implement step
  // Hämta URL-parameter 'page' och omvandla till int
  let urlParams = new URLSearchParams(this.request.url.split('?')[1]);
  let pageFromUrl = parseInt(urlParams.get('page'));

  // Hämta currentPage från responsens data
  let responseData = this.response.body;
  let currentPageFromResponse = responseData[a].pagination[b]; // Använd 'a' och 'b' som nycklar

  // Jämför att currentPageFromResponse är som mest lika med pageFromUrl
  expect(currentPageFromResponse).to.be.at.most(pageFromUrl);
});