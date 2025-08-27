<?php

namespace App\Models;

use App\Models\ComplaintFile;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Complaint extends Model
{
    /** @use HasFactory<\Database\Factories\ComplaintFactory> */
    use HasFactory;

    protected $guarded = ['id'];
    protected $with = ['files', 'statuses'];
    protected $appends = [
        'created_at_formatted',
    ];

    public function getCreatedAtFormattedAttribute()
    {
        return $this->attributes['created_at'];
    }


    public function files(): HasMany
    {
        return $this->hasMany(ComplaintFile::class);
    }

    public function statuses(): HasOne
    {
        return $this->hasOne(ComplaintStatus::class, 'complaint_id')->latestOfMany();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // public function repair(): HasOne
    // {
    //     return $this->hasOne(Repair::class, 'complaint_id');
    // }
}
