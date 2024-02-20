import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosApi from "../axiosApi.tsx";

const Home: React.FC = () => {
    const [meals, setMeals] = useState<any[]>([]);
    const [totalCalories, setTotalCalories] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchMeals();
    }, []);

    const fetchMeals = async () => {
        try {
            setIsLoading(true);
            const response = await axiosApi.get('/meals.json');
            const fetchedMeals = [];
            let total = 0;
            for (const key in response.data) {
                fetchedMeals.push({
                    id: key,
                    ...response.data[key]
                });
                total += response.data[key].calories;
            }
            setMeals(fetchedMeals);
            setTotalCalories(total);
        } catch (error) {
            console.error('Error fetching meals:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>
            <div className="flex justify-between border-2 h-12 items-center">
                <h3 className="text-2xl ml-10">Total calories: {totalCalories}</h3>
                <button className="w-32 bg-amber-200 mr-10 h-8">
                    <Link to="/MealForm">Add new meal</Link>
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
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
