import React, {memo} from 'react';
import { useCountRenders2 } from "@hooks/useCountRenders";

const Inner2 = memo(({ increment }) => {
  useCountRenders2(); // https://www.youtube.com/watch?v=-Ls48dd-vJE

  return (
    <div className="test-inner">
      <button
        type="button"
        onClick={() => increment(2)}
      >
        Click Me
      </button>
    </div>
  );
});

export default Inner2;
