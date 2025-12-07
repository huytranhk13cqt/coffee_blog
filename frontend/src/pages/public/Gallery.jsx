/**
 * Gallery.jsx
 * ============
 * Trang hiển thị tất cả images từ blog posts.
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { getGalleryImages } from "../../services/galleryService";

function Gallery() {
  // States
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Fetch images
  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        setError(null);

        const data = await getGalleryImages();
        setImages(data.images);

        document.title = "Gallery | Coffee's Blog";
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        setError("Failed to load gallery.");
      } finally {
        setLoading(false);
      }
    }

    fetchImages();

    return () => {
      document.title = "Coffee's Blog";
    };
  }, []);

  // Open lightbox
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Prepare slides for lightbox
  const slides = images.map((img) => ({
    src: img.url,
    alt: img.alt,
    title: img.post_title,
  }));

  // Loading state
  if (loading) {
    return (
      <div className="gallery">
        <div className="loading">Loading gallery...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="gallery">
        <div className="error">
          <h2>😕 Oops!</h2>
          <p>{error}</p>
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery">
      {/* Header */}
      <header className="gallery__header">
        <h1 className="gallery__title">Gallery 📸</h1>
        <p className="gallery__subtitle">
          A collection of images from my blog posts
        </p>
        <p className="gallery__count">
          {images.length} {images.length === 1 ? "image" : "images"}
        </p>
      </header>

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="gallery__grid">
          {images.map((image, index) => (
            <div
              key={`${image.post_slug}-${index}`}
              className="gallery__item"
              onClick={() => openLightbox(index)}
            >
              <img src={image.url} alt={image.alt} loading="lazy" />
              <div className="gallery__item-overlay">
                <span className="gallery__item-title">{image.alt}</span>
                <Link
                  to={`/post/${image.post_slug}`}
                  className="gallery__item-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  From: {image.post_title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="gallery__empty">
          <p>📷 No images yet.</p>
          <p>Images will appear here when you add them to your posts!</p>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
      />
    </div>
  );
}

export default Gallery;
