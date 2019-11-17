<?php

namespace App\Http\Controllers;

use App\Tag;
use App\Video;
use Illuminate\Http\Request;

class TagController extends Controller
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
            'name' => 'required|max:25|unique:tags'
        ]);

        $tag = new Tag($request->all());
        $tag->name = $request->name;
        $tag->save();

        //Attach just created tag to video
        $id = $request->videoId;
        $video = Video::findOrFail($id);
        $video->tags()->attach($tag->id);

        return response()->json([
                                'videoId' => $id,
                                'video' => $video,
                                'tag' => $tag->name
                                ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function show($tag)
    {
        $tag = Tag::where('name', $tag)->first();
        return response()->json([
            'tag' => $tag

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function edit(Tag $tag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tag $tag)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tag $tag)
    {
        //
    }

    public function attachTag(Request $request) 
    {
        $video = Video::find($request->videoId);       
        $video->tags()->attach($request->tagId);
        return response()->json([
            'message' => 'Tags attached'
        ]);
    }

    public function detachTag(Request $request)
    {
        $video = Video::find($request->videoId);
        $video->tags()->detach($request->tagId);
        return response()->json([
            'message' => 'Tags detached'
        ]);
        
    }
}
