import React, { Component } from 'react';

export class Home extends Component {

    render() {
        return (
            <div className='container'>
                {/* <h3>Home</h3>

                <img src="background.jpg" alt="Tools Background" className='img-fluid' /> */}

                <div className="px-4 pt-5 my-5 text-center border-bottom">
                    <h1 className="display-4 fw-bold">Home</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">Welcome to your tool management App</p>
                    </div>
                    <div className="overflow-hidden">
                        <div className="px-5">
                            <img src="background.jpg" alt="Tools Background" className='img-fluid' />
                            {/* <img src="background.jpg" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" wid width="700" height="500" loading="lazy"> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};