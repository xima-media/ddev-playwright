import AxeBuilder from '@axe-core/playwright';

/**
* Run axe accessibility scan on the current page
* Tests against WCAG 2.1 Level A and AA (BITV 2.0 requirement)
*
* @param page - Playwright page object
*/
export async function checkA11y(page) {
  const defaultTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

  const disabledRules = ['label'];

  const builder = new AxeBuilder({ page })
    .withTags(defaultTags)
    .disableRules(disabledRules);

  const accessibilityScanResults = await builder.analyze();

  if (accessibilityScanResults.violations.length > 0) {
    const violationMessages = accessibilityScanResults.violations.map((violation, index) => {
      const targets = violation.nodes.map(node => node.target.join(' ')).join(', ');
      return `${index + 1}. [${violation.impact?.toUpperCase()}] ${violation.id}
      ${violation.help}
      Affected: ${targets}
      Fix: ${violation.helpUrl}`;
    }).join('\n');

    const error = new Error(violationMessages);
    error.stack = error.message;
    throw error;
  }
}
