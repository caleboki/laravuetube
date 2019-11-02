<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Video;
use App\Tag;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $videos = Video::with('tags')->get();
        $tags = Tag::with('videos')->get();
        
        return response()
    		->json([
                'videos' => $videos,
                'tags' => $tags
    		]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validate($request, [
    		'name' => 'required|max:255',
    		'description' => 'required|max:3000',
            'thumbnail' => 'required',
            'videoUrl' => 'required'
        ]);

        $video = new Video($request->all());

        $video->save();

        return response()
            ->json([
                'video' => $video
            ]);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $video = Video::findOrFail($id);
        return response()
    		->json([
                'video' => $video,
                'tags' => $video->tags
    		]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $this->validate($request, [
    		'name' => 'required|max:50',
    		'description' => 'required',
            'thumbnail' => 'required',
            'videoUrl' => 'required'
        ]);

        $video = Video::findorFail($id);

        $video->name = $request->name;
        $video->description = $request->description;
        $video->thumbnail = $request->thumbnail;
        $video->videoUrl = $request->videoUrl;

        $video->save();

        return response()
            ->json([
                'video' => $video
            ]);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $video = Video::findorFail($id);
        $video->delete();
    }
}
