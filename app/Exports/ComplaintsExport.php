<?php

namespace App\Exports;

use App\Models\Complaint;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ComplaintsExport implements FromCollection, WithHeadings, WithMapping
{
    protected $status;
    protected $startDate;
    protected $endDate;

    /**
     * @param string|null $status
     * @param string|null $startDate Format: YYYY-MM-DD
     * @param string|null $endDate Format: YYYY-MM-DD
     */
    public function __construct($status = null, $startDate = null, $endDate = null)
    {
        $this->status    = $status;
        $this->startDate = $startDate;
        $this->endDate   = $endDate;
    }

    public function collection()
    {
        $query = Complaint::with('statuses');

        if ($this->status) {
            $query->whereHas('statuses', function ($q) {
                $q->where('status', $this->status);
            });
        }
        if ($this->startDate) {
            $query->whereDate('created_at', '>=', $this->startDate);
        }

        if ($this->endDate) {
            $query->whereDate('created_at', '<=', $this->endDate);
        }

        return $query->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nama',
            'Telepon',
            'Laporan Kejadian',
            'Latitude',
            'Longitude',
            'Status',
            'Tanggal Status Terakhir',
            'Dibuat Pada',
        ];
    }

    public function map($complaint): array
    {
        return [
            $complaint->id,
            $complaint->name,
            $complaint->telp,
            $complaint->message,
            $complaint->latitude,
            $complaint->longitude,
            $complaint->statuses?->status ?? 'Belum diproses',
            $complaint->statuses?->created_at->format('Y-m-d') ?? '-',
            $complaint->created_at->format('Y-m-d'),
        ];
    }
}
