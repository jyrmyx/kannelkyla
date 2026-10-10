import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatDate, pathIsCurrent, prefixPath } from './site.ts';

test('formatDate keeps the source day and month', () => {
  assert.equal(formatDate('2015-11-25'), '25.11.2015');
  assert.equal(formatDate('2014-05-15'), '15.05.2014');
});

test('prefixPath leaves the local site at the root', () => {
  assert.equal(prefixPath('/', '/'), '/');
  assert.equal(prefixPath('/uutiset', '/'), '/uutiset');
  assert.equal(prefixPath('/asuminen#elaminen', '/'), '/asuminen#elaminen');
  assert.equal(prefixPath('/lomake.html?id=4', '/'), '/lomake.html?id=4');
  assert.equal(prefixPath('https://www.kannelkyla.fi/files/a.pdf', '/'), 'https://www.kannelkyla.fi/files/a.pdf');
  assert.equal(prefixPath('//example.test/a', '/'), '//example.test/a');
  assert.equal(prefixPath('tel:+358442057935', '/'), 'tel:+358442057935');
});

test('prefixPath inserts the slash the Pages base needs', () => {
  for (const base of ['/kannelkyla', '/kannelkyla/']) {
    assert.equal(prefixPath('/', base), '/kannelkyla/');
    assert.equal(prefixPath('/favicon.svg', base), '/kannelkyla/favicon.svg');
    assert.equal(prefixPath('/media/kevat.jpg', base), '/kannelkyla/media/kevat.jpg');
    assert.equal(prefixPath('/asuminen#elaminen', base), '/kannelkyla/asuminen#elaminen');
    assert.equal(prefixPath('/lomake.html?id=4', base), '/kannelkyla/lomake.html?id=4');
  }
});

test('pathIsCurrent highlights the section and only the real home', () => {
  assert.equal(pathIsCurrent('/', '/', '/'), true);
  assert.equal(pathIsCurrent('/uutiset', '/', '/'), false);
  assert.equal(pathIsCurrent('/uutiset/', '/uutiset', '/'), true);
  assert.equal(pathIsCurrent('/uutiset/tiedotteet-sahkoisesti/', '/uutiset', '/'), true);
  assert.equal(pathIsCurrent('/uutiset-extra/', '/uutiset', '/'), false);
  assert.equal(pathIsCurrent('/asuminen/pesutupa/', '/asuminen', '/'), true);

  assert.equal(pathIsCurrent('/kannelkyla', '/kannelkyla/', '/kannelkyla'), true);
  assert.equal(pathIsCurrent('/kannelkyla/uutiset/', '/kannelkyla/', '/kannelkyla'), false);
  assert.equal(pathIsCurrent('/kannelkyla/uutiset/foo/', '/kannelkyla/uutiset', '/kannelkyla'), true);
  assert.equal(pathIsCurrent('/kannelkyla/asuminen/pesutupa', '/kannelkyla/asuminen', '/kannelkyla/'), true);
});
