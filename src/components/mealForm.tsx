import React from "react";

const MealForm: React.FC = () => {
    return (
        <div>
            <div className="w-80">
                <h2 className="font-bold text-2xl ml-2 mt-14">Add / Edit Meal</h2>
                <select className="ml-2 rounded-md mt-14 h-8">
                    <option disabled={true} value="">Select meal time:</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Snack">Snack</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>
                <textarea className="ml-2 rounded-md mt-10 h-36 w-80 border-black border-2" placeholder="Description:"/>
                <input className="border-2 border-black rounded-md ml-2 mt-5 h-9" type="number" name="calories" placeholder="Calories:"/>
                <button className="w-32 h-12 mt-14 ml-2 bg-gray-400" >Save</button>
            </div>
        </div>
    );
};

export default MealForm;