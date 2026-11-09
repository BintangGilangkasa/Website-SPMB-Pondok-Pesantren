// src/pages/super-admin/04-transactions/TransactionsMonitoring.jsx
import React, { useState, useMemo } from 'react';
import PageHeader from '../../../components/ui/PageHeader';
import MetricCard from '../01-dashboard/components/MetricCard';
import { SearchInput } from '../../../components/ui';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import TransactionTrendChart from './components/TransactionTrendChart';
import MonitoringConditionsWidget from './components/MonitoringConditionsWidget';
import TransactionListDrawer from './components/TransactionListDrawer';
import PaymentStatusPieChart from './components/PaymentStatusPieChart';
import PaymentMethodChart from './components/PaymentMethodChart';

import { initialTransactionsData } from '../../../data/transactionsData';
import { Lock, Calendar, Building2 } from 'lucide-react';

export default function TransactionsMonitoring() {
  // State Data & Filter SA-04
  const [data] = useState(initialTransactionsData);
  const [timeFilterType, setTimeFilterType] = useState('7-hari');
  const [selectedTenant, setSelectedTenant] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedTenant, setAppliedTenant] = useState('all');

  // State Drawer & Modal
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Logic Filter Trends & Transaksi
  const activeTrendData = useMemo(() => {
    if (timeFilterType === 'mingguan') return data.trends.mingguan;
    if (timeFilterType === 'bulanan') return data.trends.bulanan;
    return data.trends.harian; // default 7-hari / 30-hari harian
  }, [data.trends, timeFilterType]);

  const filteredTransactions = useMemo(() => {
    return data.transactions.filter((trx) => {
      const matchSearch =
        trx.id.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        trx.ref_no.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        trx.tenant_name.toLowerCase().includes(appliedSearch.toLowerCase());

      const matchTenant =
        appliedTenant === 'all' ||
        trx.tenant_name.toLowerCase().includes(appliedTenant.toLowerCase());

      return matchSearch && matchTenant;
    });
  }, [data.transactions, appliedSearch, appliedTenant]);

  // Handlers Filter Action
  const handleApplyFilter = () => {
    setAppliedSearch(searchKeyword);
    setAppliedTenant(selectedTenant);
  };

  const handleResetFilter = () => {
    setSearchKeyword('');
    setSelectedTenant('all');
    setAppliedSearch('');
    setAppliedTenant('all');
    setTimeFilterType('7-hari');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-[#2B2118] pb-12">
      
      {/* 1. Page Header SA-04 */}
      <PageHeader
        code="SA-04 // SUPER ADMIN TKI"
        role="PENGAWASAN TRANSAKSI"
        title="Pengawasan Transaksi"
        description="Ringkasan status invoice dan kesehatan konfirmasi pembayaran di seluruh platform, sesuai izin baca-saja."
      >
        <div className="self-start sm:self-auto shrink-0">
          <Badge variant="TERTANGGUHKAN" className="bg-[#FAF8F5] text-[#6E5A44] border-[#D6CBB8] px-3 py-1 text-xs flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>BACA-SAJA</span>
          </Badge>
        </div>
      </PageHeader>

      {/* 3. Kartu Indikator Utama (4 Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="TOTAL INVOICE"
          value={data.metrics.totalInvoice.value}
          desc={data.metrics.totalInvoice.desc}
          actionText="Lihat data →"
          onClick={() => setIsDrawerOpen(true)}
        />
        <MetricCard
          title="INVOICE LUNAS"
          value={data.metrics.invoiceLunas.value}
          desc={data.metrics.invoiceLunas.desc}
          actionText="Lihat data →"
          onClick={() => setIsDrawerOpen(true)}
        />
        <MetricCard
          title="MENUNGGU KONFIRMASI"
          value={data.metrics.menungguKonfirmasi.value}
          desc={data.metrics.menungguKonfirmasi.desc}
          actionText="Lihat data →"
          onClick={() => setIsDrawerOpen(true)}
        />
        <MetricCard
          title="BELUM LUNAS"
          value={data.metrics.belumLunas.value}
          desc={data.metrics.belumLunas.desc}
          actionText="Lihat data →"
          onClick={() => setIsDrawerOpen(true)}
        />
      </div>

      {/* 4. Selector Rentang Tampilan & FilterBar (Harian/Mingguan/Bulanan & Filter Sekolah) */}
      <div className="bg-white p-4 rounded-2xl border border-[#ECE5D8] shadow-xs space-y-4">
        
        {/* Toggle Rentang Waktu (7 Hari, 30 Hari, Mingguan, Bulanan) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#F5F0E8] pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#8C7A6B]" />
            <span className="text-xs font-bold text-[#6E5A44]">Rentang tampilan:</span>
            
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCD3C5]">
              <button
                type="button"
                onClick={() => setTimeFilterType('7-hari')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  timeFilterType === '7-hari'
                    ? 'bg-[#8C583C] text-white shadow-xs'
                    : 'text-[#6E5A44] hover:bg-[#F2ECE1]'
                }`}
              >
                7 Hari
              </button>
              <button
                type="button"
                onClick={() => setTimeFilterType('30-hari')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  timeFilterType === '30-hari'
                    ? 'bg-[#8C583C] text-white shadow-xs'
                    : 'text-[#6E5A44] hover:bg-[#F2ECE1]'
                }`}
              >
                30 Hari
              </button>
              <button
                type="button"
                onClick={() => setTimeFilterType('mingguan')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  timeFilterType === 'mingguan'
                    ? 'bg-[#8C583C] text-white shadow-xs'
                    : 'text-[#6E5A44] hover:bg-[#F2ECE1]'
                }`}
              >
                Mingguan
              </button>
              <button
                type="button"
                onClick={() => setTimeFilterType('bulanan')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  timeFilterType === 'bulanan'
                    ? 'bg-[#8C583C] text-white shadow-xs'
                    : 'text-[#6E5A44] hover:bg-[#F2ECE1]'
                }`}
              >
                Bulanan
              </button>
            </div>
          </div>

          <span className="text-[11px] text-[#9A8B7C]">
            Data ilustratif · {timeFilterType} · seluruh tenant
          </span>
        </div>

        {/* Global Filter Bar (Filter Sekolah & Search Input) */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-6">
            <SearchInput
              label="Cari invoice / ref no"
              placeholder="Masukkan nomor transaksi atau invoice..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="sm:col-span-4 space-y-1">
            <label className="text-xs font-bold text-[#6E5A44] flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Filter Sekolah / Tenant</span>
            </label>
            <select
              value={selectedTenant}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DCD3C5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8B5E34] text-[#2B2118] font-semibold cursor-pointer"
            >
              {data.tenants.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 flex items-center gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={handleApplyFilter}
              className="flex-1 bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#3A2E2B] border border-[#D6CBB8]"
            >
              Cari
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={handleResetFilter}
              className="px-3 text-[#8C7A6B]"
            >
              Reset
            </Button>
          </div>
        </div>

      </div>

      {/* 5. Baris Grafik Utama: Tren Konfirmasi Transaksi (7 Kolom) & Widget Dipantau (5 Kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Tren Konfirmasi Transaksi Chart (Recharts Bar) */}
        <div className="lg:col-span-7">
          <TransactionTrendChart
            data={activeTrendData}
            timeRangeLabel={timeFilterType}
          />
        </div>

        {/* Kondisi Perlu Dipantau Widget */}
        <div className="lg:col-span-5">
          <MonitoringConditionsWidget
            onPendingClick={() => setIsDrawerOpen(true)}
            onIntegrationClick={() => alert('Membuka detail log integrasi pembayaran platform.')}
          />
        </div>

      </div>

      {/* 6. Baris Grafik Tambahan: Komposisi Status Invoice & Volume Metode Pembayaran */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <PaymentStatusPieChart />
        <PaymentMethodChart />
      </div>

      {/* 7. Action Bar & Drawer Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <Button
          variant="primary"
          size="md"
          className="bg-button hover:bg-[#734730] text-white px-5 py-2.5 rounded-xl shadow-xs w-full sm:w-auto"
          onClick={() => setIsDrawerOpen(true)}
        >
          Buka Daftar Transaksi
        </Button>

        <Button
          variant="secondary"
          size="md"
          className="bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#3A2E2B] border border-[#D6CBB8] px-5 py-2.5 rounded-xl w-full sm:w-auto"
          onClick={() => alert('Membuka rincian kendala integrasi pembayaran global.')}
        >
          Lihat Kendala Integrasi
        </Button>
      </div>

      {/* Footer Disclaimer PRD SA-04 */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#A39485] pt-4 border-t border-[#EAE2D5] gap-2">
        <span>SPMB · PRD v1.3 - SIMULASI</span>
        <span>Pantauan platform, bukan otorisasi pengubahan pembayaran.</span>
      </div>

      {/* Side Drawer Detail Transaksi (Read-Only) */}
      <TransactionListDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        transactions={filteredTransactions}
      />

    </div>
  );
}