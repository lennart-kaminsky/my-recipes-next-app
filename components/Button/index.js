export function ChangeButton({ display, children, onChangeDisplay }) {
  return (
    <button type="button" disabled={display} onClick={onChangeDisplay}>
      {children}
    </button>
  );
}
