"use client";

import { useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_PREMIUM } from "@/lib/motion";

interface SharedFieldProps {
  label: string;
  name: string;
  error?: string;
  helperText?: string;
}

type InputFieldProps = SharedFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id"> & {
    as?: "input";
  };

type TextareaFieldProps = SharedFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "id"> & {
    as: "textarea";
  };

export type FormInputProps = InputFieldProps | TextareaFieldProps;

const fieldClasses =
  "mt-1.5 w-full rounded-md border bg-background px-3 py-3 text-base text-foreground outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70";

/**
 * Labeled form field (input or textarea) with animated validation states.
 * `text-base` (16px) keeps iOS Safari from auto-zooming on focus. Errors are
 * exposed via `aria-invalid` + `aria-describedby` for screen readers.
 */
export function FormInput({ label, name, error, helperText, className, ...props }: FormInputProps) {
  const reactId = useId();
  const fieldId = `${name}-${reactId}`;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  const describedBy = [error ? errorId : null, helperText ? helperId : null].filter(Boolean).join(" ") || undefined;

  const borderClasses = error
    ? "border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgb(220_38_38_/_0.12)]"
    : "border-border focus:border-secondary focus:shadow-[0_0_0_3px_rgb(8_145_178_/_0.12)]";

  return (
    <div>
      <label htmlFor={fieldId} className="text-sm font-medium text-primary">
        {label}
        {props.required && <span className="text-danger"> *</span>}
      </label>

      {props.as === "textarea" ? (
        <textarea
          id={fieldId}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(fieldClasses, borderClasses, "resize-none", className)}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(fieldClasses, borderClasses, className)}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {helperText && !error && (
        <p id={helperId} className="mt-1.5 text-xs text-muted">
          {helperText}
        </p>
      )}

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT_PREMIUM }}
            className="overflow-hidden text-xs text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
