import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../styles/EventDetails.css";
import { AuthContext } from "../../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 3, comment: "" });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3002/events/${id}`)
      .then((res) => {
        console.log("Fetched Event:", res.data);
        setEvent(res.data);
      })
      .catch((error) => console.error("Error fetching event details:", error));

    axios.get(`http://localhost:3002/events/${id}/reviews`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3002/events/${id}/reviews`, {
        rating: reviewData.rating,
        comment: reviewData.comment,
        userId: user._id,
        eventId: id
      });

      alert(response.data.message || "Review submitted successfully!");
      setReviewData({ rating: 3, comment: "" });
      setShowReviewForm(false);

      const updatedReviews = await axios.get(`http://localhost:3002/events/${id}/reviews`);
      setReviews(updatedReviews.data);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert(err.response?.data?.message || "Failed to submit review");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3002/events/${id}`);
      alert(response.data.message);
      navigate("/events");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const isAdmin = user && (user.role === "Community Head" || user.role === "Organization Head");
  const isCreator = user && event && user._id === event.organizedBy;

  if (!event) return <p>Loading event details...</p>;

  const imageUrl = event.bannerImage?.url;
  console.log("Image URL:", imageUrl);

  return (
    <div className="event-container" style={{ marginTop: "100px" }}>
      <h2 className="event-title" style={{ textAlign: "center", marginBottom: "20px" }}>
        {event.title}
      </h2>

      <div className="event-header">
        <div className="event-info">
          <p className="event-description">{event.description}</p>
        </div>
        <div className="event-banner">
          <img
            src={imageUrl}
            alt={event.title || "Event Banner"}
            style={{ maxWidth: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      <div className="event-details">
        <p><strong>Event Type:</strong> {event.eventType}</p>
        <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Volunteers Needed:</strong> {event.volunteersNeeded}</p>
        <p><strong>Registration Price:</strong> {event.registrationPrice > 0 ? `$${event.registrationPrice}` : "Free"}</p>
        <p><strong>Status:</strong> {event.status}</p>
        <p><strong>Organized By:</strong> {event.organizedBy ? event.organizedBy : "N/A"}</p>
        <p><strong>Contact No:</strong> {event.contactPhone}</p>
      </div>

      {(isCreator && isAdmin) && (
        <div className="button-container">
          <Link to={`/events/${id}/edit`}>
            <button className="edit-btn">Edit</button>
          </Link>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      )}

      {(!isAdmin) && (
        <div className="button-container">
          <Link to={`/events/${id}/register`}>
            <button className="btn btn-success">Register As Volunteer</button>
          </Link>
        </div>
      )}

      {reviews.length > 0 && (
        <div>
          <h2 style={{ color: "darkgreen", textAlign: "center", fontWeight: "bold" }}>Reviews</h2>
          <div className="review-list">
            {reviews.map((rev) => (
              <div key={rev._id} className="review-card">
                <div><strong>Rating:</strong> {rev.rating}/5</div>
                <div><strong>Comment:</strong> {rev.comment}</div>
                <small>By: {rev.userId?.name || "Anonymous"} on {new Date(rev.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {user && (
        <div className="review-section">
          <button
            className="add-review-btn btn btn-outline-success mb-3 mt-3"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? "Cancel Review" : "Add Review"}
          </button>

          {showReviewForm && (
            <div className="review-container">
              <h3 className="review-heading">Leave A Review</h3>
              <form className="review-form" onSubmit={handleReviewSubmit}>
                <div className="form-group">
                  <label htmlFor="rating" className="form-label">Rating</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    id="rating"
                    name="rating"
                    value={reviewData.rating}
                    onChange={handleReviewChange}
                    className="form-range"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="comment" className="form-label">Comment</label>
                  <textarea
                    name="comment"
                    id="comment"
                    cols="30"
                    rows="3"
                    value={reviewData.comment}
                    onChange={handleReviewChange}
                    className="form-textarea form-control"
                  />
                </div>
                <button type="submit" className="submit-btn btn btn-success">Submit</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
