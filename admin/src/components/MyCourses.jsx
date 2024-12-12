import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CoursesAPI from '../api/courses'; // Ensure the correct path to your API module
import { MoonLoader } from 'react-spinners';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this course?</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    // Function to fetch all courses
    const fetchCourses = async () => {
        try {
            const data = await CoursesAPI.getAll();
            setCourses(data);
        } catch (err) {
            setError('Failed to fetch courses.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch courses when component mounts
    useEffect(() => {
        fetchCourses();
    }, []);

    // Function to handle course deletion
    const handleDelete = async (id) => {
        setCourseToDelete(id);
        setModalOpen(true); // Open the confirmation modal
    };

    const confirmDelete = async () => {
        if (courseToDelete) {
            try {
                await CoursesAPI.delete(courseToDelete); // Call the delete function from CoursesAPI
                setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseToDelete));
                setModalOpen(false); // Close the modal after deletion
                setCourseToDelete(null); // Reset the course to delete
            } catch (err) {
                setError('Failed to delete course.');
                console.error(err);
            }
        }
    };

    return (
        <section className='px-[120px] py-6'>
            {loading ? (
                <div className='flex items-center mt-[220px] justify-center'>
                    <MoonLoader color='#0f1f69' />
                </div>
            ) : courses.length ? (
                <div className="container dashboard_container">
                    {courses.map(course => (
                        <article key={course._id} className="dashboard_posts text-black bg-white px-[30px] py-[20px] app_transition">
                            <div className="dashboard_posts-info">
                                <div className="dashboard_posts-thumbnail">
                                    <video
                                        src={`http://localhost:3000/${course.img.replace(/\\/g, '/')}`} // Ensure the image path is correct
                                        // alt={course.name} // Add alt text for accessibility
                                        muted
                                        onMouseEnter={(e) => {
                                            e.currentTarget.muted = false;
                                            e.currentTarget.play();
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.muted = true;
                                        }}
                                    />
                                </div>
                                <h5>{course.name}</h5>
                            </div>
                            <div className="dashboard_posts-actions">
                                <Link to={`/updatecourses/${course._id}/`} className='btn sm primary'>Edit</Link>
                                <button
                                    onClick={() => handleDelete(course._id)} // Use course ID for deletion
                                    className='btn sm danger'
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <h2 className='center'>You have no posts yet.</h2>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message if any */}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)} // Close the modal without action
                onConfirm={confirmDelete} // Confirm deletion action
            />
        </section>
    );
}
