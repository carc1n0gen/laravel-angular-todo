<?php

namespace App\Http\Controllers;

use Auth;
use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
	public function index(Request $request)
	{
        return Auth::user()->tasks;
	}

	// public function show(Request $request, $id)
	// {
		
	// }

	public function store(Request $request)
	{
		$user = Auth::user();
        $task = new Task();
        $task->description = $request->input('description');
        $task->user()->associate($user);
        $task->save();
        return $task;
	}

	public function update(Request $request, $id)
	{
		$task = Task::findOrFail($id);
        if ($task->user_id !== Auth::user()->id)
        {
        	return response('Forbidden.')
        		->header('Status', 403);
        }

        $task->fill($request->all());
        $task->save();
        return $task;
	}

	public function destroy($id)
	{
		$task = Task::findOrFail($id);
        if ($task->user_id !== Auth::user()->id)
        {
        	return response('Forbidden.')
        		->header('Status', 403);
        }

        $task->delete();
	}
}