import React, {memo} from 'react';
import { useCountRenders3 } from "@hooks/useCountRenders";

const InnerSquare = memo(({ increment, num }) => {
  useCountRenders3(); // https://www.youtube.com/watch?v=-Ls48dd-vJE

  return (
    <div className="test-inner">
      <button
        type="button"
        onClick={() => increment(num)}
      >
        {num}
      </button>
    </div>
  );
});

export default InnerSquare;
