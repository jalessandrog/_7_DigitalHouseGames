import React from 'react';

function Category(props){
    return(
        <React.Fragment>
            <div className="col-lg-6 mb-4">
                <div className="card text-white bg-dark  shadow">
                    <div className="card-body">
                        {props.category}: {props.result}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Category;