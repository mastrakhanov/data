import { SimpleChanges } from '@angular/core';

import { documentStub1 } from './document-stubs';


export const changesStub: SimpleChanges = {
  document: { previousValue: null,
    currentValue: documentStub1,
    firstChange: true,
    isFirstChange: (): boolean => true
  }
};
