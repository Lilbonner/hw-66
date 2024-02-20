import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from "../axiosApi.tsx";

const MealForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        time: '',
        description: '',
        calories: 0
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            fetchMeal();
        }
    }, [id]);

    const fetchMeal = async () => {
        try {
            setIsLoading(true);
            const response = await axiosApi.get(`/meals/${id}.json`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching meal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const caloriesNumber = +formData.calories;
            const updatedFormData = { ...formData, calories: caloriesNumber };
            if (id) {
                await axiosApi.put(`/meals/${id}.json`, updatedFormData);
            } else {
                await axiosApi.post('/meals.json', updatedFormData);
            }
            navigate("/");
        } catch (error) {
            console.error('Error saving meal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="w-80">
                <h2 className="font-bold text-2xl ml-2 mt-14">{id ? 'Edit Meal' : 'Add Meal'}</h2>
                <form onSubmit={handleSubmit}>
                    <select className="ml-2 rounded-md mt-14 h-8" name="time" value={formData.time} onChange={handleChange}>
                        <option disabled={true} value="">
                            Select meal time:
                        </option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Snack">Snack</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                    <textarea className="ml-2 rounded-md mt-10 h-36 w-80 border-black border-2" placeholder="Description:" name="description" value={formData.description} onChange={handleChange} />
                    <input className="border-2 border-black rounded-md ml-2 mt-5 h-9" type="number" name="calories" placeholder="Calories:" value={formData.calories} onChange={handleChange} />
                    <button className="w-32 h-12 mt-14 ml-2 bg-gray-400" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</button>
                </form>
            </div>
        </div>
    );
};

export default MealForm;
