<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComplaintStatus extends Model
{
    /** @use HasFactory<\Database\Factories\ComplaintStatusFactory> */
    use HasFactory;

    protected $guarded = ['id'];
    protected $fillable = ['complaint_id', 'status', 'note'];
    protected $attributes = ['status' => 'Belum diproses'];
    protected $cast = Status::class;

    public function complaint(): BelongsTo
    {
        return $this->belongsTo(Complaint::class);
    }
}
