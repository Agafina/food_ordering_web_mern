import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId})
    await fetchList();
    if(response.data.success){
        toast.success(response.data.mssg)
    }else{
        toast.error("Error");
    }
  }
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Categoty</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((food,index) => {
            return (
                <div className="list-table-format" key={index}>
                    <img src={`${url}/images/`+food.image} alt="" />
                    <p>{food.name}</p>
                    <p>{food.category}</p>
                    <p>{food.price}</p>
                    <p onClick={() => removeFood(food._id)}className="cursor">X</p>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default List;
