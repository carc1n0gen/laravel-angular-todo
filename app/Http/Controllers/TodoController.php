<?php

namespace App\Http\Controllers;

use App\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function index()
    {
	    return Auth::user()->todos;
    }

    public function store(Request $request)
    {
        $fields = array_merge($request->all(), ['user_id' => Auth::user()->id]);
        $todo = Todo::create($fields);
        return $todo;
    }

    public function update(Request $request, Todo $todo)
    {
        $todo->fill($request->all());
        $todo->save();
        return $todo;
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response('', 204);
    }
}
