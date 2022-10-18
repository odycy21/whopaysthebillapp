import React,{useState, useContext, useRef} from 'react';
import { Button, Form, Alert, FormGroup } from 'react-bootstrap';

import { MyContext } from '../context';

const Stage1 = () => {

    const textInput = useRef()
    const context = useContext(MyContext);

    const[error, setError] = useState([false,'']);

    // handles click event
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const value = textInput.current.value;
        
        const validate = validateInput(value);

        //if value returns true , state will set it to false and back to default with empty value
        if(validate){

           
            setError([false, '']);

            context.addPlayer(value);

            
            textInput.current.value = '';

            //console.log('ADD PLAYER');
        }
    }

    //function that validates input
    const validateInput = (value) => {

        if(!value){
            setError([true, 'Sorry, you need to add something']);
            return false;
        }

        if(value.length <= 2){
            setError([true, 'Sorry, you need 3 characters atleast']);
            return false;
        }

        return true
    }

    console.log(context.state)

    return ( 
        <>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group>
                    <Form.Control
                        type = 'text'
                        placeholder = 'Add player name'
                        name='player'
                        ref={textInput}
                    />
                </Form.Group>

        
                {  
                    // if error[value] is true, will return error, if false, null
                    error[0] ? 
                    <Alert>
                        {error[1]}
                    </Alert>
                    :
                    null

                }

                <Button className='miami' variant='primary' type = 'submit'>
                        Add Player
                </Button>

                <hr/>

                <div>
                    <ul className='list-group'>
                        {context.state.players.map((player,idx) => (
                            <li key={idx} className = "list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                                {player}
                                <span
                                    className='badge badge-danger'
                                    onClick={()=> context.removePlayer()}
                                >
                                    x
                                </span>
                            </li>
                        ))
                        }

                    </ul>
                </div>

                <div
                    className='action_button'
                    onClick={() => context.next()}
                >
                    NEXT
                </div>
            </Form>
        </>
     )
}
 
export default Stage1;