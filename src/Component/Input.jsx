import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../Store/expensesSlice";


const Input = () => {
    const [expenses,setExpenses]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [editingExpense,setEditingExpense]=useState(null);
    const [editAmount, setEditAmount] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [editType, setEditType] = useState("");
    const dispatch = useDispatch();
    const data = useSelector((store) => store.expenses.expenses);

    const amount=useRef(null);
    const desc=useRef(null);
    const type=useRef(null);

    const fetchData=async()=>{
      try{
        const response=await fetch(
          "https://expenses-975b0-default-rtdb.firebaseio.com/expenses.json"
        );
        const data=await response.json();
        const loadedExpenses=[];

        for(const key in data){
          loadedExpenses.push({
            key:key,
            price:data[key].price,
            description:data[key].description,
            category:data[key].category,
          });
        }
        // setExpenses(loadExpenses);
        dispatch(addData(loadedExpenses));
        setIsLoading(false);
      }
      catch(error){
        console.error("Error",error);
      }
    };
    useEffect(()=>{
      fetchData();
    },[]);

    const handleSubmit=async (e)=>{
        e.preventDefault();

        const newExpense={
            price:amount.current.value,
            description:desc.current.value,
            category:type.current.value,

        };

        try{
          let url="https://expenses-975b0-default-rtdb.firebaseio.com/expenses.json";
          let method="POST";

          if(editingExpense){
            url=`https://expenses-975b0-default-rtdb.firebaseio.com/expenses/${editingExpense.key}.json`;
            method="PATCH";
          }

          const response=await fetch(url,{
            method:method,
            body:JSON.stringify(newExpense),
            headers:{
              "Content-type":"application/json",
            },
          });
          fetchData();
          if ( !response.ok){
            throw new Error("Failed to save data to Firebase");
          }

            amount.current.value="";
            desc.current.value="";
            type.current.value="";

            setEditingExpense(null);
            setEditAmount("");
            setEditDesc("");
            setEditType("");
          }
          catch (error) {
            console.error("Error saving data to Firebase:", error.message);
          }
        };

        const deleteItem = async (key) => {
          try {
            await fetch(
              `https://expenses-975b0-default-rtdb.firebaseio.com/expenses/${key}.json`,
              {
                method: "DELETE",
              }
            );
            fetchData();
          } catch (error) {
            console.log("Error deleting item:", error);
          }
        };

        const editExpense = (expense) => {
          // Set editingExpense state to the selected expense
          setEditingExpense(expense);
          // Populate input fields with existing data of the expense
          setEditAmount(expense.price);
          setEditDesc(expense.description);
          setEditType(expense.category);
        };
  
  return (
    <>
        <form className='w-[50%] flex justify-center mx-auto my-10'
        onSubmit={handleSubmit}>

            <input className="p-2 m-2 border border-gray-400" placeholder="Amount Spent" type="number" ref={amount} value={editAmount} onChange={(e)=>setEditAmount(e.target.value)}/>
            <input className="p-2 m-2 border border-gray-400" placeholder="Description" type="text" ref={desc} value={editDesc} onChange={(e)=>setEditDesc(e.target.value)}/>
            <select ref={type} 
            className="p-2 m-2 border border-gray-400"
            value={editType}
            onChange={(e) => setEditType(e.target.value)}>
                <option>Food</option>
                <option>Fuel</option>
                <option>Shopping</option>
                <option>Grocery</option>
            </select>

            <button className="bg-blue-500 text-white shadow-md rounded-md m-2 p-2 font-semibold hover:bg-blue-600">{editingExpense ? "Update Expense" : "Add Expense"}</button>
        </form>

        {isLoading ? (
            <div className="text-3xl mt-10 text-center font-semibold">
            Loading...
          </div>
        ):(

        <div className="w-[50%] mx-auto flex flex-wrap m-5 p-10">
        {data.map((item) => (
          <div className="m-5 w-[30%] h-[40%] flex flex-col mx-auto p-5 list-none border border-gray-400 text-xl font-semibold text-center" key={item.key}>
            <div className="m-2 text-green-500 text-3xl p-2">{item.description}</div>
            <div className="m-2 p-2">{item.category}</div>
            <div className="m-2 p-2">{item.price}</div>

            <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white shadow-md rounded-md p-2 font-semibold  hover:bg-blue-600"
                  onClick={() => editExpense(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white shadow-md rounded-md p-2 font-semibold  hover:bg-red-600"
                  onClick={() => deleteItem(item.key)}
                >
                  Delete
                </button>
              </div>
          </div> 
        ))}
      </div>
        )}
    </>
  );
};

export default Input