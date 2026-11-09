// src/pages/super-admin/02-tenant/TenantManagement.jsx
import React, { useState, useEffect, useMemo } from "react";
import { SearchInput, FilterBar } from "../../../components/ui";
import PageHeader from "../../../components/ui/PageHeader";
import MetricCard from "../01-dashboard/components/MetricCard";
import TenantTable from "./components/TenantTable";
import TenantDetailDrawer from "./components/TenantDetailDrawer";
import { Plus } from "lucide-react";

// Import data dummy dari file terpisah
import { initialTenants } from "../../../data/TenantData";

export default function TenantManagement() {
  // State Data Institusi / Tenant
  const [tenants] = useState(initialTenants);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // State Input Form Filter (Temporary State)
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  // State Filter Aktif (Applied Filter State)
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedStatus, setAppliedStatus] = useState("Semua");

  // State Side Drawer Detail Tenant
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Simulasi fetching data statistik khusus Tenant (SA-02)
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Logic Filter & Pencarian
  const filteredTenants = useMemo(() => {
    return tenants.filter((item) => {
      const matchKeyword =
        item.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        item.slug.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        item.code.toLowerCase().includes(appliedSearch.toLowerCase());

      const matchStatus = appliedStatus === "Semua" || item.status === appliedStatus;

      return matchKeyword && matchStatus;
    });
  }, [tenants, appliedSearch, appliedStatus]);

  // Metric Calculation Ringkasan
  const metrics = useMemo(() => {
    const total = tenants.length;
    const aktif = tenants.filter((t) => t.status === "AKTIF").length;
    const belumAktif = tenants.filter((t) => t.status === "BELUM_AKTIF").length;
    const ditangguhkan = tenants.filter((t) => t.status === "TERTANGGUHKAN").length;
    return { total, aktif, belumAktif, ditangguhkan };
  }, [tenants]);

  // Handler Tombol Terapkan & Reset
  const handleApplyFilter = () => {
    setAppliedSearch(searchKeyword);
    setAppliedStatus(statusFilter);
  };

  const handleResetFilter = () => {
    setSearchKeyword("");
    setStatusFilter("Semua");
    setAppliedSearch("");
    setAppliedStatus("Semua");
  };

  const handleOpenDetail = (tenant) => {
    setSelectedTenant(tenant);
    setIsDrawerOpen(true);
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-xs text-[#8C7A6B] font-medium">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-[#8B5E34] border-t-transparent mb-2"></div>
        <p>Memuat data institusi & tenant SA-02...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-[#FDEDEC] border border-[#F5C6CB] text-[#721C24] rounded-xl text-xs">
        <strong>Gagal Memuat Data:</strong> Data institusi/tenant gagal dimuat. Silakan periksa koneksi atau integrasi backend Anda.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-[#2B2118] pb-12">
      
      {/* 1. Header & Tombol Aksi Kanan (SA-02) */}
      <PageHeader
        code="SA-02 - DAFTAR"
        role="SUPER ADMIN TKI"
        title="Institusi / Tenant"
        description="Kelola institusi pelanggan TKI pada lingkup platform. Nama pesantren yang resmi berasal dari halaman ini."
        actionText={
          <span className="flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Tenant</span>
          </span>
        }
        onActionClick={() => {
          alert("Membuka modal pendaftaran tenant baru (Simulasi SA-02)");
        }}
      />

      {/* 2. Grid Cards Ringkasan Tenant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="TOTAL TENANT"
          value={metrics.total}
          desc="Seluruh organisasi terdaftar"
          actionText="Lihat Tenant →"
        />
        <MetricCard
          title="AKTIF"
          value={metrics.aktif}
          desc="Tenant berstatus aktif"
          actionText="Lihat Tenant →"
        />
        <MetricCard
          title="BELUM AKTIF"
          value={metrics.belumAktif}
          desc="Memerlukan aktivasi"
          actionText="Lihat Tenant →"
        />
        <MetricCard
          title="DITANGGUHKAN"
          value={metrics.ditangguhkan}
          desc="Histori tetap disimpan"
          actionText="Lihat Tenant →"
        />
      </div>

      {/* 3. Section Daftar Institusi (Filter Bar Global & Tabel Data) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-serif font-bold text-[#2B2118]">Daftar institusi</h2>
          <span className="text-xs text-[#8C7A6B]">
            {filteredTenants.length} dari {tenants.length} tenant
          </span>
        </div>

        {/* Global FilterBar Container yang Mengonsumsi SearchInput & Dropdown */}
        <FilterBar onApply={handleApplyFilter} onReset={handleResetFilter}>
          {/* Input Search Nama / Slug (7 Kolom Grid) */}
          <div className="sm:col-span-7">
            <SearchInput
              label="Cari nama / slug"
              placeholder="Cari pesantren atau slug..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          {/* Select Status Tenant (5 Kolom Grid) */}
          <div className="sm:col-span-5 space-y-1">
            <label className="text-xs font-bold text-[#6E5A44]">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DCD3C5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8B5E34] text-[#2B2118] font-semibold cursor-pointer"
            >
              <option value="Semua">Semua status</option>
              <option value="AKTIF">Aktif</option>
              <option value="BELUM_AKTIF">Belum Aktif</option>
              <option value="TERTANGGUHKAN">Ditangguhkan</option>
            </select>
          </div>
        </FilterBar>

        {/* Tabel Data Tenant SA-02 */}
        <TenantTable
          tenantList={filteredTenants}
          onOpenDetail={handleOpenDetail}
        />
      </div>

      {/* Side Drawer Detail Tenant (Read-Only Detail & Audit History) */}
      <TenantDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        tenant={selectedTenant}
      />

    </div>
  );
}