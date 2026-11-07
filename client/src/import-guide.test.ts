import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';
import { QuizFileSchema } from '@quizharbor/shared';
import { ImportGuide, importExample, quizPrompt } from './import-guide.js';

it('provides a complete example accepted by the real import contract', () => {
  const parsed = QuizFileSchema.parse(JSON.parse(JSON.stringify(importExample)));
  const question = parsed.quiz.questions[0];
  expect(question.options.find(option => option.id === question.correctOptionId)?.text).toBe('Mars');
});
it('explains the format before file selection and exposes a copyable prompt', () => {
  const html = renderToStaticMarkup(createElement(ImportGuide,{ busy: false, error: '', onChoose: () => {}, onClose: () => {} }));
  expect(html.indexOf('Required JSON structure')).toBeLessThan(html.indexOf('Choose JSON file'));
  expect(html).toContain('Copy AI prompt'); expect(html).toContain('Download example JSON');
  expect(quizPrompt).toContain('First design and fact-check');
  expect(quizPrompt).toContain('Vary correctOptionId across a, b, c and d');
  expect(quizPrompt).toContain('Do not make the correct answer noticeably longer');
  expect(html).toContain('QuizHarbor makes no AI requests.');
});
