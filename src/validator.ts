import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";
import jaLocale from "vee-validate/dist/locale/ja";
import enLocale from "vee-validate/dist/locale/en";
import cnLocale from "vee-validate/dist/locale/zh_CN";
import twLocale from "vee-validate/dist/locale/zh_TW";

Validator.localize("ja", jaLocale);
Validator.localize("en", enLocale);
Validator.localize("zh_CN", cnLocale);
Validator.localize("zh_TW", twLocale);

Vue.use(VeeValidate, jaLocale);

function zenkakuLength(str: string): number {
  let sum = 0;
  [...str].forEach((char) => (sum += char.match(/[ -~]/) ? 0.5 : 1));
  return sum;
}
Validator.extend("max_zenkaku", {
  getMessage: (field: string, args: any) => {
    return field;
  },
  validate: (value: string, args: any) =>
    zenkakuLength(value) <= parseInt(args.length),
  paramNames: ["length"],
});
