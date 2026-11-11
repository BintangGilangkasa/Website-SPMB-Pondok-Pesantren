// src/pages/super-admin/03-users-access/UsersAndAccess.jsx
import React, { useState, useMemo } from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import MetricCard from '../01-dashboard/components/MetricCard';
import { SearchInput, FilterBar } from '../../../components/ui';
import UsersTable from './components/UsersTable';
import InviteAdminModal from './components/InviteAdminModal';
import UserDetailDrawer from './components/UserDetailDrawer';

import { initialUsersData } from '../../../data/usersData';
import { UserPlus, Users, ShieldCheck, KeyRound, UserCheck, ArrowRight } from 'lucide-react';

export default function UsersAndAccess() {
  // State Data Pengguna & Tab Navigasi SA-03
  const [usersList, setUsersList] = useState(initialUsersData.users);
  const [activeTab, setActiveTab] = useState('akun-platform');

  // State Search & Filter Form
  const [searchKeyword, setSearchKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState('Semua');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedRole, setAppliedRole] = useState('Semua');

  // State Modal & Drawer
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Tab Menu List SA-03
  const tabs = [
    { id: 'akun-platform', label: 'Akun Platform' },
    { id: 'admin-awal-tenant', label: 'Admin Awal Tenant' },
    { id: 'role-platform', label: 'Role Platform' },
    { id: 'riwayat-akses', label: 'Riwayat Akses' },
  ];

  // Logic Filtering User
  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      const matchKeyword =
        user.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        user.tenant.toLowerCase().includes(appliedSearch.toLowerCase());

      const matchRole = appliedRole === 'Semua' || user.role === appliedRole;

      return matchKeyword && matchRole;
    });
  }, [usersList, appliedSearch, appliedRole]);

  // Handler Filter Action
  const handleApplyFilter = () => {
    setAppliedSearch(searchKeyword);
    setAppliedRole(roleFilter);
  };

  const handleResetFilter = () => {
    setSearchKeyword('');
    setRoleFilter('Semua');
    setAppliedSearch('');
    setAppliedRole('Semua');
  };

  // Handler Undang Admin Baru
  const handleInviteSuccess = (newInvite) => {
    const newUser = {
      id: `USR-00${usersList.length + 1}`,
      name: newInvite.email.split('@')[0].replace('.', ' '),
      email: newInvite.email,
      role: newInvite.role,
      tenant: newInvite.tenant,
      status: 'AKTIF',
      avatarBg: 'bg-success-surface',
      avatarColor: 'text-success-foreground',
      joinedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      lastLogin: 'Belum Pernah',
    };
    setUsersList((prev) => [newUser, ...prev]);
  };

  const handleOpenDetail = (user) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-ink-super-admin pb-12">
      
      {/* 1. Page Header SA-03 */}
      <PageHeader
        code="PENGGUNA & HAK AKSES / SA-03"
        role="SUPER ADMIN TKI"
        title="Pengguna & Hak Akses"
        description="Kelola akun platform dan admin awal tenant sesuai permission; petugas internal pesantren tetap dikelola BO-12."
      >
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => alert('Menampilkan rincian seluruh daftar akun platform yang terdaftar.')}
            className="text-xs font-semibold text-ink-super-admin border border-border-super-admin bg-surface-super-admin px-3.5 py-2 rounded-xl hover:bg-surface-accent-super-admin transition-colors"
          >
            Lihat akun
          </button>
          
          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="text-xs font-bold text-on-emphasis-super-admin bg-primary-super-admin hover:bg-primary-hover-super-admin px-4 py-2 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Undang admin awal</span>
          </button>
        </div>
      </PageHeader>

      {/* 2. Navigation Tab Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-border-super-admin">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary-super-admin text-on-emphasis-super-admin shadow-xs'
                  : 'bg-surface-super-admin text-muted-super-admin hover:bg-surface-super-admin border border-border-super-admin'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Grid Metric Cards SA-03 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="AKUN SIMULASI"
          value={initialUsersData.metrics.simulasi.value}
          desc={initialUsersData.metrics.simulasi.desc}
          actionText="Lihat Akun"
          actionIcon={<ArrowRight className="w-3.5 h-3.5" />}
        />
        <MetricCard
          title="AKUN AKTIF"
          value={initialUsersData.metrics.aktif.value}
          desc={initialUsersData.metrics.aktif.desc}
          actionText="Status Layanan"
          actionIcon={<ArrowRight className="w-3.5 h-3.5" />}
        />
        <MetricCard
          title="ADMIN AWAL TENANT"
          value={initialUsersData.metrics.adminAwal.value}
          desc={initialUsersData.metrics.adminAwal.desc}
          actionText="Keanggotaan"
          actionIcon={<ArrowRight className="w-3.5 h-3.5" />}
        />
        <MetricCard
          title="ROLE PLATFORM"
          value={initialUsersData.metrics.rolePlatform.value}
          desc={initialUsersData.metrics.rolePlatform.desc}
          actionText="Penugasan"
          actionIcon={<ArrowRight className="w-3.5 h-3.5" />}
        />
      </div>

      {/* 4. Section FilterBar Global & Users Table */}
      <div className="space-y-4 pt-2">
        <FilterBar onApply={handleApplyFilter} onReset={handleResetFilter}>
          {/* Input Search Nama / Email */}
          <div className="sm:col-span-7">
            <SearchInput
              label="Cari pengguna"
              placeholder="Cari nama atau email..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          {/* Select Dropdown Lingkup Peran */}
          <div className="sm:col-span-5 space-y-1">
            <label className="text-xs font-bold text-muted-super-admin">Lingkup peran</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-super-admin border border-border-super-admin rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-super-admin text-ink-super-admin font-semibold cursor-pointer"
            >
              <option value="Semua">Semua peran</option>
              <option value="Admin Utama Pesantren">Admin Utama Pesantren</option>
              <option value="Operator Platform">Operator Platform</option>
              <option value="Pengawas Transaksi">Pengawas Transaksi</option>
            </select>
          </div>
        </FilterBar>

        {/* Tabel Data Pengguna Platform */}
        <UsersTable
          userList={filteredTenantsUser(activeTab, filteredUsers)}
          onOpenDetail={handleOpenDetail}
        />
      </div>

      {/* 5. Callout Banner Penjelasan PRD SA-03 */}
      <div className="bg-surface-super-admin border border-border-super-admin rounded-2xl p-4 text-xs text-muted-super-admin leading-relaxed shadow-xs">
        Akun login bersifat global, tetapi role platform tidak otomatis memberikan role tenant. Hak akses setiap tenant diperiksa tersendiri.
      </div>

      {/* Footer Disclaimer */}
      <p className="text-[10px] text-muted-super-admin text-center pt-2 leading-relaxed">
        SPMB - PROV v1.2 - DATA SIMULASI · Prototipe UI tanpa backend. Hak akses nyata wajib diperiksa di server.
      </p>

      {/* Modal Undang Admin Awal */}
      <InviteAdminModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInviteSuccess={handleInviteSuccess}
      />

      {/* Side Drawer Detail Pengguna */}
      <UserDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={selectedUser}
      />

    </div>
  );
}

// Helper Filter Data Berdasarkan Tab Aktif
function filteredTenantsUser(activeTab, users) {
  if (activeTab === 'admin-awal-tenant') {
    return users.filter((u) => u.role === 'Admin Utama Pesantren');
  }
  if (activeTab === 'role-platform') {
    return users.filter((u) => u.role !== 'Admin Utama Pesantren');
  }
  return users;
}