import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectsAPI from '../api/projects-api';
import { MoonLoader } from 'react-spinners';

// Confirmation modal component
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this project?</p>
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

export default function MyProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const data = await ProjectsAPI.getAll();
                setProjects(data);
                console.log(data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Open the confirmation modal
    const handleDelete = (id) => {
        setProjectToDelete(id); // Store the project ID to be deleted
        setModalOpen(true); // Open the modal
    };

    // Confirm deletion and call the delete API
    const confirmDelete = async () => {
        if (projectToDelete) {
            try {
                await ProjectsAPI.delete(projectToDelete);
                setProjects(projects.filter(project => project._id !== projectToDelete));
                console.log(`Project with ID ${projectToDelete} deleted successfully.`);
                setModalOpen(false); // Close the modal after deletion
                setProjectToDelete(null); // Reset the project to delete
            } catch (error) {
                console.error("Failed to delete project:", error);
            }
        }
    };

    return (
        <section className='px-[120px] py-6'>
            {loading ? (
                <div className='flex items-center mt-[220px] justify-center'>
                    <MoonLoader color='#0f1f69' />
                </div>
            ) : projects.length ? (
                <div className="container dashboard_container">
                    {projects.map(project => (
                        <article key={project._id} className="dashboard_posts text-black bg-white px-[30px] py-[20px] app_transition">
                            <div className="dashboard_posts-info">
                                <div className="dashboard_posts-thumbnail">
                                    <img
                                        src={`http://localhost:3000/${project.img.replace(/\\/g, '/')}`}
                                        alt={project.name}
                                    />
                                </div>
                                <h5>{project.name}</h5>
                            </div>
                            <div className="dashboard_posts-actions">
                                <Link to={`/updateProject/${project._id}/`} className='btn sm primary'>Edit</Link>
                                <button
                                    onClick={() => handleDelete(project._id)}
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

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)} // Close the modal without action
                onConfirm={confirmDelete} // Confirm deletion action
            />
        </section>
    );
}
