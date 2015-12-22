<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tasks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['description', 'completed_at'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * Default constructor
     */
    public function __construct()
    {
        $this->completed_at = null;
    }

    /**
     * The user that owns this task
     *
     * @return App\User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}