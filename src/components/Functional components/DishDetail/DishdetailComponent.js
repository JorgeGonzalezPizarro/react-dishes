import React , {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, BreadcrumbItem, Breadcrumb, Modal, ModalHeader, ModalBody, Row, Label, Col, Button
} from 'reactstrap';
import Link from "react-router-dom/es/Link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {Control, Errors, LocalForm} from "react-redux-form";

const DishDetail = (props) => {
    console.log(props);
    if (props.dish == null) {
        return <div/>
    }
    return (

        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
                <div className="col-12 col-md-5 m-1">

                </div>

            </div>
        </div>
    );

};

const RenderDish = ({dish}) => {
    console.log(dish);
    if (dish != null) {
        return (
            <div>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>

                        <CardTitle>{dish.name} </CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );

    }
    return <div/>
};

const RenderComments = ({comments}) => {
    if (comments == null) {
        return <div/>
    }
    console.log(comments);
    return (
        <div>
            <ul className="list-unstyled">
                <h4>Comments</h4>
                {comments.map((comment, key) => {
                    return (
                        <li key={key}>
                            <p>{comment.comment}</p>
                            <p>--{comment.author}</p>
                        </li>

                    );
                })
                }
            </ul>
            <CommentForm isOpen={false}/>

        </div>
    );
};




export class CommentForm extends Component {

    constructor (props)
    {
        super(props);
        this.state = {
            isOpen : this.props.isOpen,
        }
    }
    toggleModal = () => {

        return this.setState({
            ...this.state, isOpen: !this.state.isOpen
        });
    }


    render() {
        return (
                <>
                    <button onClick={this.toggleModal}>
                        <FontAwesomeIcon icon={faPencilAlt}/>
                        <p>Submit Comment</p>
                    </button>
                    <Modal isOpen={this.state.isOpen}>
                        <ModalHeader toggle={this.toggleModal}>Submit Content</ModalHeader>
                        <RenderForm/>
                        <ModalBody>

                        </ModalBody>
                    </Modal>
                </>
        );
    };

}


const RenderForm = () => {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    const minValue = (len) => (val) => val && (val.length >= len);
    const handleSubmit = (values) => {

    }
    return(
            <>
                <div className="col-12 col-md-9">

                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={9}>Rating</Label>
                            <Col md={9}>
                                <Control.text type="number" model=".rating" id="rating" name="rating"
                                              placeholder="Rating" min="1"
                                              className="form-control"
                                              validators={{
                                                  required}}
                                />
                                <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required',

                                        }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={9}>Your Name</Label>
                            <Col md={9}>
                                <Control.text model=".firstname" id="firstname" name="firstname"
                                              placeholder="First Name"
                                              className="form-control"
                                              validators={{
                                                  required, minLength: minLength(3), maxLength: maxLength(15)
                                              }}
                                />
                                <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={9}>Comment</Label>
                            <Col md={9}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                                  placeholder="Comment"
                                                  className="form-control"
                                                  validators={{
                                                      required, maxLength: maxLength(500)
                                                  }}
                                />
                                <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                />
                            </Col>
                        </Row>
                    </LocalForm>
                    <Button className="bg-primary">
                        Submit
                    </Button>
                </div>
            </>


    )

}

export default DishDetail;

