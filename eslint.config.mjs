import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import jsdoc from "eslint-plugin-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals"),{
  plugins: {
    jsdoc,
  },
  rules: {
    "jsdoc/check-param-names": "warn", // @param 태그가 맞는지 체크
    "jsdoc/check-tag-names": "warn", // 존재하지 않는 JSDoc 태그 사용 시 경고
    "jsdoc/check-types": "warn", // 잘못된 타입 명시 (@param {str} → @param {string})
    "jsdoc/require-param": "warn", // 함수의 매개변수에 @param 누락 시 경고
    "jsdoc/require-returns": "warn", // 반환값이 있는데 @returns 태그 없으면 경고
  },
},];

export default eslintConfig;
