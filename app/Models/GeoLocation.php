<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;

class GeoLocation extends Model
{
    protected $guarded = ['id'];

    protected $appends = [
        'geo_json_data',
    ];
    
    public function getGeoJsonDataAttribute()
    {
        if (!$this->path || !Storage::disk('public')->exists($this->path)) {
            return null;
        }

        return json_decode(Storage::disk('public')->get($this->path));
    }
}
