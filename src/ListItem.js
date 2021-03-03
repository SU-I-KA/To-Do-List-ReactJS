import React from 'react';
import {FaRegEdit} from 'react-icons/fa';
import {RiDeleteBin5Line} from 'react-icons/ri';


const ListItem = ({setTodoList, todoList, deleteItem, editItem, item})=>{
    const{id, value, done} = item;
    const itemDone = ()=>{
        let newDone = !done;
        let newlist = todoList.filter((i)=> i.id !== id);
        const listObject = {
            id : id,
            value : value,
            done: newDone
        };
        newlist.push(listObject);
        newlist.sort((a, b) => new Date(a.id) - new Date(b.id))
        setTodoList(newlist)
    }

    return(
        <li key={id}>
            <span className={`${done && 'complete'}`} 
            onClick={()=>itemDone()}>{value}</span>
            <button onClick={()=>editItem(item)} className='editBtn'><FaRegEdit /></button>
            <button onClick={()=>deleteItem(id)} className='deleteBtn'><RiDeleteBin5Line /></button>
        </li>
    )

}

export default ListItem;