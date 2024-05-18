import React, { useRef, useState } from 'react'

const Input = () => {
    const [expenses,setExpenses]=useState([]);

    const amount=useRef(null);
    const desc=useRef(null);
    const type=useRef(null);

    const handleSubmit=(e)=>{
        e.preventDefault();

        const newExpense={
            price:amount.current.value,
            description:desc.current.value,
            category:type.current.value,

        };

        setExpenses((prevData)=>[...prevData,newExpense]);
        amount.current.value="";
        desc.current.value="";
        type.current.value="";
    };

  return (
    <>
        <form className='w-[50%] flex justify-center mx-auto my-10'
        onSubmit={(e) => handleSubmit(e)}>

            <input className="p-2 m-2 border border-gray-400" placeholder="Amount Spent" type="number" ref={amount} />
            <input className="p-2 m-2 border border-gray-400" placeholder="Description" type="text" ref={desc}/>
            <select ref={type} className="p-2 m-2 border border-gray-400">
                <option>Food</option>
                <option>Fuel</option>
                <option>Shopping</option>
                <option>Grocery</option>
            </select>

            <button className="bg-blue-500 text-white shadow-md rounded-md m-2 p-2 font-semibold">Add Expense</button>
        </form>

        <div className="w-[50%] mx-auto flex flex-wrap m-10 p-10">
        {expenses.map((item) => (
          <div className="m-5 w-[40%] mx-auto p-5 list-none border border-gray-400 text-xl font-semibold flex" key={item.price}>
            <div className="m-2 p-2">{item.description}</div>
            <div className="m-2 p-2">{item.category}</div>
            <div className="m-2 p-2">{item.price}</div>
          </div> 
        ))}
      </div>
    </>
  )
}

export default Input