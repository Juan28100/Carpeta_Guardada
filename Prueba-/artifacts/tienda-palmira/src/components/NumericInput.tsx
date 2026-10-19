import { useEffect, useState, type ClipboardEvent, type KeyboardEvent } from "react";

type NumericInputProps = {
  value: number;
  max: number;
  onChange: (value: number) => void;
  onMax?: () => void;
  onZero?: () => void;
  label: string;
  testId: string;
  disabled?: boolean;
  className?: string;
};

export function NumericInput({ value, max, onChange, onMax, onZero, label, testId, disabled = false, className = "" }: NumericInputProps) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  const normalize = () => {
    if (draft === "" || Number(draft) < 1) {
      if (draft === "0" && onZero) onZero();
      else onChange(Math.min(1, Math.max(1, max)));
      setDraft(String(value));
      return;
    }
    const number = Number(draft);
    const normalized = Math.min(number, max);
    if (number > max) onMax?.();
    onChange(normalized);
    setDraft(String(normalized));
  };
  const inputChange = (next: string) => {
    if (next === "") {
      setDraft("");
      return;
    }
    if (!/^\d+$/.test(next)) return;
    const parsed = Number(next);
    if (parsed === 0) {
      setDraft("0");
      return;
    }
    if (parsed > max) {
      onMax?.();
      onChange(max);
      setDraft(String(max));
      return;
    }
    setDraft(next);
    onChange(parsed);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-", ".", ","].includes(event.key)) {
      event.preventDefault();
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key.length === 1 && !/^\d$/.test(event.key)) event.preventDefault();
  };
  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text");
    if (!/^\d+$/.test(pasted)) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    inputChange(pasted);
  };
  return (
    <input
      aria-label={label}
      className={`number-input ${className}`}
      data-testid={testId}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="off"
      value={draft}
      disabled={disabled || max < 1}
      onKeyDown={onKeyDown}
      onChange={(event) => inputChange(event.currentTarget.value)}
      onPaste={onPaste}
      onWheel={(event) => { event.preventDefault(); event.currentTarget.blur(); }}
      onBlur={normalize}
    />
  );
}
