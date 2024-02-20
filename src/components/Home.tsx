import {Link} from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between border-2 h-12 items-center">
                <h3 className="text-2xl ml-10">Total calories:</h3>
                <button className="w-32 bg-amber-200 mr-10 h-8">
                   <Link to="/MealForm">
                       Add new meal
                   </Link>
                </button>
            </div>
        </div>
    );
};

export default Home;
