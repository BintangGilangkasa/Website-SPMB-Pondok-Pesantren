const DEFAULT_TABS = [
  { id: 'overview', label: 'Ringkasan' },
  { id: 'tenants', label: 'Tenant' },
  { id: 'integrations', label: 'Integrasi' },
  { id: 'transactions', label: 'Transaksi' },
  { id: 'applications', label: 'Pengajuan' },
];

export default function SubNavTabs({
  tabs = DEFAULT_TABS,
  activeTab,
  onTabChange,
  ariaLabel = 'Sub-navigasi dashboard platform',
  panelId = 'dashboard-tab-panel',
}) {
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const handleKeyDown = (event) => {
    if (!tabs.length) return;

    const currentIndex = activeIndex >= 0 ? activeIndex : 0;
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    onTabChange?.(nextTab.id);
    document.getElementById(`dashboard-tab-${nextTab.id}`)?.focus();
  };

  return (
    <div className="border-b border-border-super-admin">
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        className="flex gap-1 overflow-x-auto"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`dashboard-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange?.(tab.id)}
              className={`min-h-11 shrink-0 border-b-2 px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-super-admin ${
                isActive
                  ? 'border-primary-super-admin text-primary-super-admin'
                  : 'border-transparent text-muted-super-admin hover:border-border-super-admin hover:text-ink-super-admin'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}