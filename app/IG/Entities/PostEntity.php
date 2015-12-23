<?php

namespace IG\Entities;

use Illuminate\Database\Eloquent\Collection;

class PostEntity extends BaseEntity
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'posts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [ 'id' , 'category_id' , 'name' , 'slug' , 'available' , 'excerpt' , 'content' ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['custom_fields'];

    protected $appends = ['custom_data'];

    public function category()
    {
        return $this->belongsTo(CategoryEntity::class , 'category_id');
    }

    public function custom_fields()
    {
        return $this->hasMany(CustomFieldEntity::class , 'post_id');
    }

    public function getCustomDataAttribute()
    {
        $data = [];

        foreach($this->custom_fields as $field)
        {
            $item = [
                'name' => $field->field,
                'value' => $field->value
            ];

            if(isset($data[$field->slug]))
            {
                if(!is_array($data[$field->slug]['value']))
                {
                    $data[$field->slug]['value'] = [$data[$field->slug]['value']];
                }

                $data[$field->slug]['value'][] = $item['value'];
            }
            else
            {
                $data[$field->slug] = $item;
            }


        }

        return $data;
    }


}