import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent'
class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true
    }

    onDishSelect = (dish) =>  {
        return this.setState({ selectedDish: dish});
    };
    componentDidMount() {
        console.log(this.state);
        if(this.state.selectedDish!==null)
        {
            console.log(this.state.selectedDish);
            return (<DishDetail dish={this.state.selectedDish}/>)
        }

    }

    renderDish(dish) {
        if (dish != null)
            return(
                   <DishDetail dish={dish}/>
            );
        else
            return(
                    <div/>
            );
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                    <div  className="col-12 col-md-5 m-1">
                        <Card key={dish.id}
                              onClick={() => this.onDishSelect(dish)}>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardImgOverlay>
                                <CardTitle>{dish.name}</CardTitle>
                            </CardImgOverlay>
                        </Card>
                    </div>
            );
        });

        return (
                <div className="container">
                    <div className="row">
                        {menu}
                    </div>
                    <div className="row">
                        <div  className="col-12 col-md-5 m-1">
                            {this.renderDish(this.state.selectedDish)}
                        </div>
                    </div>
                </div>
        );
    }
}


export default Menu;