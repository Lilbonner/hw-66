import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosApi from "../axiosApi.tsx";

const Home: React.FC = () => {
    const [meals, setMeals] = useState<any[]>([]);
    const [totalCalories, setTotalCalories] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMeals();
    }, []);

    useEffect(() => {
        let total = 0;
        for (const meal of meals) {
            total += meal.calories;
        }
        setTotalCalories(total);
    }, [meals]);

    const fetchMeals = async () => {
        try {
            setIsLoading(true);
            const response = await axiosApi.get('/meals.json');
            const fetchedMeals = [];
            for (const key in response.data) {
                fetchedMeals.push({
                    id: key,
                    ...response.data[key]
                });
            }
            setMeals(fetchedMeals);
        } catch (error) {
            console.error('Error fetching meals:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteMeal = async (mealId: string) => {
        try {
            setIsLoading(true);
            await axiosApi.delete(`/meals/${mealId}.json`);
            await fetchMeals();
        } catch (error) {
            console.error('Error deleting meal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditMeal = (mealId: string) => {
        navigate(`/editMeal/${mealId}`);
    };

    return (
        <div>
            <div className="flex justify-between border-2 h-12 items-center">
                <h3 className="text-2xl ml-10">Total calories: {totalCalories}</h3>
                <button className="w-32 bg-amber-200 mr-10 h-8">
                    <Link to="/addMeal">Add new meal</Link>
                </button>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                meals.map(meal => (
                    <div className="border-2 border-black rounded-md mt-2" key={meal.id}>
                        <div className="flex justify-between">
                            <div>
                                <p className="ml-1 mt-1 text-gray-400 text-2xl">{meal.time}:</p>
                                <p className="ml-1 mt-1 text-2xl">{meal.description}</p>
                                <p className="ml-1 mt-1 font-bold" >{meal.calories} kcal</p>
                            </div>
                            <div className="flex flex-col items-end mr-5 mt-6">
                                <button onClick={() => handleDeleteMeal(meal.id)}>
                                    <span className="material-symbols-outlined">Delete</span>
                                </button>
                                <button onClick={() => handleEditMeal(meal.id)}>
                                    <span className="material-symbols-outlined">Edit</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
