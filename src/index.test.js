import { expect } from 'chai';
import createTrie from './index';

describe('API', () => {
  it('should expose a single function', () => {
    expect(createTrie).to.be.a('function');
  });
});
