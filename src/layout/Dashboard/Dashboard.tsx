import React from 'react';
import styles from './Dashboard.module.scss';
import CreateOrderComponent from "../../components/CreateOrderComponent/CreateOrderComponent";
import OrderList from "../../components/OrderList/OrderList";

const Dashboard: React.FC = () => (
  <div className={styles.Dashboard} data-testid="Dashboard">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
              <button className="nav-link active" id="createNewOrder-tab" data-bs-toggle="tab"
                      data-bs-target="#createNewOrder"
                      type="button" role="tab" aria-controls="createNewOrder" aria-selected="true">Create new order
              </button>
          </li>
          <li className="nav-item" role="presentation">
              <button className="nav-link" id="seeAllOrders-tab" data-bs-toggle="tab"
                      data-bs-target="#seeAllOrders" type="button"
                      role="tab" aria-controls="seeAllOrders" aria-selected="false">See orders
              </button>
          </li>
      </ul>
      <div className="tab-content" id="tab-layouts">
          <div className={[styles.mainFormSpacing, 'tab-pane', 'fade', 'show', 'active'].join(' ')}
               id="createNewOrder" role="tabpanel" aria-labelledby="createNewOrder-tab">
              <CreateOrderComponent></CreateOrderComponent>
          </div>
          <div className="tab-pane fade" id="seeAllOrders" role="tabpanel" aria-labelledby="seeAllOrders-tab">
                <OrderList></OrderList>
          </div>
      </div>
  </div>
);

export default Dashboard;
