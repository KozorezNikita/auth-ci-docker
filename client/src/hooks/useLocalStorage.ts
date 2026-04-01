import { useState, useEffect } from "react";
import { ZodSchema } from "zod";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  schema?: ZodSchema<T>
) {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return initialValue;

      const parsed = JSON.parse(stored);

      if (schema) {
        const result = schema.safeParse(parsed);
        if (result.success) return result.data;
        return initialValue;
      }

      return parsed;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}