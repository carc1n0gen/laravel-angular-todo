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
        $todo = Todo::create(array_merge($request->all(), ['user_id' => Auth::user()->id]));
        return $todo;
    }

    public function update(Request $request, Todo $todo)
    {
        $this->authorize('task.update', $todo);

        $todo->fill($request->all());
        $todo->save();
        return $todo;
    }

    public function destroy(Todo $todo)
    {
        $this->authorize('task.delete', $todo);

        $todo->delete();
        return response('', 204);
    }
}
