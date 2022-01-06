import React, { Component } from 'react';
import { variables } from '../Variables';

export class Items extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Items: [],
            ItemTypes: [],
            modalTitle: "",
            ItemType: "",
            ItemId: 0,
            ItemName: "",
            ItemSerial: "",
            ItemDescription: "",
            IsCheckout: false,
            ItemTypeId: 0
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'Items')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ Items: data });
                console.log(data);
            });
        fetch(variables.API_URL + 'ItemTypes')
            .then(response => response.json())
            .then(data => {
                this.setState({ ItemTypes: data });
                console.log(data);
            });
    }

    componentDidMount() {
        this.refreshList();
    }
    changeItemType = (e) => {
        this.setState({ ItemTypeId: e.target.value });
    }
    changeItemName = (e) => {
        this.setState({ ItemName: e.target.value });
    }
    changeItemSerial = (e) => {
        this.setState({ ItemSerial: e.target.value });
    }
    changeItemDescription = (e) => {
        this.setState({ ItemDescription: e.target.value });
    }
    changeIsCheckout = (e) => {
        this.setState({ IsCheckout: e.target.value === "1" ? true : false });
    }


    addClick() {
        this.setState({
            modalTitle: "Add Items",
            ItemType: "",
            ItemId: 0,
            ItemName: "",
            ItemSerial: "",
            ItemDescription: "",
            IsCheckout: false,
            ItemTypeId: 0
        });
    }


    editClick(it) {
        this.setState({
            modalTitle: "edit Items",
            ItemType: it.ItemType,
            ItemId: it.ItemID,
            ItemName: it.ItemName,
            ItemSerial: it.ItemSerial,
            ItemDescription: it.ItemDescription,
            IsCheckout: it.IsCheckout,
            ItemTypeId: it.ItemTypeID
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Items', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'

            },
            body: JSON.stringify({

                ItemID: this.state.ItemId,
                ItemTypeID: this.state.ItemTypeId,
                ItemName: this.state.ItemName,
                ItemSerial: this.state.ItemSerial,
                ItemDescription: this.state.ItemDescription,
                IsCheckout: this.state.IsCheckout
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

    updateClick() {
        fetch(variables.API_URL + 'Items', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'

            },
            body: JSON.stringify({
                ItemTypeID: this.state.ItemTypeId,
                ItemID: this.state.ItemId,
                ItemName: this.state.ItemName,
                ItemSerial: this.state.ItemSerial,
                ItemDescription: this.state.ItemDescription,
                IsCheckout: this.state.IsCheckout
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

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'Items/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'content-Type': 'application/json'
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

    render() {
        const {
            Items,
            ItemTypes,
            modalTitle,
            ItemId,
            ItemName,
            ItemSerial,
            ItemDescription,
            IsCheckout,
            ItemTypeId,
        } = this.state;
        return (
            <div>

                <div>
                    <h4> Items </h4>
                </div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Items
                </button>
                <table className="table table -striped">
                    <thead>
                        <tr>
                            <th>
                                Item Type
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Serial
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Is Checkout
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Items.map(it =>
                            <tr key={it.ItemID}>
                                <td>{it.ItemTypeName}</td>
                                <td>{it.ItemName}</td>
                                <td>{it.ItemSerial}</td>
                                <td>{it.ItemDescription}</td>
                                <td>{it.IsCheckout}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light m-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(it)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(it.ItemID)}>
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

                                    <div className="p-2 w-100 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Item Type Name</span>
                                            <select className="form-select"
                                                onChange={this.changeItemType}
                                                value={ItemTypeId}>
                                                {ItemTypes.map(ity =>
                                                    <option key={ity.ItemTypeID} value={ity.ItemTypeID}>
                                                        {ity.ItemTypeName}
                                                    </option>
                                                )}
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Name</span>
                                            <input type="text" className="form-control"
                                                value={ItemName}
                                                onChange={this.changeItemName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Serial</span>
                                            <input type="text" className="form-control"
                                                value={ItemSerial}
                                                onChange={this.changeItemSerial} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Description</span>
                                            <input type="text" className="form-control"
                                                value={ItemDescription}
                                                onChange={this.changeItemDescription} />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label className="form-label">Is Checkout</label>

                                            <div class="form-group">
                                                <label htmlFor="isAdminYes" className='form-label cmr-1'>
                                                    <input className="form-check-input form-control" type="radio" name="isCheckout" id="isCheckoutYes"
                                                        value={1}
                                                        checked={IsCheckout}
                                                        onChange={this.changeIsCheckout} />
                                                    Yes
                                                </label>
                                                <label htmlFor="isAdminNo" className='form-label'>
                                                    <input className="form-check-input form-control" type="radio" name="isCheckout" id="isCheckoutNo"
                                                        value={0}
                                                        checked={!IsCheckout}
                                                        onChange={this.changeIsCheckout} />
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {ItemId === 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={() => this.createClick()}
                                        >Create</button>
                                        : null}

                                    {ItemId !== 0 ?
                                        <button type="button"
                                            className="btn btn-primary float-start"
                                            onClick={() => this.updateClick()}
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