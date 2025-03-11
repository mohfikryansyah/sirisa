<?php

namespace App\Http\Controllers\Exports;

use App\Exports\ComplaintsExport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;

class ExportComplaintController extends Controller
{
    public function export(Request $request)
    {
        $status = $request->input('status');
        $startDate = $request->startDate;
        $endDate = $request->endDate;

        return Excel::download(new ComplaintsExport($status, $startDate, $endDate), 'laporan_kejadian.xlsx');
    }
}
