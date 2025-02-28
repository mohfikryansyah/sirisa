<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\GeoLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GeoLocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/GeoLocation/Index', [
            'geoLocations' => GeoLocation::all(),
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
        // dd($request->all());
        $validatedData = $request->validate([
            'title' => 'required|string',
            'path' => 'required|array',
            'path.*' => 'file|mimetypes:application/json,text/plain',
        ]);

        // dd($validatedData);

        $filePaths = [];

        if ($request->hasFile('path')) {
            foreach ($request->file('path') as $file) {
                $filePaths[] = $file->store('geo-locations', 'public');
            }
        }

        foreach ($filePaths as $filePath) {
            GeoLocation::create([
                'title' => $validatedData['title'],
                'path' => $filePath,
            ]);
        }

        return redirect()->route('geo-location.index');
    }


    /**
     * Display the specified resource.
     */
    public function show(GeoLocation $geoLocation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GeoLocation $geoLocation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GeoLocation $geoLocation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(GeoLocation $geoLocation)
    {
        if ($geoLocation->path) {
            Storage::disk('public')->delete($geoLocation->path);
        }

        $geoLocation->delete();

        return redirect()->route('geo-location.index')->with('success', 'GeoLocation berhasil dihapus.');
    }
}
