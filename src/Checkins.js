
import React, { Component } from 'react';
import { variables } from './Variables';

export class Checkouts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Checkouts: [],
            Items:[],
            Users:[],
            Checkins:[],
            modalTitle: "",
            CheckoutId:0,
            CheckoutTime:0,
            ItemType:0,
            ItemId: 0,
            ItemName: "",
            UserId:0,
            UserName: "",
            IsCheckin: false ,
            ItemTypeId:0,
            UserSignature:""
            
              
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'Checkins')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ Checkins:data });
                console.log(data);
            });
        fetch(variables.API_URL+ 'Users')
          .then(response=> response.json())
          .then(data=>{
              this.setState({Users: data});
              console.log(data);
          });    
        fetch(variables.API_URL+ 'Items')
          .then(response=> response.json())
          .then(data=>{
              this.setState({Items: data});
              console.log(data);
          });  
    }

    componentDidMount() {
        this.refreshList();
    }

    changeUserName = (e) => {
        this.setState({ UserId: e.target.value });
    }

    // changeCheckoutTime = (e) => {
    //     this.setState({ CheckoutTime: e.target.value });
    // }
    changeItemName = (e) => {
        this.setState({ ItemId: e.target.value });
    }
   
    // changeIsCheckout = (e) => {
    //     this.setState({ IsCheckin: e.target.value === "1" ? false : true });
    // }
   
addClickcheckin() {
    this.setState({
        modalTitle2:"Add Checkins",
        CheckinId:0,
        CheckinTime:0,
        ItemType:0,
        ItemId:0,
        ItemName:"",
        UserId:0,
        UserName:"",
        IsCheckout:true ,
        ItemTypeId:0,
        Usersignature:""
    });

}

editClickcheckin(ch) {
    this.setState({
        modalTitle2: "edit Checkins",
        CheckinTime:ch.CheckinTime,
        Userid:ch.UserID,
        UserName:ch.UserName,
        ItemId:ch.ItemID,
        ItemName:ch.ItemName,
        IsCheckin:ch.IsCheckin,
    });
}

UserSignIsValid() {
    return this.state.UserSignature !== 0;
}
createClickCheckin() {
    if (!this.UserSignIsValid()) {
        alert("Please enter you initials");
        return;
    }

    fetch(variables.API_URL + 'Checkins', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            CheckinID:this.state.CheckinId,
            UserSignature:this.state.UserSignature,
            CheckoutID:this.state.CheckoutId,
            UserID:this.state.UserId
        })
    })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error) => {
            alert('Failed');
        })

}

updateClickCheckin() {
    fetch(variables.API_URL + 'checkins', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'content-Type': 'application/json'

        },
        body: JSON.stringify({
            CheckinID:this.state.CheckinId,
            UserSignature:this.state.UserSignature,
            CheckoutID:this.state.CheckoutId,
            UserID:this.state.UserId
           
        })   
    })
    .then(res => res.json())
    .then((result) => {
        alert(result);
        this.refreshList();
    }, (error) => {
        alert('Failed');
    });

}

deleteClickCheckin(id){
    if(window.confirm('Are you sure?')) 
    {
        fetch(variables.API_URL + 'Checkins/' + id, {
            method: 'DELETE',
            headers: {
                'Accept':'application/json',
                'content-Type':'application/json'
            }
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })  
    }
}


render (){
const {
             modalTitle2,
             CheckoutId,
            CheckoutTime,
            Checkouts,
            ItemType,
            ItemId,
            ItemName,
            UserId,
            UserName,
            IsCheckin,
            ItemTypeId,
            Users,
            Checkins,
            Items,
            UserSignature
}= this.state;
return (
<div>
    <button type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal2"
        data-bs-target="#exampleModal2"
        onClick={() => this.addClickcheckin()}>
        Add Checkins
    </button>
    <table className="table table -striped">
        {/* <thead>
            <tr>
                <th>
                    UserName
                </th>
                <th>
                    Checkout Time
                </th>
                <th>
                    Name
                </th>
                <th>
                    Is Checkin
                </th>
                <th>
                   
                </th>
            </tr>
        </thead> */}
        {/* <tbody>
                        {Checkins.map(ch =>
                            <tr key={ch.CheckoutID}>
                                <td>{ch.Name}</td>
                                <td>{ch.CheckoutTime}</td>
                                <td>{ch.ItemName}</td>
                                <td>{ch.IsCheckin === 0 ? "No" : "Yes"}</td>
                                <td>
                                {/* <button type="button"
                                        className="btn btn-light m-1"
                                        onClick={() => this.CheckinClick(ch.CheckinID)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-right-square" viewBox="0 0 16 16">
                                        <path fillrule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 3.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768L5.854 5.146z"/>
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mrv-1"
                                        data-bs-toggle="modal2"
                                        data-bs-target="#exampleModal2"
                                        onClick={() => this.editClick(ch)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(ch.CheckoutID)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button> */}
{/* 
                                   

                                </td>
                            </tr>
                //         )}
                //     </tbody> */} 
                // </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog moadal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle2}</h5>
                                <button type="button" className="btl-close" data-bs-dismiss="modal" aria-label="close">
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-100 bd-highlight">

                                        {/* <div className="input-group mb-3">
                                            <span className="input-group-text">Check out Time</span>
                                            <input type="text" className="form-control"
                                                value={CheckoutTime}
                                                onChange={this.changeCheckoutTime} />
                                        </div> */}

                                        {/* <div className="input-group mb-3">
                                            <span className="input-group-text">User Name</span>
                                            <select className="form-select"
                                                onChange={this.changeUserName}
                                                value={UserId}>
                                                <option value={0}>
                                                    Please Select a User
                                                </option>
                                                {Users.map(chk=>
                                                    <option key={chk.UserID} value={chk.UserID}>
                                                        {chk.Name}
                                                    </option>
                                                )}
                                            </select>  
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Item </span>
                                            <select className="form-select"
                                                onChange={this.changeItemName}
                                                value={ItemId}>
                                                <option value={0}>
                                                    Please Select an Item
                                                </option>
                                                {Items.map(che=>
                                                    <option key={che.ItemID} value={che.ItemID}>
                                                        {che.ItemName}
                                                    </option>
                                                )}
                                            </select>  
                                        </div> */}
{/* 
                                        <div className="form-group mb-3">
                                            <label className="form-label">Is Checkout</label>

                                            <div class="form-group">
                                                <label htmlFor="isAdminYes" className='form-label cmr-1'>
                                                    <input className="form-check-input form-control" type="radio" name="isCheckin" id="isCheckinYes"
                                                        value={1}
                                                        checked={IsCheckin}
                                                        onChange={this.changeIsCheckin} />
                                                    Yes
                                                </label>
                                                <label htmlFor="isAdminNo" className='form-label'>
                                                    <input className="form-check-input form-control" type="radio" name="isCheckin" id="isCheckinNo"
                                                        value={0}
                                                        checked={!IsCheckin}
                                                        onChange={this.changeIsCheckin} />
                                                    No
                                                </label>
                                         </div>
                                 </div> */}
                             </div>
                         </div>
                         {/* <div>
                                    {CheckoutId === 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={() => this.createClick()}
                                        >Create</button>
                                        : null}

                                    {CheckoutId !== 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={() => this.updateClick()}
                                        >Update</button>
                                        : null}
                                </div> */}
                     </div>
                 </div>
             </div>
        </div>
        </div>
     )
     }
}
