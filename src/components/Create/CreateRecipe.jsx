import style from './CreateRecipe.module.css';
import { useState, useEffect } from 'react'

import { connect } from 'react-redux';
import { createRecipe, getDietTypes } from '../../redux/actions';
import Navbar from '../Navbar/Navbar';

let validateName = /^[a-zA-Z\s]+$/;

function validate(input) {
  const errors = {};
  if (!input.title.length) errors.title = 'Please complete with a recipe name';
  if (!validateName.test(input.title)) errors.title = "Special characters or numbers are not allowed";
  if (!input.summary.length) errors.summary = 'This field cannot be empty';
  if (input.summary.length < 40) errors.summary = 'This field must be at least 40 characters';
  if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'The score must be a number between 1 and 100';
  if (!input.instructions.length) errors.instructions = "This field cannot be empty";
  if (input.instructions.length < 80) errors.instructions = 'This field must be longer than 80 characters';
  return errors;
};

function CreateRecipe( { getDietTypes, createRecipe, diets } ) {
  const [input, setInput] = useState({
    title: '',
    summary: '',
    healthScore: 0,
    instructions: '',
    diets: [],
    image:''
});
const [errors, setErrors] = useState({});
const [render, setRender]= useState('');

function handleInputChange(e) {
  e.preventDefault();
  setInput((prevInput)=>{
    const newInput ={ ...prevInput,
      [e.target.name]: e.target.value
    }
    const validations =validate(newInput);
    setErrors(validations);
    return newInput;
  });
};
function handleCheck(e){
  let newArray = input.diets;
  let find = newArray.indexOf(e.target.value);
  
  if (find >= 0) {
      newArray.splice(find, 1)
  } else {
      newArray.push(e.target.value)
  }
  setInput({
      ...input,
      diets: newArray
  });
};
function handleSubmit(e) {
  e.preventDefault();
  if (Object.values(errors).length===0 && input.title){
    createRecipe(input);
    setRender('Your recipe has been created succesfully');
    setInput({
        title: '',
        summary: '',
        healthScore: 0,
        instructions: '',
        diets: [],
        image: ''
    });
  }
  else
  setRender('Please complete the information required');
}

 useEffect(() => {
   getDietTypes() // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);
return (
  <div >
      <Navbar />
    <div className={style.AppCreate}>
      <div className={style.CreateBody}>
          <form className={style.CreateForm}>
              <div className={style.titleCreate}>
                   <h2>CREATE RECIPE</h2>
              </div>
                <div key="formInputs1" className={style.nameInputs}>
                    <label key="label1" className={style.labels}>Title: </label>
                    <input key="input1" className={style.titleInput} autoComplete="off" 
                    type="text" name="title" onChange={handleInputChange} value={input.title}/>
                {errors.title && (<span className={style.msgs}>{errors.title}</span>)}
                </div>

              <div key="formInputs2" className={style.nameInputs}>
                  <label key="label2" className={style.labels}>Summary:</label>
                  <textarea 
                  name="summary" type="text" rows="2" cols="40"
                  key="input2" className={style.summaryInput} autoComplete="off" 
                  onChange={handleInputChange} value={input.summary}/>
                  {errors.summary && (<span className={style.msgs}>{errors.summary}</span>)}
              </div>

              <div className={style.nameInputs}>
                      <label className={style.labels}>Health Score: {input.healthScore}</label>
                      <input  name="healthScore" 
                              className={style.nameInput}
                              type="range" 
                               min="1" max="100" 
                              value={input.healthScore} 
                              onChange={e => handleInputChange(e)}/>
                     { errors.healthScore && (<span className={style.msgs}>{errors.healthScore}</span>)}
                </div>
                
                <div key="formInputs3" className={style.nameInputs}>
                  <label key="label3" className={style.labels}>Instructions: </label>
                  <textarea 
                    name="instructions" type="text" rows="4" cols="40"
                    key="input3" className={style.instructionsInput} autoComplete="off" 
                    onChange={handleInputChange} value={input.instructions}/>
              {errors.instructions && (<span className={style.msgs}>{errors.instructions}</span>)}
              </div> 

                  <div key="formInputs4" className={style.nameInputs}>
                  <label className={style.labels}>Diets type:</label>
                      <div key="dietCheck" className={style.checks}>
                            {
                            diets && diets.map(diet => (
                            <div key={diet.id} className={style.dietsCheck}>
                                <label key={diet.id}>
                                    <input 
                                         type='checkbox'
                                         name={diet.name} 
                                         value={diet.name}
                                         onChange={(e) => handleCheck(e)} 
                                         />
                                         {diet.name}
                                 </label>
                            </div>
                            ))
                            }
                        </div>      
                  </div>
                  <div key="formInputs5" className={style.nameInputs}>
                  <label key="label5" className={style.labels}>Image:</label>
                  <input key="input5" className={style.titleInput} autoComplete="off" 
                    type="text" name="image" placeholder='URL image (optional)' onChange={handleInputChange} value={input.image}/>
              </div>{errors.image && (<span className={style.msgs}>{errors.image}</span>)}
              
              {render[0] &&
                      <div id={style.recipecreated}>
                      
                      {render}
                      </div>
                  }
                  <input key="submitButton" type="submit" value="submit" id={style.submitButton} onClick={handleSubmit}></input>
            </form>
          </div>
      </div>
  </div>
)

}
const mapStateToProps = (state) => {
return {
  diets: state.diets
}
}

const mapDispatchToProps = dispatch => {
return {
  getDietTypes: () => dispatch(getDietTypes()),
  createRecipe: (input) => dispatch(createRecipe(input))
}
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);
