const DEFAULT_CLASS_NAME = 'w-full rounded-lg border border-border-super-admin bg-surface-super-admin px-3 py-2 text-xs text-ink-super-admin focus:outline-none focus:ring-1 focus:ring-primary-super-admin';

export default function Select({
  id,
  name,
  value,
  onChange,
  options,
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  const styleClassName = variant === 'unstyled' ? '' : DEFAULT_CLASS_NAME;
  const optionElements = children ?? options?.map((option) => {
    const item = typeof option === 'string' ? { value: option, label: option } : option;
    return (
      <option key={item.value} value={item.value} disabled={item.disabled}>
        {item.label}
      </option>
    );
  });

  return (
    <select
      id={id || name}
      name={name}
      value={value}
      onChange={onChange}
      className={`${styleClassName} ${className}`.trim()}
      {...props}
    >
      {optionElements}
    </select>
  );
}
