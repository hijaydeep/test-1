'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  Button,
  TextField,
  Divider,
  IconButton,
  Typography
} from '@mui/material';

export const dynamic = 'force-dynamic'

const MyArticles = () => {

  const router = useRouter();
  const [articleData, setArticleData] = useState({
    topic: '',
    source: '',
    author: '',
    thumbnail: '',
    youtubeLink: '',
    shortDescription: '',
    longDescription: '',
  });

  const handleChange = (e) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticleData({ ...articleData, thumbnail: file });
    }
  };

  const handleBack = () => {
    setArticleData({
      topic: '',
      source: '',
      author: '',
      thumbnail: '',
      youtubeLink: '',
      shortDescription: '',
      longDescription: '',
    });
    router.push('/apps/articles/list');
  };

  const handleSubmit = async (e) => {
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

      const res = await fetch('/api/apps/articles/add', {
        method: "POST",
        body: formData,
      });
      console.log(res)
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
        <Typography variant='h5'>Add New Article</Typography>
        <IconButton onClick={handleBack}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
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
          {/* <label className="form-label">Upload Thumbnail</label>
          <input className="form-control img-thumbnail bg-gray-100"
            type="file"
            name="thumbnail"
            onChange={handleImage}
          /> */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="fileUpload" className="text-gray-700 font-medium">
              Select file to upload:
            </label>
            <input
              id="fileUpload"
              type="file"
              className="w-full px-4 py-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleImage}
            />
          </div>
          {/* <div className="flex items-center justify-center h-16 w-full bg-gray-200 rounded cursor-pointer">
            <input
              type="file"
              accept="image/*"
              name="thumbnail"
              onChange={handleImage}
            />
          </div> */}
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
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
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

export default MyArticles;
