import { useState, useEffect } from 'react';
import axios from 'axios';
import './likeButton.scss';

function LikeButton({ postId, initialLikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLikeStatus();
  }, [postId]);

  const checkLikeStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/posts/${postId}/like/status`, {
        headers: { 'x-access-token': token }
      });
      setIsLiked(response.data.liked);
    } catch (error) {
      console.error('Erro ao verificar status do like:', error);
    }
  };

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (isLiked) {
        await axios.delete(`http://localhost:5000/posts/${postId}/like`, {
          headers: { 'x-access-token': token }
        });
        setLikes(prev => prev - 1);
      } else {
        await axios.post(`http://localhost:5000/posts/${postId}/like`, {}, {
          headers: { 'x-access-token': token }
        });
        setLikes(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Erro ao curtir/descurtir:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`like-button ${isLiked ? 'liked' : ''}`}
      onClick={handleLike}
      disabled={loading}
    >
      <span className="heart-icon">❤️</span>
      <span className="likes-count">{likes}</span>
    </button>
  );
}

export default LikeButton;
