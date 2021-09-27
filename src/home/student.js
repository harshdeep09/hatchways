import React, { useState } from 'react';


const ListItem = (props) => {
    var sum = 0;

    for( var i = 0; i < props.student.grades.length; i++ ){
        sum += parseInt( props.student.grades[i], 10 ); //don't forget to add the base
    }
    
    const avg = (sum / props.student.grades.length) || 0;
    const [expandedView, setexpandedView] = useState(false);
    const [tag, settag] = useState("");

  return (

    <div>
        <div className='listItem'>
            <div className="innerListItem">
                    <div className="imgCon">
                        <img src = {props.student.pic} alt={props.student.firstName}/>
                    </div>
                    <div className="textCon">
                        <p className="name"> {props.student.firstName} {props.student.lastName}</p>
                        <p>City: {props.student.city}</p>
                        <p>Company: {props.student.company}</p>
                        <p>Email: {props.student.email}</p>
                        <p>Skill: {props.student.skill}</p>
                        <p>Average: {avg}</p>
                        <div className = "classTags">
                            {
                                 props.student.tag ?
                                 props.student.tag.map((data, index)=>
                               
                                 <p key={index}>{data}</p>
                                
                             ) :
                                  <></>
                             }
                         </div>
                        <div>
                            <input
                                    value = {tag}
                                    placeholder="Add Tag"
                                    onChange={(e) => {
                                        settag(e.target.value)
                                    }}
                                    onKeyPress={(e) => {
                                        if(e.key === "Enter"){
                                            props.addTag(props.student.id, tag)
                                            settag("")
                                        }
                                    }
                                    }
                                />
                        </div>
                        <div className = "grades">
                        {   expandedView ? 
                            props.student.grades.map((data, index)=>
                               
                                <p key={index}>Test {index + 1}: {data}</p>
                               
                            ) : 
                            <p></p>
                        }
                         </div>
                         
                    </div>
                    <div>
                        <button onClick = {() => setexpandedView(!expandedView)}>+</button>
                    </div>
            </div>
        
        </div>
    </div>
  );
};


export default ListItem;
 