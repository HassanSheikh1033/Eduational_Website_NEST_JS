import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectsAPI from '../api/projects-api';

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleDelete = async (id) => {
        try {
            await ProjectsAPI.delete(id);
            setProjects(projects.filter(project => project._id !== id));
            console.log(`Project with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    return (
        <section className='px-[120px] py-6'>
            {loading ? (
                <h1>Loading</h1>
            ) : projects.length ? (
                <div className="container dashboard_container">
                    {projects.map(project => (
                        <article key={project._id} className="dashboard_posts text-black bg-white px-[30px] py-[20px] app_transition">
                            <div className="dashboard_posts-info">
                                <div className="dashboard_posts-thumbnail">
                                    <img
                                        src={`http://localhost:3000/${project.img.replace(/\\/g, '/')}`}
                                        alt=""
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
        </section>
    );
}
