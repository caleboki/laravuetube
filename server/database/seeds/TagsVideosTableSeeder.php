<?php

use Illuminate\Database\Seeder;

class TagsVideosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tag_video')->insert([
            'tag_id' => 1,
            'video_id' => 2
        ]);

        DB::table('tag_video')->insert([
            'tag_id' => 1,
            'video_id' => 7
        ]);

        DB::table('tag_video')->insert([
            'tag_id' => 2,
            'video_id' => 3
        ]);

        DB::table('tag_video')->insert([
            'tag_id' => 3,
            'video_id' => 2
        ]);

        DB::table('tag_video')->insert([
            'tag_id' => 3,
            'video_id' => 5
        ]);

        DB::table('tag_video')->insert([
            'tag_id' => 1,
            'video_id' => 8
        ]);

        DB::table('tag_video')->insert([
            'tag_id' => 2,
            'video_id' => 6
        ]);

        DB::table('tag_video')->insert([
            'tag_id' => 1,
            'video_id' => 1
        ]);

        DB::table('tag_video')->insert([
            'tag_id' => 1,
            'video_id' => 4
        ]);

        DB::table('tag_video')->insert([
            'tag_id' => 4,
            'video_id' => 1
        ]);
    }
}
