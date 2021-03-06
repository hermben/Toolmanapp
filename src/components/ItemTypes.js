import React, { Component } from 'react';
import { variables } from '../Variables';
import toastr from 'toastr';

export class ItemTypes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itemTypes: [],
            errors: [],
            modalTitle: "",
            itemTypeId: "",
            itemTypeName: "",
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'itemTypes')
            .then(response => response.json())
            .then(data => {
                this.setState({ itemTypes: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeitemTypeName = (e) => {
        this.setState({ itemTypeName: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add ItemTypes",
            itemTypeId: 0,
            itemTypeName: ""
        });
    }

    editClick(ty) {
        this.setState({
            modalTitle: "edit ItemTypes",
            itemTypeId: ty.itemTypeId,
            itemTypeName: ty.itemTypeName
        });
    }

    hasError(inputName) {
        return this.state.errors.indexOf(inputName) !== -1;
    }

    validateForm() {
        var errors = [];
        if (this.state.itemTypeName === "") {
            errors.push("itemTypeName");
        }
        this.setState({
            errors: errors
        });

        if (errors.length > 0) {
            return false;
        }
        return true;
    }

    createClick() {
        if (this.validateForm() === false)
            return;

        fetch(variables.API_URL + 'ItemTypes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemTypeName: this.state.itemTypeName
            })
        })
            .then(res => res.json())
            .then((result) => {
                toastr.success("Created successfully");
                this.refreshList();
            }, (error) => {
                toastr.error("Failed");
            })
    }

    updateClick() {
        fetch(variables.API_URL + 'ItemTypes', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemTypeId: this.state.itemTypeId,
                itemTypeName: this.state.itemTypeName
            })
        })
            .then(res => res.json())
            .then((result) => {
                toastr.success("Updated successfully");
                this.refreshList();
            }, (error) => {
                toastr.error('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'ItemTypes/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    toastr.success("Deleted successfully");
                    this.refreshList();
                }, (error) => {
                    toastr.error('Failed');
                })
        }
    }



    render() {
        const {
            itemTypes,
            modalTitle,
            itemTypeId,
            itemTypeName
        } = this.state;
        return (
            <div>
                <div>
                    <h4> ItemTypes </h4>
                </div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add itemTypes
                </button>
                <table className="table table -striped">
                    <thead>
                        <tr>
                            <th>
                                itemTypeId
                            </th>
                            <th>
                                itemTypeName
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemTypes.map(ty =>
                            <tr key={ty.ItemTypeID}>
                                <td>{ty.ItemTypeID}</td>
                                <td>{ty.ItemTypeName}</td>
                                <td>
                                    <button type="button"
                                        title='Update Item'
                                        className="btn btn-light m-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(ty)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        title='Delete Item'
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(ty.ItemTypeID)}>
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
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-100 bd-highlight">
                                        <div className="input-group mb-3">

                                            <span className="input-group-text">itemTypeName</span>
                                            <input type="text" className={
                                                this.hasError("itemTypeName")
                                                    ? "form-control is-invalid"
                                                    : "form-control"}
                                                name="itemTypeName"
                                                value={itemTypeName}
                                                onChange={this.changeitemTypeName} />
                                            <div className={
                                                this.hasError("itemTypeName") === true ? "invalid-feedback" : "visually-hidden"
                                            } >
                                                Please enter a value
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-row bd-highlight mb-3">
                                    <div className="p-2 w-100 bd-highlight">
                                        {itemTypeId === 0 ?
                                            <button type="button"
                                                className="btn btn-primary float-start"
                                                onClick={() => this.createClick()}
                                            >Create</button>
                                            : null}

                                        {itemTypeId !== 0 ?
                                            <button type="button"
                                                className="btn btn-primary float-start"
                                                onClick={() => this.updateClick()}
                                            >Update</button>
                                            : null}

                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}