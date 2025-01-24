<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class studentController extends Controller
{
    public function index(){
        $students = Student::all();

        if($students->isEmpty()){
            $data = [
                'messages' => 'No students yet',
                'status' => 200
            ];
            return response()->json($data, 200);
        }

        return response()->json($students, 200);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' =>'required|string|max:250',
            'email' =>'required|email|unique:student',
            'phone' =>'string|max_digits:15',
            'career' =>'required|string',
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error in validation of data',
                'error' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $student = Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'career' => $request->career
        ]);

        if (!$student) {
            $data = [
                'message' => 'Error in creating student',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'student' => $student,
            'message' => 'Student created successfully',
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function show($id){
        $student = Student::find($id);

        if(!$student){
            $data = [
                'message' => 'Student not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'student' => $student,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function update(Request $request, $id){
        $student = Student::find($id);

        if(!$student){
            $data = [
                'message' => 'Student not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name' =>'required|string|max:250',
            'email' =>'required|email|unique:student',
            'phone' =>'required|string|max_digits:15',
            'career' =>'required|string',
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error in validation of data',
                'error' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $student->name = $request->name;
        $student->email = $request->email;
        $student->phone = $request->phone;
        $student->career = $request->career;

        if(!$student->save()){
            $data = [
                'message' => 'Error in updating student',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'student' => $student,
            'message' => 'Student updated successfully',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function updatePartial(Request $request, $id){
        $student = Student::find($id);

        if(!$student){
            $data = [
                'message' => 'Student not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name' =>'string|max:250',
            'email' =>'email|unique:student',
            'phone' =>'string|max_digits:15',
            'career' =>'string',
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error in validation of data',
                'error' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if($request->has('name')){
            $student->name = $request->name;
        }
        if($request->has('email')){
            $student->email = $request->email;
        }
        if($request->has('phone')){
            $student->phone = $request->phone;
        }
        if($request->has('career')){
            $student->career = $request->career;
        }

        $student->save();

        $data = [
            'student' => $student,
            'message' => 'Student updated partially successfully',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function destroy($id){
        $student = Student::find($id);

        if(!$student){
            $data = [
                'message' => 'Student not found',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        if(!$student->delete()){
            $data = [
                'message' => 'Error in deleting student',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Student deleted successfully',
            'status' => 200
        ];

        return response()->json($data, 200);
    }
}
