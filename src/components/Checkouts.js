import React, { Component } from 'react';
import { variables } from '../Variables';
import toastr from 'toastr';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/dist/rsuite.min.css';


export class Checkouts extends Component {

    constructor(props) {
        super(props);


        this.state = {
            Checkouts: [],
            filteredCheckouts: [],
            Items: [],
            Users: [],
            ItemTypes: [],
            modalTitle: "",
            CheckoutId: 0,
            CheckoutTime: 0,
            ItemType: 0,
            ItemId: 0,
            ItemName: "",
            UserName: this.props.auth.user.name,
            UserEmail: this.props.auth.user.userName,
            IsCheckin: false,
            ItemTypeId: 0,
            UserSignature: "",
            CheckinId: 0,
            dates: null,
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'Checkouts')
            .then(response => response.json())
            .then(data => {
                this.setState({ Checkouts: data });
                // Filter checkout list
                this.changeDates(this.state.dates);
            });

        fetch(variables.API_URL + 'Users')
            .then(response => response.json())
            .then(data => {
                this.setState({ Users: data });
                console.log(data);
            });

        fetch(variables.API_URL + 'Items/GetAvailable')
            .then(response => response.json())
            .then(data => {
                this.setState({ Items: data });
                console.log(data);
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeDates = (newSelectedDates) => {
        if (newSelectedDates != null) {
            let newCheckoutsList = this.state.Checkouts.filter((checkout) => {
                let formatedCheckoutTime = new Date(checkout.CheckoutTime);
                return formatedCheckoutTime >= newSelectedDates[0] && formatedCheckoutTime <= newSelectedDates[1];
            });
            this.setState({ filteredCheckouts: newCheckoutsList });
            this.setState({ dates: newSelectedDates });
        } else {
            this.setState({ filteredCheckouts: this.state.Checkouts });
        }
    }

    changeUserSignature = (e) => {
        this.setState({ UserSignature: e.target.value });
    }
    changeItemName = (e) => {
        this.setState({ ItemId: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Checkouts",
            CheckoutId: 0,
            CheckoutTime: 0,
            ItemType: 0,
            ItemId: 0,
            ItemName: "",
            IsCheckin: false,
            ItemTypeId: 0
        });

    }

    addClickCheckin(ch) { // ch => checkout map
        this.setState({
            modalTitle: "Add Checkins",
            CheckinId: 0,
            CheckinTime: 0,
            ItemId: ch.ItemID,
            CheckoutId: ch.CheckoutID,
        });
    }

    editClick(ch) {
        this.setState({
            modalTitle: "edit Checkouts",
            CheckoutTime: ch.CheckoutTime,
            ItemId: ch.ItemID,
            ItemName: ch.ItemName,
            IsCheckin: ch.IsCheckin,
            CheckoutId: ch.CheckoutID,
        });
    }

    ItemIdIsValide() {

        return this.state.ItemId !== 0;
    }

    createClick() {
        if (!this.ItemIdIsValide()) {
            toastr.error("Please Select an Item");
            return;
        }

        fetch(variables.API_URL + 'Checkouts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserName: this.state.UserName,
                UserEmail: this.state.UserEmail,
                ItemID: this.state.ItemId
            })
        })
            .then(res => res.json())
            .then((result) => {
                toastr.success("Created successfully");
                this.refreshList();
            }, (error) => {
                toastr.error('Failed');
            });

    }

    UserSignIsValid() {
        return this.state.UserSignature !== 0;
    }

