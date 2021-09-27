import React, { Component } from 'react';

class Message extends React.Component {
    constructor(props) {
        super(props);
          this.state = {
           paragraphShow : false
          }
          this.hidePara = this.hidePara.bind(this);
         
      }

    hidePara(){
            this.setState({
                paragraphShow : !this.state.paragraphShow
            })
      
    }
    componentDidMount(){
        document.body.addEventListener('click', this.hidePara);
    }
    render() {
      return (
          
      <React.Fragment>
          { paragraphShow ?
             <div>
                <a href="#">Want to buy a new car?</a>
                <p>Call +11 22 33 44 now!</p>  
            </div>
            :
            <p></p>
          }
          </React.Fragment>
          );
    }
  }
  
  document.body.innerHTML = "<div id='root'> </div>";
    
  const rootElement = document.getElementById("root");
  ReactDOM.render(<Message />, rootElement);
  
  console.log("Before click: " + rootElement.innerHTML);
  document.querySelector("a").click();
  console.log("After click: " + rootElement.innerHTML);