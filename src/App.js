
import React, { useState, useEffect } from 'react';
import { useInput } from './hooks-input'
import './index.css';

function App() {
    const { value:person, bind:bindPersonInput, reset:resetPersonInput } = useInput('');
    const { value:days, bind:bindDaysInput, reset: resetDaysInput } = useInput();
    const { value:costInput, bind:bindCostInput } = useInput();
    const { value:costUpdate, bind:bindCostUpdate } = useInput();
    const [cost, setCost] = useState(1500)
    const [people, setPeople] = useState([''])
    const [daysPerPerson, setDaysPerPerson] = useState([0])
    const [totalDays, setTotalDays] = useState(0)
    const [pricePerDayPerPerson, setPricePerDayPerPerson] = useState(0)
    let  personPriceArray = []
    let personAndDaysDisplayArray = []

    const handleSubmit = (event) => {
        event.preventDefault()
        resetPersonInput()
        resetDaysInput()
      }
    
      const setPeopleArray = () => {
        setPeople([...people, person])
        setDaysPerPerson([...daysPerPerson, parseInt(days)])
      }
    
      const totalCostSubmit = (event) => {
        event.preventDefault()
        setCost(costInput)
      }

      const costUpdateSubmit = (event) => {
        event.preventDefault()
        setCost(costUpdate)
      }
    
      // is used for calculating the average price
      const calculateTotalDaysPerPeople = () => {
        setTotalDays(daysPerPerson.reduce((a, b) => a + b))
      }
    
      const calculatePricePerDayPerPerson = () => {
        setPricePerDayPerPerson(cost / totalDays)
      }
    
      // pushing both arrays into a single array to produce a string for the popup alert
      for (var i = 1; i < people.length; i++) {
        personPriceArray.push( people[i] + ' owes ' + (pricePerDayPerPerson * daysPerPerson[i]).toFixed(2));
      }
    
      // pushing peopls and the amount of days their seeing for user experience
      for (var p = 1; p < people.length; p++) {
        personAndDaysDisplayArray.push( people[p] + ' is staying ' + daysPerPerson[p] + ' days, ' )
      }
      
      const personDisplay = () => {
        return(personPriceArray.join(",  "))
      }

      const calculateTotals = () => {
          alert(personDisplay())
      }
    
      useEffect(() => {
        calculateTotalDaysPerPeople()
        calculatePricePerDayPerPerson()
      });

    return(
        <div className='container'>
            {/* <!-- Button trigger modal --> */}
            <form className='homeForm d-flex justify-content-center flex-column homeForm'>
                <input type="number" name='Total Cost' value={cost} placeholder='Total Cost of Trip' {...bindCostInput} min='500' max='1000000' required /> <br/>
                <button type="submit" className="btn btn-primary home-button" data-toggle="modal" data-target="#homeModal" onClick={totalCostSubmit}>
                Set Cost and Start Calculating!
                </button>
                <button type="button" className="btn btn-light mt-2 mx-5 d-flex justify-content-center" data-toggle='modal' data-target="#homeModal" style={{color: 'black', backgroundColor: 'rgba(192, 192, 192, 0.5)'}}>Open Calculator</button>
            </form>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="homeModal" style={{backgroundColor: 'rgba(275, 160, 148, 0.1)'}} tabIndex="-1" role="dialog" aria-labelledby="modalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modalCenterTitle">Add in your friends, and how many days they stayed</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                  <div className="modal-inputs d-flex justify-content-between">
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="active" name="Name" value={person} placeholder='Name' style={{width: '15vw'}} {...bindPersonInput} required /> <br />
                        <input type="number" name="Days Stayed" value={days} placeholder='# of days stayed' style={{width: '15vw'}} {...bindDaysInput} min='1' max='7' required /> <br />
                        <input type="submit" value="Submit" onClick={setPeopleArray}/>
                    </form>
                    <div className="dropdown" id='costUpdateDropdown'>
                      <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Update Cost
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <form className='cost-input d-flex justify-content-center flex-column m-0'>
                          <input type="number" className='mx-1' name='Total Cost' value={cost} {...bindCostUpdate} min='500' max='1000000' required /> <br/>
                          <button type="submit" className="btn btn-info mx-1 p-1" onClick={costUpdateSubmit} data-toggle='dropdown' data-target="#costUpdateDropdown" >
                          Update Cost
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                    <div className='d-flex flex-column'>
                        <p>{ people.length > 1 ? people[((people.length) - 1)] + ' has successfully been added' : null } <br/>
                        { people.length > 1 ? 'A total of ' + (people.length - 1)  + ' people' : null }</p>
                        <p>{personAndDaysDisplayArray} </p>
                        <p>Your current cost is {cost}</p>

                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={calculateTotals}>Calculate</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default App