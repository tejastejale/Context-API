import React, {useEffect} from "react";
import Mealsitem from "./Mealsitem";
import useHttp from "./useHttp";
const reqConfig = {};

function Meals() {
  // const [loadedmeals, setLoadedmeals] = React.useState([]);

  // useEffect(() => {
  //   fetchmeals();
  // }, []);

  // async function fetchmeals() {
  //   const response = await fetch("http://localhost:3000/meals");
  //   if (!response.ok) {
  //   }
  //   const meals = await response.json();
  //   setLoadedmeals(meals);
  // }
  const {
    data: loadedmeals,
    isloading,
    error,
  } = useHttp("http://localhost:3000/meals", reqConfig, []);

  if (isloading) return <p>Getting the Menu....</p>;

  return (
    <ul id="meals">
      {loadedmeals?.map((meals, index) => (
        <Mealsitem key={meals.id} meal={meals} />
      ))}
    </ul>
  );
}

export default Meals;