    createClickCheckin() {
        if (!this.UserSignIsValid()) {
            toastr.error("Please enter you initials");
            return;
        }

        fetch(variables.API_URL + 'Checkins', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                CheckinID: this.state.CheckinId,
                UserSignature: this.state.UserSignature,
                CheckoutID: this.state.CheckoutId,
                UserName: this.state.UserName,
                UserEmail: this.state.UserEmail
            })
        })
            .then(res => res.json())
            .then((result) => {
                toastr.success("Item checkedin successfully");
                this.refreshList();
            }, (error) => {
                toastr.error('Failed');
            })

    }

    updateClick() {
        fetch(variables.API_URL + 'Checkouts', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserName: this.state.UserName,
                UserEmail: this.state.UserEmail,
                ItemID: this.state.ItemId,
                CheckoutID: this.state.CheckoutId
            })
        })
            .then(res => res.json())
            .then((result) => {
                toastr.success("Checkout Created successfully");
                this.refreshList();
            }, (error) => {
                toastr.error('Failed');
            });

    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'Checkouts/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    toastr.success("Checkout deleted successfully");
                    this.refreshList();
                }, (error) => {
                    toastr.error('Failed');
                })
        }
    }

    render() {
        const {
            modalTitle,
            CheckoutId,
            ItemId,
            Items,
            UserSignature,
            CheckinId
        } = this.state;
        return (
            <div>
                <div>
                    <h4> Checkouts </h4>
                </div>
                <div>
                    {/* <div className="input-group mb-3">
                        <span className="input-group-text">Select Date range</span>
                        <input type="text" className="form-control"
                            id='dates'
                            name='dates'
                            value={this.state.dates}
                            onChange={this.changeDates} />
                    </div> */}
                    <DateRangePicker className='float-start' onChange={this.changeDates} />

                    <button type="button"
                        className="btn btn-primary m-2 float-end"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => this.addClick()}>
                        Add Checkouts
                    </button>
                </div>

                <table className="table table -striped">
                    <thead>
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
                                Checkin Time
                            </th>
                            <th>
                                Signature
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filteredCheckouts.map(ch =>
                            <tr key={ch.CheckoutID}>
                                <td>{ch.UserName}</td>
                                <td>{ch.CheckoutTime ? (new Date(ch.CheckoutTime)).toLocaleString('en-US') : null}</td>
                                <td>{ch.ItemName}</td>
                                <td>{ch.CheckinTime ? (new Date(ch.CheckinTime)).toLocaleString('en-US') : null}</td>
                                <td>{ch.UserSignature}</td>
                                <td>
                                    {ch.IsCheckin === 0 ?
                                        <button type="button"
                                            title='Checkin Item'
                                            className="btn btn-light m-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal2"
                                            onClick={() => this.addClickCheckin(ch)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-right-square" viewBox="0 0 16 16">
                                                <path fillrule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 3.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768L5.854 5.146z" />
                                            </svg>
                                        </button>
                                        : null
                                    }

                                    <button type="button"
                                        title='Update Item'
                                        className="btn btn-light mrv-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(ch)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    {ch.IsCheckin === 0 ?
                                        <button type="button"
                                            title='Delete Item'
                                            className="btn btn-light mr-1"
                                            onClick={() => this.deleteClick(ch.CheckoutID)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>
                                        : null
                                    }

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

                                    <div className="p-2 w-100 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Item </span>
                                            <select className="form-select"
                                                onChange={this.changeItemName}
                                                value={ItemId}>
                                                <option value={0}>
                                                    Please Select an Item
                                                </option>
                                                {Items.map(che =>
                                                    <option key={che.ItemID} value={che.ItemID}>
                                                        {che.ItemName}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {CheckoutId === 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start btl-close"
                                            data-bs-dismiss="modal" aria-label="close"
                                            onClick={() => this.createClick()}
                                        >Create</button>
                                        : null}

                                    {CheckoutId !== 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start btl-close" data-bs-dismiss="modal" aria-label="close"
                                            onClick={() => this.updateClick()}
                                        >Update</button>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog moadal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btl-close" data-bs-dismiss="modal" aria-label="close">
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">
                                    <div className="p-2 w-100 bd-highlight">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">User Signature</span>
                                            <input type="text" className="form-control"
                                                value={UserSignature}
                                                onChange={this.changeUserSignature} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {CheckinId === 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start btl-close" data-bs-dismiss="modal" aria-label="close"
                                            onClick={() => this.createClickCheckin()}
                                        >Create</button>
                                        : null}

                                    {CheckinId !== 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start btl-close" data-bs-dismiss="modal" aria-label="close"
                                            onClick={() => this.updateClickCheckin()}
                                        >Update</button>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}








