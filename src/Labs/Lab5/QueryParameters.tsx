import { useState } from 'react';
import { FormControl } from 'react-bootstrap';

function QueryParameters() {
  // Access your environment variable
  const removeServer = import.meta.env.VITE_REMOTE_SERVER;

  // Declare state variables for `a` and `b`
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>

      {/* Input for `a` */}
      <FormControl
        id="wd-query-parameter-a"
        className="mb-2"
        type="number"
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
      />

      {/* Input for `b` */}
      <FormControl
        id="wd-query-parameter-b"
        className="mb-2"
        type="number"
        value={b}
        onChange={(e) => setB(Number(e.target.value))}
      />

      {/* Links that use `a` and `b` as query parameters */}
      <a
        id="wd-query-parameter-add"
        href={`${removeServer}/lab5/calculator?operation=add&a=${a}&b=${b}`}
      >
        Add {a} + {b}
      </a>
      <a
        id="wd-query-parameter-subtract"
        href={`${removeServer}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
      >
        Subtract {a} - {b}
      </a>
      <a
        id="wd-query-parameter-multiply"
        href={`${removeServer}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
      >
        Multiply {a} * {b}
      </a>
      <a
        id="wd-query-parameter-divide"
        href={`${removeServer}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
      >
        Divide {a} / {b}
      </a>

      <hr />
    </div>
  );
}

export default QueryParameters;
