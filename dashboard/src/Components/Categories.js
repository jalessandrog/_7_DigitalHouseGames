import React, { Component } from 'react';
import Category from './Category';

// let categories = [
//     {category: 'Acción',
//      result: 10},
//     {category: 'Animación',
//     result: 11},
//     {category: 'Aventura',
//     result: 12},
//     {category: 'Ciencia Ficción',
//     result: 13},
//     {category: 'Comedia',
//     result: 14},
//     {category: 'Documental',
//     result: 15},
//     {category: 'Drama',
//     result: 16},
//     {category: 'Fantasia',
//     result: 17},
//     {category: 'Infantiles',
//     result: 18},
//     {category: 'Musical',
//     result: 19}
// ]

 


class CategoriesInDb extends Component {

    constructor(props){
        super(props)
        this.state={
            categories: [{category: 'Xbox',
            result: 12},
           {category: 'Animación',
           result: 11},
           {category: 'Aventura',
           result: 12},
           {category: 'Ciencia Ficción',
           result: 13},
           {category: 'Comedia',
           result: 14},
           {category: 'Documental',
           result: 15},
           {category: 'Drama',
           result: 16},
           {category: 'Fantasia',
           result: 17},
           {category: 'Infantiles',
           result: 18},
           {category: 'Musical',
           result: 19}]
        }
    }

    componentDidMount(){
        fetch('/api/products/categories')
        .then(respuesta=>{
            return respuesta.json()
        })
        .then(categorie=>{
            //console.log(categorie['countByCategory'].Xbox)
           //this.setState({categories:categorie})
        })
        .catch(error => console.log(error))
        
    }
        
    render(){
    return (
        <React.Fragment>
                {/*<!-- Categories in DB -->*/}
                <div className="col-lg-6 mb-4">						
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-gray-800">Categories in Data Base</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {
                                    this.state.categories.map((category,index)=>{
                                        return <Category {...category} key={index} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
           
        </React.Fragment>
    )
   }

}
export default CategoriesInDb;