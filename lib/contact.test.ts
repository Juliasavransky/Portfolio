// Run with: node lib/contact.test.ts  (Node 24 strips the types)
import assert from 'node:assert/strict';
import { validateContact, isBot, LIMITS } from './contact.ts';

const ok = { name: ' Dana ', email: 'dana@example.com', message: 'Hi' };

assert.deepEqual(validateContact(ok), { name: 'Dana', email: 'dana@example.com', message: 'Hi' });
assert.equal(validateContact(null), null);
assert.equal(validateContact({ ...ok, name: 123 }), null);
assert.equal(validateContact({ ...ok, name: '   ' }), null);
assert.equal(validateContact({ ...ok, email: 'not-an-email' }), null);
assert.equal(validateContact({ ...ok, message: 'x'.repeat(LIMITS.message + 1) }), null);
assert.equal(isBot({ ...ok, company: 'Acme' }), true);
assert.equal(isBot({ ...ok, company: '' }), false);
assert.equal(isBot(null), false);

console.log('contact validation: ok');
