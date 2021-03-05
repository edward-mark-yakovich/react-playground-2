import React, {memo} from 'react';
import { useCountRenders1 } from "@hooks/useCountRenders";

const Inner1 = memo(({ increment }) => {
  useCountRenders1(); // https://www.youtube.com/watch?v=-Ls48dd-vJE

  return (
    <div className="test-inner">
      <button
        type="button"
        onClick={increment}
      >
        Click Me
      </button>
    </div>
  );
});

export default Inner1;
