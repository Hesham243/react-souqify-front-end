import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as itemService from '../../services/itemService';
import { Form, Button, Alert } from 'react-bootstrap';

const ReviewForm = ({ onReviewSubmit }) => {
	const [review, setReview] = useState('');
	const [rating, setRating] = useState(5);
	const { storeId, itemId } = useParams();
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!review.trim()) return;
		setSubmitting(true);
		setError(null);
		try {
			await itemService.createReview(storeId, itemId, { text: review, rating });
			setReview('');
			setRating(5);
			if (onReviewSubmit) onReviewSubmit();
		} catch (err) {
			setError('Failed to submit review.');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="mt-4">
			<h5 style={{ color: '#ffb347', marginBottom: '1rem' }}>Add a Review</h5>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formReview">
					<Form.Label>Review</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						value={review}
						onChange={(e) => setReview(e.target.value)}
						required
						disabled={submitting}
						placeholder="Write your review here..."
					/>
				</Form.Group>
				
				<Form.Group className="mb-3" controlId="formRating">
					<Form.Label>Rating</Form.Label>
					<Form.Select
						value={rating}
						onChange={(e) => setRating(Number(e.target.value))}
						disabled={submitting}
					>
						{[1, 2, 3, 4, 5].map((num) => (
							<option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
						))}
					</Form.Select>
				</Form.Group>
				
				<Button 
					variant="warning" 
					type="submit" 
					disabled={submitting}
					className="w-100"
				>
					{submitting ? 'Submitting...' : 'Submit Review'}
				</Button>
				
				{error && <Alert variant="danger" className="mt-3">{error}</Alert>}
			</Form>
		</div>
	);
};

export default ReviewForm;
