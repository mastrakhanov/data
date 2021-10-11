import { makeId } from './make-id.function';


describe('makeId', () => {
  it('makeId() should return string value satisfying the regex condition', () => {
    for (let i = 0; i < 10; i ++) {
      expect(makeId()).toMatch(/^[a-z0-9]{16}$/);
    }
  });
});
