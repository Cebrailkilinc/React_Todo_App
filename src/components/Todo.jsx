import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti"


function Todo(props) {

  
    return (
        <div className='w-75'>
            <ListGroup>
                {
                    props.filterTodo.map((item) => {
                        return (
                            <ListGroup.Item key={item.id} >
                                <div className={`d-flex align-items-center justify-content-between ${item.complete ? "text-decoration-line-through" : ""}`}>
                                    {item ? item.todo : ""}
                                    <div className='d-flex align-items-center'>
                                        <TiTick onClick={()=>{ props.handleComplete(item.id)}} className='me-3' />
                                        <AiFillDelete onClick={()=>props.handleDeleteTodo(item.id)}  />
                                    </div>
                                </div>
                            </ListGroup.Item>
                        )
                    })
                }

            </ListGroup>
        </div>



    )
}

export default Todo