// #ddev-generated
import { expect } from '@playwright/test';

/**
* Check for TYPO3 error messages on the page
* @param {import('@playwright/test').Page} page
*/
export async function checkNoTypo3Errors(page) {
  const errorMessages = [
    'Whoops, looks like something went wrong.',
    'Oops, an error occurred!',
    'Extbase Variable Dump',
  ];

  for (const errorMsg of errorMessages) {
    await expect(page.locator('body')).not.toContainText(errorMsg);
  }
}

/**
* Fetch a URL and validate it returns valid JSON with data
* @param {import('@playwright/test').APIRequestContext} request
* @param {string} url
* @returns {Promise<any>} The JSON response
*/
export async function fetchAndValidateJson(request, url) {
  const response = await request.get(url);
  expect(response).toBeOK();

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(`Failed to parse JSON from ${url}: ${error.message}`);
  }

  expect(data).toBeDefined();
  expect(Array.isArray(data) ? data.length : Object.keys(data).length).toBeGreaterThan(0);

  return data;
}

/**
* Fetch a URL and validate it returns valid XML
* @param {import('@playwright/test').APIRequestContext} request
* @param {string} url
* @returns {Promise<string>} The XML text
*/
export async function fetchAndValidateXml(request, url) {
  const response = await request.get(url);
  expect(response).toBeOK();

  const text = await response.text();
  expect(text).toContain('<?xml');

  return text;
}
