<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\Status;
use App\Models\Complaint;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ComplaintFile;
use Illuminate\Validation\Rule;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class ComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Pengaduan/Index', [
            'complaints' => Complaint::latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:80|min:2',
            'message' => 'required|string',
            'telp' => 'required|numeric|min_digits:9|max_digits:15',
            'latitude' => 'required',
            'longitude' => 'required',
            'audio' => 'nullable|file',
            'files.*' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        DB::beginTransaction();

        try {
            $complaint = Complaint::create([
                'name' => $validatedData['name'],
                'message' => $validatedData['message'],
                'telp' => $validatedData['telp'],
                'latitude' => $validatedData['latitude'] = (float) $request['longitude'],
                'longitude' => $validatedData['longitude'] = (float) $request['latitude'],
            ]);

            $complaint->statuses()->create([
                'complaint_id' => $complaint->id,
            ]);

            if ($request->hasFile('audio')) {
                $audioPath = $request->file('audio')->store('complaints/audio');
                $complaint->update(['audio' => $audioPath]);
            }

            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $filePath = $file->store('complaints/files');
                    ComplaintFile::create([
                        'complaint_id' => $complaint->id,
                        'file_path' => $filePath,
                    ]);
                }
            }

            DB::commit();
            return redirect()->back();
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with('error', $th->getMessage());
        }



        return redirect()->back()->with('sucess', 'Berhasil mengirimkan penguduan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Complaint $complaint)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Complaint $complaint)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Complaint $complaint)
    {
        $request->validate([
            'status' => ['required', Rule::in(Status::values())],
        ]);

        $complaint->statuses()->create($request->only('status'));

        return redirect()->back()->with('sucess', 'Berhasil mengirimkan penguduan!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Complaint $complaint)
    {
        $complaint->delete();

        return redirect()->back()->with('sucess', 'Berhasil menghapus pengaduan!');
    }

    public function deleteSelectedRows(Request $request)
    {
        $ids = $request->input('ids');
// dd($ids);
        if (empty($ids)) {
            return redirect()->back()->with('error', 'Tidak ada baris yang dipilih.');
        }
        
        $tes = Complaint::whereIn('id', $ids)->delete();
        // dd($tes);

        return redirect()->back()->with('success', 'Baris berhasil dihapus.');
    }

    public function search(Request $request)
    {
        $query = $request->get('query');

        $complaints = Complaint::where('telp', 'like', $query)->get();

        dd($complaints);

        return Inertia::render('Admin/Pengaduan/Index', [
            'complaints' => $complaints,
        ]);
    }
}
