import { createRequire } from "module";

// eslint-config-next v16 exports flat config arrays directly.
// Using createRequire avoids FlatCompat, which has a circular-JSON bug with ESLint 9.
const require = createRequire(import.meta.url);
const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");
const nextTypescript = require("eslint-config-next/typescript");

export default [...nextCoreWebVitals, ...nextTypescript];
