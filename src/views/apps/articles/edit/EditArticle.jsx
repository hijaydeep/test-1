'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import {
  Button,
  TextField,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';

export const dynamic = 'force-dynamic'

const EditArticles = () => {

  const router = useRouter();
  const params = useParams();
  const [articleData, setArticleData] = useState({
    topic: '',
    source: '',
    author: '',
    thumbnail: '',
    youtubeLink: '',
    shortDescription: '',
    longDescription: '',
  });

  const [imageDeleted, setImageDeleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const id = params.id;
      try {
        const res = await fetch(`http://localhost:3000/api/apps/articles/${id}`);
        const data = await res.json();
        setArticleData(data.article);
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };
    fetchData();
  }, [params.id]);

console.log(articleData.thumbnail)

  const handleChange = (e) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    router.push('/apps/articles/list');
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticleData({ ...articleData, thumbnail: file });
    }
    console.log(file)
  };

  const handleDeleteImage = async (e) => {
    e.preventDefault();
    try {
      if (articleData.thumbnail) {
        const res = await fetch(`/api/apps/articles/${params.id}/deleteimage`, {
          method: "DELETE",
        });

        if (res.ok) {
          setArticleData({ ...articleData, thumbnail: '' });
          setImageDeleted(true);
          console.log('Image deleted successfully');
        } else {
          console.error('Error deleting image');
        }
      } else {
        console.log('No image to delete');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('topic', articleData.topic);
      formData.append('source', articleData.source);
      formData.append('author', articleData.author);
      formData.append('youtubeLink', articleData.youtubeLink);
      formData.append('shortDescription', articleData.shortDescription);
      formData.append('longDescription', articleData.longDescription);
      formData.append('thumbnail', articleData.thumbnail);

      const res = await fetch(`/api/apps/articles/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        router.push('/apps/articles/list');
      } else {
        console.error('Error adding article');
      }
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between pli-5 plb-[15px]'>
        <Typography variant='h5'>Edit Article</Typography>
        <IconButton onClick={handleBack}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={handleUpdate} className='flex flex-col gap-5'>
          <TextField
            label='Author'
            name='author'
            fullWidth
            placeholder='Enter Author Name'
            value={articleData.author}
            onChange={handleChange}
          />
          <TextField
            label='Topic'
            name='topic'
            fullWidth
            placeholder='Enter Topic'
            value={articleData.topic}
            onChange={handleChange}
          />
          <TextField
            label='Source'
            name='source'
            fullWidth
            placeholder='Enter Source'
            value={articleData.source}
            onChange={handleChange}
          />
          <TextField
            label='YouTube Video Link'
            name='youtubeLink'
            type="email"
            fullWidth
            placeholder='Enter YouTube video URL'
            value={articleData.youtubeLink}
            onChange={handleChange}
          />
          <TextField
            label='Short Description'
            name='shortDescription'
            type="textarea"
            fullWidth
            placeholder='Enter Short Description...'
            value={articleData.shortDescription}
            onChange={handleChange}
          />
          <TextField
            label='Long Description'
            name='longDescription'
            type="textarea"
            fullWidth
            placeholder='Enter Long Description...'
            value={articleData.longDescription}
            onChange={handleChange}
          />
          {!imageDeleted && (
            <div className='p-1 relative'>
              <img
                src={articleData.thumbnail.substring(6)}
                width={250}
                height={180}
                alt="Article Thumbnail"
              />
              <IconButton onClick={handleDeleteImage}>
                <i className='ri-delete-bin-line' />
              </IconButton>
            </div>
          )}
          {imageDeleted && (
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-medium">
                Select Thumbnail Image:
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={handleImage}
              />
            </div>
          )}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Update
            </Button>
            <Button variant='outlined' color='error' onClick={handleBack}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditArticles;
