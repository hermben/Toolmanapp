import React, { Component } from 'react';
import { variables } from './Variables';

export class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            modalTitle: "",
            UserId: "",
            UserName: "",
            UserEmail: "",
            UserPassword:"",
            UserAddress:"",
            RegistrationDate:"",
            IsAdmin:"",
            PhotoFileName:"",
            PhotoPath:variables.PHOTO_URL
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'users')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ users: data });
                console.log(data);
            });
    }

    componentDidMount() {
        this.refreshList();
    }
    changeUserName = (e) => {
        this.setState({UserName: e.target.value});
    }
    changeUserEmail = (e) => {
        this.setState({UserEmail: e.target.value});
    }
    changeUserPassword = (e) => {
        this.setState({UserPassword: e.target.value});
    }
    changeUserAddress = (e) => {
        this.setState({UserAddress: e.target.value});
    }
    changeRegistrationDate = (e) => {
        this.setState({RegistrationDate: e.target.value});
    }
    changeIsAdmin = (e) => {
        this.setState({IsAdmin: e.target.value});
    }
    changePhotoFileName = (e) => {
        this.setState({PhotoFileName: e.target.value});
    }

    addClick() {
        this.setState({
            modalTitle: "Add Users",
            UserId:0,
            UserName: "",
            UserPassword:"",
            UserEmail: "",
            UserAddress:"",
            RegistrationDate:"",
            IsAdmin:"",
            PhotoFileName:"anonymous.png"
        });
    }


    editClick(us) {
        this.setState({
            modalTitle: "edit Users",
            UserId: us.UserId,
            UserName: us.UserName,
            UserEmail: us.UserEmail,
            UserPassword:us.UserPassword,
            UserAddress:us.UserAddress,
            RegistrationDate:us.RegistrationDate,
            IsAdmin:us.IsAdmin,
            PhotoFileName:us.PhotoFileName
        });
    }

    createClick(){
        fetch(variables.API_URL+'Users',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'content-Type':'application/json'

            },
             body:JSON.stringify({
                UserName:this.state.UserName,
                UserEmail:this.state.UserEmail,
                UserPassword:this.state.UserPassword,
                UserAddress:this.state.UserAddress,
                RegistrationDate:this.state.RegistrationDate,
                IsAdmin:this.state.IsAdmin,
                PhotoFileName:this.state.PhotoFileName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })

    }

    updateClick(){
        fetch(variables.API_URL+'Users',{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'content-Type':'application/json'

            },
             body:JSON.stringify({
                UserId:this.state.UserId,
                UserName:this.state.UserName,
                UserEmail:this.state.UserEmail,
                UserPassword:this.state.UserPassword,
                UserAddress:this.state.UserAddress,
                RegistrationDate:this.state.RegistrationDate,
                IsAdmin:this.state.IsAdmin,
                PhotoFileName:this.state.PhotoFileName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })

    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'Users/'+id,{
                method:'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'content-Type':'application/json'

                }
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }
    }

    imageUpload=(e)=>{
            e.preventDefault();

            const formData=new FormData();
            formData.append("file",e.target.files[0],e.target.files[0].name);

            fetch(variables.API_URL+'users/savefile',{
                method:'POST',
                body:formData
            })
            .then(res=>res.json())
            .then(data=>{
                this.setState({PhotoFileName:data});
            })
    }


    render() {
        const {
            users,
            modalTitle,
            UserId,
            UserName,
            UserEmail,
            UserPassword,
            UserAddress,
            RegistrationDate,
            IsAdmin,
            PhotoPath,
            PhotoFileName
        } = this.state;
        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Users
                </button>
                <table className="table table -striped">
                    <thead>
                        <tr>
                            <th>
                                UserID
                            </th>
                            <th>
                                UserName
                            </th>
                            <th>
                                User Email
                            </th>
                            <th>
                                Password
                            </th>
                            <th>
                                Address
                            </th>
                            <th>
                                Registration Date
                            </th>
                            <th>
                               Is Admin
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(us =>
                            <tr key={us.UserID}>
                                <td>{us.UserID}</td>
                                <td>{us.UserName}</td>
                                <td>{us.Email}</td>
                                <td>{us.password}</td>
                                <td>{us.Address}</td>
                                <td>{us.RegistrationDate}</td>
                                <td>{us.IsAdmin}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light m-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(us)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={()=>this.deleteClick(us.UserID)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>

                        )}

                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog moadal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btl-close" data-bs-dismiss="modal" aria-label="close">
                                </button>
                            </div>
                                <div className="modal-body">
                                 <div className="d-flex flex-row bd-highlight mb-3">

                                  <div className="p-2 w-50 bd-highlight">

                                     <div className="input-group mb-3">
                                        <span className="input-group-text">Name</span>
                                        <input type="text" className="form-control"
                                            value={UserName}
                                            onChange={this.changeUserName}/>   
                                    </div>
                            
                                     <div className="input-group mb-3">
                                      <span className="input-group-text">Email</span>
                                        <input type="text" className="form-control"
                                        value={UserEmail}
                                        onChange={this.changeUserEmail}/>
                                    </div>

                                   <div className="input-group mb-3">
                                        <span className="input-group-text">Password</span>
                                        <input type="text" className="form-control"
                                        value={UserPassword}
                                        onChange={this.changeUserPassword}/>
                                 </div>

                                   <div className="input-group mb-3">
                                        <span className="input-group-text">Address</span>
                                        <input type="text" className="form-control"
                                        value={UserAddress}
                                        onChange={this.changeUserAddress}/>
                                  </div> 
                              
                                      <div className="input-group mb-3">
                                      <span className="input-group-text">Registration Date</span>
                                      <input type="date" className="form-control"
                                        value={RegistrationDate}
                                        onChange={this.changeRegistrationDate}/>
                                   </div> 

                                   <div className="input-group mb-3">
                                    <span className="input-group-text">Admin</span>
                                     <input type="text" className="form-control"
                                        value={IsAdmin}
                                        onChange={this.changeIsAdmin}/>
                                  </div>

                             <div className="p-2 w-50 bd-highlight">
                                    <img width="200px" height="200px"
                                    src={PhotoPath+PhotoFileName}/>
                                    <input className="m-2" type="file" onChange={this.imageUpload}/>
                            </div>
                          </div>
                                {UserId==0?
                                <button type="button"
                                className="btn btn-primary float-start"
                                onClick={()=>this.createClick()}
                                >Create</button>
                                :null}

                                {UserId!=0?
                                <button type="button"
                                className="btn btn-primary float-start"
                                onClick={()=>this.updateClick()}
                                >Update</button>
                                :null}
                          </div>
                                    
                            </div>  
                        </div>
                    </div>
                 </div>
            </div>                         
        )

    }
}