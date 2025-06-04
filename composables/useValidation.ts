import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  minValue,
  maxValue,
  helpers,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";

// кастомный валидатор: проверка name в объекте
const requiredName = helpers.withMessage("Обязательное поле", (value: any) => {
  if (!value) return false;
  return !!value.name && value.name.toString().trim().length > 0;
});

// универсальный валидатор: проверка конкретного поля объекта
const requiredField = (field: string, msg = "Обязательное поле") =>
  helpers.withMessage(msg, (value: any) => {
    if (!value || typeof value !== "object") return false;
    return !!value[field] && value[field].toString().trim().length > 0;
  });

export function useValidation() {
  const toast = useToast();

  const showValidationErrors = (v$: any) => {
    const flatErrors = flattenErrors(v$);
    if (flatErrors.length > 0) {
      toast.error(flatErrors[0]);
    }
  };

  const requiredDate = helpers.withMessage("Обязательное поле", (value: any) => {
    if (!value) return false;
    if (typeof value === "string") return !isNaN(Date.parse(value));
    if (value instanceof Date) return !isNaN(value.getTime());
    return false;
  });

  const flattenErrors = (v$: any, prefix = ""): string[] => {
    const errors: string[] = [];

    for (const key in v$) {
      const field = v$[key];
      if (key.startsWith("$")) continue;

      if (field?.$errors?.length) {
        const msg = field.$errors[0].$message;
        errors.push(typeof msg === "string" ? msg : "Ошибка валидации");
      }

      if (typeof field === "object") {
        errors.push(...flattenErrors(field, key));
      }
    }

    return errors;
  };

  return {
    v$: useVuelidate,
    required: helpers.withMessage("Обязательное поле", required),
    requiredName,
    requiredField,
    requiredDate,
    email: helpers.withMessage("Некорректный email", email),
    minLength: (len: number, msg = `Минимум ${len} символов`) =>
      helpers.withMessage(msg, minLength(len)),
    maxLength: (len: number, msg = `Максимум ${len} символов`) =>
      helpers.withMessage(msg, maxLength(len)),
    minValue: (val: number, msg = `Минимум ${val}`) =>
      helpers.withMessage(msg, minValue(val)),
    maxValue: (val: number, msg = `Максимум ${val}`) =>
      helpers.withMessage(msg, maxValue(val)),
    custom: helpers.withMessage,
    helpers,
    showValidationErrors,
  };
}
