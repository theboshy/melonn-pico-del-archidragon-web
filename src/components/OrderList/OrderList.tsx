import React, {useEffect, useState} from 'react';
import styles from './OrderList.module.scss';
import {ApiServices} from "../../services/api.service";
import {Modal} from "react-bootstrap";

const OrderList = () => {
    const apiServices = new ApiServices();
    const [orders, setOrders] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const [showingOrder, setShowingOrder] = useState<any>({});

    const handleClose = () => setShow(false);
    const handleShow = (id: string) => {
        setShow(true);
        const order = orders.find((order) => order.internalOrderNumber === id);
        if (order) {
            setShowingOrder(order);
            console.log(order.items)
        }
    }
    const loadOrders = async () => {
        const result = await apiServices.getOrders();
        if (result) {
            setOrders(result.result); // lol
        }
    }
    return (
        <div className={styles.OrderList} data-testid="OrderList">
            <Modal show={show} onHide={handleClose}  size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Order {showingOrder.internalOrderNumber}</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="row">
                        <div  className={[styles.cardSpacing, 'col'].join(' ')}>
                            <div className="card" >
                                <div className="card-header">
                                    Order information
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">external order number:
                                        <strong>{showingOrder.externalOrderNumber}</strong></li>
                                    <li className="list-group-item">buyer full name:
                                        <strong>{showingOrder.name}</strong></li>
                                    <li className="list-group-item">buyer phone number:
                                        <strong>{showingOrder.phone}</strong></li>
                                    <li className="list-group-item">buyer email:
                                        <strong>{showingOrder.email}</strong></li>
                                </ul>
                            </div>
                        </div>
                        <div className={[styles.cardSpacing, 'col'].join(' ')}>
                            <div className="card" >
                                <div className="card-header">
                                    Shipping info
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">shipping address:
                                        <strong>{showingOrder.shippingAddress}</strong></li>
                                    <li className="list-group-item">shipping city:
                                        <strong>{showingOrder.shippingCity}</strong></li>
                                    <li className="list-group-item">shipping city:
                                        <strong>{showingOrder.shippingRegion}</strong></li>
                                    <li className="list-group-item">shipping country:
                                        <strong>{showingOrder.shippingCountry}</strong></li>
                                </ul>
                            </div>
                        </div>
                        <div className={[styles.cardSpacing, 'col'].join(' ')}>
                            <div className="card" >
                                <div className="card-header">
                                    Line items
                                </div>
                                <table className="table">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Product QTY</th>
                                        <th scope="col">Product Weight</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {showingOrder.items && showingOrder.items.map((product: any, i: number) => {
                                        return <tr>
                                            <th scope="row">{i+1}</th>
                                            <td>{product.name}</td>
                                            <td>{product.qty}</td>
                                            <td>{product.weight}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={[styles.cardSpacing, 'col'].join(' ')}>
                            <div className="card" >
                                <div className="card-header">
                                    Shipping info
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">pack_promise_min:
                                        <strong>{JSON.stringify(showingOrder.packPromiseMin)}</strong>
                                    </li>
                                    <li className="list-group-item">pack_promise_max:
                                        <strong>{JSON.stringify(showingOrder.packPromiseMax)}</strong>
                                    </li>
                                    <li className="list-group-item">ship_promise_min:
                                        <strong>{JSON.stringify(showingOrder.shipPromiseMin)}</strong>
                                    </li>
                                    <li className="list-group-item">ship_promise_max:
                                        <strong>{JSON.stringify(showingOrder.shipPromiseMax)}</strong>
                                    </li>
                                    <li className="list-group-item">delivery_promise_min:
                                        <strong>{JSON.stringify(showingOrder.deliveryPromiseMin)}</strong>
                                    </li>
                                    <li className="list-group-item">delivery_promise_max:
                                        <strong>{JSON.stringify(showingOrder.deliveryPromiseMax)}</strong>
                                    </li>
                                    <li className="list-group-item">ready_pickup_promise_min:
                                        <strong>{JSON.stringify(showingOrder.readyPickupPromiseMin)}</strong>
                                    </li>
                                    <li className="list-group-item">ready_pickup_promise_max:
                                        <strong>{JSON.stringify(showingOrder.readyPickupPromiseMax)}</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>


            <button type="submit" className="btn btn-primary" onClick={loadOrders}>Load Orders</button>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order Number</th>
                    <th scope="col">Seller Store</th>
                    <th scope="col">Creation Date</th>
                    <th scope="col">Shipping Method</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((item, i) => {
                    return <tr className={styles.selectableItem} onClick={() => handleShow(item.internalOrderNumber)}>
                        <th scope="row">{i+1}</th>
                        <td>{item.internalOrderNumber}</td>
                        <td>{item.sellerStore}</td>
                        <td>{item.creationTime}</td>
                        <td>{item.shippingMethod.name}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
