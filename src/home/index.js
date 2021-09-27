import React, { Component } from 'react';
import ListItem from './student';


class Home extends Component {
    constructor(props) {
        super(props);
          this.state = {
            students: [],
            inputfeild:"",
            tagSearch:"",
            filterList:[]
          }
          this.fetch = this.fetch.bind(this);
          this.printStudents = this.printStudents.bind(this);
          this.addTag = this.addTag.bind(this);
          this.filterbyUsername = this.filterbyUsername.bind(this);
          this.filterbytag = this.filterbytag.bind(this);
      }
   
    async fetch() {
        const result = await fetch('https://api.hatchways.io/assessment/students')
        const data = await result.json();
        this.setState({ students: data })
        if(this.state.tagSearch==="" && this.state.inputfeild==="") {
          this.setState({filterList: data.students});
        }
    }

    componentDidMount() {
        this.fetch()
    }

    

    filterbyUsername(value){
     if(value !== "" && this.state.tagSearch === ""){
      this.setState({
        inputfeild: value,
        filterList : this.state.students.students.filter((student) => student.firstName.toLowerCase().includes(value.toLowerCase()) || student.lastName.toLowerCase().includes(value.toLowerCase()) )
      }) 

      this.printStudents("This runs when only search is used")
    } 
    else if(value === "" && this.state.tagSearch !== ""){
      this.filterbytag(this.state.tagSearch)
      this.printStudents("This runs when only tag is used")
    }
    else if(value !== "" && this.state.tagSearch !== ""){
      this.setState({
        inputfeild: value,
        filterList : this.state.filterList.filter((student) => student.firstName.toLowerCase().includes(value.toLowerCase()) || student.lastName.toLowerCase().includes(value.toLowerCase()) )
      }) 
      this.printStudents("This runs when both tag and search is used")
    } 
    else{
      this.setState({
        inputfeild: value,
        filterList : this.state.students.students
      }) 
    }

    }

    
    filterbytag(value){
      this.setState({
        tagSearch: value,
      }) 

      const filteredTagList = []
      
      if(value !== "" && this.state.inputfeild === ""){
            (this.state.students.students).map((student)=>{
              var tagFound = false;
                if(student.tag){
                  student.tag.map((tag) => {
                    if (tag.includes(value)) {
                      tagFound = true;
                    }

                  });
                  if (tagFound) {
                    filteredTagList.push(student);
                  }
                } 
            })

            this.setState({
              filterList : filteredTagList
            }) 
    }else if(value === "" && this.state.inputfeild !== ""){
            this.filterbyUsername(this.state.inputfeild)
    }
    
    else{
      this.setState({
        filterList : this.state.students.students
      }) 
    }
    }

    printStudents(value){
      console.log(value)
    }


    addTag(id,tag){
      var tagArrat = []
      const newList = this.state.students.students.map((student) => {
          if(student.id === id){
            if(student.tag){
              tagArrat = student.tag
              tagArrat.push(tag);
              const updatedItem = {
                ...student,
                tag: tagArrat,
              }
              return updatedItem;
            }
            else{
              tagArrat = [tag]
              const updatedItem = {
                ...student,
                tag: tagArrat,
              }
              return updatedItem;
            }
          }

          return student;
        })
        this.setState({ students: {'students' : newList} })

        if(this.state.tagSearch==="" && this.state.inputfeild==="") {
          this.setState({filterList: newList});
        }
    }
    render() {
        return (
          
                    <div className="container-view">
                       <button onClick = {this.printStudents}>+</button>
                        {/* <button onClick={() => this.printStudents()}></button> */}
                        <div className="search-con">
                            <input
                                    type="search"
                                    placeholder="Search Robots"
                                    onChange={(e) => this.filterbyUsername(e.target.value)}
                                />
                        </div>
                        <div className="search-con">
                            <input
                                    type="search"
                                    placeholder="Search Robots by tag"
                                    onChange={(e) => this.filterbytag(e.target.value)}
                                />
                        </div>
                        {
                        this.state.filterList ?
                        this.state.filterList.map((student) => (
                          <ListItem key={student.id} student = {student} addTag = {this.addTag}/> 
                        ))
                        :
                        <p>Loading</p>
                        } 
                     
                    </div>
                    
  );
}

}
export default Home;



// this.state.students.students.map((student) => (
                        //     this.state.inputfeild === "" && this.state.tagSearch === ""? (
                        //         <ListItem key={student.id} student = {student} addTag = {this.addTag}/> 
                        //       ) : 

                        //       this.state.inputfeild !== "" && this.state.tagSearch === ""? (
                        //         student.firstName.toLowerCase().includes(this.state.inputfeild.toLowerCase() )  ||  student.lastName.toLowerCase().includes(this.state.inputfeild.toLowerCase() ) ?
                        //         <ListItem key={student.id} student = {student}/> : <p></p>
                        //       ) : 

                        //       this.state.inputfeild === "" && this.state.tagSearch !== ""? (
                        //         student.tag ? (                           
                        //           <ListItem key={student.id} student = {student}/>
                        //         ) : 
                        //           <p></p>
                        //       ) : 

                        //       this.state.inputfeild !== "" && this.state.tagSearch !== ""? (
                        //         <p>this is only both search</p>
                        //       ) : 

                        //       // student.firstName.toLowerCase().includes(this.state.inputfeild.toLowerCase() )  ||  student.lastName.toLowerCase().includes(this.state.inputfeild.toLowerCase() )? (
                        //       //   <ListItem key={student.id} student = {student}/> 
                        //       // ) : 
                              
                        //       (
                        //         <p>not working</p>
                        //       )
                                
                        // )) 